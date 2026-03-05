import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-16 text-center">
      <button
        onClick={() => navigate('/')}
        className="text-gray-500 hover:text-red-600 transition-colors font-mono text-sm tracking-widest uppercase"
      >
        ← 返回指挥中心
      </button>
    </div>
  );
};
