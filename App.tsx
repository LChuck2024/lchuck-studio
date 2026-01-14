
import React, { useState, useEffect } from 'react';
import { PhysicsSystem, PhysicsNode } from './components/PhysicsSystem';
import { ThreeBackground } from './components/ThreeBackground';
import { PROJECTS } from './constants';

const Typewriter: React.FC<{ 
  text: string; 
  speed?: number; 
  delay?: number; 
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
}> = ({ text, speed = 50, delay = 0, onComplete, className = "", showCursor = true }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let timeout: number;
    let charIndex = 0;

    const startTyping = () => {
      const type = () => {
        if (charIndex <= text.length) {
          setDisplayedText(text.slice(0, charIndex));
          charIndex++;
          timeout = window.setTimeout(type, speed);
        } else {
          setIsFinished(true);
          if (onComplete) onComplete();
        }
      };
      type();
    };

    const initialDelay = window.setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeout);
      clearTimeout(initialDelay);
    };
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isFinished && (
        <span className="animate-pulse text-red-600 ml-1">|</span>
      )}
    </span>
  );
};

const App: React.FC = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative">
      {/* Three.js 实时粒子背景 */}
      <ThreeBackground />
      
      <PhysicsSystem>
        {/* 顶部标识 (Logo Area) */}
        <PhysicsNode id="logo-branding" x={centerX} y={80} w={350} h={60} depth={150}>
          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 bg-red-600 rotate-45 border border-red-400"></div>
            <span className="text-sm font-bold mono tracking-[0.4em] text-white/50 uppercase">
              <Typewriter text="Intelligence Node" speed={100} delay={500} showCursor={false} />
            </span>
          </div>
        </PhysicsNode>

        {/* 主标题 (Hero Section) */}
        <PhysicsNode id="hero-title" x={centerX} y={centerY - 120} w={1000} h={180} depth={250}>
          <div className="text-center select-none">
            <h2 className="text-[10vw] lg:text-9xl font-black tracking-tighter italic leading-none flex items-center justify-center gap-4">
              <Typewriter 
                text="LCHUCK" 
                speed={120} 
                className="text-white"
              />
              <Typewriter 
                text="STUDIO" 
                speed={120} 
                delay={800} 
                className="text-red-600"
              />
            </h2>
            <div className="mt-6">
              <Typewriter 
                text="Designing Autonomous Systems & Interactive Realities" 
                speed={30} 
                delay={1800} 
                className="mono text-[10px] lg:text-[12px] tracking-[0.8em] text-white/20 uppercase font-light"
                showCursor={false}
              />
            </div>
          </div>
        </PhysicsNode>

        {/* 项目展示 (Portfolio Cards) */}
        {PROJECTS.map((p, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const x = centerX + (col === 0 ? -240 : 240);
          const y = centerY + 200 + row * 260;

          return (
            <PhysicsNode key={p.id} id={p.id} x={x} y={y} w={420} h={220} depth={Math.random() * 100}>
              <div className="w-full h-full p-8 bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-sm group hover:border-red-600/60 transition-all duration-700 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <span className="text-[10px] mono text-red-600 font-bold tracking-[0.2em]">{p.type}</span>
                    <div className="flex gap-1.5">
                      {p.tech.map(t => (
                        <span key={t} className="text-[8px] px-2 py-0.5 border border-white/5 bg-white/5 text-white/30 uppercase mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight group-hover:text-red-600 transition-colors uppercase leading-none">{p.title}</h3>
                  <p className="text-[11px] text-white/40 mt-3 font-medium leading-relaxed max-w-[90%]">{p.description}</p>
                </div>
                <div className="pt-4 border-t border-white/5 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] mono text-white/30 font-bold tracking-widest">ACCESS_CORE_DATA</span>
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full group-hover:animate-ping"></div>
                </div>
              </div>
            </PhysicsNode>
          );
        })}

        {/* 装饰性物理碎片 (Decorative Scraps) */}
        {Array.from({ length: 16 }).map((_, i) => (
          <PhysicsNode 
            key={`scrap-${i}`} 
            id={`scrap-${i}`} 
            x={Math.random() * width} 
            y={Math.random() * height} 
            w={Math.random() * 60 + 20} 
            h={1} 
            depth={-400}
          >
            <div className="w-full h-full bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]"></div>
          </PhysicsNode>
        ))}
      </PhysicsSystem>

      {/* HUD 界面 (Fixed elements) */}
      <div className="fixed top-10 left-10 z-[100] pointer-events-none">
        <div className="flex items-center gap-4 text-[9px] mono text-white/20 font-bold tracking-[0.3em] uppercase">
          <div className="w-10 h-[1px] bg-red-600"></div>
          <span>Studio_Mainframe // Build 24.12</span>
        </div>
      </div>

      <div className="fixed bottom-10 left-10 z-[100] pointer-events-none mono text-[9px] text-white/20 space-y-1.5 uppercase tracking-widest">
        <div>Operator: <span className="text-white/40">LCHUCK</span></div>
        <div>Physics_State: <span className="text-red-600 animate-pulse">Float_Active</span></div>
      </div>

      <div className="fixed bottom-10 right-10 z-[100] pointer-events-none mono text-[9px] text-white/20 text-right uppercase tracking-widest leading-relaxed">
        <div>Spatial Interaction Enabled</div>
        <div>Intertia Damping: 0.07</div>
        <div className="text-white/40">{width}PX x {height}PX</div>
      </div>

      {/* 环境光效 */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.9)_100%)] z-40"></div>
    </div>
  );
};

export default App;
