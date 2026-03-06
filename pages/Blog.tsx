import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CTASection } from '../components/CTASection';
import { BackButton } from '../components/BackButton';

const BLOG_SECTIONS = [
  { id: 'personal-growth', labelEn: 'PERSONAL GROWTH', labelCn: '个人成长与商业复盘' },
  { id: 'data-architecture', labelEn: 'DATA ARCHITECTURE', labelCn: '数据架构与技术设计' },
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
        <meta name="description" content="个人成长与商业复盘、数据架构与技术设计。6 篇深度文章，从职业护城河到 ETL 架构的实战记录。深度复盘，拒绝伪勤奋。" />
      </Helmet>
      <div className="max-w-[1600px] w-full mx-auto mt-10 md:mt-20">
        <div className="mb-12 text-left">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-2 tracking-tight uppercase italic">ENGINEERING LOG</h1>
          <p className="text-gray-400 font-mono text-sm mb-4">工程日志 · 博客</p>
          <p className="text-gray-500 font-mono text-sm md:text-base tracking-widest border-l-2 border-red-600 pl-4 py-1">
            ETL 架构演进、一人公司实录、P0 精力管理、主数据治理。深度复盘，拒绝伪勤奋。
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

        {/* Section: 个人成长与商业复盘 */}
        <section id="personal-growth" className="mb-16 scroll-mt-24">
          <h2 className="text-xl font-bold text-gray-900 mb-2 font-mono tracking-widest flex items-center gap-2">
            <span className="text-neutral-400">01</span> {BLOG_SECTIONS[0].labelEn} ({BLOG_SECTIONS[0].labelCn})
          </h2>
          <p className="text-gray-500 text-sm font-mono mb-6">职业护城河、一人公司实战与精力管理的深度思考。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Card: AI 职业资产防御 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🛡️</span>
                <span className="bg-red-100 text-red-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-red-200">
                  职业护城河
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  AI 时代职业资产防御指南：从打工思维到资产思维
                </h2>
                <div className="text-xs text-gray-400 font-mono mb-3">2026.03.06 · 深度思考</div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  AI 不是来替代你的，是来放大资产的。如何构建可复用的代码、沉淀方法论与个人品牌，打造穿越周期的职业护城河。
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <button
                  onClick={() => navigate('/blog/ai-asset-defense')}
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>阅读文章</span>
                  <span className="text-xs opacity-50">↗</span>
                </button>
              </div>
            </div>

            {/* Card: MBA ROI 审计 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">💰</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-green-200">
                  一人公司
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  ROI 深度审计：我如何用一套 AI 架构替代了 37.8w 的 MBA 学费
                </h2>
                <div className="text-xs text-gray-400 font-mono mb-3">2026.02.26 · ROI 审计</div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  用 3.8k 成本构建「可复用的商业决策系统」，实现 MBA 核心能力的 80% 覆盖。RAG 知识库 + AI Agent 编排 + Prompt 模板库的实战方案。
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <button
                  onClick={() => navigate('/blog/mba-roi-audit')}
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>阅读文章</span>
                  <span className="text-xs opacity-50">↗</span>
                </button>
              </div>
            </div>

            {/* Card: 一人公司实录 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🚀</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-green-200">
                  一人公司
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  一人公司实录：从 0 到 1 构建 LCHUCK STUDIO
                </h2>
                <div className="text-xs text-gray-400 font-mono mb-3">2026.02.26 · 复盘</div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  技术栈选型（Next.js + EdgeOne）、产品矩阵设计与流量冷启动的真实数据复盘。如何用架构思维经营生意。
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <button
                  onClick={() => navigate('/blog/opc')}
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>阅读文章</span>
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
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  P0 管理法：35+ 程序员的精力管理系统
                </h2>
                <div className="text-xs text-gray-400 font-mono mb-3">2026.02.05 · 精力管理</div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  拒绝伪勤奋。如何利用飞书多维表格构建'战略指挥部'，在职场、副业与家庭之间寻找动态平衡。
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <button
                  onClick={() => navigate('/blog/p0_manager')}
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>阅读文章</span>
                  <span className="text-xs opacity-50">↗</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section: 数据架构与技术设计 */}
        <section id="data-architecture" className="mb-16 scroll-mt-24">
          <h2 className="text-xl font-bold text-gray-900 mb-2 font-mono tracking-widest flex items-center gap-2">
            <span className="text-neutral-400">02</span> {BLOG_SECTIONS[1].labelEn} ({BLOG_SECTIONS[1].labelCn})
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
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  主数据治理实战：从同义词混乱到 SSOT 的映射表设计
                </h2>
                <div className="text-xs text-gray-400 font-mono mb-3">2026.02.26 · 技术设计</div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  品类「洗发水」和「洗发液」被拆成两个统计？用配置驱动映射表替代硬编码 CASE WHEN，把主数据治理沉淀为 ETL 原子能力。
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <button
                  onClick={() => navigate('/blog/mdm-mapping-design')}
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>阅读文章</span>
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
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  从 SQL 到 Python：配置驱动型 ETL 架构演进
                </h2>
                <div className="text-xs text-gray-400 font-mono mb-3">2026.02.13 · 技术设计</div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  复盘如何将 95+ 个硬编码脚本重构为自动化流水线。关于 CDC 增量同步与 SCD 历史拉链的工程实践。
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <button
                  onClick={() => navigate('/blog/etl-architecture')}
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>阅读文章</span>
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
