import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Apps: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-20 relative z-10 overflow-y-auto">
      <div className="max-w-[1600px] w-full mx-auto px-6 mt-10 md:mt-20">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight uppercase italic">Product Toolkit</h1>
          <p className="text-gray-500 font-mono text-sm md:text-base tracking-widest border-l-2 border-red-600 pl-4 py-1">
            开箱即用的提效工具箱与自动化脚本。
          </p>
        </div>

        {/* Section 1: 核心交付 (CORE UTILITIES) */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 font-mono tracking-widest flex items-center gap-2">
            <span>⚡</span> 核心交付 (CORE UTILITIES)
          </h2>
          <p className="text-gray-500 text-sm font-mono mb-6">Ready-to-use tools.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Card 1: RAG 数据清洗 GUI */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🧹</span>
                <span className="bg-yellow-100 text-yellow-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-yellow-200">
                  GUI
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                  RAG 数据清洗 GUI
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  带界面的本地清洗工具。拖入 PDF/Word，自动输出 DeepSeek 可用的 JSONL 训练集。
                </p>
              </div>
              <div className="mt-auto">
                <div className="mb-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-mono text-gray-400 block mb-1">TECH STACK</span>
                  <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                    Python / Streamlit
                  </span>
                </div>
                <button className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                  <span>获取软件</span>
                  <span className="text-xs opacity-50">⬇</span>
                </button>
              </div>
            </div>

            {/* Card 2: OpenClaw 智能体部署包 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🦞</span>
                <span className="bg-red-100 text-red-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-red-200">
                  AGENT
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  OpenClaw 智能体部署包
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  你的 24/7 私人 AI 助理。基于 OpenClaw 开源架构，自动执行文件操作与代码任务。
                </p>
              </div>
              <div className="mt-auto">
                <div className="mb-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-mono text-gray-400 block mb-1">TECH STACK</span>
                  <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                    OpenClaw / Docker
                  </span>
                </div>
                <a
                  href="#"
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>查看演示</span>
                  <span className="text-xs opacity-50">▷</span>
                </a>
              </div>
            </div>

            {/* Card 3: 小红书笔记整形工厂 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">📱</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-green-200">
                  GROWTH
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  小红书笔记整形工厂
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  专为技术博主设计。输入粗糙想法，一键生成「情绪对立+硬核干货」风格爆款文案。
                </p>
              </div>
              <div className="mt-auto">
                <div className="mb-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-mono text-gray-400 block mb-1">TECH STACK</span>
                  <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                    Gemini API / Regex
                  </span>
                </div>
                <button className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                  <span>获取工具</span>
                  <span className="text-xs opacity-50">⚡</span>
                </button>
              </div>
            </div>

            {/* Card 4: 万能数据清洗脚本包 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">📊</span>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-blue-200">
                  SCRIPT
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  万能数据清洗脚本包
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  拒绝手动复制粘贴。包含表格合并、字段提取等 10+ 个常用 Python 脚本。
                </p>
              </div>
              <div className="mt-auto">
                <div className="mb-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-mono text-gray-400 block mb-1">TECH STACK</span>
                  <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                    Pandas / OpenPyXL
                  </span>
                </div>
                <button className="w-full py-2 bg-white border border-neutral-200 text-gray-700 rounded-sm text-sm font-medium font-mono hover:border-black transition-colors flex items-center justify-center gap-2">
                  <span>查看清单</span>
                  <span className="text-xs opacity-50">📋</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: 实验室 / 路线图 (THE LAB) */}
        <div className="mt-20">
          <h2 className="text-xl font-bold text-gray-900 mb-6 font-mono tracking-widest flex items-center gap-2">
            <span>🚧</span> 实验室 / 路线图 (THE LAB)
          </h2>
          <p className="text-gray-500 text-sm font-mono mb-6">Experimental or upcoming.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Card 1: RAG 知识库构建生成器 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 opacity-80 hover:opacity-90 transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">📄</span>
                <span className="bg-neutral-100 text-neutral-500 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200">
                  CLI
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                  RAG 知识库构建生成器
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  基于 Python 的命令行工具。将非结构化文档转化为标准化的 QA 问答对。
                </p>
              </div>
              <div className="mt-auto">
                <button className="w-full py-2 bg-neutral-100 text-neutral-600 rounded-sm text-sm font-medium font-mono hover:bg-neutral-200 border-none transition-colors flex items-center justify-center gap-2">
                  <span>获取源码</span>
                  <span className="text-xs opacity-70">⬇</span>
                </button>
              </div>
            </div>

            {/* Card 2: DeepSeek 本地部署懒人包 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 opacity-80 hover:opacity-90 transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🤖</span>
                <span className="bg-neutral-100 text-neutral-500 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200">
                  WIP
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                  DeepSeek 本地部署懒人包
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  一键检测硬件、部署模型、启动 UI。打造隐私安全的离线 AI 环境。
                </p>
              </div>
              <div className="mt-auto">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: {} }))}
                  className="w-full py-2 bg-neutral-100 text-neutral-600 rounded-sm text-sm font-medium font-mono hover:bg-neutral-200 border-none transition-colors flex items-center justify-center gap-2"
                >
                  <span>预约内测</span>
                  <span className="text-xs opacity-70">🔔</span>
                </button>
              </div>
            </div>

            {/* Card 3: 万能发票重命名工具 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 opacity-80 hover:opacity-90 transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">📑</span>
                <span className="bg-neutral-100 text-neutral-500 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200">
                  PLAN
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                  万能发票重命名工具
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  自动提取 PDF 发票金额/日期并重命名。财务报销效率神器。
                </p>
              </div>
              <div className="mt-auto">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: {} }))}
                  className="w-full py-2 bg-neutral-100 text-neutral-600 rounded-sm text-sm font-medium font-mono hover:bg-neutral-200 border-none transition-colors flex items-center justify-center gap-2"
                >
                  <span>点击催更</span>
                  <span className="text-xs opacity-70">👍</span>
                </button>
              </div>
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
