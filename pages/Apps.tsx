import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CTASection } from '../components/CTASection';
import { AppCard } from '../components/AppCard';
import { Modal } from '../components/Modal';
import { BackButton } from '../components/BackButton';
import { APP_SECTIONS } from '../config/apps';

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
  const [scriptListOpen, setScriptListOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(APP_SECTIONS[0].id);

  useEffect(() => {
    const sections = APP_SECTIONS.map((s) => ({ id: s.id, el: document.getElementById(s.id) }));
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
        <title>Solutions & Prototypes | LChuck Studio</title>
        <meta
          name="description"
          content="基于垂直行业痛点，利用 RAG 架构与 Agent 编排构建的生产力工具实验场。涵盖 Enterprise Data（企业数据中台资产闭环）、Strategic Methodology（战略方法论实验场）与 Developer Tools（开发者工具原型）。"
        />
      </Helmet>
      <div className="max-w-[1600px] w-full mx-auto mt-10 md:mt-20">
        <div className="mb-12 text-left">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-2 tracking-tight uppercase italic flex items-baseline gap-3 flex-wrap">
            <span>SOLUTIONS & PROTOTYPES</span>
          </h1>
          <p className="text-sm font-mono text-[#999999] tracking-widest uppercase">
            解决方案与原型
          </p>
        </div>

        {/* 分类锚点导航 - 当前区域高亮 */}
        <nav className="flex flex-wrap gap-2 mb-12 border-b border-neutral-200 pb-4">
          {APP_SECTIONS.map((section, i) => {
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

        {APP_SECTIONS.map((section, sectionIndex) => (
          <section
            key={section.id}
            id={section.id}
            className={sectionIndex > 0 ? 'mt-20 pt-12 border-t border-neutral-100 scroll-mt-24' : 'scroll-mt-24'}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2 font-mono tracking-widest flex items-center gap-2">
              <span className="text-neutral-400">0{sectionIndex + 1}</span> {section.labelEn} ({section.labelCn})
            </h2>
            <p className="text-gray-500 text-sm font-mono mb-6">{section.desc}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {section.cards.map((card) => (
                <AppCard
                  key={card.title}
                  item={card}
                  onScriptListClick={card.cta.action === 'script-list' ? () => setScriptListOpen(true) : undefined}
                />
              ))}
            </div>
          </section>
        ))}

        <CTASection />
        <BackButton />
      </div>

      {/* 数据清洗原子算子清单弹窗 */}
      <Modal open={scriptListOpen} onClose={() => setScriptListOpen(false)} title="数据清洗原子算子清单">
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
            window.dispatchEvent(
              new CustomEvent('lchuck:open-chatbot', {
                detail: {
                  roleId: 'data-architect',
                  message: '我想申请访问数据清洗原子算子清单。',
                },
              })
            );
          }}
          className="mt-4 w-full py-2 bg-orange-600 text-white rounded-sm text-sm font-medium font-mono hover:bg-orange-700 transition-colors flex items-center justify-center gap-1.5"
        >
          <span className="text-xs">🔑</span>
          <span>Request Access</span>
        </button>
      </Modal>
    </div>
  );
};
