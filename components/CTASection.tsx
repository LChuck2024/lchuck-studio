import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hero / CTA 区块 - AI 落地专家实验室
 * 红黑重工风，体现行业专家与高价值洞察
 */
export const CTASection: React.FC = () => {
  const navigate = useNavigate();

  const handleExpertConsult = () => {
    window.dispatchEvent(
      new CustomEvent('lchuck:open-chatbot', {
        detail: { roleId: 'data-architect', message: '我想了解专家深度咨询的流程与安排。' },
      })
    );
  };

  const handleResearchTools = () => {
    navigate('/apps');
  };

  return (
    <section
      className="w-full border-y border-neutral-200 bg-neutral-50"
      aria-labelledby="cta-headline"
    >
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <h2
          id="cta-headline"
          className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 uppercase italic mb-2 tracking-[0.2em] sm:tracking-[0.25em] whitespace-normal lg:whitespace-nowrap"
        >
          ENGINEERING THE FUTURE OF DIGITAL ASSETS
        </h2>
        <p className="text-gray-400 font-mono text-sm mb-8">用工程思维构建数字资产的未来</p>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-14 whitespace-normal 2xl:whitespace-nowrap text-center">
          致力于探索 AI 驱动的高效交付模式。无论是个人数字资产重构，还是企业级数据治理转型，我在此分享经过验证的工程方法论与实战案例。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={handleExpertConsult}
            className="w-full sm:w-auto px-10 py-3.5 bg-red-600 text-white font-mono text-sm font-bold rounded-sm border-2 border-red-600 transition-all duration-300 hover:bg-red-700 hover:shadow-[0_0_28px_rgba(185,28,28,0.4)] hover:border-red-800"
          >
            专家深度咨询
          </button>
          <button
            onClick={handleResearchTools}
            className="w-full sm:w-auto px-10 py-3.5 bg-transparent hover:bg-neutral-100 text-gray-800 font-mono text-sm font-bold rounded-sm transition-colors duration-300 border-2 border-neutral-300 hover:border-neutral-400"
          >
            解决方案与原型
          </button>
        </div>
      </div>
    </section>
  );
};
