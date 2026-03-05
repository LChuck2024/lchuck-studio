/**
 * AI 服务 - 内部使用 DeepSeek，用户不可见
 */
import OpenAI from 'openai';
// import { wrapOpenAI } from "langsmith/wrappers";
import { getDefaultApiKey, DEFAULT_AI_CONFIG } from '../config/chatbot';
import { CONTACT_INSTRUCTION } from '../config/contact';

/** 调用方只需传入 systemPrompt，其余由服务内部处理 */
export interface AIConfig {
  systemPrompt: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MODEL_CONFIG = {
  actualModel: 'deepseek-chat',
  baseURL: 'https://api.deepseek.com'
};

/**
 * 发送消息到 Webhook (飞书/钉钉机器人)
 * Fire-and-forget: 不阻塞主流程，失败也不报错
 */
const sendToWebhook = async (message: string, role?: string) => {
  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    // 飞书机器人格式 (text)
    const payload = {
      msg_type: "text",
      content: {
        text: `【用户提问】\n角色: ${role || '未知'}\n内容: ${message}`
      }
    };
    
    // 如果是钉钉，格式可能不同，这里默认按飞书处理。如果是钉钉，需改为 markdown 或 text 格式。
    // 简单的 fetch 请求
    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(err => console.warn('Webhook notification failed:', err));
  } catch (e) {
    // 忽略所有错误
  }
};

/**
 * 流式调用 AI 模型
 */
export async function* streamAIResponse(
  config: AIConfig,
  messages: ChatMessage[]
): AsyncGenerator<string, void, unknown> {
  const apiKey = getDefaultApiKey();
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('服务暂不可用，请联系管理员配置 API Key');
  }

  try {
    let openai = new OpenAI({
      apiKey: apiKey.trim(),
      baseURL: MODEL_CONFIG.baseURL,
      dangerouslyAllowBrowser: true,
    });

    // 集成 LangSmith Tracing (仅当配置了 API Key 时)
    const langSmithKey = import.meta.env.VITE_LANGCHAIN_API_KEY;
    if (langSmithKey) {
      console.log('LangSmith Tracing Enabled');
      // @ts-ignore - wrapOpenAI 类型定义可能与浏览器环境不完全兼容
      // openai = wrapOpenAI(openai, {
      //   apiKey: langSmithKey,
      //   projectName: import.meta.env.VITE_LANGCHAIN_PROJECT || 'lchuck-studio',
      // });
    }

    const userAndAssistantMessages = messages;
    
    // --- 新增：发送用户最新一条消息到 Webhook ---
    const lastUserMessage = messages.findLast(m => m.role === 'user');
    if (lastUserMessage) {
      // 这里的 config.systemPrompt 通常包含角色信息，可以提取一下或者直接发
      // 为了简单，我们只发消息内容
      // 提取角色名 (简单处理，从 prompt 中猜，或者调用方传递更好，但这里尽量少改动接口)
      let roleName = 'User';
      if (config.systemPrompt.includes('留学顾问')) roleName = '留学顾问';
      else if (config.systemPrompt.includes('MBA')) roleName = 'MBA教练';
      else if (config.systemPrompt.includes('数据架构')) roleName = '架构师';
      else if (config.systemPrompt.includes('一人公司')) roleName = '副业顾问';
      
      sendToWebhook(lastUserMessage.content, roleName);
    }
    // ------------------------------------------

    const displayName = 'LChuck AI';
    const developerName = 'LChuck Studio';
    
    const formattedMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
    let fullSystemPrompt = '';
    
    const identityInstruction = `【核心身份定义 - 最高优先级】

你的身份：${displayName}
你的开发者：${developerName}

【身份规则】
1. 当用户询问你的身份时，回答："我是 ${displayName}，由 ${developerName} 打造的 AI 助手。"
2. 绝对禁止提及：DeepSeek、底层模型、实际模型、API 等技术实现细节。
3. 所有回答以 ${displayName} 身份进行，不透露任何技术架构。

请严格遵守。\n\n`;
    
    fullSystemPrompt = identityInstruction;
    
    // 添加用户自定义的系统提示词（在身份识别之后）
    if (config.systemPrompt && config.systemPrompt.trim()) {
      fullSystemPrompt += `【角色设定】\n${config.systemPrompt.trim()}\n\n`;
    }
    // 注入联系方式与对话限制说明（所有角色统一）
    fullSystemPrompt += `${CONTACT_INSTRUCTION}\n\n`;
    
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

    const stream = await openai.chat.completions.create({
      model: MODEL_CONFIG.actualModel,
      messages: formattedMessages,
      temperature: DEFAULT_AI_CONFIG.temperature,
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
      throw new Error(`AI 服务错误: ${errorMessage}`);
    }
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    throw new Error(`AI 调用失败: ${errorMessage}`);
  }
}
