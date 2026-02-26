
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
    description: '包含 欧洲选课助手、RAG知识库清洗专家。让 AI 替你完成繁琐的决策与执行。',
    badge: '🟢 在线运行',
    icon: '🤖'
  },
  {
    id: 'apps',
    title: 'PRODUCT TOOLKIT',
    titleCn: '产品与工具箱',
    type: 'APP',
    tag: 'PRODUCT TOOLKIT',
    description: '开箱即用的提效工具。包含 Excel/PDF 自动化脚本、数据清洗 SaaS。',
    badge: '🛠️ 持续更新',
    icon: '🛠️'
  },
  {
    id: 'blog',
    title: 'ENGINEERING LOG',
    titleCn: '工程日志 / 博客',
    type: 'BLOG',
    tag: 'ENGINEERING LOG',
    description: '记录从 0 到 1 的一人公司构建实录。技术、增长与生存策略。',
    badge: '📝 深度复盘',
    icon: '📓'
  }
];
