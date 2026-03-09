import React from 'react';
import type { AppCardItem } from '../config/apps';

interface AppCardProps {
  item: AppCardItem;
  onScriptListClick?: () => void;
}

export const AppCard: React.FC<AppCardProps> = ({ item, onScriptListClick }) => {
  const { icon, index, title, subtitle, desc, tech, cta } = item;
  const isRoadmap = index === 'Roadmap';
  const indexColor = isRoadmap ? 'text-neutral-500' : 'text-neutral-600';

  const renderCta = () => {
    // 直接操作类：跳转链接或打开弹窗
    if (cta.type === 'link' && cta.href) {
      return (
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-2 bg-blue-600 text-white rounded-sm text-sm font-medium font-mono hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-1.5"
        >
          <span>{cta.label}</span>
          <span className="text-xs">↗</span>
        </a>
      );
    }
    if (cta.action === 'script-list' && onScriptListClick) {
      return (
        <button
          onClick={onScriptListClick}
          className="w-full py-2 bg-blue-600 text-white rounded-sm text-sm font-medium font-mono hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5"
        >
          <span>{cta.label}</span>
          <span className="text-xs">→</span>
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
      
      // 判断是咨询类还是产品类
      const isProductAccess = cta.label === 'Request Access';
      
      if (cta.type === 'outline') {
        return (
          <button
            onClick={handleClick}
            className={`w-full py-2 border-2 rounded-sm text-sm font-medium font-mono transition-colors flex items-center justify-center gap-1.5 ${
              isProductAccess
                ? 'border-orange-300 text-orange-700 hover:border-orange-400 hover:bg-orange-50'
                : 'border-neutral-300 text-gray-800 hover:border-neutral-400 hover:bg-neutral-50'
            }`}
          >
            <span className="text-xs">{isProductAccess ? '🔑' : '📋'}</span>
            <span>{cta.label}</span>
          </button>
        );
      }
      
      // Primary 按钮：咨询类用深色，产品类用橙色
      return (
        <button
          onClick={handleClick}
          className={`w-full py-2 text-white rounded-sm text-sm font-medium font-mono transition-colors flex items-center justify-center gap-1.5 ${
            isProductAccess
              ? 'bg-orange-600 hover:bg-orange-700'
              : 'bg-[#1a1a1a] hover:bg-gray-800'
          }`}
        >
          <span className="text-xs">{isProductAccess ? '🔑' : '📋'}</span>
          <span>{cta.label}</span>
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
      <div className="flex-grow min-h-[200px] flex flex-col">
        <div className="mb-3">
          <h2 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-red-600 transition-colors tracking-[0.02em]">{title}</h2>
          {subtitle && (
            <p className="text-sm text-gray-500 font-normal leading-tight">{subtitle}</p>
          )}
        </div>
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
