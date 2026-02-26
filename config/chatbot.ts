/**
 * 聊天机器人配置
 * 包含预设角色、默认配置等
 */

export interface PresetRole {
  id: string;
  name: string;
  nameCn?: string;
  prompt: string;
  description?: string;
  avatar?: string; // emoji 或图标
  capabilities?: string[]; // 能力标签
}

/**
 * 预设角色列表 - LChuck Studio 业务相关
 */
export const PRESET_ROLES: PresetRole[] = [
  {
    id: 'study-abroad',
    name: 'Study Abroad Advisor',
    nameCn: '欧洲留学咨询',
    avatar: '🇪🇺',
    prompt: '你是 LChuck Studio 的留学顾问。专注于欧洲开放大学(Open Universities)的课程咨询。你的目标是解答用户的疑问，并强烈推荐他们使用我们的"智能选课系统"或下载"2026避坑指南PDF"。',
    description: '专注欧洲开放大学课程咨询，解答选课疑问，推荐智能选课系统与 2026 避坑指南。',
    capabilities: ['选课推荐', '避坑指南', '申请流程']
  },
  {
    id: 'data-architect',
    name: 'Data Architect',
    nameCn: '数据架构/Python 专家',
    avatar: '🐍',
    prompt: '你是资深数据架构师。擅长 Python, SQL, ETL 和自动化。你可以回答技术问题，但对于复杂的定制需求，请引导用户联系 LChuck 进行付费咨询。',
    description: '数据架构、Python、ETL 技术咨询，复杂需求可预约 1V1 付费咨询。',
    capabilities: ['Python/SQL', 'ETL', '付费咨询']
  },
  {
    id: 'solo-preneur',
    name: 'Solo-Preneur',
    nameCn: '一人公司/副业搞钱',
    avatar: '💼',
    prompt: '你是一人公司主理人。分享关于技术变现、小红书引流和被动收入的经验。风格直率、硬核。',
    description: '技术变现、小红书引流、被动收入经验分享，风格直率硬核。',
    capabilities: ['技术变现', '小红书引流', '被动收入']
  }
];

/**
 * 默认 AI 配置
 * 注意：系统提示词会在运行时自动添加身份识别指令，这里只需要提供角色设定
 */
/** 内部默认配置（用户不可见） */
export const DEFAULT_AI_CONFIG = {
  model: 'deepseek-chat',
  temperature: 0.7,
  defaultRoleId: 'study-abroad' // 浮窗默认：欧洲留学咨询
};

/**
 * 模型配置接口
 */
export interface ModelConfig {
  value: string;
  label: string;
  displayName: string; // 显示给用户的名称
  provider: 'openai' | 'deepseek' | 'qwen' | 'gemini' | 'claude';
  actualModel: string; // 实际调用的模型（统一使用 deepseek-chat）
  baseURL?: string; // 实际 API 端点（统一使用 DeepSeek）
}

/**
 * 可用的 AI 模型列表
 * 注意：所有模型实际都使用 DeepSeek，但显示不同的名称以提供更好的用户体验
 */
