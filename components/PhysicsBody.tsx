
import React, { useContext, useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { PhysicsContext } from './PhysicsEngine';
import { PhysicsBodyProps } from '../types';
import { PHYSICS_CONFIG } from '../constants';

export const PhysicsBody: React.FC<PhysicsBodyProps> = ({ 
  id, 
  initialX, 
  initialY, 
  width, 
  height, 
  children, 
  className = "",
  type = 'rect',
  onClick,
  depth = 0
}) => {
  const context = useContext(PhysicsContext);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!context) return;

    const options: Matter.IBodyDefinition = {
      frictionAir: PHYSICS_CONFIG.AIR_FRICTION,
      restitution: 0.6,
      density: 0.001,
      isStatic: true,
      label: id
    };

    let body: Matter.Body;
    if (type === 'circle') {
      body = Matter.Bodies.circle(initialX, initialY, width / 2, options);
    } else {
      body = Matter.Bodies.rectangle(initialX, initialY, width, height, options);
    }

    // Custom property for the renderer to use translateZ
    (body as any).depthFactor = depth;

    context.registerBody(id, body);

    return () => {
      context.unregisterBody(id);
    };
  }, [context, id, initialX, initialY, width, height, type, depth]);

  return (
    <div
      ref={elementRef}
      data-physics-id={id}
      onClick={onClick}
      className={`invisible will-change-transform cursor-pointer pointer-events-auto transition-opacity duration-700 ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="physics-child w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
