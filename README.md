# LChuck Studio - Personal Portfolio

个人作品集与创作空间，一个融合物理引擎交互与 3D 视觉效果的现代化个人网站。

## ✨ 特性

- **物理引擎交互** - 基于 Matter.js 实现的物理系统，元素随鼠标移动产生真实的排斥效果
- **3D 粒子背景** - 使用 Three.js 构建的动态粒子系统，营造沉浸式视觉体验
- **响应式设计** - 完美适配各种屏幕尺寸，从移动设备到桌面显示器
- **打字机动画** - 优雅的文字逐字显示效果，增强视觉吸引力
- **流畅滚动** - 支持页面滚动，物理元素随页面正确移动
- **现代化 UI** - 黑色主题配合红色强调色，科技感十足

## 🎯 主要内容

网站包含三个主要分类：

- **🤖 Agent Collection** - 智能代理集合：展示 AI Agent、工作流自动化、智能决策等创新应用
- **📱 App Collection** - 应用项目集合：包括 Web 应用、移动应用、桌面工具等各类产品与解决方案
- **📝 Blog Articles** - 博客文章：技术分享与思考，记录学习历程、项目经验、技术洞察与行业观察

## 🛠️ 技术栈

- **前端框架**: React 19.2.3
- **构建工具**: Vite 6.2.0
- **语言**: TypeScript 5.8.2
- **物理引擎**: Matter.js 0.20.0
- **3D 图形**: Three.js 0.173.0
- **样式**: Tailwind CSS (CDN)

## 📁 项目结构

```
lchuck-studio/
├── components/          # React 组件
│   ├── PhysicsSystem.tsx    # 物理系统核心
│   ├── PhysicsNode.tsx      # 物理节点组件
│   └── ThreeBackground.tsx  # 3D 粒子背景
├── constants.ts        # 配置和常量
├── App.tsx             # 主应用组件
├── index.tsx           # 应用入口
├── index.html          # HTML 模板
└── vite.config.ts      # Vite 配置
```

## 🚀 快速开始

### 前置要求

- Node.js (推荐 v18 或更高版本)
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

开发服务器将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录

### 预览生产构建

```bash
npm run preview
```

## 🎨 核心功能说明

### 物理引擎系统

- 使用 Matter.js 创建物理世界
- 元素初始悬浮，2.5 秒后受重力影响
- 鼠标靠近时产生排斥力，营造交互感
- 边界自动适配可滚动内容区域

### 3D 粒子背景

- 8000 个粒子组成的动态背景
- 粒子随鼠标移动产生视差效果
- 红色高亮粒子随机分布，增强视觉层次

### 响应式布局

- 卡片大小根据屏幕宽度动态计算
- 文字大小使用响应式单位（vw, rem）
- 支持最小宽度保护，防止布局崩溃

## 📝 开发说明

### 修改内容

编辑 `constants.ts` 中的 `SECTIONS` 数组来修改分类内容：

```typescript
export const SECTIONS: Section[] = [
  {
    id: 'agents',
    title: 'Agent Collection',
    titleCn: '智能代理集合',
    type: 'AGENT',
    description: '...',
    icon: '🤖'
  },
  // ...
];
```

### 调整物理参数

在 `constants.ts` 中修改 `PHYSICS_CONFIG`：

```typescript
export const PHYSICS_CONFIG = {
  GRAVITY: 0.08,           // 重力强度
  AIR_FRICTION: 0.07,      // 空气阻力
  REPELL_STRENGTH: 0.006,  // 排斥力强度
  REPELL_RADIUS: 300,      // 排斥半径
  COLLAPSE_DELAY: 2500,    // 初始悬浮时间（毫秒）
};
```

## 🌐 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 📄 许可证

本项目为个人作品集项目。

## 👤 作者

LChuck Studio

---

**Build 2026** | Personal Portfolio & Creative Workspace
