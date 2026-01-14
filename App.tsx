
import React, { useState, useEffect, useMemo } from 'react';
import { PhysicsSystem, PhysicsNode } from './components/PhysicsSystem';
import { ThreeBackground } from './components/ThreeBackground';
import { SECTIONS } from './constants';

const Typewriter: React.FC<{ 
  text: string; 
  speed?: number; 
  delay?: number; 
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
}> = ({ text, speed = 50, delay = 0, onComplete, className = "", showCursor = true }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let timeout: number;
    let charIndex = 0;

    const startTyping = () => {
      const type = () => {
        if (charIndex <= text.length) {
          setDisplayedText(text.slice(0, charIndex));
          charIndex++;
          timeout = window.setTimeout(type, speed);
        } else {
          setIsFinished(true);
          if (onComplete) onComplete();
        }
      };
      type();
    };

    const initialDelay = window.setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeout);
      clearTimeout(initialDelay);
    };
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isFinished && (
        <span className="animate-pulse text-red-600 ml-1">|</span>
      )}
    </span>
  );
};

const App: React.FC = () => {
  const [dimensions, setDimensions] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width, height } = dimensions;
  const centerX = width / 2;
  const centerY = height / 2;
  
  // 动态计算卡片尺寸（与渲染循环中的计算保持一致）
  const sideMargin = 120;
  const cardGap = 60;
  const availableWidth = width - sideMargin * 2;
  const totalGap = cardGap * 2;
  const calculatedWidth = Math.floor((availableWidth - totalGap) / 3);
  const maxCardWidth = 480;
  const minCardWidth = 200;
  const cardWidth = Math.max(minCardWidth, Math.min(calculatedWidth, maxCardWidth));
  const cardHeight = Math.floor(cardWidth * 0.58);
  
  // 计算内容所需的最小高度（用于滚动）- 使用动态计算的卡片高度
  const minContentHeight = centerY + 260 + cardHeight + 200; // 卡片y位置 + 卡片高度 + 底部边距

  // 使用 useMemo 稳定随机值，避免每次渲染都变化
  const sectionDepths = useMemo(() => 
    SECTIONS.map(() => Math.random() * 100),
    [] // 只在组件挂载时生成一次
  );

  // 使用初始尺寸生成装饰性碎片，避免窗口大小改变时重新生成
  const decorativeScraps = useMemo(() => {
    const initialWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const initialHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
    return Array.from({ length: 16 }, (_, i) => ({
      id: `scrap-${i}`,
      x: Math.random() * initialWidth,
      y: Math.random() * initialHeight,
      w: Math.random() * 60 + 20,
      depth: -400
    }));
  }, []); // 只在组件挂载时生成一次

  return (
    <div 
      className="w-screen bg-black overflow-x-hidden overflow-y-auto relative"
      style={{ minHeight: `${minContentHeight}px` }}
    >
      {/* Three.js 实时粒子背景 */}
      <ThreeBackground />
      
      <PhysicsSystem>
        {/* 顶部标识 (Logo Area) */}
        <PhysicsNode id="logo-branding" x={centerX} y={80} w={350} h={60} depth={150}>
          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 bg-red-600 rotate-45 border border-red-400"></div>
            <span className="text-[10px] sm:text-xs md:text-sm font-bold mono tracking-[0.4em] text-white/50 uppercase">
              <Typewriter text="Personal Workspace" speed={100} delay={500} showCursor={false} />
            </span>
          </div>
        </PhysicsNode>

        {/* 主标题 (Hero Section) */}
        <PhysicsNode id="hero-title" x={centerX} y={centerY - 120} w={1000} h={180} depth={250}>
          <div className="text-center select-none">
            <h2 className="text-[15vw] lg:text-[12rem] font-black tracking-tighter italic leading-none flex items-center justify-center gap-4">
              <Typewriter 
                text="LCHUCK" 
                speed={120} 
                className="text-white"
              />
              <Typewriter 
                text="STUDIO" 
                speed={120} 
                delay={800} 
                className="text-red-600"
              />
            </h2>
            <div className="mt-6">
              <Typewriter 
                text="Personal Portfolio & Creative Workspace" 
                speed={30} 
                delay={1800} 
                className="mono text-[8px] sm:text-[10px] md:text-[12px] tracking-[0.8em] text-white/20 uppercase font-light"
                showCursor={false}
              />
            </div>
            <div className="mt-3">
              <Typewriter 
                text="个人作品集与创作空间" 
                speed={40} 
                delay={3200} 
                className="mono text-[10px] sm:text-[12px] md:text-[16px] lg:text-[18px] tracking-[0.8em] text-white/20 uppercase font-light"
                showCursor={false}
              />
            </div>
          </div>
        </PhysicsNode>

        {/* 主要分类展示 */}
        {SECTIONS.map((section, i) => {
          // 根据页面宽度动态计算卡片大小和间距
          const sideMargin = 120; // 左右边距（增加以缩小卡片）
          const cardGap = 60; // 卡片之间的间距（增加以缩小卡片）
          const availableWidth = width - sideMargin * 2; // 可用宽度
          const totalGap = cardGap * 2; // 两个间距
          const calculatedWidth = Math.floor((availableWidth - totalGap) / 3); // 计算出的卡片宽度
          const maxCardWidth = 480; // 最大卡片宽度限制
          const minCardWidth = 200; // 最小卡片宽度限制，防止负值
          const cardWidth = Math.max(minCardWidth, Math.min(calculatedWidth, maxCardWidth)); // 确保在合理范围内
          const cardHeight = Math.floor(cardWidth * 0.58); // 高度按宽度比例计算
          
          // 计算每个卡片的位置（居中显示）
          const cardSpacing = cardWidth + cardGap; // 卡片中心点之间的间距
          const totalCardsWidth = cardWidth * 3 + cardGap * 2; // 三个卡片总宽度
          const startX = centerX - totalCardsWidth / 2 + cardWidth / 2; // 第一个卡片中心点x坐标
          const x = startX + i * cardSpacing; // 每个卡片的x坐标
          const y = centerY + 260; // 所有卡片在同一行

          return (
            <PhysicsNode key={section.id} id={section.id} x={x} y={y} w={cardWidth} h={cardHeight} depth={sectionDepths[i]}>
              <div className="w-full h-full p-6 sm:p-8 md:p-10 lg:p-12 bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-sm group hover:border-red-600/60 transition-all duration-700 flex flex-col justify-between cursor-pointer">
                <div>
                  <div className="flex justify-between items-start mb-4 sm:mb-5 md:mb-7">
                    <span className="text-[10px] sm:text-xs md:text-sm mono text-red-600 font-bold tracking-[0.2em]">{section.type}</span>
                    {section.icon && (
                      <span className="text-xl sm:text-2xl md:text-3xl opacity-60 group-hover:opacity-100 transition-opacity">{section.icon}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight group-hover:text-red-600 transition-colors uppercase leading-none">{section.title}</h3>
                    <p className="text-[10px] sm:text-xs md:text-sm text-white/50 mt-1 sm:mt-2 font-light italic">{section.titleCn}</p>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-white/40 mt-3 sm:mt-4 md:mt-5 font-medium leading-relaxed max-w-[90%]">{section.description}</p>
                </div>
                <div className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 border-t border-white/5 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-red-600 rounded-full group-hover:animate-ping"></div>
                </div>
              </div>
            </PhysicsNode>
          );
        })}

        {/* 装饰性物理碎片 (Decorative Scraps) */}
        {decorativeScraps.map((scrap) => (
          <PhysicsNode 
            key={scrap.id} 
            id={scrap.id} 
            x={scrap.x} 
            y={scrap.y} 
            w={scrap.w} 
            h={1} 
            depth={scrap.depth}
          >
            <div className="w-full h-full bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]"></div>
          </PhysicsNode>
        ))}
      </PhysicsSystem>

      {/* HUD 界面 (Fixed elements) */}
      <div className="fixed top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 z-[100] pointer-events-none">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-[7px] sm:text-[8px] md:text-[9px] mono text-white/20 font-bold tracking-[0.3em] uppercase">
          <div className="w-6 sm:w-8 md:w-10 h-[1px] bg-red-600"></div>
          <span>LChuck Studio // Build 2026</span>
        </div>
      </div>

      <div className="fixed bottom-4 sm:bottom-6 md:bottom-10 left-4 sm:left-6 md:left-10 z-[100] pointer-events-none mono text-[7px] sm:text-[8px] md:text-[9px] text-white/20 space-y-1 sm:space-y-1.5 uppercase tracking-widest">
        <div>Operator: <span className="text-white/40">LCHUCK</span></div>
        <div>Physics_State: <span className="text-red-600 animate-pulse">Float_Active</span></div>
      </div>

      <div className="fixed bottom-4 sm:bottom-6 md:bottom-10 right-4 sm:right-6 md:right-10 z-[100] pointer-events-none mono text-[7px] sm:text-[8px] md:text-[9px] text-white/20 text-right uppercase tracking-widest leading-relaxed">
        <div>Spatial Interaction Enabled</div>
        <div>Intertia Damping: 0.07</div>
        <div className="text-white/40">{width}PX x {height}PX</div>
      </div>

      {/* 环境光效 */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.9)_100%)] z-40"></div>
    </div>
  );
};

export default App;
