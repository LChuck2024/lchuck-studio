import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Agents: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">Agent Collection</h1>
        <p className="text-gray-600 mb-8">智能代理集合</p>
        <div className="space-y-4">
          <div 
            onClick={() => navigate('/agents/chatbot')}
            className="bg-gray-100/50 border border-gray-300/50 backdrop-blur-2xl rounded-sm p-6 hover:border-red-600/60 transition-all cursor-pointer"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Agent</h2>
            <p className="text-gray-700">AI 智能代理系统</p>
          </div>
          <div className="bg-gray-100/50 border border-gray-300/50 backdrop-blur-2xl rounded-sm p-6 hover:border-red-600/60 transition-all cursor-pointer">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Workflow Automation</h2>
            <p className="text-gray-700">工作流自动化系统</p>
          </div>
          <div className="bg-gray-100/50 border border-gray-300/50 backdrop-blur-2xl rounded-sm p-6 hover:border-red-600/60 transition-all cursor-pointer">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Smart Decision</h2>
            <p className="text-gray-700">智能决策系统</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="mt-8 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};
