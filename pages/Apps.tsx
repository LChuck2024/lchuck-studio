import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CTASection } from '../components/CTASection';

/** 万能数据清洗脚本包清单 */
const SCRIPT_LIST = [
  { name: '多表合并', desc: '多个 Excel/CSV 文件按行或列合并', tech: 'Pandas' },
  { name: '多 Sheet 合并', desc: '单文件内多 Sheet 合并为一张表', tech: 'OpenPyXL' },
  { name: '字段提取 / 列筛选', desc: '按列名或索引保留/剔除列', tech: 'Pandas' },
  { name: '去重', desc: '按指定列或全行去重', tech: 'Pandas' },
  { name: '空值处理', desc: '填充、删除或标记空值', tech: 'Pandas' },
  { name: '日期标准化', desc: '统一日期格式与时区', tech: 'Pandas' },
  { name: '文本清洗', desc: '去空格、大小写、特殊字符', tech: 'Pandas' },
  { name: '列拆分', desc: '按分隔符或正则拆分单列', tech: 'Pandas' },
  { name: '列合并', desc: '多列拼接为新列', tech: 'Pandas' },
  { name: 'Excel 转 CSV', desc: '批量 xlsx/xls 转 csv', tech: 'OpenPyXL' },
  { name: 'CSV 合并', desc: '多 CSV 文件合并', tech: 'Pandas' },
  { name: '编码转换', desc: 'GBK/UTF-8/BOM 等编码转换', tech: 'Python' },
  { name: '数据校验', desc: '格式校验、范围校验、必填校验', tech: 'Pandas' },
  { name: '重复值标记', desc: '标记重复行并导出', tech: 'Pandas' },
  { name: '条件筛选导出', desc: '按条件筛选后导出子集', tech: 'Pandas' },
  { name: '行列转置', desc: '行转列、列转行', tech: 'Pandas' },
  { name: '按列拆分到多文件', desc: '按某列取值拆分到多个文件', tech: 'Pandas' },
  { name: '正则提取', desc: '从文本列中提取匹配内容', tech: 'Pandas' },
];

export const Apps: React.FC = () => {
  const navigate = useNavigate();
  const [scriptListOpen, setScriptListOpen] = useState(false);

  useEffect(() => {
    if (!scriptListOpen) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setScriptListOpen(false);
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [scriptListOpen]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 md:px-8 py-20 relative z-10 overflow-y-auto">
      <div className="max-w-[1600px] w-full mx-auto mt-10 md:mt-20">
        <div className="mb-12 text-left">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight uppercase italic">Product Hub</h1>
          <p className="text-gray-500 font-mono text-sm md:text-base tracking-widest border-l-2 border-red-600 pl-4 py-1">
            拒绝重复造轮子。工具、服务与实验性产品。
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
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'data-architect', message: '我想获取 RAG 数据清洗 GUI 软件！' } }))}
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
                >
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
                  付费
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
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'solo-preneur', message: '我想了解小红书笔记整形工厂，如何购买？' } }))}
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>咨询购买</span>
                  <span className="text-xs opacity-50">↗</span>
                </button>
              </div>
            </div>

            {/* Card 4: 提示词模板包 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">📝</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold font-mono px-2 py-1 rounded-sm border border-green-200">
                  付费
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  提示词模板包
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  主理人自用精选。人生战略审计师、CTO、主数据治理、情感顾问等，可直接用于 ChatGPT / DeepSeek / Copilot。
                </p>
              </div>
              <div className="mt-auto">
                <div className="mb-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-mono text-gray-400 block mb-1">CAPABILITIES</span>
                  <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                    人生 / 技术 / 情感
                  </span>
                </div>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'solo-preneur', message: '我想了解提示词模板包，如何购买？' } }))}
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>咨询购买</span>
                  <span className="text-xs opacity-50">↗</span>
                </button>
              </div>
            </div>

            {/* Card 5: 万能数据清洗脚本包 */}
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
                  拒绝手动复制粘贴。包含表格合并、字段提取等 18 个常用 Python 脚本。
                </p>
              </div>
              <div className="mt-auto">
                <div className="mb-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-mono text-gray-400 block mb-1">TECH STACK</span>
                  <span className="text-xs font-medium font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-sm inline-block">
                    Pandas / OpenPyXL
                  </span>
                </div>
                <button
                  onClick={() => setScriptListOpen(true)}
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
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
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'data-architect', message: '我想获取 RAG 知识库构建生成器的源码！' } }))}
                  className="w-full py-2 bg-neutral-100 text-neutral-600 rounded-sm text-sm font-medium font-mono hover:bg-neutral-200 border-none transition-colors flex items-center justify-center gap-2"
                >
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

        <CTASection />

        <div className="mt-16 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-red-600 transition-colors font-mono text-sm tracking-widest uppercase"
          >
            ← Return to Command Center
          </button>
        </div>
      </div>

      {/* 万能数据清洗脚本包清单弹窗 */}
      {scriptListOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setScriptListOpen(false)}
        >
          <div
            className="bg-white rounded-sm shadow-xl border border-neutral-200 max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
              <h3 className="text-lg font-bold text-gray-900 font-mono">万能数据清洗脚本包</h3>
              <button
                onClick={() => setScriptListOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="关闭"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto p-6">
              <p className="text-gray-500 text-sm mb-4">Pandas / OpenPyXL · 共 {SCRIPT_LIST.length} 个脚本</p>
              <ul className="space-y-3">
                {SCRIPT_LIST.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                    <span className="text-blue-600 font-mono text-sm shrink-0 w-6">{i + 1}.</span>
                    <div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <p className="text-gray-500 text-sm mt-0.5">{item.desc}</p>
                      <span className="text-xs text-gray-400 font-mono">{item.tech}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-sm mt-6">
                需要脚本或定制？可点击下方按钮咨询数据架构师。
              </p>
              <button
                onClick={() => {
                  setScriptListOpen(false);
                  window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'data-architect', message: '我想了解万能数据清洗脚本包，如何获取？' } }));
                }}
                className="mt-4 w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-blue-600 transition-colors"
              >
                咨询获取
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
