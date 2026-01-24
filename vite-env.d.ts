/// <reference types="vite/client" />

// 额外补充项目中用到的 Vite 环境变量类型（可选，但有更好的 TS 提示）
interface ImportMetaEnv {
  readonly VITE_DEEPSEEK_API_KEY?: string;
  readonly VITE_OPENAI_API_KEY?: string;
  readonly VITE_QWEN_API_KEY?: string;
}

