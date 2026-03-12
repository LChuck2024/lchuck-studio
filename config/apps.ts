/** Solutions & Prototypes 卡片配置 */

export interface AppCardItem {
  icon: string;
  index: string;
  title: string; // 大写英文标题
  subtitle?: string; // 中文副标题（可选）
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
    desc: '数据中台资产闭环：消费层、采集层、治理层、质量层。',
    cards: [
      {
        icon: '🤖',
        index: '01',
        title: 'Enterprise Agentic RAG Framework (企业级 Agentic RAG 框架)',
        subtitle: '消费层 (Consumption Layer)',
        desc: '基于意图预处理与反馈闭环架构，实现垂直领域 40%+ 精度提升。三层知识空间设计确保生产级可用性与可扩展性。证明将数据转化为智能的消费层能力。',
        tech: 'Python · Dify · VectorDB · Streamlit',
        cta: { type: 'link', label: 'Audit Console (审计控制台)', message: '', href: '/rag-auditor', action: 'link' },
      },
      {
        icon: '🏗️',
        index: '02',
        title: 'CDC Architecture Consulting (增量同步架构咨询)',
        subtitle: '采集层 (Ingestion Layer)',
        desc: '基于三链路中台架构（Base/SCD/CDC），采用实体级 Hash 快照与配置驱动 ETL。实现企业级数据中台增量同步的标准化架构，通过 100:1 压缩比证明最硬核的底层同步能力。12 年架构师经验的方法论输出。',
        tech: 'CDC · SCD · Config-Driven ETL',
        cta: { type: 'primary', label: 'Architecture Details (架构详情)', roleId: 'data-architect', message: '我想了解 CDC 架构咨询的流程与架构详情。', action: 'chatbot' },
      },
      {
        icon: '🗄️',
        index: '03',
        title: 'Master Data Governance (主数据治理架构)',
        subtitle: '治理层 (Governance Layer)',
        desc: '基于 SSOT 原则与配置驱动映射表架构，实现产品/客户/组织主数据的标准化治理。映射表设计支持时间维度追溯，替代硬编码 CASE WHEN。证明 500 强级别的管理视野与数据治理能力。',
        tech: 'SSOT · Mapping Table · MDM',
        cta: { type: 'primary', label: 'Architecture Details (架构详情)', roleId: 'data-architect', message: '我想了解主数据治理与 MDM 落地的架构详情。', action: 'chatbot' },
      },
      {
        icon: '📦',
        index: '04',
        title: 'Data Quality As-a-Service (数据质量即服务)',
        subtitle: '质量层 (Quality Layer)',
        desc: '基于标准化 Pipeline 架构与交付 SOP，提供 18 个标准化原子算子（多表合并、字段提取、去重、编码转换等）。实现 Excel 合并、字段提取、格式转换的工程化自动化交付，证明具备落地工具与质量保障能力。',
        tech: 'Pandas · OpenPyXL · Config-Driven ETL · 18 Atomic Operators',
        cta: { type: 'primary', label: 'Request Access (申请访问)', roleId: 'data-architect', message: '我想了解数据清洗代办的架构与交付流程。', action: 'chatbot' },
      },
    ],
  },
  {
    id: 'personal-growth',
    labelEn: 'STRATEGIC METHODOLOGY',
    labelCn: '战略方法论',
    desc: '围绕数据治理、AI 增长引擎与战略执行系统的方法论实验场，用工程视角固化可复用的决策模型与执行框架。',
    cards: [
      {
        icon: '🇪🇺',
        index: '01',
        title: 'European Open University Course Finder (欧洲公立大学课程检索)',
        subtitle: '非结构化数据标准化治理案例',
        desc: '基于主数据清洗与分级建模架构，将 270+ 门碎裂的课程信息重构为高价值数据模型。实现学科/学费/学分的多维度筛选与标准化治理，证明主数据管理（MDM）能力的实战落地。',
        tech: 'MDM · 主数据清洗 · 分级建模',
        cta: { type: 'link', label: 'Launch Prototype (启动原型)', message: '', href: 'https://web.wps.cn/wo/sl/v31rzbsD?app_id=1PKY0UiCwcIPzRKjh3CoI6', action: 'link' },
      },
      {
        icon: '📱',
        index: '02',
        title: 'Xiaohongshu Content Optimization Engine (小红书内容增长引擎)',
        subtitle: '基于数据驱动的自动化营销引擎',
        desc: '基于 LLM + 结构化 Prompt 编排架构，将粗糙想法转化为「情绪对立+硬核干货」双轨输出。实现技术博主内容转化率的标准化提升，证明流量背后的算法逻辑与自动化营销闭环。',
        tech: 'LLM · Prompt Engineering · Data-Driven Growth',
        cta: { type: 'primary', label: 'Request Access (申请访问)', roleId: 'solo-preneur', message: '我想申请访问小红书笔记增长引擎。', action: 'chatbot' },
      },
      {
        icon: '🧠',
        index: '03',
        title: 'P0-Driven Strategy OS (P0 驱动的个人战略系统)',
        subtitle: 'P0 驱动的个人执行系统',
        desc: '基于飞书多维表格的「战略指挥部」架构，实现 P0 任务的动态排序与精力分配的可视化管理。证明高阶人才的自律与系统化管理框架，确保优先级量化的标准化流程与执行稳定性。',
        tech: 'Feishu · Multi-Dimensional Table · Strategy Execution',
        cta: { type: 'primary', label: 'Request Access (申请访问)', roleId: 'solo-preneur', message: '我想申请访问 P0-Driven Strategy OS。', action: 'chatbot' },
      },
    ],
  },
  {
    id: 'developer-tools',
    labelEn: 'Developer Tools',
    labelCn: '开发者工具',
    desc: 'RAG、Agent、本地部署与代码工程工具。',
    cards: [
      {
        icon: '🧹',
        index: '01',
        title: 'RAG Data Ops Infrastructure (RAG 数据基建标准化)',
        subtitle: 'RAG 数据基建标准化 Pipeline',
        desc: '基于本地 Pipeline 架构，实现 PDF/Word 解析、Chunk 切分、语义分片与 QA 自动提取的标准化流程。输出 DeepSeek 可用 JSONL 训练集，实现知识库的快速构建与向量化，确保私有语料 RAG 化的精度与可复现性。',
        tech: 'Python · Streamlit · Semantic Chunking · QA Extraction',
        cta: { type: 'primary', label: 'Request Access (申请访问)', roleId: 'data-architect', message: '我想申请访问 RAG Data Ops Infrastructure。', action: 'chatbot' },
      },
      {
        icon: '⚙️',
        index: '02',
        title: 'Enterprise Narrative Engine (长文本自动化生成引擎)',
        subtitle: '长文本逻辑连贯性控制系统',
        desc: '基于状态机管理架构，实现长文本生成的逻辑一致性控制。通过状态转换规则与上下文记忆机制，确保多段落内容的连贯性与结构完整性，实现 10x 交付效率提升。支持算法验证与商业签约场景。',
        tech: 'State Machine · LLM · Context Management',
        cta: { type: 'primary', label: 'Request Access (申请访问)', roleId: 'data-architect', message: '我想申请访问 Enterprise Narrative Engine。', action: 'chatbot' },
      },
      {
        icon: '🦞',
        index: '03',
        title: 'OpenClaw Agent Deployment Package (OpenClaw 智能体部署包)',
        subtitle: '本地智能体部署标准化方案',
        desc: '基于 OpenClaw 开源架构，实现文件操作、代码任务与 Agent 编排的本地部署标准化流程。打造 24/7 自动化任务执行的私人 AI 助理原型，确保部署架构的可扩展性。',
        tech: 'OpenClaw · Agent · Local Deploy',
        cta: { type: 'outline', label: 'Architecture Details (架构详情)', message: '我想了解 OpenClaw 智能体部署包的架构与演示。', action: 'chatbot' },
      },
    ],
  },
];
