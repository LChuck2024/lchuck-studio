import React from 'react';
import { NavLink } from 'react-router-dom';

const tabs = [
  { id: 'home', labelEn: 'HOME', path: '/', icon: '🏠' },
  { id: 'agents', labelEn: 'CONSULTING', path: '/agents', icon: '🤝' },
  { id: 'apps', labelEn: 'SOLUTIONS', path: '/apps', icon: '🛠️' },
  { id: 'blog', labelEn: 'LOG', path: '/blog', icon: '📓' },
];

export const MobileNav: React.FC = () => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-white/95 backdrop-blur-sm border-t border-neutral-200 pt-2"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0px))' }}
      aria-label="主导航"
    >
      <div className="flex items-stretch justify-around px-2 pr-14">
        {tabs.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-2.5 min-w-0 transition-colors ${
                isActive ? 'text-red-600' : 'text-neutral-500 active:text-neutral-700'
              }`
            }
          >
            <span className="text-lg leading-none mb-0.5">{tab.icon}</span>
            <span className="text-[10px] font-mono font-bold tracking-wider truncate max-w-full">
              {tab.labelEn}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
