import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThreeBackground } from './components/ThreeBackground';
import { Logo } from './components/Logo';
import { NavigationTabs } from './components/NavigationTabs';
import { ChatbotWidget } from './components/ChatbotWidget';
import { Home } from './pages/Home';
import { Apps } from './pages/Apps';
import { Agents } from './pages/Agents';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* 使用 body 作为滚动容器，避免 iOS 上 div overflow 滚动失效 */}
      <div className="w-full min-h-screen overflow-x-hidden relative">
        {/* Three.js 粒子背景 - 需在 bg 之上，故不用负 z-index */}
        <ThreeBackground />
        
        {/* Logo - 支持动画效果 */}
        <Logo />

        {/* 页面内容 - 带淡入淡出动画 */}
        <AnimatedRoutes />

        {/* HUD 界面 (Fixed elements) - 移动端垂直堆叠，桌面端横向 */}
        <div className="fixed top-3 sm:top-6 md:top-10 left-4 right-4 sm:left-6 sm:right-auto md:left-10 z-[100] pointer-events-none px-2">
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-12 lg:gap-16">
            {/* 标题部分 */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-[1.2vw] md:text-[9px] mono text-gray-400 font-bold tracking-[0.3em] uppercase">
              <div className="w-4 sm:w-8 md:w-5 h-[1px] bg-red-600"></div>
              <span>LChuck Studio</span>
            </div>
            
            {/* 导航标签页 - 移动端隐藏，卡片即导航 */}
            <div className="hidden md:flex pointer-events-auto flex-nowrap">
              <NavigationTabs />
            </div>
          </div>
        </div>

        {/* 底部左侧 HUD - 移动端隐藏避免重叠 */}
        <div className="hidden sm:block fixed bottom-6 md:bottom-10 left-6 md:left-10 z-[100] pointer-events-none mono text-[10px] sm:text-[1.2vw] md:text-[9px] text-gray-400 space-y-1.5 uppercase tracking-widest">
          <div>Operator: <span className="text-gray-600">LCHUCK</span></div>
          <div>Physics_State: <span className="text-red-600 animate-pulse">Float_Active</span></div>
        </div>

        {/* 底部右侧 HUD - 移动端隐藏避免重叠 */}
        <div className="hidden sm:block fixed bottom-6 md:bottom-10 right-6 md:right-10 z-[100] pointer-events-none mono text-[10px] sm:text-[1.2vw] md:text-[9px] text-gray-400 text-right uppercase tracking-widest leading-relaxed">
          <div className="hidden sm:block">Spatial Interaction Enabled</div>
          <div className="hidden sm:block">Intertia Damping: 0.07</div>
          <div className="text-gray-600">{typeof window !== 'undefined' ? `${window.innerWidth}PX x ${window.innerHeight}PX` : '1920PX x 1080PX'}</div>
        </div>

        {/* 浮窗客服 Widget - Intercom 风格 */}
        <ChatbotWidget />
      </div>
    </BrowserRouter>
  );
};

export default App;
