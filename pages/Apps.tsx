import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Apps: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-20 relative z-10 overflow-y-auto">
      <div className="max-w-4xl w-full mt-10 md:mt-20">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight uppercase italic">Product Toolkit</h1>
          <p className="text-gray-500 font-mono text-sm md:text-base tracking-widest border-l-2 border-red-600 pl-4 py-1">
            开箱即用的提效工具箱与自动化脚本。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: KB Generator */}
          <div className="bg-white/80 border border-gray-200 backdrop-blur-xl rounded-lg p-6 hover:shadow-xl hover:border-gray-600/30 transition-all duration-300 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">📄</span>
              <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded-full border border-gray-200">
                🛠️ CLI Tool
              </span>
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                RAG 知识库构建生成器
              </h2>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                基于 Python 的命令行工具。将非结构化文档（PDF/Word）一键转化为标准化的 QA 问答对，为 AI 知识库提供高质量燃料。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">TECH STACK</span>
                <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded inline-block">
                  Python / LangChain / Markdown
                </span>
              </div>
              <button className="w-full py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                <span>获取源码</span>
                <span className="text-xs opacity-50">⬇</span>
              </button>
            </div>
          </div>

          {/* Card 2: Excel Automator */}
          <div className="bg-white/80 border border-gray-200 backdrop-blur-xl rounded-lg p-6 hover:shadow-xl hover:border-yellow-600/30 transition-all duration-300 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">📊</span>
              <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full border border-yellow-200">
                ⚡ Automation
              </span>
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                万能数据清洗脚本包
              </h2>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                拒绝手动复制粘贴。包含表格合并、字段提取、格式转换等 10+ 个常用 Python 脚本，专治各种 Excel 疑难杂症。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">TECH STACK</span>
                <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded inline-block">
                  Pandas / OpenPyXL / Regex
                </span>
              </div>
              <button className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:border-yellow-500 hover:text-yellow-600 transition-colors flex items-center justify-center gap-2">
                <span>查看清单</span>
                <span className="text-xs opacity-50">📋</span>
              </button>
            </div>
          </div>

          {/* Card 3: DeepSeek Deployer */}
          <div className="bg-white/80 border border-gray-200 backdrop-blur-xl rounded-lg p-6 hover:shadow-xl hover:border-orange-600/30 transition-all duration-300 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">🤖</span>
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full border border-orange-200">
                🔥 Trending
              </span>
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                DeepSeek 本地部署助手
              </h2>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                一键配置 Ollama + DeepSeek + Chatbox UI。让你的电脑拥有离线、隐私安全的私人 AI 大模型环境。
              </p>
            </div>
            <div className="mt-auto">
              <div className="mb-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-mono text-gray-400 block mb-1">TECH STACK</span>
                <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded inline-block">
                  Docker / Ollama / Shell
                </span>
              </div>
              <button className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:border-orange-500 hover:text-orange-600 transition-colors flex items-center justify-center gap-2">
                <span>查看教程</span>
                <span className="text-xs opacity-50">📖</span>
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
