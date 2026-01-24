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
 * 获取模型的 API 端点
 */
function getModelBaseURL(model: string): string | undefined {
  const modelConfig = AVAILABLE_MODELS.find(m => m.value === model);
  return modelConfig?.baseURL;
}

/**
 * 流式调用 AI 模型
 */
export async function* streamAIResponse(
  config: AIConfig,
  messages: ChatMessage[],
  signal?: AbortSignal
): AsyncGenerator<string, void, unknown> {
  if (!config.apiKey || config.apiKey.trim() === '') {
    throw new Error('API Key 未设置，请在右侧边栏配置 API Key');
  }

  try {
    // 获取模型的 API 端点
    const baseURL = getModelBaseURL(config.model);
    
    // 创建 OpenAI 客户端（兼容 OpenAI API 格式的模型都可以使用）
    const openai = new OpenAI({
      apiKey: config.apiKey.trim(),
      baseURL: baseURL, // DeepSeek 和 Qwen 使用自定义端点
      dangerouslyAllowBrowser: true, // 注意：在生产环境中应该通过后端 API 调用
    });

    // 准备消息历史
    // ChatMessage 只包含 user 和 assistant，所以直接使用
    const userAndAssistantMessages = messages;
    
    // 检查模型是否支持 system 角色
    // Qwen 模型可能不支持 system 角色，需要将系统提示词作为第一条 user 消息
    const modelConfig = AVAILABLE_MODELS.find(m => m.value === config.model);
    const supportsSystemRole = modelConfig?.provider !== 'qwen';
    
    const formattedMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
    
    // 添加系统提示词
    if (config.systemPrompt && config.systemPrompt.trim()) {
      if (supportsSystemRole) {
        // 支持 system 角色的模型（OpenAI, DeepSeek）
        formattedMessages.push({
          role: 'system',
          content: config.systemPrompt.trim()
        });
      } else {
        // 不支持 system 角色的模型（Qwen），将系统提示词作为第一条 user 消息
        formattedMessages.push({
          role: 'user',
          content: `[系统指令] ${config.systemPrompt.trim()}`
        });
        formattedMessages.push({
          role: 'assistant',
          content: '好的，我理解了。我会按照你的指示来回答。'
        });
      }
    }
    
    // 添加对话历史
    formattedMessages.push(...userAndAssistantMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    } as OpenAI.Chat.Completions.ChatCompletionMessageParam)));

    // 调试：打印消息格式
    console.log('系统提示词:', config.systemPrompt);
    console.log('模型:', config.model, '支持 system 角色:', supportsSystemRole);
    console.log('消息数量:', formattedMessages.length);
    console.log('第一条消息:', formattedMessages[0]);

    // 流式调用 AI API
    const stream = await openai.chat.completions.create({
      model: config.model,
      messages: formattedMessages,
      temperature: config.temperature,
      stream: true,
    });

    // 流式返回文本块
    for await (const chunk of stream) {
      // 检查是否被取消
      if (signal?.aborted) {
        throw new DOMException('Operation aborted', 'AbortError');
      }
      
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        yield content;
      }
    }
  } catch (error) {
    // 如果是取消操作，直接抛出
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error;
    }
    
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
