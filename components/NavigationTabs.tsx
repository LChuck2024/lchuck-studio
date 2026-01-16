import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  path: string;
}

const tabs: Tab[] = [
  { id: 'home', label: '01_HOME', path: '/' },
  { id: 'agents', label: '02_AGENTS', path: '/agents' },
  { id: 'apps', label: '03_APPS', path: '/apps' },
  { id: 'blog', label: '04_BLOG', path: '/blog' },
];

export const NavigationTabs: React.FC = () => {
  return (
    <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
      {tabs.map((tab, index) => (
        <React.Fragment key={tab.id}>
          <NavLink
            to={tab.path}
            className={({ isActive }) => {
              const baseClasses = `
                mono text-[1.2vw] sm:text-[1vw] md:text-[8px] lg:text-[9px] xl:text-[10px]
                font-bold tracking-[0.2em] uppercase
                relative
                transition-all duration-500 ease-out
                cursor-pointer
                ${isActive 
                  ? 'text-red-600' 
                  : 'text-gray-400 hover:text-gray-700'
                }
              `;
              return baseClasses;
            }}
          >
            {({ isActive }) => (
              <motion.div
                className="relative inline-block"
                whileHover={{ 
                  scale: 1.05,
                  x: 2,
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.4,
                  ease: 'easeOut'
                }}
              >
                {/* 激活状态的红色方块 */}
                {isActive && (
                  <motion.span
                    className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-600"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0.6, 1, 0.6],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}
                
                {/* 文字内容 */}
                <span className="relative z-10">
                  {tab.label}
                </span>
                
                {/* 激活状态的发光效果 */}
                {isActive && (
                  <motion.span
                    className="absolute inset-0 text-red-600 blur-sm opacity-50"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {tab.label}
                  </motion.span>
                )}
                
                {/* 未激活状态下的装饰线 */}
                {!isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-gray-300 w-0"
                    whileHover={{
                      width: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeOut',
                    }}
                  />
                )}
                
                {/* 点击时的扩散光圈 */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-red-600/50 pointer-events-none"
                  initial={{ scale: 0, opacity: 0 }}
                  whileTap={{
                    scale: 2,
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    ease: 'easeOut',
                  }}
                />
              </motion.div>
            )}
          </NavLink>
          
          {/* 分隔符 */}
          {index < tabs.length - 1 && (
            <span className="text-gray-300 mono text-[1.2vw] sm:text-[1vw] md:text-[8px] lg:text-[9px] xl:text-[10px]">
              |
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
