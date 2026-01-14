
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { PHYSICS_CONFIG } from '../constants';

const { Engine, Bodies, Composite, Runner, Mouse, MouseConstraint, Events, Body } = Matter;

interface PhysicsContextType {
  registerBody: (id: string, body: Matter.Body) => void;
  unregisterBody: (id: string) => void;
}

export const PhysicsContext = createContext<PhysicsContextType | null>(null);

export const PhysicsSystem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Engine.create({ gravity: { x: 0, y: 0, scale: 0.001 } }));
  const bodiesMap = useRef<Map<string, Matter.Body>>(new Map());

  const registerBody = useCallback((id: string, body: Matter.Body) => {
    bodiesMap.current.set(id, body);
    Composite.add(engineRef.current.world, body);
  }, []);

  const unregisterBody = useCallback((id: string) => {
    const body = bodiesMap.current.get(id);
    if (body) {
      Composite.remove(engineRef.current.world, body);
      bodiesMap.current.delete(id);
    }
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    const runner = Runner.create();
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 边界（透明，防止物体飞出）
    const wallOpts = { isStatic: true, friction: 0, restitution: 1 };
    const walls = [
      Bodies.rectangle(width / 2, height + 100, width * 3, 200, wallOpts),
      Bodies.rectangle(width / 2, -100, width * 3, 200, wallOpts),
      Bodies.rectangle(-100, height / 2, 200, height * 3, wallOpts),
      Bodies.rectangle(width + 100, height / 2, 200, height * 3, wallOpts)
    ];
    Composite.add(engine.world, walls);

    const mouse = Mouse.create(containerRef.current!);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.1, render: { visible: false } }
    });
    Composite.add(engine.world, mouseConstraint);

    // 实时排斥逻辑
    Events.on(engine, 'beforeUpdate', () => {
      bodiesMap.current.forEach((body) => {
        if (body.isStatic) return;
        const dx = body.position.x - mouse.position.x;
        const dy = body.position.y - mouse.position.y;
        const distSq = dx * dx + dy * dy;
        const radius = PHYSICS_CONFIG.REPELL_RADIUS;

        if (distSq < radius * radius && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / radius) * PHYSICS_CONFIG.REPELL_STRENGTH;
          Body.applyForce(body, body.position, {
            x: (dx / dist) * force * body.mass,
            y: (dy / dist) * force * body.mass
          });
        }
      });
    });

    Runner.run(runner, engine);

    // 延时坍塌
    const timer = setTimeout(() => {
      engine.gravity.y = PHYSICS_CONFIG.GRAVITY;
      bodiesMap.current.forEach((body) => {
        Body.setStatic(body, false);
        Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 3
        });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.02);
      });
    }, PHYSICS_CONFIG.COLLAPSE_DELAY);

    // 同步循环（直接操作 DOM 提升性能）
    let animId: number;
    const sync = () => {
      bodiesMap.current.forEach((body, id) => {
        const el = document.querySelector(`[data-physics-id="${id}"]`) as HTMLElement;
        if (el) {
          const depth = (body as any).depthFactor || 0;
          el.style.transform = `translate3d(${body.position.x - el.offsetWidth / 2}px, ${body.position.y - el.offsetHeight / 2}px, ${depth}px) rotate(${body.angle}rad)`;
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        }
      });
      animId = requestAnimationFrame(sync);
    };
    animId = requestAnimationFrame(sync);

    return () => {
      clearTimeout(timer);
      Runner.stop(runner);
      Engine.clear(engine);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <PhysicsContext.Provider value={{ registerBody, unregisterBody }}>
      <div ref={containerRef} className="relative w-full h-screen overflow-hidden z-10 cursor-crosshair">
        {children}
      </div>
    </PhysicsContext.Provider>
  );
};

export const PhysicsNode: React.FC<{
  id: string,
  x: number,
  y: number,
  w: number,
  h: number,
  depth?: number,
  children: React.ReactNode,
  className?: string
}> = ({ id, x, y, w, h, depth = 0, children, className }) => {
  const context = React.useContext(PhysicsContext);
  useEffect(() => {
    if (!context) return;
    const body = Bodies.rectangle(x, y, w, h, {
      frictionAir: PHYSICS_CONFIG.AIR_FRICTION,
      restitution: 0.7,
      isStatic: true,
      label: id
    });
    (body as any).depthFactor = depth;
    context.registerBody(id, body);
    return () => context.unregisterBody(id);
  }, [context, id, x, y, w, h, depth]);

  return (
    <div
      data-physics-id={id}
      className={`fixed invisible opacity-0 will-change-transform pointer-events-auto ${className}`}
      style={{ width: w, height: h, transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};
