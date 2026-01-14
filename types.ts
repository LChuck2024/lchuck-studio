
import { Body } from 'matter-js';
import React from 'react';

export interface PhysicsBodyProps {
  id: string;
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  isStatic?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: 'rect' | 'circle';
  onClick?: () => void;
  /** -100 to 100. 0 is normal. Higher is closer to camera. */
  depth?: number;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  type: 'dot' | 'line';
  rotation: number;
  depth: number;
}
