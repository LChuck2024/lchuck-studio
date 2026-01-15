import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Apps: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">App Collection</h1>
        <p className="text-white/50 mb-8">应用项目集合</p>
        <div className="space-y-4">
          <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-sm p-6 hover:border-red-600/60 transition-all cursor-pointer">
            <h2 className="text-2xl font-bold text-white mb-2">Web Application</h2>
            <p className="text-white/60">Web 应用项目展示</p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-sm p-6 hover:border-red-600/60 transition-all cursor-pointer">
            <h2 className="text-2xl font-bold text-white mb-2">Mobile App</h2>
            <p className="text-white/60">移动应用项目展示</p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-sm p-6 hover:border-red-600/60 transition-all cursor-pointer">
            <h2 className="text-2xl font-bold text-white mb-2">Desktop Tool</h2>
            <p className="text-white/60">桌面工具项目展示</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="mt-8 text-white/50 hover:text-white transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};
