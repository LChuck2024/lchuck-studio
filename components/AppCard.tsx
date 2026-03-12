import React from 'react';
import { Link } from 'react-router-dom';
import type { AppCardItem } from '../config/apps';

interface AppCardProps {
  item: AppCardItem;
  onScriptListClick?: () => void;
}

export const AppCard: React.FC<AppCardProps> = ({ item, onScriptListClick }) => {
  const { icon, index, title, subtitle, desc, tech, cta } = item;
  const isRoadmap = index === 'Roadmap';
  const indexColor = isRoadmap ? 'text-neutral-500' : 'text-neutral-600';

  const renderLabel = (text: string) => {
    const match = text.match(/^(.*?)(?:\s*\((.*?)\))?$/);
    if (match && match[2]) {
      return (
        <span className="flex items-center gap-1 justify-center overflow-hidden whitespace-nowrap min-w-0">
          <span className="font-bold truncate">{match[1]}</span>
          <span className="font-light text-xs hidden sm:inline opacity-80 shrink-0 truncate">({match[2]})</span>
        </span>
      );
    }
    return <span className="font-bold truncate min-w-0">{text}</span>;
  };

  const btnClass = "w-full py-2 bg-[#1a1a1a] text-white border border-[#1a1a1a] rounded-sm text-sm font-mono hover:border-[#C8102E] transition-colors flex items-center justify-center gap-1.5 overflow-hidden";

  const renderCta = () => {
    // 直接操作类：跳转链接或打开弹窗
    if (cta.type === 'link' && cta.href) {
      const isInternal = cta.href.startsWith('/');
      
      if (isInternal) {
        return (
          <Link
            to={cta.href}
            className={btnClass}
          >
            {renderLabel(cta.label)}
            <span className="text-xs shrink-0">→</span>
          </Link>
        );
      }

      return (
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className={btnClass}
        >
          {renderLabel(cta.label)}
          <span className="text-xs shrink-0">↗</span>
        </a>
      );
    }
    if (cta.action === 'script-list' && onScriptListClick) {
      return (
        <button
          onClick={onScriptListClick}
          className={btnClass}
        >
          {renderLabel(cta.label)}
          <span className="text-xs shrink-0">→</span>
        </button>
      );
    }
    // 咨询类/产品类：唤起助手
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
      
      const isProductAccess = cta.label.startsWith('Request Access');
      
      return (
        <button
          onClick={handleClick}
          className={btnClass}
        >
          {renderLabel(cta.label)}
          <span className="text-xs shrink-0">{isProductAccess ? '🔑' : '📋'}</span>
        </button>
      );
    }
    return null;
  };

  const renderCardTitle = (titleText: string) => {
    const match = titleText.match(/^(.*?)(?:\s*\((.*?)\))?$/);
    if (match && match[2]) {
      return (
        <div className="mb-2 flex flex-col items-start justify-start">
          <h2 className="text-xl font-bold text-[#1A1A1A] group-hover:text-red-600 transition-colors tracking-[0.02em]">
            {match[1]}
          </h2>
          <span className="text-xs font-normal text-[#999999] mt-1">
            {match[2]}
          </span>
        </div>
      );
    }
    return <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-red-600 transition-colors tracking-[0.02em]">{titleText}</h2>;
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
      <div className="flex-grow min-h-[200px] flex flex-col">
        {renderCardTitle(title)}
        {subtitle && (
          <p className="text-sm text-gray-500 font-normal leading-tight mb-4">{subtitle}</p>
        )}
        <p className="text-gray-600 text-sm mb-4 leading-[1.6] flex-grow">{desc}</p>
      </div>
      <div className="mt-auto pt-4 border-t border-neutral-100">
        <p className="text-xs font-mono text-neutral-500 mb-3 tracking-wider border border-neutral-200 bg-neutral-50 px-2 py-1 rounded-sm inline-block">{tech}</p>
        <div className="w-full">
          {renderCta()}
        </div>
      </div>
    </div>
  );
};
