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
  const centerY = height / 2;
  
  // 动态计算卡片尺寸
  const minSideMargin = 10;
  const minCardGap = 8;
  const minCardWidth = 150;
  const availableWidth = width - minSideMargin * 2;
  
  let cardWidth, cardGap;
  if (availableWidth < minCardWidth * 3 + minCardGap * 2) {
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
  if (cardWidth < 200) {
    heightRatio = 0.85;
  } else if (cardWidth < 250) {
    heightRatio = 0.75;
  } else if (cardWidth < 350) {
    heightRatio = 0.65;
  } else {
    heightRatio = 0.55;
  }
  const cardHeight = Math.floor(cardWidth * heightRatio);
  
  const actualTotalWidth = cardWidth * 3 + cardGap * 2;
  const actualSideMargin = Math.max(minSideMargin, (width - actualTotalWidth) / 2);
  
  // 主页 Logo 在中心偏上，副标题在 Logo 下方
  // Logo 使用 fixed 定位在 30vh，需要计算对应的像素位置
  const logoTop = height * 0.3; // Logo 顶部位置（30vh）
  const logoHeight = 180; // 估算 Logo 高度
  const logoBottom = logoTop + logoHeight; // Logo 底部位置
  const subtitleY = logoBottom + 80; // 副标题在 Logo 下方 80px，确保不被覆盖
  
  // 计算卡片位置，在副标题下方
  const subtitleHeight = height < 800 ? 70 : 90;
  const minSpacing = height < 800 ? 120 : 180;
  const cardY = subtitleY + subtitleHeight / 2 + minSpacing;
  const finalCardY = height < 800 
    ? Math.min(cardY, height - cardHeight - 100)
    : cardY;

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

  return (
    <div className="w-screen min-h-screen relative" style={{ minHeight: `${finalCardY + cardHeight + 200}px` }}>
      <PhysicsSystem>
        {/* 副标题区域 - 在 Logo 下方 */}
        <PhysicsNode id="subtitle" x={centerX} y={subtitleY} w={Math.min(width * 0.95, 1000)} h={80} depth={200}>
          <div className="text-center select-none w-full px-2 sm:px-4">
            <div className="mt-4 sm:mt-6 px-2">
              <Typewriter 
                text="Personal Portfolio & Creative Workspace" 
                speed={30} 
                delay={1800} 
                className="mono text-[1.5vw] sm:text-[1vw] md:text-[10px] lg:text-[12px] xl:text-[14px] tracking-[0.3em] sm:tracking-[0.8em] text-gray-400 uppercase font-light whitespace-nowrap"
                showCursor={false}
              />
            </div>
            <div className="mt-2 sm:mt-3 px-2">
              <Typewriter 
                text="个人作品集与创作空间" 
                speed={40} 
                delay={3200} 
                className="mono text-[1.8vw] sm:text-[1.3vw] md:text-[14px] lg:text-[16px] xl:text-[18px] tracking-[0.3em] sm:tracking-[0.8em] text-gray-400 uppercase font-light whitespace-nowrap"
                showCursor={false}
              />
            </div>
          </div>
        </PhysicsNode>

      {/* 主要分类展示 */}
      {SECTIONS.map((section, i) => {
        const cardSpacing = cardWidth + cardGap;
        const startX = actualSideMargin + cardWidth / 2;
        const x = startX + i * cardSpacing;
        const clampedX = Math.max(cardWidth / 2 + 10, Math.min(width - cardWidth / 2 - 10, x));

        return (
          <PhysicsNode key={section.id} id={section.id} x={clampedX} y={finalCardY} w={cardWidth} h={cardHeight} depth={sectionDepths[i]}>
            <div 
              className="w-full h-full p-3 sm:p-4 md:p-5 lg:p-6 bg-gray-100/50 border border-gray-300/50 backdrop-blur-2xl rounded-sm group hover:border-red-600/60 transition-all duration-700 flex flex-col justify-between cursor-pointer overflow-hidden"
              onClick={() => {
                if (section.type === 'AGENT') navigate('/agents');
                else if (section.type === 'APP') navigate('/apps');
                else if (section.type === 'BLOG') navigate('/blog');
              }}
            >
              <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                <div className="flex justify-between items-start mb-2 sm:mb-3 flex-shrink-0">
                  <span className="text-[1.6vw] sm:text-[1.2vw] md:text-[10px] lg:text-xs mono text-red-600 font-bold tracking-[0.1em]">{section.type}</span>
                  {section.icon && (
                    <span className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0">{section.icon}</span>
                  )}
                </div>
                <div className="mb-2 sm:mb-3 flex-shrink-0">
                  <h3 className="text-[3vw] sm:text-[2.5vw] md:text-lg lg:text-xl xl:text-2xl font-black tracking-tight text-gray-900 group-hover:text-red-600 transition-colors uppercase leading-tight break-words line-clamp-2">{section.title}</h3>
                  <p className="text-[1.6vw] sm:text-[1.3vw] md:text-[9px] lg:text-[10px] xl:text-xs text-gray-600 mt-0.5 sm:mt-1 font-light italic break-words line-clamp-2">{section.titleCn}</p>
                </div>
                <p className="text-[1.6vw] sm:text-[1.4vw] md:text-[10px] lg:text-xs xl:text-sm text-gray-700 mt-1 sm:mt-2 md:mt-3 font-medium leading-relaxed break-words overflow-y-auto flex-1 min-h-0">{section.description}</p>
              </div>
              <div className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 border-t border-gray-300/30 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-red-600 rounded-full group-hover:animate-ping"></div>
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
    </div>
  );
};
