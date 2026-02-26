import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Agents: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-20 relative z-10 overflow-y-auto">
      <div className="max-w-4xl w-full mt-10 md:mt-20">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight uppercase italic">Digital Workforce</h1>
          <p className="text-gray-500 font-mono text-sm md:text-base tracking-widest border-l-2 border-red-600 pl-4 py-1">
            24/7 待命的自动化专家与智能代理。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Uni-Selector */}
          <div className="bg-white/80 border border-gray-200 backdrop-blur-xl rounded-lg p-6 hover:shadow-xl hover:border-red-600/30 transition-all duration-300 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">🇪🇺</span>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full border border-green-200">
                🟢 Online
              </span>
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                欧洲开放大学智能选课助手
              </h2>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                基于 Python 清洗的 270+ 门课程数据库。拒绝中介信息差，一键匹配你的转码/润学方案。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">TECH STACK</span>
                <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded inline-block">
                  Python / Pandas / WPS AI
                </span>
              </div>
              <button className="w-full py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                <span>免费查询</span>
                <span className="text-xs opacity-50">↗</span>
              </button>
            </div>
          </div>

          {/* Card 2: Data Alchemist */}
          <div className="bg-white/80 border border-gray-200 backdrop-blur-xl rounded-lg p-6 hover:shadow-xl hover:border-yellow-600/30 transition-all duration-300 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">🧹</span>
              <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full border border-yellow-200">
                🟡 Internal
              </span>
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                RAG 知识库清洗专家
              </h2>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                非结构化文档转 QA 格式的自动化流水线。专为 DeepSeek/Dify 知识库优化，解决"AI 答非所问"的痛点。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">TECH STACK</span>
                <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded inline-block">
                  LangChain / Gemini API
                </span>
              </div>
              <button className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:border-yellow-500 hover:text-yellow-600 transition-colors flex items-center justify-center gap-2">
                <span>获取源码</span>
                <span className="text-xs opacity-50">⬇</span>
              </button>
            </div>
          </div>

          {/* Card 3: CDC Engine */}
          <div className="bg-white/80 border border-gray-200 backdrop-blur-xl rounded-lg p-6 hover:shadow-xl hover:border-blue-600/30 transition-all duration-300 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">🏗️</span>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full border border-blue-200">
                🔵 Architecture
              </span>
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                企业级数据中台引擎
              </h2>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                配置驱动型 ETL 核心架构。集成了 <strong>CDC 增量同步</strong> 与 <strong>SCD 历史拉链 (Type2)</strong>，解决数据准实时入仓与历史回溯难题。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">TECH STACK</span>
                <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded inline-block">
                  Spark / Delta Lake / Python
                </span>
              </div>
              <button className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
                <span>查看架构图</span>
                <span className="text-xs opacity-50">👁️</span>
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
