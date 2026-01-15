import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThreeBackground } from './components/ThreeBackground';
import { Logo } from './components/Logo';
import { NavigationTabs } from './components/NavigationTabs';
import { Home } from './pages/Home';
import { Apps } from './pages/Apps';
import { Agents } from './pages/Agents';
import { Blog } from './pages/Blog';

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
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="w-screen min-h-screen bg-black overflow-x-hidden overflow-y-auto relative">
        {/* Three.js 实时粒子背景 - 放在 Router 外，确保不重载 */}
        <ThreeBackground />
        
        {/* Logo - 支持动画效果 */}
        <Logo />

        {/* 系统导航标签页 */}
        <NavigationTabs />

        {/* 页面内容 - 带淡入淡出动画 */}
        <AnimatedRoutes />

        {/* HUD 界面 (Fixed elements) - 包含标题和导航 */}
        <div className="fixed top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 z-[100] pointer-events-none">
          <div className="flex items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* 标题部分 */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-[1.5vw] sm:text-[1.2vw] md:text-[9px] mono text-white/20 font-bold tracking-[0.3em] uppercase">
              <div className="w-6 sm:w-8 md:w-5 h-[1px] bg-red-600"></div>
              <span>LChuck Studio</span>
            </div>
            
            {/* 导航标签页 */}
            <div className="pointer-events-auto">
              <NavigationTabs />
            </div>
          </div>
        </div>

        <div className="fixed bottom-4 sm:bottom-6 md:bottom-10 left-4 sm:left-6 md:left-10 z-[100] pointer-events-none mono text-[1.5vw] sm:text-[1.2vw] md:text-[9px] text-white/20 space-y-1 sm:space-y-1.5 uppercase tracking-widest">
          <div>Operator: <span className="text-white/40">LCHUCK</span></div>
          <div>Physics_State: <span className="text-red-600 animate-pulse">Float_Active</span></div>
        </div>

        <div className="fixed bottom-4 sm:bottom-6 md:bottom-10 right-4 sm:right-6 md:right-10 z-[100] pointer-events-none mono text-[1.5vw] sm:text-[1.2vw] md:text-[9px] text-white/20 text-right uppercase tracking-widest leading-relaxed">
          <div>Spatial Interaction Enabled</div>
          <div>Intertia Damping: 0.07</div>
          <div className="text-white/40">{typeof window !== 'undefined' ? `${window.innerWidth}PX x ${window.innerHeight}PX` : '1920PX x 1080PX'}</div>
        </div>

        {/* 环境光效 */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.9)_100%)] z-40"></div>
      </div>
    </BrowserRouter>
  );
};

export default App;
