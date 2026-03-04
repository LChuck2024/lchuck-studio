import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ARCH_IMAGE = '/Unified_Processing_Engine.JPG';

export const Agents: React.FC = () => {
  const navigate = useNavigate();
  const [archModalOpen, setArchModalOpen] = useState(false);

  useEffect(() => {
    if (!archModalOpen) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setArchModalOpen(false);
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [archModalOpen]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 md:px-8 py-20 relative z-10 overflow-y-auto">
      <div className="max-w-[1600px] w-full mx-auto mt-10 md:mt-20">
        <div className="mb-12 text-left">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight uppercase italic">Digital Workforce</h1>
          <p className="text-gray-500 font-mono text-sm md:text-base tracking-widest border-l-2 border-red-600 pl-4 py-1">
            拒绝信息差与人工堆砌。24/7 待命的自动化专家与智能代理。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Card 1: 欧洲留学顾问 */}
          <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">🇪🇺</span>
              <span className="bg-green-100 text-green-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-green-200">
                留学
              </span>
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                欧洲留学顾问
              </h2>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                拒绝中介信息差，官网申请免费。<strong>270+ 门</strong>欧洲公立大学课程已清洗分级，一键匹配转码/润学方案。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">TECH STACK</span>
                <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                  主数据清洗 / 智能匹配
                </span>
              </div>
              <div className="flex gap-2">
                <a
                  href="https://web.wps.cn/wo/sl/v31rzbsD?app_id=1PKY0UiCwcIPzRKjh3CoI6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                >
                  <span>免费查询</span>
                  <span className="text-xs opacity-50">↗</span>
                </a>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'study-abroad' } }))}
                  className="flex-1 py-2 border border-gray-900 text-gray-900 rounded-sm text-sm font-medium font-mono hover:bg-green-50 transition-colors flex items-center justify-center gap-1"
                >
                  <span>咨询顾问</span>
                  <span className="text-xs opacity-50">↗</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: MBA 写作教练 */}
          <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">🎓</span>
              <span className="bg-purple-100 text-purple-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-purple-200">
                MBA
              </span>
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                MBA 写作提分教练
              </h2>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                拒绝文采，只讲逻辑。基于主理人 <strong>214分 (专业第5)</strong> 实战经验。提供理工科专属的 <strong>「填空式」</strong> 写作模板与毒舌批改。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">TECH STACK</span>
                <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                  Logic Framework / Anti-Template
                </span>
              </div>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'mba-coach' } }))}
                className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
              >
                <span>试用教练 (Try Coach)</span>
                <span className="text-xs opacity-50">↗</span>
              </button>
            </div>
          </div>

          {/* Card 3: 数据架构师 AI 助手 */}
          <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">🐍</span>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-blue-200">
                架构
              </span>
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                数据架构师 AI 助手
              </h2>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                10+ 年数据治理经验。CDC/SCD/主数据/代码优化，技术点拨免费，深度咨询可预约。配置驱动三链路中台。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">TECH STACK</span>
                <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                  Python / Spark / SQL
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'data-architect' } }))}
                  className="flex-1 py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                >
                  <span>试用 AI</span>
                  <span className="text-xs opacity-50">↗</span>
                </button>
                <button
                  onClick={() => setArchModalOpen(true)}
                  className="flex-1 py-2 border border-gray-900 text-gray-900 rounded-sm text-sm font-medium font-mono hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
                >
                  <span>架构图</span>
                  <span className="text-xs opacity-50">👁️</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: 一人公司顾问 */}
          <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">💼</span>
              <span className="bg-amber-100 text-amber-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-amber-200">
                副业
              </span>
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                一人公司顾问
              </h2>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                拒绝焦虑，只谈交付。P0 管理法、独立站建设、技术变现、小红书引流。从 0 到 1 的实战派。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">CAPABILITIES</span>
                <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                  P0 管理法 / 技术变现
                </span>
              </div>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'solo-preneur' } }))}
                className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
              >
                <span>试用顾问</span>
                <span className="text-xs opacity-50">↗</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-red-600 transition-colors font-mono text-sm tracking-widest uppercase"
          >
            ← Return to Command Center
          </button>
        </div>
      </div>

      {/* 架构图弹窗 */}
      {archModalOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setArchModalOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors"
            onClick={() => setArchModalOpen(false)}
            aria-label="关闭"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={ARCH_IMAGE}
            alt="CDC Engine Architecture"
            className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
