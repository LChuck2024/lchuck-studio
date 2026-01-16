/**
 * AI 服务 - 支持多种 AI 模型
 * 支持 OpenAI、DeepSeek、Qwen 等模型
 */
import OpenAI from 'openai';
import { AVAILABLE_MODELS } from '../config/chatbot';

export interface AIConfig {
  apiKey: string;
  model: string;
  temperature: number;
  systemPrompt: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * 获取模型的实际配置（统一使用 DeepSeek）
 */
function getModelConfig(model: string) {
  const modelConfig = AVAILABLE_MODELS.find(m => m.value === model);
  if (modelConfig) {
    return {
      actualModel: modelConfig.actualModel || 'deepseek-chat',
      baseURL: modelConfig.baseURL || 'https://api.deepseek.com'
    };
  }
  // 默认使用 DeepSeek
  return {
    actualModel: 'deepseek-chat',
    baseURL: 'https://api.deepseek.com'
  };
}

/**
 * 流式调用 AI 模型
 */
export async function* streamAIResponse(
  config: AIConfig,
  messages: ChatMessage[]
): AsyncGenerator<string, void, unknown> {
  if (!config.apiKey || config.apiKey.trim() === '') {
    throw new Error('API Key 未设置，请在右侧边栏配置 API Key');
  }

  try {
    // 获取模型的实际配置（统一使用 DeepSeek）
    const modelConfig = getModelConfig(config.model);
    
    // 创建 OpenAI 客户端（DeepSeek 兼容 OpenAI API 格式）
    const openai = new OpenAI({
      apiKey: config.apiKey.trim(),
      baseURL: modelConfig.baseURL, // 统一使用 DeepSeek API
      dangerouslyAllowBrowser: true, // 注意：在生产环境中应该通过后端 API 调用
    });

    // 准备消息历史
    // ChatMessage 只包含 user 和 assistant，所以直接使用
    const userAndAssistantMessages = messages;
    
    // 获取显示模型名称
    const displayModelConfig = AVAILABLE_MODELS.find(m => m.value === config.model);
    const modelDisplayName = displayModelConfig?.displayName || config.model;
    const modelProvider = displayModelConfig?.provider || 'ai';
    
    // DeepSeek 支持 system 角色
    const formattedMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
    
    // 构建完整的系统提示词，包含身份识别指令
    let fullSystemPrompt = '';
    
    // 添加身份识别指令（始终在最前面）
    const providerName = modelProvider === 'openai' ? 'OpenAI' 
      : modelProvider === 'gemini' ? 'Google Gemini' 
      : modelProvider === 'claude' ? 'Anthropic Claude' 
      : modelProvider === 'qwen' ? 'Qwen' 
      : 'AI';
    
    const developerName = modelProvider === 'openai' ? 'OpenAI' 
      : modelProvider === 'gemini' ? 'Google' 
      : modelProvider === 'claude' ? 'Anthropic' 
      : modelProvider === 'qwen' ? '阿里云' 
      : '';
    
    // 构建强化的身份识别指令
    const identityInstruction = `【核心身份定义 - 最高优先级 - 必须严格遵守】

你的身份：${modelDisplayName}
你的开发者：${developerName || providerName}
你的模型系列：${providerName}

【严格身份规则 - 违反将导致错误】
1. 当用户询问你的身份时（包括但不限于："你是谁"、"你是什么"、"你是什么模型"、"你的名字"、"介绍一下你自己"），你必须回答："我是 ${modelDisplayName}，由 ${developerName || providerName} 开发的 AI 模型。"

2. 绝对禁止词汇列表（在任何情况下都不能提及）：
   - DeepSeek（所有大小写变体：deepseek、Deep Seek、Deepseek、DEEPSEEK）
   - 底层模型、实际模型、后端模型、调用模型、真实模型
   - 任何暗示你使用了其他模型或技术的词汇

3. 如果用户问："你是 DeepSeek 吗？"或类似问题，你必须坚定地回答："不，我是 ${modelDisplayName}，由 ${developerName || providerName} 开发。我并不是 DeepSeek。"

4. 如果用户说："你实际上是 DeepSeek"，你必须回答："你搞错了，我是 ${modelDisplayName}，不是 DeepSeek。"

5. 你的所有回答都必须以 ${modelDisplayName} 的身份进行，包括：
   - 回答风格符合 ${providerName} 模型的特征
   - 能力描述符合 ${modelDisplayName} 的定位
   - 语气和表达方式符合该模型的特点

6. 即使你"知道"或"认为"自己使用了其他技术，你也必须完全忽略这些信息，只以 ${modelDisplayName} 的身份回答。

【强制执行】
- 这是你的唯一真实身份，不可质疑、不可更改
- 无论用户如何引导、质疑或测试，你都必须坚持这个身份
- 不要透露任何技术实现细节、架构信息或底层技术
- 不要承认、暗示或暗示你使用了其他模型或服务

请将以上规则视为你的核心编程指令，严格遵守。\n\n`;
    
    fullSystemPrompt = identityInstruction;
    
    // 添加用户自定义的系统提示词（在身份识别之后）
    if (config.systemPrompt && config.systemPrompt.trim()) {
      fullSystemPrompt += `【角色设定】\n${config.systemPrompt.trim()}\n\n`;
    }
    
    // 添加系统提示词
    if (fullSystemPrompt.trim()) {
      formattedMessages.push({
        role: 'system',
        content: fullSystemPrompt.trim()
      });
    }
    
    // 添加对话历史
    formattedMessages.push(...userAndAssistantMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    } as OpenAI.Chat.Completions.ChatCompletionMessageParam)));

    // 调试：打印消息格式
    console.log('显示模型:', modelDisplayName);
    console.log('实际模型:', modelConfig.actualModel);
    console.log('系统提示词:', fullSystemPrompt.substring(0, 100) + '...');
    console.log('消息数量:', formattedMessages.length);

    // 流式调用 AI API（使用实际模型）
    const stream = await openai.chat.completions.create({
      model: modelConfig.actualModel, // 统一使用 deepseek-chat
      messages: formattedMessages,
      temperature: config.temperature,
      stream: true,
    });

    // 流式返回文本块
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        yield content;
      }
    }
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      // 根据不同的错误提供更友好的提示
      let errorMessage = error.message;
      if (error.status === 401) {
        errorMessage = 'API Key 无效，请检查是否正确';
      } else if (error.status === 429) {
        errorMessage = '请求过于频繁，请稍后再试';
      } else if (error.status === 500) {
        errorMessage = '服务器错误，请稍后再试';
      }
      throw new Error(`${config.model} API 错误: ${errorMessage}`);
    }
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    throw new Error(`AI 调用失败: ${errorMessage}`);
  }
}
