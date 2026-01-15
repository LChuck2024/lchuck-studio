
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
  
  // 动态计算卡片尺寸（确保不超出窗口）
  const minSideMargin = 10; // 最小边距
  const minCardGap = 8; // 最小卡片间距
  const minCardWidth = 150; // 最小卡片宽度
  
  // 计算可用宽度（预留最小边距）
  const availableWidth = width - minSideMargin * 2;
  
  // 计算卡片宽度和间距
  // 确保：3 * cardWidth + 2 * cardGap <= availableWidth
  let cardWidth, cardGap;
  if (availableWidth < minCardWidth * 3 + minCardGap * 2) {
    // 窗口太窄，使用最小尺寸
    cardWidth = Math.floor((availableWidth - minCardGap * 2) / 3);
    cardGap = minCardGap;
  } else {
    // 正常情况，计算合适的尺寸
    const maxCardWidth = Math.min(480, Math.floor(availableWidth / 3.5)); // 最大宽度限制
    cardGap = Math.max(minCardGap, Math.min(60, Math.floor(availableWidth * 0.02)));
    const totalGap = cardGap * 2;
    const calculatedWidth = Math.floor((availableWidth - totalGap) / 3);
    cardWidth = Math.max(minCardWidth, Math.min(calculatedWidth, maxCardWidth));
  }
  
  // 动态计算卡片高度，根据卡片宽度和内容需求
  // 由于文字可以换行，需要更高的卡片来容纳内容
  // 根据卡片宽度动态调整高度比例，确保有足够空间显示换行后的文字
  let heightRatio;
  if (cardWidth < 200) {
    heightRatio = 1.0; // 很窄的卡片需要更高，因为文字会换行更多
  } else if (cardWidth < 250) {
    heightRatio = 0.9;
  } else if (cardWidth < 350) {
    heightRatio = 0.75;
  } else {
    heightRatio = 0.65; // 正常宽度也需要更高，因为文字换行
  }
  const cardHeight = Math.floor(cardWidth * heightRatio);
  
  // 计算实际使用的总宽度和边距，确保居中且不超出
  const actualTotalWidth = cardWidth * 3 + cardGap * 2;
  const actualSideMargin = Math.max(minSideMargin, (width - actualTotalWidth) / 2);
  
  // 动态计算主标题位置（基于窗口高度）
  // 大窗口时，标题应该在中心偏上位置；小窗口时，标题应该在顶部附近
  const titleY = height < 800 
    ? Math.min(centerY - 120, height * 0.35) 
    : Math.max(centerY - 120, height * 0.25); // 大窗口时，标题位置更靠上一些
  
  // 计算主标题实际占用的总高度
  // titleY 是 PhysicsNode 的中心点，PhysicsNode 高度是 180px
  // 所以 PhysicsNode 的底部是 titleY + 90
  // 但副标题在 PhysicsNode 内部，需要加上副标题的实际高度
  const titleNodeHeight = 180; // PhysicsNode 的高度
  const titleNodeBottom = titleY + titleNodeHeight / 2; // PhysicsNode 的底部位置
  
  // 估算副标题区域的实际高度（包括两个副标题和它们之间的间距）
  // 英文副标题大约 20-30px，中文副标题大约 25-35px，加上间距约 20-30px
  const subtitleHeight = height < 800 ? 70 : 90; // 大窗口时副标题更大
  
  // 标题区域的真正底部 = PhysicsNode 底部 + 副标题超出部分
  // 由于副标题在 PhysicsNode 内部，实际底部需要考虑副标题的实际位置
  // 从代码看，副标题有 mt-4 sm:mt-6，所以实际底部应该是 titleNodeBottom + 副标题高度
  const titleActualBottom = titleNodeBottom + subtitleHeight;
  
  // 动态计算卡片位置，确保不覆盖标题和副标题
  // 标题底部 + 足够的间距（大窗口时增加间距）
  const minSpacing = height < 800 ? 120 : 180; // 大窗口时增加间距，确保不覆盖
  const cardY = titleActualBottom + minSpacing;
  
  // 小窗口时，确保卡片不超出窗口底部
  const finalCardY = height < 800 
    ? Math.min(cardY, height - cardHeight - 100) // 小窗口：确保不超出底部
    : cardY; // 大窗口：使用计算出的位置
  
  // 计算内容所需的最小高度（用于滚动）- 使用动态计算的卡片高度
  const minContentHeight = finalCardY + cardHeight + 200; // 卡片y位置 + 卡片高度 + 底部边距

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
        <PhysicsNode id="logo-branding" x={centerX} y={80} w={Math.min(width * 0.9, 350)} h={60} depth={150}>
          <div className="flex items-center justify-center gap-2 sm:gap-3 px-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-600 rotate-45 border border-red-400"></div>
            <span className="text-[1.8vw] sm:text-[1.2vw] md:text-xs lg:text-sm font-bold mono tracking-[0.2em] sm:tracking-[0.4em] text-white/50 uppercase whitespace-nowrap">
              <Typewriter text="Personal Workspace" speed={100} delay={500} showCursor={false} />
            </span>
          </div>
        </PhysicsNode>

        {/* 主标题 (Hero Section) */}
        <PhysicsNode id="hero-title" x={centerX} y={titleY} w={Math.min(width * 0.95, 1000)} h={180} depth={250}>
          <div className="text-center select-none w-full px-2 sm:px-4">
            <h2 className="text-[8vw] sm:text-[10vw] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black tracking-tighter italic leading-none flex items-center justify-center gap-2 sm:gap-3 md:gap-4 whitespace-nowrap">
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
            <div className="mt-4 sm:mt-6 px-2">
              <Typewriter 
                text="Personal Portfolio & Creative Workspace" 
                speed={30} 
                delay={1800} 
                className="mono text-[1.5vw] sm:text-[1vw] md:text-[10px] lg:text-[12px] xl:text-[14px] tracking-[0.3em] sm:tracking-[0.8em] text-white/20 uppercase font-light whitespace-nowrap"
                showCursor={false}
              />
            </div>
            <div className="mt-2 sm:mt-3 px-2">
              <Typewriter 
                text="个人作品集与创作空间" 
                speed={40} 
                delay={3200} 
                className="mono text-[1.8vw] sm:text-[1.3vw] md:text-[14px] lg:text-[16px] xl:text-[18px] tracking-[0.3em] sm:tracking-[0.8em] text-white/20 uppercase font-light whitespace-nowrap"
                showCursor={false}
              />
            </div>
          </div>
        </PhysicsNode>

        {/* 主要分类展示 */}
        {SECTIONS.map((section, i) => {
          // 使用顶部计算的卡片尺寸和位置（确保一致性）
          // 计算每个卡片的位置（居中显示，确保不超出窗口）
          const cardSpacing = cardWidth + cardGap; // 卡片中心点之间的间距
          const startX = actualSideMargin + cardWidth / 2; // 第一个卡片中心点x坐标（从实际边距开始）
          const x = startX + i * cardSpacing; // 每个卡片的x坐标
          
          // 验证卡片不会超出窗口边界
          const cardLeft = x - cardWidth / 2;
          const cardRight = x + cardWidth / 2;
          const clampedX = Math.max(cardWidth / 2 + 10, Math.min(width - cardWidth / 2 - 10, x)); // 确保卡片在窗口内，保留10px边距

          return (
            <PhysicsNode key={section.id} id={section.id} x={clampedX} y={finalCardY} w={cardWidth} h={cardHeight} depth={sectionDepths[i]}>
              <div className="w-full h-full p-3 sm:p-4 md:p-5 lg:p-6 bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-sm group hover:border-red-600/60 transition-all duration-700 flex flex-col justify-between cursor-pointer overflow-hidden">
                <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                  <div className="flex justify-between items-start mb-2 sm:mb-3 flex-shrink-0">
                    <span className="text-[1.6vw] sm:text-[1.2vw] md:text-[10px] lg:text-xs mono text-red-600 font-bold tracking-[0.1em]">{section.type}</span>
                    {section.icon && (
                      <span className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0">{section.icon}</span>
                    )}
                  </div>
                  <div className="mb-2 sm:mb-3 flex-shrink-0">
                    <h3 className="text-[3vw] sm:text-[2.5vw] md:text-lg lg:text-xl xl:text-2xl font-black tracking-tight group-hover:text-red-600 transition-colors uppercase leading-tight break-words line-clamp-2">{section.title}</h3>
                    <p className="text-[1.6vw] sm:text-[1.3vw] md:text-[9px] lg:text-[10px] xl:text-xs text-white/50 mt-0.5 sm:mt-1 font-light italic break-words line-clamp-2">{section.titleCn}</p>
                  </div>
                  <p className="text-[1.6vw] sm:text-[1.4vw] md:text-[10px] lg:text-xs xl:text-sm text-white/60 mt-1 sm:mt-2 md:mt-3 font-medium leading-relaxed break-words overflow-y-auto flex-1 min-h-0">{section.description}</p>
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
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-[1.5vw] sm:text-[1.2vw] md:text-[9px] mono text-white/20 font-bold tracking-[0.3em] uppercase">
          <div className="w-6 sm:w-8 md:w-10 h-[1px] bg-red-600"></div>
          <span>LChuck Studio // Build 2026</span>
        </div>
      </div>

      <div className="fixed bottom-4 sm:bottom-6 md:bottom-10 left-4 sm:left-6 md:left-10 z-[100] pointer-events-none mono text-[1.5vw] sm:text-[1.2vw] md:text-[9px] text-white/20 space-y-1 sm:space-y-1.5 uppercase tracking-widest">
        <div>Operator: <span className="text-white/40">LCHUCK</span></div>
        <div>Physics_State: <span className="text-red-600 animate-pulse">Float_Active</span></div>
      </div>

      <div className="fixed bottom-4 sm:bottom-6 md:bottom-10 right-4 sm:right-6 md:right-10 z-[100] pointer-events-none mono text-[1.5vw] sm:text-[1.2vw] md:text-[9px] text-white/20 text-right uppercase tracking-widest leading-relaxed">
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
