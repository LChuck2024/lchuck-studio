import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhysicsSystem, PhysicsNode } from '../components/PhysicsSystem';
import { SECTIONS } from '../constants';

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
    setIsFinished(false);
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

export const Home: React.FC = () => {
  const navigate = useNavigate();
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
  const isMobile = width < 768;
  
  // 动态计算卡片尺寸
  const minSideMargin = 16;
  const minCardGap = 8;
  const minCardWidth = 150;
  const availableWidth = width - minSideMargin * 2;
  
  let cardWidth, cardGap;
  if (isMobile) {
    // 移动端：单列，卡片占满宽度，间距加大
    cardWidth = availableWidth;
    cardGap = 32;
  } else if (availableWidth < minCardWidth * 3 + minCardGap * 2) {
    cardWidth = Math.floor((availableWidth - minCardGap * 2) / 3);
    cardGap = minCardGap;
  } else {
    const maxCardWidth = Math.min(480, Math.floor(availableWidth / 3.5));
    cardGap = Math.max(minCardGap, Math.min(60, Math.floor(availableWidth * 0.02)));
    const totalGap = cardGap * 2;
    const calculatedWidth = Math.floor((availableWidth - totalGap) / 3);
    cardWidth = Math.max(minCardWidth, Math.min(calculatedWidth, maxCardWidth));
  }
  
  let heightRatio;
  if (isMobile) {
    heightRatio = 0.82; // 移动端足够高度，确保描述完整显示
  } else if (cardWidth < 200) {
    heightRatio = 0.85;
  } else if (cardWidth < 250) {
    heightRatio = 0.72;
  } else if (cardWidth < 350) {
    heightRatio = 0.65;
  } else {
    heightRatio = 0.58;
  }
  const cardHeight = Math.floor(cardWidth * heightRatio);
  
  const actualTotalWidth = isMobile ? cardWidth : cardWidth * 3 + cardGap * 2;
  const actualSideMargin = Math.max(minSideMargin, (width - actualTotalWidth) / 2);
  
  // 主页 Logo 在中心偏上，副标题在 Logo 下方
  const logoTop = height * 0.15;
  const logoHeight = isMobile ? 120 : 180;
  const logoBottom = logoTop + logoHeight;
  const subtitleY = logoBottom + (isMobile ? 60 : 100);
  
  // 计算卡片位置 - 移动端加大间距，避免卡片覆盖副标题
  const subtitleHeight = isMobile ? 100 : (height < 800 ? 120 : 160);
  const minSpacing = isMobile ? 140 : (height < 800 ? 120 : 180); // 移动端 140px 确保卡片在副标题下方
  const firstCardY = subtitleY + subtitleHeight / 2 + minSpacing;

  const sectionDepths = useMemo(() => 
    SECTIONS.map(() => Math.random() * 100),
    []
  );

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
  }, []);

  const totalCardsHeight = isMobile 
    ? 3 * cardHeight + 2 * cardGap 
    : cardHeight;
  const containerMinHeight = firstCardY + totalCardsHeight + 180;

  return (
    <div className="w-full min-h-screen relative px-4 pb-36 md:pb-24" style={{ minHeight: `${containerMinHeight}px` }}>
      <PhysicsSystem>
        {/* 副标题区域 - 在 Logo 下方 */}
        <PhysicsNode id="subtitle" x={centerX} y={subtitleY} w={Math.min(width * 0.95, 1000)} h={subtitleHeight} depth={200} className="z-20">
          <div className="text-center select-none w-full px-2 sm:px-4">
            <div className="mt-2 sm:mt-6 px-2">
              <Typewriter 
                text="数据架构 · 自动化 · 超级个体" 
                speed={60} 
                delay={1800} 
                className="mono text-xs sm:text-[1vw] md:text-[10px] lg:text-[12px] xl:text-[14px] tracking-[0.3em] sm:tracking-[0.5em] text-gray-400 font-bold"
                showCursor={false}
              />
            </div>
            <div className="mt-2 sm:mt-3 px-2 flex flex-col items-center gap-1">
              <Typewriter 
                text="Turning messy data into profitable assets." 
                speed={30} 
                delay={3000} 
                className="mono text-[10px] sm:text-[1vw] md:text-[10px] lg:text-[11px] xl:text-[12px] tracking-[0.1em] text-gray-400/80 italic font-light"
                showCursor={false}
              />
               <Typewriter 
                text="拒绝低效内卷，用架构思维和代码，构建你的自动化资产。" 
                speed={50} 
                delay={4200} 
                className="text-sm sm:text-[1.5vw] md:text-[14px] lg:text-[16px] xl:text-[18px] tracking-[0.1em] text-gray-800 font-bold mt-1 text-center max-w-md mx-auto"
                showCursor={false}
              />
            </div>
          </div>
        </PhysicsNode>

      {/* 主要分类展示 - 移动端垂直堆叠，桌面端横向 */}
      {SECTIONS.map((section, i) => {
        const cardSpacing = cardWidth + cardGap;
        const x = isMobile ? centerX : actualSideMargin + cardWidth / 2 + i * cardSpacing;
        const clampedX = Math.max(cardWidth / 2 + 10, Math.min(width - cardWidth / 2 - 10, x));
        const cardY = isMobile ? firstCardY + i * (cardHeight + cardGap) : firstCardY;

        return (
          <PhysicsNode key={section.id} id={section.id} x={clampedX} y={cardY} w={cardWidth} h={cardHeight} depth={sectionDepths[i]}>
            <div 
              className="w-full h-full p-3 sm:p-4 md:p-5 lg:p-6 bg-gray-100/50 border border-gray-300/50 backdrop-blur-2xl rounded-sm group hover:border-red-600/60 transition-all duration-700 flex flex-col justify-between cursor-pointer overflow-hidden relative"
              onClick={() => {
                if (section.type === 'AGENT') navigate('/agents');
                else if (section.type === 'APP') navigate('/apps');
                else if (section.type === 'BLOG') navigate('/blog');
              }}
            >
              {section.badge && (
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-sm text-[10px] sm:text-xs font-bold text-gray-800 shadow-sm border border-gray-200 flex items-center gap-1 z-10 pointer-events-none">
                  {section.badge}
                </div>
              )}
              
              <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                <div className="flex justify-between items-start mb-1 flex-shrink-0">
                  <span className="text-[10px] sm:text-[1.2vw] md:text-[10px] lg:text-xs mono text-red-600 font-bold tracking-[0.1em]">{section.tag || section.type}</span>
                </div>
                <div className="mb-2 sm:mb-3 flex-shrink-0 pr-12">
                  <h3 className="text-base sm:text-[2.5vw] md:text-lg lg:text-xl xl:text-2xl font-black tracking-tight text-gray-900 group-hover:text-red-600 transition-colors uppercase leading-tight break-words line-clamp-2">{section.title}</h3>
                  <p className="text-xs sm:text-[1.3vw] md:text-[12px] lg:text-[14px] font-bold text-gray-700 mt-1 break-words line-clamp-1 tracking-wide">{section.titleCn}</p>
                </div>
                <p className="text-xs sm:text-[1.4vw] md:text-[11px] lg:text-[13px] text-gray-500 mt-1 sm:mt-2 font-normal leading-relaxed break-words flex-1 min-h-[3em]">{section.description}</p>
              </div>
              <div className="pt-3 sm:pt-4 border-t border-gray-300/30 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-red-600 rounded-full group-hover:animate-ping"></div>
                {section.icon && (
                    <span className="text-base sm:text-lg opacity-60 group-hover:opacity-100 transition-opacity">{section.icon}</span>
                )}
              </div>
            </div>
          </PhysicsNode>
        );
      })}

      {/* 装饰性物理碎片 */}
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
          <div className="w-full h-full bg-gray-300/30 shadow-[0_0_15px_rgba(0,0,0,0.1)]"></div>
        </PhysicsNode>
      ))}
      </PhysicsSystem>
      
      <div className="relative mt-12 w-full px-4 text-center pointer-events-none opacity-50 z-0">
        <p className="text-[10px] sm:text-xs text-gray-400 font-light tracking-widest mono flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span>Designed by LChuck</span>
          <span className="hidden sm:inline">|</span>
          <span>前500强数据架构师</span>
          <span className="hidden sm:inline">|</span>
          <span>长期主义践行者</span>
        </p>
      </div>
    </div>
  );
};
