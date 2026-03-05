import React from 'react';
import type { AppCardItem } from '../config/apps';

interface AppCardProps {
  item: AppCardItem;
  onScriptListClick?: () => void;
}

export const AppCard: React.FC<AppCardProps> = ({ item, onScriptListClick }) => {
  const { icon, index, title, desc, tech, cta } = item;
  const isRoadmap = index === 'Roadmap';
  const indexColor = isRoadmap ? 'text-neutral-500' : 'text-neutral-600';

  const renderCta = () => {
    if (cta.type === 'link' && cta.href) {
      return (
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors text-center"
        >
          {cta.label}
        </a>
      );
    }
    if (cta.action === 'script-list' && onScriptListClick) {
      return (
        <button
          onClick={onScriptListClick}
          className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors"
        >
          {cta.label}
        </button>
      );
    }
    if (cta.action === 'chatbot' || !cta.action) {
      const handleClick = () => {
        window.dispatchEvent(
          new CustomEvent('lchuck:open-chatbot', {
            detail: {
              roleId: cta.roleId,
              message: cta.message,
            },
          })
        );
      };
      if (cta.type === 'outline') {
        return (
          <button
            onClick={handleClick}
            className="w-full py-2 border-2 border-neutral-300 text-gray-800 rounded-sm text-sm font-medium font-mono hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
          >
            {cta.label}
          </button>
        );
      }
      return (
        <button
          onClick={handleClick}
          className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors"
        >
          {cta.label}
        </button>
      );
    }
    return null;
  };

  return (
    <div
      className={`bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full ${isRoadmap ? 'opacity-90 hover:opacity-100' : ''}`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-2xl">{icon}</span>
        <span
          className={`bg-neutral-100 ${indexColor} text-[10px] font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200 uppercase tracking-wider`}
        >
          {index}
        </span>
      </div>
      <div className="flex-grow">
        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{title}</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{desc}</p>
      </div>
      <div className="mt-auto">
        <p className="text-[10px] font-mono text-gray-400 mb-3 tracking-wider">{tech}</p>
        {renderCta()}
      </div>
    </div>
  );
};
