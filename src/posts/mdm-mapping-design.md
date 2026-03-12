---
title: "主数据治理实战：从同义词混乱到 SSOT 的映射表设计"
description: "品类「洗发水」和「洗发液」被当成两个东西统计？本文复盘如何用「配置驱动映射表」解决这类主数据病灶，把硬编码的 CASE WHEN 变成可维护的 ETL 原子能力。"
date: "2026-02-26"
category: "主数据"
author: "Chuck Li"
---

在快消行业做了 10 年数据治理，我见过最多的坑不是技术 Bug，而是**业务口径不统一**。  
这篇文章不讲“为什么要做主数据”，只聚焦一个问题：  

> 在一个已经跑了很多年的数仓里，如何不推倒重来，用「映射表 + 配置化管线」把同义词混乱、口径分裂的现状一点点拉回 SSOT。

---

## 一、主数据病灶：从“洗发水/洗发液”到报表失真

一个真实的场景：

- 线上电商系统里，品类字段有「洗发水」「洗发液」「洗护发套装」；
- 线下门店 POS 系统里，品类字段只有「洗发水」和「护发素」；
- 渠道团队在 Excel 里，又自己加了一列「促销主题」，写的是「洗护」。

在报告层面，会出现：

- 市场部说“洗护发”销量增长 30%；  
- 渠道部看报表却只看到“洗发水”增长 10%；  
- CFO 在董事会上被问住：“到底增长了多少？”

**本质问题**：  

- 维度**含义不一致**（语义）；  
- **无统一编码**（识别）；  
- 映射逻辑**散落在各个报表/脚本里**（不可控）。

大厂里这类问题的后果不是“报表难看”，而是：

- 预算分配决策偏差（把钱砸错品类）；  
- 促销 ROI 无法评估（到底是品类拉动还是价格战）；  
- 最终没人再相信 BI，看板沦为“装饰品”。

所以，这一节的结论只有一句：

> 不存在“轻量级”的主数据治理。只要你有跨系统汇总，就必须有严肃的映射机制。

---

## 二、目标状态：把“映射”当成一等公民

在多个项目里，我最后都把“映射”这一层建成了一个**独立的子域**：

1. 有自己的 **数据模型**（`dim_*_mapping` 系列表）；
2. 有自己的 **配置管理方式**（Web/低代码维护界面 + 审批流）；  
3. 有自己的 **ETL 原子算子**（Mapping Operator），而不是每个脚本里一坨 CASE WHEN。

我们先看一个极简但可落地的范式。

### 2.1 映射表建模：不只是一张对照表

以“品类映射”为例，我最终推荐的模型是：

```sql
-- 业务中台侧：标准品类主数据
CREATE TABLE dim_category_master (
  category_id      STRING,          -- 标准品类ID（业务可读，稳定）
  category_name    STRING,          -- 标准品类名称（如 洗发护发）
  parent_id        STRING,          -- 上级品类ID
  level            INT,             -- 层级（1/2/3）
  is_leaf          BOOLEAN,
  valid_from       DATE,
  valid_to         DATE,
  is_active        BOOLEAN
);

-- 映射表：源值 → 标准品类
CREATE TABLE dim_category_mapping (
  source_system    STRING,          -- 源系统标识（POS/ECOM/CRM...）
  source_category  STRING,          -- 源系统品类值（如 POS:洗发液）
  category_id      STRING,          -- 对应 dim_category_master.category_id
  confidence       DECIMAL(5,2),    -- 置信度（规则/算法评估）
  valid_from       DATE,
  valid_to         DATE,
  is_active        BOOLEAN,
  created_by       STRING,
  created_at       TIMESTAMP
);
```

几点关键设计：

- **永远映射到 ID，不直接映射到 Name**：  
  Name 可以本地化、多语言、重命名，ID 才是逻辑稳定锚点。
- 映射粒度是 `(source_system, source_category)`，避免不同系统间意外串映。
- 映射记录本身也是 SCD（`valid_from/valid_to`），这样可以**复算历史**：  
  - “按 2024 年 Q1 的旧口径算一遍”；  
  - “按 2025 年新口径模拟一下过去两年”。

---

## 三、从 CASE WHEN 到 Mapping Operator

很多数仓团队一开始是这么写的：

```sql
CASE
  WHEN category IN ('洗发水', '洗发液', '洗护发') THEN '洗发护发'
  WHEN category IN ('沐浴露', '香皂') THEN '身体清洁'
  ELSE category
END AS category_std
```

问题不在于 CASE WHEN 本身，而在于：

1. 这些逻辑**散落在 50+ 个脚本**里；  
2. 逻辑改动只能通过“搜索+替换”来做；  
3. 你无法回答“这个口径是谁定义的、什么时候改的”。

我在 Databricks/Spark 项目里做的重构思路是：  

> 把“映射”抽象为一个**标准化算子**（Mapping Operator），所有事实表在加工时都必须走它。

伪代码形态大致是：

```python
def apply_category_mapping(df, source_system_col, category_col):
    mapping = spark.table("dim_category_mapping") \
        .where("is_active = true AND current_date() BETWEEN valid_from AND valid_to")

    return (
        df.alias("f")
          .join(
              mapping.alias("m"),
              (F.col(source_system_col) == F.col("m.source_system")) &
              (F.col(category_col) == F.col("m.source_category")),
              "left"
          )
          .withColumn(
              "category_id",
              F.coalesce(F.col("m.category_id"), F.lit("UNKNOWN"))
          )
          .drop("m.source_system", "m.source_category")
    )
```

