import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CTASection } from '../components/CTASection';
import { BackButton } from '../components/BackButton';

const ARCH_IMAGE = '/enterprise-data-architecture.png';

export const Agents: React.FC = () => {
  const [archModalOpen, setArchModalOpen] = useState(false);

  useEffect(() => {
    if (!archModalOpen) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setArchModalOpen(false);
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [archModalOpen]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 md:px-8 py-20 relative z-10 overflow-y-auto">
      <Helmet>
        <title>Digital Workforce | LChuck Studio</title>
        <meta name="description" content="24/7 待命的 AI 数字员工。欧洲留学顾问、MBA 写作提分教练、数据架构师 AI 助手、一人公司顾问。" />
      </Helmet>
      <div className="max-w-[1600px] w-full mx-auto mt-10 md:mt-20">
        <div className="mb-12 text-left">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-2 tracking-tight uppercase italic">Digital Workforce</h1>
          <p className="text-gray-400 font-mono text-sm mb-4">数字员工 · 智能代理</p>
          <p className="text-gray-500 font-mono text-sm md:text-base tracking-widest border-l-2 border-red-600 pl-4 py-1">
            24/7 待命的 AI 数字员工。方案匹配、逻辑诊断、运行助手、架构透视、深度咨询。
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
                拒绝中介信息差，官网申请零成本。<strong>270+ 门</strong>欧洲公立大学课程已清洗分级，一键匹配转码/润学方案。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">技术栈</span>
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
                  <span>数据检索</span>
                  <span className="text-xs opacity-50">↗</span>
                </a>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'study-abroad' } }))}
                  className="flex-1 py-2 border border-gray-900 text-gray-900 rounded-sm text-sm font-medium font-mono hover:bg-green-50 transition-colors flex items-center justify-center gap-1"
                >
                  <span>方案匹配</span>
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
                <span className="text-xs font-mono text-gray-400 block mb-1">技术栈</span>
                <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                  逻辑框架 / 反模板
                </span>
              </div>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'mba-coach' } }))}
                className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
              >
                <span>逻辑诊断</span>
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
                企业级三层架构：管理控制层（配置中心、元数据资产目录、AIOps 可观测性）、数据价值管道（三链路中台 Base/SCD/CDC、统一处理引擎）、基础安全层（密钥管理、Delta Lake、CI/CD）。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">技术栈</span>
                <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                  Azure Databricks · Delta Lake · AKS · Entra ID
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'data-architect' } }))}
                  className="flex-1 py-2 bg-[#1a1a1a] text-white rounded-sm text-sm font-medium font-mono hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="text-xs">📋</span>
                  <span>运行助手</span>
                </button>
                <button
                  onClick={() => setArchModalOpen(true)}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-sm text-sm font-medium font-mono hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5"
                  aria-label="查看企业级数据架构图"
                >
                  <span>架构透视</span>
                  <span className="text-xs">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: 一人公司顾问 */}
          <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">💼</span>
              <span className="bg-amber-100 text-amber-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-amber-200">
                策略
              </span>
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                一人公司顾问
              </h2>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                拒绝焦虑，只谈交付。P0 管理法、独立站建设、技术变现、小红书引流。从零构建自动化数字资产系统的实战派。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">能力</span>
                <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                  P0 管理法 / 技术变现
                </span>
              </div>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'solo-preneur' } }))}
                className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
              >
                <span>深度咨询</span>
                <span className="text-xs opacity-50">↗</span>
              </button>
            </div>
          </div>
        </div>

        <CTASection />
        <BackButton />
      </div>

      {/* 架构透视弹窗 */}
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
            alt="企业级数据架构图 - Management & Control Plane, Data Value Pipeline, Foundation & Security"
            className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
