import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-16 text-center pb-8 md:pb-0">
      <button
        onClick={() => navigate('/')}
        className="text-gray-500 hover:text-red-600 transition-colors font-mono text-sm tracking-widest uppercase"
      >
        ← BACK TO HOME (返回首页)
      </button>
    </div>
  );
};
