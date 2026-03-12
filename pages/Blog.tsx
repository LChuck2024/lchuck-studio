import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CTASection } from '../components/CTASection';
import { BackButton } from '../components/BackButton';

const renderCardTitle = (titleText: string, hoverColorClass = 'group-hover:text-red-600') => {
  const match = titleText.match(/^(.*?)(?:\s*\((.*?)\))?$/);
  if (match && match[2]) {
    return (
      <div className="mb-5 flex flex-col items-start justify-start">
        <h2 className={`text-xl font-bold text-[#1A1A1A] ${hoverColorClass} transition-colors tracking-[0.02em]`}>
          {match[1]}
        </h2>
        <span className="text-xs font-normal text-[#999999] mt-1">
          {match[2]}
        </span>
      </div>
    );
  }
  return <h2 className={`text-xl font-bold text-[#1A1A1A] mb-5 ${hoverColorClass} transition-colors tracking-[0.02em]`}>{titleText}</h2>;
};

const BLOG_SECTIONS = [
  { id: 'data-architecture', labelEn: 'DATA ARCHITECTURE', labelCn: '数据架构与技术设计' },
  { id: 'personal-growth', labelEn: 'STRATEGIC METHODOLOGY', labelCn: '战略方法论与实践复盘' },
];

export const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>(BLOG_SECTIONS[0].id);

  useEffect(() => {
    const sections = BLOG_SECTIONS.map((s) => ({ id: s.id, el: document.getElementById(s.id) }));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    sections.forEach(({ el }) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 md:px-8 py-20 relative z-10 overflow-y-auto">
      <Helmet>
        <title>Engineering Log | LChuck Studio</title>
        <meta
          name="description"
          content="数据架构与技术设计、战略方法论与实践复盘。从 ETL 架构演进、CDC 中台、MDM 实战，到 RAG 精度工程与数字资产系统设计的工程记录。"
        />
      </Helmet>
      <div className="max-w-[1600px] w-full mx-auto mt-10 md:mt-20">
        <div className="mb-12 text-left">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-2 tracking-tight uppercase italic flex items-baseline gap-3 flex-wrap">
            <span>ENGINEERING LOG</span>
          </h1>
          <p className="text-sm font-mono text-[#999999] tracking-widest uppercase">
            工程日志 · 博客
          </p>
        </div>

        {/* 分类锚点导航 - 当前区域高亮 */}
        <nav className="flex flex-wrap gap-2 mb-12 border-b border-neutral-200 pb-4">
          {BLOG_SECTIONS.map((section, i) => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`text-[10px] font-mono uppercase tracking-wider transition-colors px-2 py-1 border rounded-sm ${
                  isActive
                    ? 'text-red-600 border-red-200 bg-red-50'
                    : 'text-neutral-500 border-transparent hover:text-red-600 hover:border-neutral-300'
                }`}
              >
                0{i + 1} {section.labelEn}
              </a>
            );
          })}
        </nav>

        {/* Section: 数据架构与技术设计 */}
        <section id="data-architecture" className="mb-16 scroll-mt-24">
          <h2 className="text-xl font-bold text-gray-900 mb-2 font-mono tracking-widest flex items-center gap-2">
            <span className="text-neutral-400">01</span> {BLOG_SECTIONS[0].labelEn} ({BLOG_SECTIONS[0].labelCn})
          </h2>
          <p className="text-gray-500 text-sm font-mono mb-6">主数据治理与 ETL 架构的工程实践。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Card: 主数据治理 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🗄️</span>
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-indigo-200">
                  主数据
                </span>
              </div>
              <div className="flex-grow">
                {renderCardTitle('Master Data Governance (主数据治理实战：从同义词混乱到 SSOT 的映射表设计)', 'group-hover:text-indigo-600')}
                <div className="text-xs text-gray-400 font-mono mb-3">2026.02.26 · 技术设计</div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  品类「洗发水」和「洗发液」被拆成两个统计？用配置驱动映射表替代硬编码 CASE WHEN，把主数据治理沉淀为 ETL 原子能力。
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-mono mb-2 italic">相关架构已集成至 Solutions 模块，可查看 100:1 压缩实战详情</p>
                <button
                  onClick={() => navigate('/blog/mdm-mapping-design')}
                  className="w-full py-2 bg-[#1a1a1a] text-white border border-[#1a1a1a] rounded-sm text-sm font-medium font-mono hover:border-[#C8102E] transition-colors flex items-center justify-center gap-2"
                >
                  <span>READ ARTICLE (阅读文章)</span>
                  <span className="text-xs opacity-50">↗</span>
                </button>
              </div>
            </div>

            {/* Card: ETL 架构 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🏗️</span>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-blue-200">
                  架构
                </span>
              </div>
              <div className="flex-grow">
                {renderCardTitle('ETL Architecture Evolution (从 SQL 到 Python：配置驱动型 ETL 架构演进)', 'group-hover:text-blue-600')}
                <div className="text-xs text-gray-400 font-mono mb-3">2026.02.13 · 技术设计</div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  复盘如何将 95+ 个硬编码脚本重构为自动化流水线。关于 CDC 增量同步与 SCD 历史拉链的工程实践。
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-mono mb-2 italic">相关架构已集成至 Solutions 模块，可查看 100:1 压缩实战详情</p>
                <button
                  onClick={() => navigate('/blog/etl-architecture')}
                  className="w-full py-2 bg-[#1a1a1a] text-white border border-[#1a1a1a] rounded-sm text-sm font-medium font-mono hover:border-[#C8102E] transition-colors flex items-center justify-center gap-2"
                >
                  <span>READ ARTICLE (阅读文章)</span>
                  <span className="text-xs opacity-50">↗</span>
                </button>
              </div>
            </div>

            {/* Card: RAG 精度工程 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🤖</span>
                <span className="bg-purple-100 text-purple-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-purple-200">
                  RAG
                </span>
              </div>
              <div className="flex-grow">
                {renderCardTitle('RAG Precision Engineering (RAG 精度工程：三层知识空间的解耦与闭环实现)', 'group-hover:text-purple-600')}
                <div className="text-xs text-gray-400 font-mono mb-3">2026.03.06 · 技术设计</div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  深度拆解如何通过「知识层、意图层、反馈层」解决垂直领域 LLM 落地的幻觉难题。结合 Streamlit 原型的实战性能数据分析。
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <a
                  href="https://blog.csdn.net/Chuck0415/article/details/152335828?spm=1001.2014.3001.5501"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-[#1a1a1a] text-white border border-[#1a1a1a] rounded-sm text-sm font-medium font-mono hover:border-[#C8102E] transition-colors flex items-center justify-center gap-2"
                >
                  <span>READ ARTICLE (阅读文章)</span>
                  <span className="text-xs opacity-50">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section: 战略方法论与实践复盘 */}
        <section id="personal-growth" className="mb-16 scroll-mt-24">
          <h2 className="text-xl font-bold text-gray-900 mb-2 font-mono tracking-widest flex items-center gap-2">
            <span className="text-neutral-400">02</span> {BLOG_SECTIONS[1].labelEn} ({BLOG_SECTIONS[1].labelCn})
          </h2>
          <p className="text-gray-500 text-sm font-mono mb-6">围绕资源配置、战略执行与系统设计的方法论复盘，用工程视角审视个人与团队的系统架构。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Card: 数字资产系统架构 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🚀</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-green-200">
                  架构设计
                </span>
              </div>
              <div className="flex-grow">
                {renderCardTitle('Digital Asset System Architecture (数字资产系统架构：自动化运维与边缘计算实践)', 'group-hover:text-green-600')}
                <div className="text-xs text-gray-400 font-mono mb-3">2026.02.26 · 复盘</div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  以 LChuck Studio 为样本，复盘如何从信息架构出发，设计 Strategic Consulting / Solutions &amp; Prototypes / Engineering Log 三条主线，并用物理引擎、配置化常量与 AI 架构顾问浮窗共同构建一个可观测、可扩展的数字资产系统。
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <button
                  onClick={() => navigate('/blog/opc')}
                  className="w-full py-2 bg-[#1a1a1a] text-white border border-[#1a1a1a] rounded-sm text-sm font-medium font-mono hover:border-[#C8102E] transition-colors flex items-center justify-center gap-2"
                >
                  <span>READ ARTICLE (阅读文章)</span>
                  <span className="text-xs opacity-50">↗</span>
                </button>
              </div>
            </div>

            {/* Card: P0 管理法 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🧠</span>
                <span className="bg-purple-100 text-purple-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-purple-200">
                  P0 管理法
                </span>
              </div>
              <div className="flex-grow">
                {renderCardTitle('P0-Driven Management (P0 管理法：35+ 程序员的精力管理系统)', 'group-hover:text-purple-600')}
                <div className="text-xs text-gray-400 font-mono mb-3">2026.02.05 · 精力管理</div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  拒绝伪勤奋。如何利用飞书多维表格构建'战略指挥部'，在职场、工程项目与家庭之间寻找动态平衡，从“时间管理”上升到“个人执行系统架构”的层面。
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <button
                  onClick={() => navigate('/blog/p0_manager')}
                  className="w-full py-2 bg-[#1a1a1a] text-white border border-[#1a1a1a] rounded-sm text-sm font-medium font-mono hover:border-[#C8102E] transition-colors flex items-center justify-center gap-2"
                >
                  <span>READ ARTICLE (阅读文章)</span>
                  <span className="text-xs opacity-50">↗</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
        <BackButton />
      </div>
    </div>
  );
};