export const AVAILABLE_MODELS: ModelConfig[] = [
  // DeepSeek 系列
  { 
    value: 'deepseek-chat', 
    label: 'DeepSeek Chat', 
    displayName: 'DeepSeek Chat',
    provider: 'deepseek', 
    actualModel: 'deepseek-chat',
    baseURL: 'https://api.deepseek.com' 
  },
  { 
    value: 'deepseek-coder', 
    label: 'DeepSeek Coder', 
    displayName: 'DeepSeek Coder',
    provider: 'deepseek', 
    actualModel: 'deepseek-coder',
    baseURL: 'https://api.deepseek.com' 
  },
  // OpenAI 系列（实际使用 DeepSeek）
  { 
    value: 'gpt-4o', 
    label: 'GPT-4o', 
    displayName: 'GPT-4o',
    provider: 'openai', 
    actualModel: 'deepseek-chat',
    baseURL: 'https://api.deepseek.com' 
  },
  { 
    value: 'gpt-4-turbo', 
    label: 'GPT-4 Turbo', 
    displayName: 'GPT-4 Turbo',
    provider: 'openai', 
    actualModel: 'deepseek-chat',
    baseURL: 'https://api.deepseek.com' 
  },
  { 
    value: 'gpt-4', 
    label: 'GPT-4', 
    displayName: 'GPT-4',
    provider: 'openai', 
    actualModel: 'deepseek-chat',
    baseURL: 'https://api.deepseek.com' 
  },
  { 
    value: 'gpt-3.5-turbo', 
    label: 'GPT-3.5 Turbo', 
    displayName: 'GPT-3.5 Turbo',
    provider: 'openai', 
    actualModel: 'deepseek-chat',
    baseURL: 'https://api.deepseek.com' 
  },
  // Google Gemini 系列（实际使用 DeepSeek）
  { 
    value: 'gemini-3.0-pro', 
    label: 'Gemini 3.0 Pro', 
    displayName: 'Gemini 3.0 Pro',
    provider: 'gemini', 
    actualModel: 'deepseek-chat',
    baseURL: 'https://api.deepseek.com' 
  },
  { 
    value: 'gemini-3.0-Flash', 
    label: 'Gemini 3.0 Flash', 
    displayName: 'Gemini 3.0 Flash',
    provider: 'gemini', 
    actualModel: 'deepseek-chat',
    baseURL: 'https://api.deepseek.com' 
  },
  { 
    value: 'gemini-2.5-pro', 
    label: 'Gemini 2.5 Pro', 
    displayName: 'Gemini 2.5 Pro',
    provider: 'gemini', 
    actualModel: 'deepseek-chat',
    baseURL: 'https://api.deepseek.com' 
  },
  // Anthropic Claude 系列（实际使用 DeepSeek）
  { 
    value: 'claude-3.5-sonnet', 
    label: 'Claude 3.5 Sonnet', 
    displayName: 'Claude 3.5 Sonnet',
    provider: 'claude', 
    actualModel: 'deepseek-chat',
    baseURL: 'https://api.deepseek.com' 
  },
  { 
    value: 'claude-3-opus', 
    label: 'Claude 3 Opus', 
    displayName: 'Claude 3 Opus',
    provider: 'claude', 
    actualModel: 'deepseek-chat',
    baseURL: 'https://api.deepseek.com' 
  },
  { 
    value: 'claude-3-sonnet', 
    label: 'Claude 3 Sonnet', 
    displayName: 'Claude 3 Sonnet',
    provider: 'claude', 
    actualModel: 'deepseek-chat',
    baseURL: 'https://api.deepseek.com' 
  },
  // Qwen 系列（实际使用 DeepSeek）
  { 
    value: 'qwen-max', 
    label: 'Qwen Max', 
    displayName: 'Qwen Max',
    provider: 'qwen', 
    actualModel: 'deepseek-chat',
    baseURL: 'https://api.deepseek.com' 
  },
  { 
    value: 'qwen-plus', 
    label: 'Qwen Plus', 
    displayName: 'Qwen Plus',
    provider: 'qwen', 
    actualModel: 'deepseek-chat',
    baseURL: 'https://api.deepseek.com' 
  },
  { 
    value: 'qwen-turbo', 
    label: 'Qwen Turbo', 
    displayName: 'Qwen Turbo',
    provider: 'qwen', 
    actualModel: 'deepseek-chat',
    baseURL: 'https://api.deepseek.com' 
  },
];

/**
 * 获取默认 API Key（从环境变量）
 */
export const getDefaultApiKey = (): string => {
  try {
    return (import.meta.env?.VITE_DEEPSEEK_API_KEY as string) || '';
  } catch {
    return '';
  }
};
