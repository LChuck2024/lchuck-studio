/** Solutions & Prototypes 卡片配置 */

export interface AppCardItem {
  icon: string;
  index: string;
  title: string;
  desc: string;
  tech: string;
  cta: {
    type: 'primary' | 'outline' | 'link';
    label: string;
    roleId?: string;
    message: string;
    href?: string;
    action?: 'chatbot' | 'script-list' | 'link';
  };
}

export interface AppSection {
  id: string;
  labelEn: string;
  labelCn: string;
  desc: string;
  cards: AppCardItem[];
}

export const APP_SECTIONS: AppSection[] = [
  {
    id: 'enterprise-data',
    labelEn: 'Enterprise Data',
    labelCn: '企业数据',
    desc: '主数据治理、数据清洗、ETL 架构与咨询原型。',
    cards: [
      {
        icon: '🏗️',
        index: '01',
        title: 'CDC 架构咨询',
        desc: '针对企业级数据中台增量同步与历史追溯的痛点，采用 CDC + SCD 拉链 + 配置驱动 ETL 架构，实现 10 年架构师经验的方法论输出与 1V1 深度咨询。',
        tech: 'CDC · SCD · Config-Driven ETL',
        cta: { type: 'primary', label: '架构详情', roleId: 'data-architect', message: '我想了解 CDC 架构咨询的流程与架构详情。为了维持实验室算力成本，本原型采用 License 授权模式。', action: 'chatbot' },
      },
      {
        icon: '🗄️',
        index: '02',
        title: '主数据咨询',
        desc: '针对产品/客户/组织主数据分散、同义词未归一化的痛点，采用 SSOT 与映射表设计，结合配置驱动 ETL，实现主数据治理的落地与可持续运维。',
        tech: 'SSOT · Mapping Table · MDM',
        cta: { type: 'primary', label: '架构详情', roleId: 'data-architect', message: '我想了解主数据治理与 MDM 落地的架构详情。为了维持实验室算力成本，本原型采用 License 授权模式。', action: 'chatbot' },
      },
      {
        icon: '🧹',
        index: '03',
        title: 'RAG 数据清洗 GUI',
        desc: '针对非结构化文档难以直接用于 LLM 微调的痛点，采用本地 Pipeline 进行 PDF/Word 解析与 Chunk 切分，输出 DeepSeek 可用的 JSONL 训练集，实现私有语料的高效 RAG 化。',
        tech: 'Python · Streamlit · PDF Parser · JSONL',
        cta: { type: 'primary', label: '申请访问', roleId: 'data-architect', message: '我想申请访问 RAG 数据清洗 GUI。为了维持实验室算力成本，本原型采用 License 授权模式，赞助算力即可获得无限次访问权限。', action: 'chatbot' },
      },
      {
        icon: '📊',
        index: '04',
        title: '万能数据清洗脚本包',
        desc: '针对重复性 Excel/CSV 手工操作效率低下的痛点，采用配置驱动型 Python Pipeline，覆盖多表合并、字段提取、去重、编码转换等 18 个原子算子，实现数据清洗的标准化与可复用。',
        tech: 'Pandas · OpenPyXL · Config-Driven ETL',
        cta: { type: 'primary', label: '架构详情', message: '', action: 'script-list' },
      },
      {
        icon: '📦',
        index: '05',
        title: '数据清洗代办',
        desc: '针对业务侧缺乏数据工程能力、重复性清洗需求外包难的痛点，采用标准化 Pipeline 与交付 SOP，实现 Excel 合并、字段提取、格式转换的快速交付。',
        tech: 'Pandas · OpenPyXL · SOP',
        cta: { type: 'primary', label: '申请访问', roleId: 'data-architect', message: '我想了解数据清洗代办的架构与交付流程。为了维持实验室算力成本，本原型采用 License 授权模式。', action: 'chatbot' },
      },
    ],
  },
  {
    id: 'personal-growth',
    labelEn: 'Personal Growth',
    labelCn: '个人成长',
    desc: '内容生产、留学规划、精力管理、方法论沉淀相关原型。',
    cards: [
      {
        icon: '🇪🇺',
        index: '01',
        title: '欧洲开放大学选课查询器',
        desc: '针对留学信息不对称与中介溢价痛点，采用主数据清洗与分级建模，将 270+ 门课程结构化，实现学科/学费/学分的多维度筛选，消除信息差，支持官网自助申请。',
        tech: 'WPS AI · 主数据 · 多维筛选',
        cta: { type: 'link', label: '启动原型', message: '', href: 'https://web.wps.cn/wo/sl/v31rzbsD?app_id=1PKY0UiCwcIPzRKjh3CoI6', action: 'link' },
      },
      {
        icon: '📱',
        index: '02',
        title: '小红书笔记整形工厂',
        desc: '针对技术博主内容转化率低、爆款结构难复制的痛点，采用 LLM + 结构化 Prompt 编排，将粗糙想法转化为「情绪对立+硬核干货」双轨输出，实现高互动率的内容生产。',
        tech: 'Gemini API · Regex · Prompt Engineering',
        cta: { type: 'primary', label: '申请访问', roleId: 'solo-preneur', message: '我想申请访问小红书笔记整形工厂。为了维持实验室算力成本，本原型采用 License 授权模式，赞助算力即可获得无限次访问权限。', action: 'chatbot' },
      },
      {
        icon: '📝',
        index: '03',
        title: '提示词模板包',
        desc: '针对通用 LLM 难以直接产出结构化、可复现输出的痛点，采用领域 Prompt 工程与角色设定编排，覆盖人生战略、CTO 决策、主数据治理等场景，实现 ChatGPT / DeepSeek / Copilot 的即插即用。',
        tech: 'Prompt Engineering · Multi-LLM · Role Design',
        cta: { type: 'primary', label: '申请访问', roleId: 'solo-preneur', message: '我想申请访问提示词模板包。为了维持实验室算力成本，本原型采用 License 授权模式，赞助算力即可获得无限次访问权限。', action: 'chatbot' },
      },
      {
        icon: '🧠',
        index: '04',
        title: '飞书 P0 管理法模板',
        desc: '针对职场/副业/家庭精力分散、优先级难以量化的痛点，采用飞书多维表格的「战略指挥部」架构，实现 P0 任务的动态排序与精力分配的可视化管理。',
        tech: 'Feishu · Multi-Dimensional Table · P0',
        cta: { type: 'primary', label: '申请访问', roleId: 'solo-preneur', message: '我想申请访问飞书 P0 管理法模板。为了维持实验室算力成本，本原型采用 License 授权模式。', action: 'chatbot' },
      },
    ],
  },
  {
    id: 'developer-tools',
    labelEn: 'Developer Tools',
    labelCn: '开发者工具',
    desc: 'RAG、Agent、本地部署与代码工程相关原型。',
    cards: [
      {
        icon: '⚡',
        index: '01',
        title: '代码优化服务',
        desc: '针对 Python / Spark / SQL 性能瓶颈与可维护性债务的痛点，采用静态分析 + 重构模式，实现性能调优、代码审查与架构升级的方法论输出。',
        tech: 'Python · Spark · SQL · Refactoring',
        cta: { type: 'primary', label: '架构详情', roleId: 'data-architect', message: '我想了解代码优化与性能调优的架构详情。为了维持实验室算力成本，本原型采用 License 授权模式。', action: 'chatbot' },
      },
      {
        icon: '🦞',
        index: '02',
        title: 'OpenClaw 智能体部署包',
        desc: '针对 24/7 自动化任务执行与代码编排的痛点，采用 OpenClaw 开源架构，实现文件操作、代码任务与 Agent 编排的本地部署，打造私人 AI 助理原型。',
        tech: 'OpenClaw · Agent · Local Deploy',
        cta: { type: 'outline', label: '架构详情', message: '我想了解 OpenClaw 智能体部署包的架构与演示。', action: 'chatbot' },
      },
      {
        icon: '📄',
        index: '03',
        title: 'RAG 知识库构建生成器',
        desc: '针对非结构化文档难以直接用于 RAG 检索的痛点，采用 Python CLI + 分块策略，将文档转化为标准化 QA 问答对，实现知识库的快速构建与向量化。',
        tech: 'Python · CLI · Chunking · QA Pair',
        cta: { type: 'primary', label: '申请访问', roleId: 'data-architect', message: '我想申请访问 RAG 知识库构建生成器。为了维持实验室算力成本，本原型采用 License 授权模式。', action: 'chatbot' },
      },
      {
        icon: '🤖',
        index: '04',
        title: 'DeepSeek 本地部署懒人包',
        desc: '针对隐私敏感场景与离线 AI 需求的痛点，采用硬件检测 + 模型部署 + UI 启动的一体化脚本，实现本地大模型的快速部署与隐私安全环境构建。',
        tech: 'DeepSeek · Local LLM · Ollama',
        cta: { type: 'outline', label: '架构详情', message: '我想了解 DeepSeek 本地部署懒人包的架构与内测安排。', action: 'chatbot' },
      },
      {
        icon: '📑',
        index: 'Roadmap',
        title: '万能发票重命名工具',
        desc: '针对财务报销场景下 PDF 发票命名混乱的痛点，采用 PDF 解析 + 正则提取，实现金额/日期的自动提取与批量重命名，提升报销流程效率。',
        tech: 'PDF Parser · Regex · Batch Rename',
        cta: { type: 'outline', label: '架构详情', message: '我想了解发票重命名工具的研发进度。', action: 'chatbot' },
      },
    ],
  },
];
