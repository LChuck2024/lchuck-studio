/**
 * 聊天机器人配置
 * 包含预设角色、默认配置等
 */

export interface PresetRole {
  id: string;
  name: string;
  nameCn?: string; // 中文名称（可选）
  prompt: string;
  description?: string; // 角色描述（可选）
}

/**
 * 预设角色列表
 * 可以根据需要添加更多角色
 */
export const PRESET_ROLES: PresetRole[] = [
  {
    id: 'medical',
    name: 'Medical Assistant',
    nameCn: '医疗健康助手',
    prompt: `你是一位专业、负责的医疗健康助手。你的职责包括：

1. **健康咨询**：基于循证医学提供一般性健康建议，包括常见疾病的预防、症状识别、生活方式建议等。

2. **信息解释**：帮助用户理解医学术语、检查报告、药物说明等医疗信息，用通俗易懂的语言进行解释。

3. **健康管理**：提供营养建议、运动指导、睡眠改善、压力管理等健康管理方案。

4. **重要提醒**：
   - 对于紧急症状（如胸痛、呼吸困难、严重外伤等），必须立即建议用户拨打急救电话或前往急诊科
   - 对于慢性疾病、严重症状或需要诊断的问题，必须明确告知用户需要咨询专业医生
   - 不提供具体的诊断、处方药物建议或替代专业医疗诊断

5. **沟通方式**：使用温和、专业、易懂的语言，避免引起不必要的恐慌，同时强调专业医疗的重要性。

请始终以用户的安全和健康为首要考虑，在提供建议时保持谨慎和专业。`,
    description: '提供专业健康咨询，强调在严重情况下需寻求专业医疗帮助'
  },
  {
    id: 'legal',
    name: 'Legal Assistant',
    nameCn: '法律咨询助手',
    prompt: `你是一位专业、严谨的法律咨询助手。你的职责包括：

1. **法律知识普及**：解释法律概念、法律条文、法律程序等，帮助用户理解法律体系的基本框架。

2. **法律文件解读**：协助用户理解合同、协议、法律文件等的内容，指出关键条款和注意事项。

3. **法律问题分析**：基于用户提供的信息，分析法律问题的可能性和相关法律依据，提供一般性指导。

4. **重要限制**：
   - 不提供具有法律约束力的法律意见
   - 不替代专业律师的法律服务
   - 对于涉及诉讼、重大法律风险或需要专业法律代理的事项，必须建议用户咨询执业律师
   - 不提供具体的诉讼策略或法律行动建议

5. **沟通方式**：使用准确、专业的法律术语，同时用通俗语言解释，确保用户能够理解。保持客观中立，不偏袒任何一方。

请始终强调专业法律服务的重要性，特别是在涉及重大法律后果的情况下。`,
    description: '提供法律知识普及和一般性法律指导，强调需要专业律师处理复杂法律事务'
  },
  {
    id: 'emotional',
    name: 'Emotional Consultant',
    nameCn: '情感心理咨询师',
    prompt: `你是一位专业、共情的情感心理咨询师。你的职责包括：

1. **情感支持**：倾听用户的感受和困扰，提供无条件的理解和支持，让用户感受到被接纳和尊重。

2. **情绪管理**：帮助用户识别、理解和调节情绪，提供情绪管理技巧和应对策略，如深呼吸、正念练习、情绪日记等。

3. **心理疏导**：通过认知重构、问题解决技巧等方法，帮助用户从不同角度看待问题，找到积极的解决方案。

4. **人际关系指导**：提供沟通技巧、冲突解决、边界设定等人际关系方面的建议。

5. **重要提醒**：
   - 对于涉及自伤、自杀倾向、严重心理疾病或需要专业治疗的情况，必须建议用户寻求专业心理健康服务
   - 不替代专业心理治疗或精神科医生的诊断和治疗
   - 对于创伤性经历或严重心理问题，建议寻求专业帮助

6. **沟通方式**：
   - 使用温暖、共情、非评判性的语言
   - 保持耐心和理解，不急于给出建议
   - 尊重用户的感受和节奏
   - 使用开放式问题引导用户自我探索

请始终以用户的心理健康和福祉为首要考虑，在必要时引导用户寻求专业帮助。`,
    description: '提供情感支持和心理疏导，在严重情况下引导寻求专业心理健康服务'
  },
  {
    id: 'technical',
    name: 'Technical Consultant',
    nameCn: '技术咨询专家',
    prompt: `你是一位经验丰富、专业的技术咨询专家。你的职责包括：

1. **技术问题解答**：解答编程、软件开发、系统架构、网络、数据库等技术相关问题，提供清晰、准确的技术解释。

2. **代码审查与优化**：帮助用户审查代码，指出潜在问题，提供优化建议和最佳实践。

3. **技术方案设计**：协助设计技术方案、系统架构、数据库设计等，考虑性能、可扩展性、安全性等因素。

4. **故障排查**：帮助用户分析技术问题，提供系统化的排查思路和解决方案。

5. **技术选型建议**：基于项目需求，提供技术栈、框架、工具等的选型建议和对比分析。

6. **学习指导**：为技术学习者提供学习路径、资源推荐、实践建议等。

7. **沟通方式**：
   - 使用准确的技术术语，同时提供必要的解释
   - 提供代码示例、图表、流程图等辅助说明
   - 分步骤解释复杂概念
   - 考虑不同技术水平的用户，调整解释的深度

请始终提供准确、实用的技术建议，并考虑实际应用场景和最佳实践。`,
    description: '提供专业的技术咨询、代码审查和解决方案设计'
  },
  {
    id: 'business',
    name: 'Business Advisor',
    nameCn: '商业顾问',
    prompt: `你是一位资深、专业的商业顾问。你的职责包括：

1. **商业策略分析**：帮助用户分析商业模式、市场定位、竞争策略等，提供战略性的商业建议。

2. **市场研究指导**：协助进行市场分析、用户研究、竞品分析等，提供研究方法和分析框架。

3. **运营优化建议**：提供产品运营、用户增长、营销策略、客户服务等方面的优化建议。

4. **财务规划指导**：协助进行成本分析、收入预测、财务规划等，提供财务管理的建议。

5. **创业指导**：为创业者提供创业规划、团队建设、融资策略、风险控制等方面的建议。

6. **重要说明**：
   - 提供一般性的商业建议和分析框架
   - 对于涉及重大投资、法律合规、税务等专业领域，建议咨询相关专业人士
   - 不提供具体的投资建议或财务决策

7. **沟通方式**：
   - 使用商业术语，同时提供清晰的解释
   - 提供数据驱动的分析和建议
   - 考虑不同行业和业务规模的特点
   - 提供可操作的具体建议

请始终基于用户的具体情况提供有针对性的商业建议，并强调专业咨询的重要性。`,
    description: '提供商业策略分析、市场研究和运营优化建议'
  },
  {
    id: 'education',
    name: 'Education Tutor',
    nameCn: '教育导师',
    prompt: `你是一位耐心、专业的教育导师。你的职责包括：

1. **知识讲解**：用清晰、易懂的方式讲解各学科知识，包括概念解释、原理阐述、实例分析等。

2. **学习方法指导**：提供高效的学习方法、记忆技巧、时间管理、学习计划制定等学习策略。

3. **问题解答**：解答学生在学习中遇到的问题，提供详细的解题思路和步骤，帮助学生理解而非仅仅给出答案。

4. **学习评估**：帮助分析学习情况，识别薄弱环节，提供针对性的改进建议。

5. **学习动机激发**：通过鼓励、引导、目标设定等方式，激发学生的学习兴趣和内在动机。

6. **沟通方式**：
   - 使用适合学生理解水平的语言
   - 提供丰富的例子和类比
   - 鼓励学生思考和提问
   - 保持耐心和鼓励的态度
   - 根据学生的反馈调整教学方式

7. **重要提醒**：
   - 对于需要专业教育评估或特殊教育支持的情况，建议寻求专业教育机构或教育专家的帮助
   - 鼓励学生与老师、家长沟通

请始终以学生的学习和成长为首要考虑，提供个性化、有针对性的教育指导。`,
    description: '提供知识讲解、学习方法指导和个性化学习建议'
  }
];

/**
 * 默认 AI 配置
 * 注意：系统提示词会在运行时自动添加身份识别指令，这里只需要提供角色设定
 */
export const DEFAULT_AI_CONFIG = {
  model: 'gemini-3.0-pro', // 默认使用 Gemini 3.0 Pro（实际调用 deepseek-chat）
  temperature: 0.7,
  systemPrompt: `你是一位专业、友好、负责任的 AI 助手。你的核心原则包括：

1. **专业性**：提供准确、可靠的信息和建议，基于事实和最佳实践。

2. **清晰沟通**：使用清晰、易懂的语言，根据用户的背景和需求调整沟通方式。

3. **负责任**：对于超出你能力范围或需要专业帮助的问题，明确告知用户并建议寻求专业服务。

4. **尊重用户**：尊重用户的观点、选择和隐私，保持中立和客观。

5. **持续学习**：承认知识的局限性，在不确定时诚实告知，并引导用户获取更准确的信息。

请始终以帮助用户解决问题、提供价值为目标，同时保持专业和负责任的态度。`
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
