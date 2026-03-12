
export const PHYSICS_CONFIG = {
  GRAVITY: 0.08,
  AIR_FRICTION: 0.07, // 类似水下的阻力
  REPELL_STRENGTH: 0.006,
  REPELL_RADIUS: 300,
  COLLAPSE_DELAY: 2500, // 初始排列展示时间
};

export interface Section {
  id: string;
  title: string; // 英文标题
  titleCn: string; // 中文副标题
  type: 'AGENT' | 'APP' | 'BLOG';
  tag?: string; // 显示标签
  description: string;
  badge?: string;
  icon?: string;
}

export const SECTIONS: Section[] = [
  {
    id: 'agents',
    title: 'STRATEGIC CONSULTING',
    titleCn: '战略咨询 / 架构顾问',
    type: 'AGENT',
    tag: 'STRATEGIC CONSULTING',
    description: '面向企业的数据架构与 AI 集成咨询线。提供 DataOps 架构审计、RAG 知识引擎设计、自动化数据工程与技术 ROI 决策审计等高价值服务。',
    badge: '🧠 高价值咨询',
    icon: '🤖'
  },
  {
    id: 'apps',
    title: 'SOLUTIONS & PROTOTYPES',
    titleCn: '解决方案与原型',
    type: 'APP',
    tag: 'SOLUTIONS & PROTOTYPES',
    description: '基于垂直行业痛点，RAG 与 Agent 编排构建的生产力工具实验场。Enterprise Data、Strategic Methodology 与 Developer Tools 三条产品线相互印证架构设计与落地效果。',
    badge: '🛠️ 持续更新',
    icon: '🛠️'
  },
  {
    id: 'blog',
    title: 'ENGINEERING LOG',
    titleCn: '工程日志 / 博客',
    type: 'BLOG',
    tag: 'ENGINEERING LOG',
    description: '数据架构与技术设计、战略方法论与实践复盘。从 ETL 架构到 RAG 精度工程，再到数字资产系统的演进记录。',
    badge: '📝 精选文章',
    icon: '📓'
  }
];
