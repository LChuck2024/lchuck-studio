import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Apps: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 md:px-8 py-20 relative z-10 overflow-y-auto">
      <div className="max-w-[1600px] w-full mx-auto mt-10 md:mt-20">
        <div className="mb-12 text-left">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight uppercase italic">Product Hub</h1>
          <p className="text-gray-500 font-mono text-sm md:text-base tracking-widest border-l-2 border-red-600 pl-4 py-1">
            拒绝重复造轮。工具、服务与实验性产品。
          </p>
        </div>

        {/* Section 1: 工具与脚本 (TOOLS & SCRIPTS) */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 font-mono tracking-widest flex items-center gap-2">
            <span>🛠️</span> 工具与脚本 (TOOLS & SCRIPTS)
          </h2>
          <p className="text-gray-500 text-sm font-mono mb-6">开箱即用的软件与脚本。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Card 1: RAG 数据清洗 GUI */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🧹</span>
                <span className="bg-yellow-100 text-yellow-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-yellow-200">
                  软件
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
                <button className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2">
                  <span>获取软件</span>
                  <span className="text-xs opacity-50">⬇</span>
                </button>
              </div>
            </div>

            {/* Card 2: 欧洲开放大学选课查询器 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🇪🇺</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-green-200">
                  免费
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  欧洲开放大学选课查询器
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  拒绝中介信息差。270+ 门课程已清洗分级，一键筛选学科/学费/学分。官网申请免费。
                </p>
              </div>
              <div className="mt-auto">
                <div className="mb-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-mono text-gray-400 block mb-1">TECH STACK</span>
                  <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                    WPS AI / 主数据
                  </span>
                </div>
                <a
                  href="https://web.wps.cn/wo/sl/v31rzbsD?app_id=1PKY0UiCwcIPzRKjh3CoI6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>免费查询</span>
                  <span className="text-xs opacity-50">↗</span>
                </a>
              </div>
            </div>

            {/* Card 3: 小红书笔记整形工厂 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">📱</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-green-200">
                  文案
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
                <button className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
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
                  脚本
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
                <button className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                  <span>查看清单</span>
                  <span className="text-xs opacity-50">📋</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Section 2: 服务与咨询 (SERVICES & CONSULTING) */}
        <div className="mt-20">
          <h2 className="text-xl font-bold text-gray-900 mb-6 font-mono tracking-widest flex items-center gap-2">
            <span>💼</span> 服务与咨询 (SERVICES & CONSULTING)
          </h2>
          <p className="text-gray-500 text-sm font-mono mb-6">代办接单与 1V1 咨询。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Card 1: 数据清洗代办服务 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">📦</span>
                <span className="bg-orange-100 text-orange-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-orange-200">
                  代办
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  数据清洗代办服务
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  拒绝手动复制粘贴。Excel 合并、字段提取、格式转换。闲鱼/微信接单，立等可取。
                </p>
              </div>
              <div className="mt-auto">
                <div className="mb-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-mono text-gray-400 block mb-1">交付方式</span>
                  <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                    闲鱼 / 微信
                  </span>
                </div>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'data-architect', message: '我想咨询数据清洗代办服务！' } }))}
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>咨询接单</span>
                  <span className="text-xs opacity-50">↗</span>
                </button>
              </div>
            </div>

            {/* Card 2: 代码优化服务 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">⚡</span>
                <span className="bg-teal-100 text-teal-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-teal-200">
                  代码
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                  代码优化服务
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Python / Spark / SQL 性能调优、重构、代码审查。提升可读性与可维护性，与数据清洗代办区分——改代码而非代跑数据。
                </p>
              </div>
              <div className="mt-auto">
                <div className="mb-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-mono text-gray-400 block mb-1">交付方式</span>
                  <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                    微信 / 邮箱
                  </span>
                </div>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'data-architect', message: '我想咨询代码优化与性能调优！' } }))}
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>预约咨询</span>
                  <span className="text-xs opacity-50">↗</span>
                </button>
              </div>
            </div>

            {/* Card 3: CDC 架构咨询服务 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🏗️</span>
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-indigo-200">
                  架构
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  CDC 架构咨询服务
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  企业级数据中台落地。CDC 增量、SCD 拉链、配置驱动 ETL。10 年架构师 1V1 咨询。
                </p>
              </div>
              <div className="mt-auto">
                <div className="mb-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-mono text-gray-400 block mb-1">交付方式</span>
                  <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                    ¥498/小时
                  </span>
                </div>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'data-architect', message: '我想预约 CDC 架构咨询服务！' } }))}
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>预约咨询</span>
                  <span className="text-xs opacity-50">↗</span>
                </button>
              </div>
            </div>

            {/* Card 4: 主数据咨询服务 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🗄️</span>
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-indigo-200">
                  主数据
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  主数据咨询服务
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  主数据治理、维度建模、标准化、映射表设计。产品/客户/组织主数据 SSOT 落地，配置驱动 ETL。
                </p>
              </div>
              <div className="mt-auto">
                <div className="mb-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-mono text-gray-400 block mb-1">交付方式</span>
                  <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                    微信 / 邮箱
                  </span>
                </div>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'data-architect', message: '我想咨询主数据治理与 MDM 落地！' } }))}
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>预约咨询</span>
                  <span className="text-xs opacity-50">↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: 实验室 / 路线图 (THE LAB) */}
        <div className="mt-20">
          <h2 className="text-xl font-bold text-gray-900 mb-6 font-mono tracking-widest flex items-center gap-2">
            <span>🚧</span> 实验室 / 路线图 (THE LAB)
          </h2>
          <p className="text-gray-500 text-sm font-mono mb-6">实验性或在规划中。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Card 1: OpenClaw 智能体部署包 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 opacity-80 hover:opacity-90 transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🦞</span>
                <span className="bg-neutral-100 text-neutral-500 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200">
                  开发中
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                  OpenClaw 智能体部署包
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  你的 24/7 私人 AI 助理。基于 OpenClaw 开源架构，自动执行文件操作与代码任务。
                </p>
              </div>
              <div className="mt-auto">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { message: '我想了解 OpenClaw 智能体部署包的演示！' } }))}
                  className="w-full py-2 bg-neutral-100 text-neutral-600 rounded-sm text-sm font-medium font-mono hover:bg-neutral-200 border-none transition-colors flex items-center justify-center gap-2"
                >
                  <span>查看演示</span>
                  <span className="text-xs opacity-70">▷</span>
                </button>
              </div>
            </div>

            {/* Card 2: RAG 知识库构建生成器 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 opacity-80 hover:opacity-90 transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">📄</span>
                <span className="bg-neutral-100 text-neutral-500 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200">
                  命令行
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

            {/* Card 3: DeepSeek 本地部署懒人包 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 opacity-80 hover:opacity-90 transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🤖</span>
                <span className="bg-neutral-100 text-neutral-500 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200">
                  开发中
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
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { message: '我想预约 DeepSeek 本地部署懒人包内测！' } }))}
                  className="w-full py-2 bg-neutral-100 text-neutral-600 rounded-sm text-sm font-medium font-mono hover:bg-neutral-200 border-none transition-colors flex items-center justify-center gap-2"
                >
                  <span>预约内测</span>
                  <span className="text-xs opacity-70">🔔</span>
                </button>
              </div>
            </div>

            {/* Card 4: 万能发票重命名工具 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 opacity-80 hover:opacity-90 transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">📑</span>
                <span className="bg-neutral-100 text-neutral-500 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200">
                  规划中
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
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { message: '我想催更发票重命名工具！' } }))}
                  className="w-full py-2 bg-neutral-100 text-neutral-600 rounded-sm text-sm font-medium font-mono hover:bg-neutral-200 border-none transition-colors flex items-center justify-center gap-2"
                >
                  <span>点击催更</span>
                  <span className="text-xs opacity-70">👍</span>
                </button>
              </div>
            </div>

            {/* Card 5: 飞书 P0 管理法模板 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 opacity-80 hover:opacity-90 transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🧠</span>
                <span className="bg-neutral-100 text-neutral-500 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200">
                  模板
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                  飞书 P0 管理法模板
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  拒绝伪勤奋。多维表格「战略指挥部」模板，职场/副业/家庭精力管理。
                </p>
              </div>
              <div className="mt-auto">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'solo-preneur', message: '我想获取飞书 P0 管理法模板！' } }))}
                  className="w-full py-2 bg-neutral-100 text-neutral-600 rounded-sm text-sm font-medium font-mono hover:bg-neutral-200 border-none transition-colors flex items-center justify-center gap-2"
                >
                  <span>咨询获取</span>
                  <span className="text-xs opacity-70">📋</span>
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
