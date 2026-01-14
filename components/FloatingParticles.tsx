
import React, { useMemo } from 'react';
import { PhysicsBody } from './PhysicsBody';

export const FloatingParticles: React.FC = () => {
  const particleCount = 140; // High density for 3D field effect
  
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: `particle-${i}`,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      width: Math.random() * 8 + 4,
      height: Math.random() * 2 + 1,
      depth: (Math.random() - 0.5) * 1200, // Deep 3D space
      color: i % 10 === 0 ? '#FF0000' : i % 5 === 0 ? '#666666' : '#FFFFFF',
      rotation: Math.random() * Math.PI
    }));
  }, []);

  return (
    <>
      {particles.map((p) => (
        <PhysicsBody
          key={p.id}
          id={p.id}
          initialX={p.x}
          initialY={p.y}
          width={p.width}
          height={p.height}
          depth={p.depth}
        >
          <div 
            className="w-full h-full transform skew-x-12"
            style={{ 
              backgroundColor: p.color,
              opacity: p.depth < 0 ? 0.4 : 0.8,
              boxShadow: p.color !== '#666666' ? `0 0 4px ${p.color}44` : 'none'
            }}
          />
        </PhysicsBody>
      ))}
    </>
  );
};
