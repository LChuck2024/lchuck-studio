
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
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
    
    // 创建和更新边界的函数
    const createWalls = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // 计算可滚动内容区域的高度（基于实际内容高度）
      // 使用一个足够大的值来包含所有内容，防止物体飞出边界
      const contentHeight = Math.max(height, document.documentElement.scrollHeight || height);
      const extendedHeight = contentHeight + 2000; // 扩展高度，确保包含所有滚动内容

      // 边界（透明，防止物体飞出）- 基于可滚动内容区域
      const wallOpts = { isStatic: true, friction: 0, restitution: 1 };
      return [
        Bodies.rectangle(width / 2, extendedHeight + 100, width * 3, 200, wallOpts), // 底部边界
        Bodies.rectangle(width / 2, -100, width * 3, 200, wallOpts), // 顶部边界
        Bodies.rectangle(-100, extendedHeight / 2, 200, extendedHeight * 3, wallOpts), // 左边界
        Bodies.rectangle(width + 100, extendedHeight / 2, 200, extendedHeight * 3, wallOpts) // 右边界
      ];
    };
    
    // 初始创建边界
    const walls = createWalls();
    Composite.add(engine.world, walls);
    
    // 存储墙体的引用，以便在窗口大小改变时更新
    const wallsRef = { current: walls };

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
      // 获取页面滚动偏移和容器位置，用于将物理世界坐标转换为相对于容器的坐标
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const containerRect = containerRef.current?.getBoundingClientRect();
      // 容器在文档中的顶部位置（考虑滚动）
      const containerTop = containerRect ? containerRect.top + scrollY : 0;
      
      bodiesMap.current.forEach((body, id) => {
        const el = document.querySelector(`[data-physics-id="${id}"]`) as HTMLElement;
        if (el) {
          const depth = (body as any).depthFactor || 0;
          const width = el.offsetWidth || (body as any).width || 0;
          const height = el.offsetHeight || (body as any).height || 0;
          // 使用 absolute 定位，需要将物理世界坐标转换为相对于容器的坐标
          // 物理引擎的世界坐标是固定的（基于初始视口），当页面滚动时，需要调整 y 坐标
          // 物理世界坐标 y 是相对于文档顶部的，容器也是相对于文档顶部的
          // 所以元素相对于容器的 y = 物理世界 y - 容器顶部位置
          const relativeY = body.position.y - containerTop;
          el.style.transform = `translate3d(${body.position.x - width / 2}px, ${relativeY - height / 2}px, ${depth}px) rotate(${body.angle}rad)`;
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        }
      });
      animId = requestAnimationFrame(sync);
    };
    // 立即启动同步循环
    animId = requestAnimationFrame(sync);

    // 窗口大小改变时更新边界
    const handleResize = () => {
      // 移除旧的边界
      Composite.remove(engine.world, wallsRef.current);
      
      // 创建新的边界
      const newWalls = createWalls();
      wallsRef.current = newWalls;
      Composite.add(engine.world, newWalls);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      Runner.stop(runner);
      window.removeEventListener('resize', handleResize);
      // 清理边界
      Composite.remove(engine.world, wallsRef.current);
      Engine.clear(engine);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <PhysicsContext.Provider value={{ registerBody, unregisterBody }}>
      <div ref={containerRef} className="relative w-full min-h-screen z-10 cursor-crosshair">
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
  const context = useContext(PhysicsContext);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!context) return;
    const body = Bodies.rectangle(x, y, w, h, {
      frictionAir: PHYSICS_CONFIG.AIR_FRICTION,
      restitution: 0.7,
      isStatic: true,
      label: id
    });
    (body as any).depthFactor = depth;
    (body as any).width = w;
    (body as any).height = h;
    context.registerBody(id, body);
    
    // 设置初始位置和可见性，确保元素立即可见
    if (elementRef.current) {
      elementRef.current.style.transform = `translate3d(${x - w / 2}px, ${y - h / 2}px, ${depth}px)`;
      elementRef.current.style.visibility = 'visible';
      elementRef.current.style.opacity = '1';
    }
    
    return () => context.unregisterBody(id);
  }, [context, id, x, y, w, h, depth]);

  return (
    <div
      ref={elementRef}
      data-physics-id={id}
      className={`absolute invisible opacity-0 will-change-transform pointer-events-auto ${className}`}
      style={{ width: w, height: h, transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};
