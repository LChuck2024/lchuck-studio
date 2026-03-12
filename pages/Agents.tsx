import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CTASection } from '../components/CTASection';
import { BackButton } from '../components/BackButton';

const ARCH_IMAGE = '/enterprise-data-architecture.png';

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

const renderCardTitle = (titleText: string, hoverColorClass = 'group-hover:text-green-600') => {
  const match = titleText.match(/^(.*?)(?:\s*\((.*?)\))?$/);
  if (match && match[2]) {
    return (
      <h2 className={`text-xl font-semibold text-[#1A1A1A] mb-4 ${hoverColorClass} transition-colors tracking-[0.02em] flex items-baseline flex-wrap gap-x-2`}>
        <span>{match[1]}</span>
        <span className="text-sm font-normal text-[#666666]">({match[2]})</span>
      </h2>
    );
  }
  return <h2 className={`text-xl font-semibold text-[#1A1A1A] mb-4 ${hoverColorClass} transition-colors tracking-[0.02em]`}>{titleText}</h2>;
};

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
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-2 tracking-tight uppercase italic flex items-baseline gap-3 flex-wrap">
            <span>DIGITAL WORKFORCE</span>
          </h1>
          <p className="text-sm font-mono text-[#999999] tracking-widest uppercase">
            数字员工 · 智能代理
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
              {renderCardTitle('Global Education Strategy (欧洲留学顾问)', 'group-hover:text-green-600')}
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
              <div className="flex flex-col gap-2">
                <a
                  href="https://web.wps.cn/wo/sl/v31rzbsD?app_id=1PKY0UiCwcIPzRKjh3CoI6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnClass}
                >
                  {renderLabel('Data Retrieval (数据检索)')}
                  <span className="text-xs shrink-0">↗</span>
                </a>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'study-abroad' } }))}
                  className={btnClass}
                >
                  {renderLabel('Plan Matching (方案匹配)')}
                  <span className="text-xs shrink-0">📋</span>
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
              {renderCardTitle('MBA Logic & Writing Coach (MBA 写作教练)', 'group-hover:text-purple-600')}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                拒绝文采，只讲逻辑。基于主理人 <strong>214分 (专业第5)</strong> 实战经验。提供理工科专属的 <strong>「填空式」</strong> 写作模板与毒舌批改。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">技术栈</span>
                <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                  逻辑框架 / 反堆砌写作
                </span>
              </div>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'mba-coach' } }))}
                className={btnClass}
              >
                {renderLabel('Logic Diagnosis (逻辑诊断)')}
                <span className="text-xs shrink-0">📋</span>
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
              {renderCardTitle('Enterprise Architect Copilot (数据架构师助手)', 'group-hover:text-blue-600')}
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
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'data-architect' } }))}
                  className={btnClass}
                >
                  {renderLabel('Launch Engine (启动引擎)')}
                  <span className="text-xs shrink-0">📋</span>
                </button>
                <button
                  onClick={() => setArchModalOpen(true)}
                  className={btnClass}
                  aria-label="查看企业级数据架构图"
                >
                  {renderLabel('Architecture Insight (架构透视)')}
                  <span className="text-xs shrink-0">👁️</span>
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
              {renderCardTitle('Digital Solopreneur Strategy (个人商业策略)', 'group-hover:text-amber-600')}
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
                className={btnClass}
              >
                {renderLabel('Deep Consultation (深度咨询)')}
                <span className="text-xs shrink-0">📋</span>
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
