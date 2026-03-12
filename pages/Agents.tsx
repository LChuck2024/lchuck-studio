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
        <title>Strategic Consulting | LChuck Studio</title>
        <meta name="description" content="企业级数据架构解决方案：DataOps 存储优化、RAG 知识引擎、自动化数据工程、技术 ROI 审计。基于 CDC/SCD、RAGAS、Delta Lake 的端到端架构重构方案。" />
      </Helmet>
      <div className="max-w-[1600px] w-full mx-auto mt-10 md:mt-20">
        <div className="mb-12 text-left">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-2 tracking-tight uppercase flex items-baseline gap-3 flex-wrap">
            <span>STRATEGIC CONSULTING</span>
          </h1>
          <p className="text-sm font-mono text-[#999999] tracking-widest">
            企业级数据架构与 AI 集成战略咨询服务
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Card 1: DataOps & Storage Optimization */}
          <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">⚡</span>
              <span className="bg-green-100 text-green-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-green-200">
                CDC/SCD
              </span>
            </div>
            <div className="flex-grow">
              {renderCardTitle('DataOps & Storage Optimization (数据架构审计)', 'group-hover:text-green-600')}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                提供基于 CDC/SCD 变更数据捕获与缓慢变化维建模的存储层架构审计与成本优化咨询。通过 Delta Lake 时间旅行与 Z-Order 索引，实现查询性能提升 <strong>40%+</strong>，存储成本降低 <strong>30%+</strong> 的全栈方案。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">技术栈</span>
                <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                  CDC/SCD · Delta Lake · DataOps
                </span>
              </div>
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent('lchuck:open-chatbot', {
                      detail: {
                        roleId: 'data-architect',
                        message: '我想做一轮 DataOps & 存储优化的架构审计，请先帮我梳理当前存储架构和主要性能/成本痛点。',
                      },
                    })
                  )
                }
                className={btnClass}
              >
                {renderLabel('Architecture Audit (架构审计)')}
                <span className="text-xs shrink-0">📋</span>
              </button>
            </div>
          </div>

          {/* Card 2: Agentic RAG Infrastructure */}
          <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">🧠</span>
              <span className="bg-purple-100 text-purple-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-purple-200">
                RAGAS
              </span>
            </div>
            <div className="flex-grow">
              {renderCardTitle('Agentic RAG Infrastructure (企业级 AI 知识引擎)', 'group-hover:text-purple-600')}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                主导基于 RAGAS 评估框架的企业级 RAG 知识引擎架构设计与实施评审，实现多模态文档的向量化、分块策略优化与检索精度提升。通过 Agentic Workflow 实现意图理解、上下文增强与生成一致性闭环，确保商业级知识资产的转化效率。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">技术栈</span>
                <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                  RAGAS · Vector DB · Agentic Workflow
                </span>
              </div>
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent('lchuck:open-chatbot', {
                      detail: {
                        roleId: 'data-architect',
                        message: '我想为公司搭建企业级 RAG 知识引擎，目前的数据源形态（文档类型、规模）和典型查询场景如下，请帮我评估架构方案。',
                      },
                    })
                  )
                }
                className={btnClass}
              >
                {renderLabel('Knowledge Engine (知识引擎)')}
                <span className="text-xs shrink-0">📋</span>
              </button>
            </div>
          </div>

          {/* Card 3: Automated Data Engineering */}
          <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">🔧</span>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-blue-200">
                DataOps
              </span>
            </div>
            <div className="flex-grow">
              {renderCardTitle('Automated Data Engineering (自动化数据工程)', 'group-hover:text-blue-600')}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                提供基于配置驱动的 ETL 自动化中台规划与落地服务，实现数据质量监控、主数据治理与资产目录的端到端闭环。通过元数据资产目录与 AIOps 可观测性，将数据工程从「手工作坊」升级为「工业化流水线」，确保数据资产的标准化交付。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">技术栈</span>
                <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                  DataOps · Metadata Catalog · AIOps
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent('lchuck:open-chatbot', {
                        detail: {
                          roleId: 'data-architect',
                          message: '我想规划一套自动化数据工程/ETL 中台，目前的数据来源、目标仓库和交付要求大致如下，请帮我拆解架构与管道设计。',
                        },
                      })
                    )
                  }
                  className={btnClass}
                >
                  {renderLabel('Pipeline Design (管道设计)')}
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

          {/* Card 4: Strategic Tech-ROI Audit */}
          <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">📊</span>
              <span className="bg-amber-100 text-amber-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-amber-200">
                Strategic Audit
              </span>
            </div>
            <div className="flex-grow">
              {renderCardTitle('Strategic Tech-ROI Audit (技术 ROI 深度审计)', 'group-hover:text-amber-600')}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                主导基于数据驱动的技术投资决策审计框架设计，对现有技术栈进行 ROI 量化评估与架构债务分析。通过成本-收益模型与风险矩阵，输出技术选型建议与迁移路径规划，确保技术资产的战略转化与决策审计。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">技术栈</span>
                <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                  Strategic Audit · ROI Modeling · Tech Debt Analysis
                </span>
              </div>
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent('lchuck:open-chatbot', {
                      detail: {
                        roleId: 'data-architect',
                        message: '我想做一次技术 ROI 深度审计，希望评估的系统/技术栈、当前投入成本和预期收益大致如下，请帮我搭一套评估框架。',
                      },
                    })
                  )
                }
                className={btnClass}
              >
                {renderLabel('ROI Audit (ROI 审计)')}
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
