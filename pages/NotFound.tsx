import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10">
      <div className="text-center max-w-md">
        <p className="text-6xl font-black text-gray-200 mb-4 font-mono">404</p>
        <h1 className="text-xl font-bold text-gray-900 mb-2">页面未找到</h1>
        <p className="text-gray-500 text-sm mb-8">
          您访问的链接可能已失效，或页面正在建设中。
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-gray-900 text-white rounded-sm text-sm font-medium font-mono hover:bg-red-600 transition-colors"
        >
          ← 返回首页
        </button>
      </div>
    </div>
  );
};
