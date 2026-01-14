
export const PHYSICS_CONFIG = {
  GRAVITY: 0.08,
  AIR_FRICTION: 0.07, // 类似水下的阻力
  REPELL_STRENGTH: 0.006,
  REPELL_RADIUS: 300,
  COLLAPSE_DELAY: 2500, // 初始排列展示时间
};

export interface Project {
  id: string;
  title: string;
  type: 'AGENT' | 'WEB' | 'APP';
  description: string;
  tech: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Autonomous Nexus',
    type: 'AGENT',
    description: 'Self-correcting LLM orchestration system.',
    tech: ['Python', 'LangChain', 'OpenAI']
  },
  {
    id: 'p2',
    title: 'Still-Alive App',
    type: 'APP',
    description: 'Biometric minimalist productivity tracker.',
    tech: ['React Native', 'Rust', 'WASM']
  },
  {
    id: 'p3',
    title: 'Cyber Archive',
    type: 'WEB',
    description: 'Real-time 3D data visualization portal.',
    tech: ['Three.js', 'React', 'Tailwind']
  },
  {
    id: 'p4',
    title: 'Neural Core',
    type: 'AGENT',
    description: 'Edge-deployed small language model.',
    tech: ['C++', 'TensorFlow', 'CUDA']
  }
];
