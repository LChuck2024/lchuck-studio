import React from 'react';

/**
 * Engineering Brutalism: Subtle grid background (graph paper aesthetic)
 */
export const GridBackground: React.FC = () => (
  <div
    className="fixed inset-0 z-0 pointer-events-none bg-white"
    style={{
      backgroundImage: `
        linear-gradient(to right, #80808012 1px, transparent 1px),
        linear-gradient(to bottom, #80808012 1px, transparent 1px)
      `,
      backgroundSize: '24px 24px',
    }}
  />
);
