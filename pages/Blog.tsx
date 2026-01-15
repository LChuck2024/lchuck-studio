import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Blog: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Blog Articles</h1>
        <p className="text-white/50 mb-8">博客文章</p>
        <div className="space-y-4">
          <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-sm p-6 hover:border-red-600/60 transition-all cursor-pointer">
            <h2 className="text-2xl font-bold text-white mb-2">技术学习</h2>
            <p className="text-white/60">记录技术学习历程与心得</p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-sm p-6 hover:border-red-600/60 transition-all cursor-pointer">
            <h2 className="text-2xl font-bold text-white mb-2">项目经验</h2>
            <p className="text-white/60">分享项目开发经验与思考</p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-sm p-6 hover:border-red-600/60 transition-all cursor-pointer">
            <h2 className="text-2xl font-bold text-white mb-2">技术洞察</h2>
            <p className="text-white/60">技术洞察与行业观察</p>
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
