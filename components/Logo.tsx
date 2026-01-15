import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const Typewriter: React.FC<{ 
  text: string; 
  speed?: number; 
  delay?: number; 
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
}> = ({ text, speed = 50, delay = 0, onComplete, className = "", showCursor = true }) => {
  const [displayedText, setDisplayedText] = React.useState("");
  const [isFinished, setIsFinished] = React.useState(false);

  React.useEffect(() => {
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

export const Logo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  if (isHome) {
    // 主页：大 Logo 居中显示
    return (
      <motion.div
        initial={false}
        animate={{
          top: '30vh',
          scale: 1,
        }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
        className="fixed left-0 right-0 pointer-events-none z-[200]"
        style={{
          transform: 'translateY(-50%)',
        }}
      >
        <div className="w-full max-w-full px-4 sm:px-6 md:px-8 text-center select-none overflow-hidden">
          <h2 className="text-[8vw] sm:text-[10vw] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black tracking-tighter italic leading-none inline-flex items-center justify-center gap-2 sm:gap-3 md:gap-4 whitespace-nowrap">
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
        </div>
      </motion.div>
    );
  }

  // 子页面：小 Logo 在左上角
  return (
    <motion.div
      initial={false}
      animate={{
        top: '20px',
        left: '20px',
        scale: 0.25,
      }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
      className="fixed pointer-events-auto z-[200] cursor-pointer"
      onClick={() => navigate('/')}
    >
      <motion.div 
        className="flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
      >
        <div className="w-3 h-3 bg-red-600 rotate-45 border border-red-400"></div>
        <span className="text-lg font-black tracking-tight italic text-white">
          LCHUCK <span className="text-red-600">STUDIO</span>
        </span>
      </motion.div>
    </motion.div>
  );
};
