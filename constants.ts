
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
  description: string;
  icon?: string;
}

export const SECTIONS: Section[] = [
  {
    id: 'agents',
    title: 'Agent Collection',
    titleCn: '智能代理集合',
    type: 'AGENT',
    description: '探索智能代理与自动化系统，涵盖 AI Agent、工作流自动化、智能决策等创新应用。',
    icon: '🤖'
  },
  {
    id: 'apps',
    title: 'App Collection',
    titleCn: '应用项目集合',
    type: 'APP',
    description: '精选应用项目展示，包括 Web 应用、移动应用、桌面工具等各类产品与解决方案。',
    icon: '📱'
  },
  {
    id: 'blog',
    title: 'Blog Articles',
    titleCn: '博客文章',
    type: 'BLOG',
    description: '技术分享与思考，记录学习历程、项目经验、技术洞察与行业观察。',
    icon: '📝'
  }
];
