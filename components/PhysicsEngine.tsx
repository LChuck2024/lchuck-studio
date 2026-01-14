
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Matter from 'matter-js';
import { PHYSICS_CONFIG } from '../constants';

const { Engine, World, Bodies, Mouse, MouseConstraint, Composite, Runner, Events } = Matter;

interface PhysicsContextType {
  registerBody: (id: string, body: Matter.Body) => void;
  unregisterBody: (id: string) => void;
}

export const PhysicsContext = React.createContext<PhysicsContextType | null>(null);

export const PhysicsEngine: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Engine.create({ gravity: { x: 0, y: 0, scale: 0.001 } }));
  const [bodiesMap, setBodiesMap] = useState<Map<string, Matter.Body>>(new Map());

  const registerBody = useCallback((id: string, body: Matter.Body) => {
    setBodiesMap((prev) => {
      const next = new Map(prev);
      next.set(id, body);
      return next;
    });
    Composite.add(engineRef.current.world, body);
  }, []);

  const unregisterBody = useCallback((id: string) => {
    setBodiesMap((prev) => {
      const next = new Map(prev);
      const body = next.get(id);
      if (body) {
        Composite.remove(engineRef.current.world, body);
        next.delete(id);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    const runner = Runner.create();
    
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Boundaries
    const ground = Bodies.rectangle(width / 2, height + 150, width * 3, 300, { isStatic: true });
    const leftWall = Bodies.rectangle(-150, height / 2, 300, height * 3, { isStatic: true });
    const rightWall = Bodies.rectangle(width + 150, height / 2, 300, height * 3, { isStatic: true });
    const ceiling = Bodies.rectangle(width / 2, -150, width * 3, 300, { isStatic: true });

    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    const mouse = Mouse.create(containerRef.current!);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.08, render: { visible: false } }
    });
    Composite.add(engine.world, mouseConstraint);

    Events.on(engine, 'beforeUpdate', () => {
      const bodies = Composite.allBodies(engine.world);
      bodies.forEach((body) => {
        if (body.isStatic) return;

        const dx = body.position.x - mouse.position.x;
        const dy = body.position.y - mouse.position.y;
        const distSq = dx * dx + dy * dy;

        const depth = (body as any).depthFactor || 0;
        const radius = PHYSICS_CONFIG.REPELL_RADIUS * (1 + Math.abs(depth) / 200);

        if (distSq < Math.pow(radius, 2) && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / radius) * PHYSICS_CONFIG.REPELL_STRENGTH;
          const zMultiplier = depth > 0 ? 1.5 : 0.5; // Forefront objects react more to "air"
          Matter.Body.applyForce(body, body.position, {
            x: (dx / dist) * force * body.mass * zMultiplier,
            y: (dy / dist) * force * body.mass * zMultiplier
          });
        }
      });
    });

    Runner.run(runner, engine);

    const timer = setTimeout(() => {
      engine.gravity.y = PHYSICS_CONFIG.GRAVITY;
      const allBodies = Composite.allBodies(engine.world);
      allBodies.forEach(b => {
        if (!b.isStatic) {
          Matter.Body.setStatic(b, false);
          Matter.Body.setVelocity(b, { 
            x: (Math.random() - 0.5) * 4, 
            y: (Math.random() - 0.5) * 4 
          });
          // Add random rotation force
          Matter.Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.05);
        }
      });
    }, PHYSICS_CONFIG.COLLAPSE_DELAY);

    return () => {
      clearTimeout(timer);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, []);

  return (
    <PhysicsContext.Provider value={{ registerBody, unregisterBody }}>
      <div 
        ref={containerRef} 
        className="relative w-screen h-screen overflow-hidden bg-black select-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
        <SyncRenderer bodiesMap={bodiesMap} />
      </div>
    </PhysicsContext.Provider>
  );
};

const SyncRenderer: React.FC<{ bodiesMap: Map<string, Matter.Body> }> = ({ bodiesMap }) => {
  const [renders, setRenders] = useState<number>(0);

  useEffect(() => {
    let animId: number;
    const update = () => {
      setRenders(r => r + 1);
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      {Array.from(bodiesMap.entries()).map(([id, body]) => {
        const el = document.querySelector(`[data-physics-id="${id}"]`) as HTMLElement;
        if (el) {
          const z = (body as any).depthFactor || 0;
          
          // Perspective scale factor
          const perspective = 2000;
          const scale = perspective / (perspective - z);
          
          // Depth of field: blur objects that are far away (negative z) or extremely close (positive z)
          const blurAmount = Math.max(0, (Math.abs(z) - 150) / 40);
          const opacity = z < -300 ? 0.3 : 1;

          el.style.transform = `
            translate3d(${body.position.x - (el.offsetWidth/2)}px, ${body.position.y - (el.offsetHeight/2)}px, ${z}px)
            rotate(${body.angle}rad)
          `;
          el.style.filter = blurAmount > 0.5 ? `blur(${blurAmount}px)` : 'none';
          el.style.opacity = opacity.toString();
          el.style.left = '0px';
          el.style.top = '0px';
          el.style.position = 'absolute';
          el.style.visibility = 'visible';
          el.style.zIndex = Math.floor(z + 1000).toString();
        }
        return null;
      })}
    </>
  );
};
