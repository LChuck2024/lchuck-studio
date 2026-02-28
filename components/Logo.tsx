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

export const Logo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  if (isHome) {
    // 主页：大 Logo 居中显示，跟随页面滚动
    return (
      <motion.div
        initial={false}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="absolute top-0 left-0 right-0 pointer-events-none z-[200] pt-[15vh] pb-8"
      >
        <div className="w-full max-w-full px-4 sm:px-6 md:px-8 text-center select-none overflow-hidden flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="flex items-center gap-2 mb-2 sm:mb-4"
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></div>
            <span className="text-[10px] sm:text-xs tracking-[0.2em] text-green-500 font-mono uppercase font-bold">System Online</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-[6rem] lg:text-[8rem] xl:text-[10rem] font-black tracking-tighter italic leading-none flex flex-wrap items-center justify-center gap-1 sm:gap-2 md:gap-4">
            <Typewriter 
              text="LCHUCK" 
              speed={120} 
              className="text-gray-900"
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
        <span className="text-lg font-black tracking-tight italic text-gray-900">
          LCHUCK <span className="text-red-600">STUDIO</span>
        </span>
      </motion.div>
    </motion.div>
  );
};
