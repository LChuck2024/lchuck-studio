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
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight uppercase italic">Solutions & Prototypes</h1>
          <p className="text-gray-500 font-mono text-sm md:text-base tracking-widest border-l-2 border-red-600 pl-4 py-1">
            基于垂直行业痛点，利用 RAG 架构与 Agent 编排构建的生产力工具实验场。
          </p>
        </div>

        {/* 分类锚点导航 */}
        <nav className="flex flex-wrap gap-2 mb-12 border-b border-neutral-200 pb-4">
          <a href="#enterprise-data" className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 hover:text-red-600 transition-colors px-2 py-1 border border-transparent hover:border-neutral-300 rounded-sm">
            01 Enterprise Data
          </a>
          <a href="#personal-growth" className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 hover:text-red-600 transition-colors px-2 py-1 border border-transparent hover:border-neutral-300 rounded-sm">
            02 Personal Growth
          </a>
          <a href="#developer-tools" className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 hover:text-red-600 transition-colors px-2 py-1 border border-transparent hover:border-neutral-300 rounded-sm">
            03 Developer Tools
          </a>
        </nav>

        {/* Section 1: Enterprise Data (企业数据) */}
        <section id="enterprise-data" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-gray-900 mb-2 font-mono tracking-widest flex items-center gap-2">
            <span className="text-neutral-400">01</span> Enterprise Data (企业数据)
          </h2>
          <p className="text-gray-500 text-sm font-mono mb-6">主数据治理、数据清洗、ETL 架构与咨询原型。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Card 1: RAG 数据清洗 GUI */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🧹</span>
                <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200 uppercase tracking-wider">
                  Enterprise Data
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  RAG 数据清洗 GUI
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  针对非结构化文档难以直接用于 LLM 微调的痛点，采用本地 Pipeline 进行 PDF/Word 解析与 Chunk 切分，输出 DeepSeek 可用的 JSONL 训练集，实现私有语料的高效 RAG 化。
                </p>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] font-mono text-gray-400 mb-3 tracking-wider">Python · Streamlit · PDF Parser · JSONL</p>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'data-architect', message: '我想申请访问 RAG 数据清洗 GUI。为了维持实验室算力成本，本原型采用 License 授权模式，赞助算力即可获得无限次访问权限。' } }))}
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors"
                >
                  申请访问
                </button>
              </div>
            </div>

            {/* Card 2: 万能数据清洗脚本包 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">📊</span>
                <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200 uppercase tracking-wider">
                  Enterprise Data
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  万能数据清洗脚本包
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  针对重复性 Excel/CSV 手工操作效率低下的痛点，采用配置驱动型 Python Pipeline，覆盖多表合并、字段提取、去重、编码转换等 18 个原子算子，实现数据清洗的标准化与可复用。
                </p>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] font-mono text-gray-400 mb-3 tracking-wider">Pandas · OpenPyXL · Config-Driven ETL</p>
                <button
                  onClick={() => setScriptListOpen(true)}
                  className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors"
                >
                  架构详情
                </button>
              </div>
            </div>

            {/* 数据清洗代办 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">📦</span>
                <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200 uppercase tracking-wider">Enterprise Data</span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">数据清洗代办</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">针对业务侧缺乏数据工程能力、重复性清洗需求外包难的痛点，采用标准化 Pipeline 与交付 SOP，实现 Excel 合并、字段提取、格式转换的快速交付。</p>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] font-mono text-gray-400 mb-3 tracking-wider">Pandas · OpenPyXL · SOP</p>
                <button onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'data-architect', message: '我想了解数据清洗代办的架构与交付流程。为了维持实验室算力成本，本原型采用 License 授权模式。' } }))} className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors">申请访问</button>
              </div>
            </div>

            {/* CDC 架构咨询 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🏗️</span>
                <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200 uppercase tracking-wider">Enterprise Data</span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">CDC 架构咨询</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">针对企业级数据中台增量同步与历史追溯的痛点，采用 CDC + SCD 拉链 + 配置驱动 ETL 架构，实现 10 年架构师经验的方法论输出与 1V1 深度咨询。</p>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] font-mono text-gray-400 mb-3 tracking-wider">CDC · SCD · Config-Driven ETL</p>
                <button onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'data-architect', message: '我想了解 CDC 架构咨询的流程与架构详情。为了维持实验室算力成本，本原型采用 License 授权模式。' } }))} className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors">架构详情</button>
              </div>
            </div>

            {/* 主数据咨询 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🗄️</span>
                <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200 uppercase tracking-wider">Enterprise Data</span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">主数据咨询</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">针对产品/客户/组织主数据分散、同义词未归一化的痛点，采用 SSOT 与映射表设计，结合配置驱动 ETL，实现主数据治理的落地与可持续运维。</p>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] font-mono text-gray-400 mb-3 tracking-wider">SSOT · Mapping Table · MDM</p>
                <button onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'data-architect', message: '我想了解主数据治理与 MDM 落地的架构详情。为了维持实验室算力成本，本原型采用 License 授权模式。' } }))} className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors">架构详情</button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Personal Growth (个人成长) */}
        <section id="personal-growth" className="mt-20 pt-12 border-t border-neutral-100 scroll-mt-24">
          <h2 className="text-xl font-bold text-gray-900 mb-2 font-mono tracking-widest flex items-center gap-2">
            <span className="text-neutral-400">02</span> Personal Growth (个人成长)
          </h2>
          <p className="text-gray-500 text-sm font-mono mb-6">内容生产、留学规划、精力管理、方法论沉淀相关原型。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* 欧洲开放大学选课查询器 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🇪🇺</span>
                <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200 uppercase tracking-wider">
                  Personal Growth
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  欧洲开放大学选课查询器
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  针对留学信息不对称与中介溢价痛点，采用主数据清洗与分级建模，将 270+ 门课程结构化，实现学科/学费/学分的多维度筛选，消除信息差，支持官网自助申请。
                </p>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] font-mono text-gray-400 mb-3 tracking-wider">WPS AI · 主数据 · 多维筛选</p>
                <a
                  href="https://web.wps.cn/wo/sl/v31rzbsD?app_id=1PKY0UiCwcIPzRKjh3CoI6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors text-center"
                >
                  启动原型
                </a>
              </div>
            </div>
            {/* 小红书笔记整形工厂 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">📱</span>
                <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200 uppercase tracking-wider">Personal Growth</span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">小红书笔记整形工厂</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">针对技术博主内容转化率低、爆款结构难复制的痛点，采用 LLM + 结构化 Prompt 编排，将粗糙想法转化为「情绪对立+硬核干货」双轨输出，实现高互动率的内容生产。</p>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] font-mono text-gray-400 mb-3 tracking-wider">Gemini API · Regex · Prompt Engineering</p>
                <button onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'solo-preneur', message: '我想申请访问小红书笔记整形工厂。为了维持实验室算力成本，本原型采用 License 授权模式，赞助算力即可获得无限次访问权限。' } }))} className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors">申请访问</button>
              </div>
            </div>
            {/* 提示词模板包 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">📝</span>
                <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200 uppercase tracking-wider">Personal Growth</span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">提示词模板包</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">针对通用 LLM 难以直接产出结构化、可复现输出的痛点，采用领域 Prompt 工程与角色设定编排，覆盖人生战略、CTO 决策、主数据治理等场景，实现 ChatGPT / DeepSeek / Copilot 的即插即用。</p>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] font-mono text-gray-400 mb-3 tracking-wider">Prompt Engineering · Multi-LLM · Role Design</p>
                <button onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'solo-preneur', message: '我想申请访问提示词模板包。为了维持实验室算力成本，本原型采用 License 授权模式，赞助算力即可获得无限次访问权限。' } }))} className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors">申请访问</button>
              </div>
            </div>
            {/* 飞书 P0 管理法模板 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🧠</span>
                <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200 uppercase tracking-wider">Personal Growth</span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">飞书 P0 管理法模板</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">针对职场/副业/家庭精力分散、优先级难以量化的痛点，采用飞书多维表格的「战略指挥部」架构，实现 P0 任务的动态排序与精力分配的可视化管理。</p>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] font-mono text-gray-400 mb-3 tracking-wider">Feishu · Multi-Dimensional Table · P0</p>
                <button onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'solo-preneur', message: '我想申请访问飞书 P0 管理法模板。为了维持实验室算力成本，本原型采用 License 授权模式。' } }))} className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors">申请访问</button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Developer Tools (开发者工具) */}
        <section id="developer-tools" className="mt-20 pt-12 border-t border-neutral-100 scroll-mt-24">
          <h2 className="text-xl font-bold text-gray-900 mb-2 font-mono tracking-widest flex items-center gap-2">
            <span className="text-neutral-400">03</span> Developer Tools (开发者工具)
          </h2>
          <p className="text-gray-500 text-sm font-mono mb-6">RAG、Agent、本地部署与代码工程相关原型。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* 代码优化服务 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">⚡</span>
                <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200 uppercase tracking-wider">Developer Tools</span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">代码优化服务</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">针对 Python / Spark / SQL 性能瓶颈与可维护性债务的痛点，采用静态分析 + 重构模式，实现性能调优、代码审查与架构升级的方法论输出。</p>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] font-mono text-gray-400 mb-3 tracking-wider">Python · Spark · SQL · Refactoring</p>
                <button onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'data-architect', message: '我想了解代码优化与性能调优的架构详情。为了维持实验室算力成本，本原型采用 License 授权模式。' } }))} className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors">架构详情</button>
              </div>
            </div>
            {/* OpenClaw 智能体部署包 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full opacity-90 hover:opacity-100">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🦞</span>
                <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200 uppercase tracking-wider">Developer Tools</span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">OpenClaw 智能体部署包</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">针对 24/7 自动化任务执行与代码编排的痛点，采用 OpenClaw 开源架构，实现文件操作、代码任务与 Agent 编排的本地部署，打造私人 AI 助理原型。</p>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] font-mono text-gray-400 mb-3 tracking-wider">OpenClaw · Agent · Local Deploy</p>
                <button onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { message: '我想了解 OpenClaw 智能体部署包的架构与演示。' } }))} className="w-full py-2 border-2 border-neutral-300 text-gray-800 rounded-sm text-sm font-medium font-mono hover:border-neutral-400 hover:bg-neutral-50 transition-colors">架构详情</button>
              </div>
            </div>

            {/* RAG 知识库构建生成器 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">📄</span>
                <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200 uppercase tracking-wider">Developer Tools</span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">RAG 知识库构建生成器</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">针对非结构化文档难以直接用于 RAG 检索的痛点，采用 Python CLI + 分块策略，将文档转化为标准化 QA 问答对，实现知识库的快速构建与向量化。</p>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] font-mono text-gray-400 mb-3 tracking-wider">Python · CLI · Chunking · QA Pair</p>
                <button onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'data-architect', message: '我想申请访问 RAG 知识库构建生成器。为了维持实验室算力成本，本原型采用 License 授权模式。' } }))} className="w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors">申请访问</button>
              </div>
            </div>

            {/* DeepSeek 本地部署懒人包 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full opacity-90 hover:opacity-100">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🤖</span>
                <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200 uppercase tracking-wider">Developer Tools</span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">DeepSeek 本地部署懒人包</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">针对隐私敏感场景与离线 AI 需求的痛点，采用硬件检测 + 模型部署 + UI 启动的一体化脚本，实现本地大模型的快速部署与隐私安全环境构建。</p>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] font-mono text-gray-400 mb-3 tracking-wider">DeepSeek · Local LLM · Ollama</p>
                <button onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { message: '我想了解 DeepSeek 本地部署懒人包的架构与内测安排。' } }))} className="w-full py-2 border-2 border-neutral-300 text-gray-800 rounded-sm text-sm font-medium font-mono hover:border-neutral-400 hover:bg-neutral-50 transition-colors">架构详情</button>
              </div>
            </div>

            {/* 万能发票重命名工具 */}
            <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-6 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group flex flex-col h-full opacity-90 hover:opacity-100">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">📑</span>
                <span className="bg-neutral-100 text-neutral-500 text-[10px] font-bold font-mono px-2 py-1 rounded-sm border border-neutral-200 uppercase tracking-wider">Roadmap</span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">万能发票重命名工具</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">针对财务报销场景下 PDF 发票命名混乱的痛点，采用 PDF 解析 + 正则提取，实现金额/日期的自动提取与批量重命名，提升报销流程效率。</p>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] font-mono text-gray-400 mb-3 tracking-wider">PDF Parser · Regex · Batch Rename</p>
                <button onClick={() => window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { message: '我想了解发票重命名工具的研发进度。' } }))} className="w-full py-2 border-2 border-neutral-300 text-gray-800 rounded-sm text-sm font-medium font-mono hover:border-neutral-400 hover:bg-neutral-50 transition-colors">架构详情</button>
              </div>
            </div>
          </div>
        </section>

        <CTASection />

        <div className="mt-16 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-red-600 transition-colors font-mono text-sm tracking-widest uppercase"
          >
            ← 返回指挥中心
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
                为了维持实验室算力成本，本原型采用 License 授权模式。赞助算力即可获得无限次访问权限。
              </p>
              <button
                onClick={() => {
                  setScriptListOpen(false);
                  window.dispatchEvent(new CustomEvent('lchuck:open-chatbot', { detail: { roleId: 'data-architect', message: '我想申请访问万能数据清洗脚本包。为了维持实验室算力成本，本原型采用 License 授权模式，赞助算力即可获得无限次访问权限。' } }));
                }}
                className="mt-4 w-full py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors"
              >
                申请访问
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
