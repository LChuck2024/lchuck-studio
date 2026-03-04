import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 全局转化区块 - 页面底部决策点
 * 工业风设计，引导用户预约咨询或进入工具箱
 */
export const CTASection: React.FC = () => {
  const navigate = useNavigate();

  const handleArchitectureConsult = () => {
    window.dispatchEvent(
      new CustomEvent('lchuck:open-chatbot', {
        detail: { roleId: 'data-architect', message: '我想预约架构咨询服务！' },
      })
    );
  };

  const handleTools = () => {
    navigate('/apps');
  };

  return (
    <section
      className="w-full border-y border-neutral-200 bg-neutral-50"
      aria-labelledby="cta-headline"
    >
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2
          id="cta-headline"
          className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight uppercase italic mb-4"
        >
          READY TO UPGRADE YOUR SYSTEM?
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-10 w-full leading-relaxed break-words">
          无论是个人学历提升，还是企业数据架构升级。LChuck Studio 都有对应的解决方案。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleArchitectureConsult}
            className="w-full sm:w-auto px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-mono text-sm font-bold rounded-sm transition-colors border-2 border-red-600"
          >
            预约架构咨询 (¥498)
          </button>
          <button
            onClick={handleTools}
            className="w-full sm:w-auto px-8 py-3 bg-transparent hover:bg-neutral-100 text-gray-800 font-mono text-sm font-bold rounded-sm transition-colors border-2 border-neutral-300 hover:border-neutral-400"
          >
            获取工具箱 (Tools)
          </button>
        </div>
      </div>
    </section>
  );
};