在 YAML/配置层，则只需声明：

```yaml
facts:
  - name: fct_sales
    source_system_column: src_system
    mappings:
      - type: category
        column: category_raw
```

好处：

- **新增一个事实表**：只需在配置里声明要走哪个 mapping；  
- **调整映射规则**：只改配置/映射表，不改任何事实表代码；  
- **审计**：可以记录某个批次使用的是哪一版映射（把 mapping 的快照版本号写入审计表）。

---

## 四、质量与审计：把“未映射”当成一等事件

很多团队建了映射表，却忽略了一个关键问题：  

> “那些没有被映射上的值，去哪儿了？”

在我的实践里，**未映射值永远不能悄悄消失**，而要被明确送进“待治理池”。

一个简单可落地的做法是：

```sql
-- 1）每天记录未映射的源值
CREATE TABLE dq_unmapped_category (
  dt              DATE,
  source_system   STRING,
  source_category STRING,
  cnt             BIGINT
);

INSERT OVERWRITE TABLE dq_unmapped_category
SELECT
  dt,
  src_system      AS source_system,
  category_raw    AS source_category,
  COUNT(*)        AS cnt
FROM dwd_sales
WHERE category_id = 'UNKNOWN'
GROUP BY dt, src_system, category_raw;
```

然后：

- BI/DQ 面板上要有一块专门展示“未映射 TOP N”；  
- 数据治理例会上，**先看这块**，而不是先看 GMV；  
- 一旦业务补齐了某一批值的映射，下一个批次自动消化；  
- 如果某个品类明知不应该被合并（例如新业务线），则通过配置改变映射策略（不再映射到老类目）。

这一步的价值其实不在 SQL，而在于：

- 把“映射”从被动救火，变成**主动运营的对象**；
- 主数据团队可以用数据说话：  
  - “这个月我们治理掉了 xxx 条脏品类，影响了 yyy 万的 GMV 口径”。

---

## 五、AI 介入的位置：不是“自动决定”，而是“缩小人工搜索空间”

当 `dim_category_mapping` 增长到几万、几十万行以后，纯人工维护成本会爆炸。  
这时候 AI 可以帮忙，但我不建议让它**直接决定**标准值，而是：

1. 帮你从海量未映射值中，找出“高度可疑的同义词候选”；  
2. 把它们连同上下文（如商品标题、品牌）一起丢给数据治理同学做最终拍板。

一个典型的半自动流程是：

```sql
-- 1）取出近30天未映射的源值
WITH unmapped AS (
  SELECT DISTINCT source_system, source_category
  FROM dq_unmapped_category
  WHERE dt >= date_sub(current_date, 30)
)
SELECT
  u.source_system,
  u.source_category,
  p.product_title,
  p.brand_name
FROM unmapped u
LEFT JOIN dim_product p
  ON p.category_raw = u.source_category
LIMIT 1000;
```

然后将这 1000 行样本按批次喂给 LLM，Prompt 类似：

```markdown
你是快消行业的品类规划专家。
现在给你一批“源品类 + 商品标题 + 品牌”的记录，请你给出推荐的「标准品类名称」，并标注置信度。
如果无法判断，请输出 "UNKNOWN"。
```

生成的建议再由资深品类经理审核，**最终入库的依然是 dim_category_mapping**。  
AI 的角色是“候选生成器”，而不是“最终裁决者”。

---

## 六、把映射表当成可复用的“中台能力”

如果只在一个项目里做了上面的事情，那只是“工程优化”。  
真正的大厂思路是：把它抽象成一块可复用的中台能力。

抽象出来的要素大概有三类：

1. **数据模型层**  
   - 一致的 `dim_*_master` + `dim_*_mapping` 模式（品类、品牌、客户、组织…）；
   - 统一的 SCD 策略与审计字段规范。
2. **算子层（Operator）**  
   - 在 Spark / Flink / SQL 引擎中，沉淀一组标准 Mapping Operator：  
     - `apply_category_mapping(df, ...)`  
     - `apply_customer_mapping(df, ...)` 等。
3. **产品层**  
   - 给业务/数据治理团队一个简单的 UI，看见：  
     - 当前未映射 TOP N；  
     - 最近 30 天新增/修改的映射条目；  
     - 哪些报表/模型依赖了哪些映射（血缘）。

当你做到这三层的时候，“品类映射”不再是某个项目的遗留脚本，而是整个公司数仓与应用层可以反复调用的一块**能力中台**。

---

## 七、写在最后：用架构思维做“脏活”

很多人不愿意碰主数据治理，因为它看起来既脏又慢。  
但从架构师的视角看，这恰恰是最能体现“系统设计价值”的地方：

- 你不是在写一个 CASE WHEN，而是在定义未来几年内所有报表、模型、API 的“事实语言”；  
- 你不是在修一个 Bug，而是在搭建一个可以不断吸收脏数据、并把治理成果沉淀为资产的系统。

如果你也在做主数据相关的工作，希望这篇文章能给你一个参照系：  
先把映射表当成一等公民，再谈清洗、分析和 AI。

如需进一步讨论如何把映射能力中台化，可以前往 [Solutions & Prototypes](/apps) 查看主数据相关原型，或直接 [联系我](/agents) 聊聊你现在的系统现状。
