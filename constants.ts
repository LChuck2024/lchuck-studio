
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
    title: 'DIGITAL WORKFORCE',
    titleCn: '数字员工 / 智能代理',
    type: 'AGENT',
    tag: 'DIGITAL WORKFORCE',
    description: '24/7 待命的 AI 数字员工。欧洲留学顾问、MBA 写作教练、数据架构师、一人公司顾问。免费查询、技术点拨、深度咨询。',
    badge: '🟢 在线运行',
    icon: '🤖'
  },
  {
    id: 'apps',
    title: 'SOLUTIONS & PROTOTYPES',
    titleCn: '解决方案与原型',
    type: 'APP',
    tag: 'SOLUTIONS & PROTOTYPES',
    description: '基于垂直行业痛点，RAG 与 Agent 编排构建的生产力工具实验场。企业数据、个人成长、开发者工具。',
    badge: '🛠️ 持续更新',
    icon: '🛠️'
  },
  {
    id: 'blog',
    title: 'ENGINEERING LOG',
    titleCn: '工程日志 / 博客',
    type: 'BLOG',
    tag: 'ENGINEERING LOG',
    description: '拒绝伪勤奋。ETL 架构演进、一人公司实录、P0 精力管理、主数据治理。技术复盘与深度思考。',
    badge: '📝 深度复盘',
    icon: '📓'
  }
];
