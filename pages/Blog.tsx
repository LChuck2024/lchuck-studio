import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Blog: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 md:px-8 py-20 relative z-10 overflow-y-auto">
      <div className="max-w-[1400px] w-full mx-auto mt-10 md:mt-20">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight uppercase italic">ENGINEERING LOG</h1>
          <p className="text-gray-500 font-mono text-sm md:text-base tracking-widest border-l-2 border-red-600 pl-4 py-1">
            构建数字资产的实战笔记与深度复盘。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Tech Deep Dive */}
          <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">🏗️</span>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-blue-200">
                🔵 Architecture
              </span>
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                从 SQL 到 Python：配置驱动型 ETL 架构演进
              </h2>
              <div className="text-xs text-gray-400 font-mono mb-3">2026.02.13 · Tech Design</div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                复盘如何将 95+ 个硬编码脚本重构为自动化流水线。关于 CDC 增量同步与 SCD 历史拉链的工程实践。
              </p>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-100">
              <button
                onClick={() => navigate('/blog/etl-architecture')}
                className="w-full py-2 bg-white border border-neutral-200 text-gray-700 rounded-sm text-sm font-medium font-mono hover:border-black transition-colors flex items-center justify-center gap-2"
              >
                <span>阅读文章</span>
                <span className="text-xs opacity-50">↗</span>
              </button>
            </div>
          </div>

          {/* Card 2: Indie Hacker Journey */}
          <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">🚀</span>
              <span className="bg-green-100 text-green-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-green-200">
                🟢 Growth
              </span>
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                一人公司实录：从 0 到 1 构建 LCHUCK STUDIO
              </h2>
              <div className="text-xs text-gray-400 font-mono mb-3">2026.02.26 · Retrospective</div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                技术栈选型（Next.js + EdgeOne）、产品矩阵设计与流量冷启动的真实数据复盘。如何用架构思维经营生意。
              </p>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-100">
              <button className="w-full py-2 bg-white border border-neutral-200 text-gray-700 rounded-sm text-sm font-medium font-mono hover:border-black transition-colors flex items-center justify-center gap-2">
                <span>阅读文章</span>
                <span className="text-xs opacity-50">↗</span>
              </button>
            </div>
          </div>

          {/* Card 3: The Mindset */}
          <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">🧠</span>
              <span className="bg-purple-100 text-purple-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-purple-200">
                🟣 Methodology
              </span>
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                P0 管理法：35+ 程序员的精力管理系统
              </h2>
              <div className="text-xs text-gray-400 font-mono mb-3">2026.02.05 · LifeOS</div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                拒绝伪勤奋。如何利用飞书多维表格构建'战略指挥部'，在职场、副业与家庭之间寻找动态平衡。
              </p>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-100">
              <button className="w-full py-2 bg-white border border-neutral-200 text-gray-700 rounded-sm text-sm font-medium font-mono hover:border-black transition-colors flex items-center justify-center gap-2">
                <span>阅读文章</span>
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
    </div>
  );
};
