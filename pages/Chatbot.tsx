import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRESET_ROLES, DEFAULT_AI_CONFIG, AVAILABLE_MODELS, getDefaultApiKey } from '../config/chatbot';
import { streamAIResponse, type AIConfig as ServiceAIConfig, type ChatMessage } from '../services/aiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  date: string;
  messages: Message[];
  config: AIConfig;
}

interface AIConfig {
  apiKey: string;
  model: string;
  temperature: number;
  systemPrompt: string;
}

const STORAGE_KEY_SESSIONS = 'chatbot_sessions';
const STORAGE_KEY_CURRENT_SESSION = 'chatbot_current_session_id';

export const Chatbot: React.FC = () => {
  const navigate = useNavigate();
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: '你好！我是你的 AI 助手，有什么可以帮助你的吗？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [config, setConfig] = useState<AIConfig>({
    apiKey: getDefaultApiKey(), // 从环境变量读取默认 API Key
    model: DEFAULT_AI_CONFIG.model,
    temperature: DEFAULT_AI_CONFIG.temperature,
    systemPrompt: DEFAULT_AI_CONFIG.systemPrompt
  });
  const streamingMessageIdRef = useRef<string | null>(null);

  // 从 localStorage 加载会话列表
  useEffect(() => {
    const savedSessions = localStorage.getItem(STORAGE_KEY_SESSIONS);
    const savedCurrentSessionId = localStorage.getItem(STORAGE_KEY_CURRENT_SESSION);
    
    if (savedSessions) {
      try {
        const parsedSessions: ChatSession[] = JSON.parse(savedSessions);
        setSessions(parsedSessions);
        
        // 如果有保存的当前会话 ID，加载该会话
        if (savedCurrentSessionId) {
          const currentSession = parsedSessions.find(s => s.id === savedCurrentSessionId);
          if (currentSession) {
            setCurrentSessionId(currentSession.id);
            setMessages(currentSession.messages);
            setConfig(currentSession.config);
            return;
          }
        }
        
        // 如果没有当前会话，加载最新的会话
        if (parsedSessions.length > 0) {
          const latestSession = parsedSessions[0];
          setCurrentSessionId(latestSession.id);
          setMessages(latestSession.messages);
          setConfig(latestSession.config);
        }
      } catch (error) {
        console.error('加载会话失败:', error);
      }
    }
  }, []);

  // 保存会话到 localStorage
  const saveSession = React.useCallback((session: ChatSession, updateList: boolean = true) => {
    setSessions(prevSessions => {
      let updatedSessions: ChatSession[];
      if (updateList) {
        updatedSessions = prevSessions.filter(s => s.id !== session.id);
        updatedSessions.unshift(session); // 将更新的会话放到最前面
      } else {
        // 只更新当前会话，不更新列表顺序
        updatedSessions = prevSessions.map(s => s.id === session.id ? session : s);
      }
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(updatedSessions));
      return updatedSessions;
    });
    localStorage.setItem(STORAGE_KEY_CURRENT_SESSION, session.id);
  }, []);

  // 当消息改变时，自动保存当前会话（延迟保存，避免频繁写入）
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (currentSessionId && messages.length > 0) {
      // 清除之前的保存定时器
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      // 延迟 1 秒保存，避免频繁写入 localStorage
      saveTimeoutRef.current = setTimeout(() => {
        const session: ChatSession = {
          id: currentSessionId,
          title: generateSessionTitle(messages),
          date: formatDate(new Date()),
          messages: messages,
          config: { ...config }
        };
        saveSession(session, false); // 不更新列表顺序，只更新内容
      }, 1000);
    }
    
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [messages, config, currentSessionId, saveSession]);

  // 生成会话标题（基于第一条用户消息）
  const generateSessionTitle = (messages: Message[]): string => {
    const firstUserMessage = messages.find(msg => msg.role === 'user');
    if (firstUserMessage) {
      const title = firstUserMessage.content.slice(0, 30);
      return title.length < firstUserMessage.content.length ? title + '...' : title;
    }
    return '新对话';
  };

  // 格式化日期
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    // 检查 API Key（优先使用用户输入的，如果为空则使用环境变量中的默认值）
    const apiKey = config.apiKey.trim() || getDefaultApiKey();
    if (!apiKey) {
      alert('请先在右侧边栏的 "API Key" 输入框中设置 API Key，或在 .env 文件中配置 VITE_DEEPSEEK_API_KEY');
      return;
    }
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };
    
    const assistantMessageId = (Date.now() + 1).toString();
    streamingMessageIdRef.current = assistantMessageId;
    
    // 添加用户消息和空的助手消息（用于流式更新）
    setMessages(prev => [...prev, userMessage, {
      id: assistantMessageId,
      role: 'assistant',
      content: ''
    }]);
    setInput('');
    setIsLoading(true);
    
    try {
      // 准备消息历史（不包括当前正在流式输出的消息）
      const messageHistory: ChatMessage[] = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // 调用流式 AI 响应
      // 优先使用用户输入的 API Key，如果为空则使用环境变量中的默认值
      const apiKey = config.apiKey.trim() || getDefaultApiKey();
      const serviceConfig: ServiceAIConfig = {
        apiKey: apiKey,
        model: config.model,
        temperature: config.temperature,
        systemPrompt: config.systemPrompt
      };
      
      let fullContent = '';
      for await (const chunk of streamAIResponse(serviceConfig, messageHistory)) {
        fullContent += chunk;
        // 更新流式输出的消息
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessageId 
            ? { ...msg, content: fullContent }
            : msg
        ));
      }
      
      setIsLoading(false);
      streamingMessageIdRef.current = null;
      
      // 保存当前会话
      const updatedMessages = [...messages, userMessage, {
        id: assistantMessageId,
        role: 'assistant' as const,
        content: fullContent
      }];
      
      const sessionId = currentSessionId || Date.now().toString();
      const session: ChatSession = {
        id: sessionId,
        title: generateSessionTitle(updatedMessages),
        date: formatDate(new Date()),
        messages: updatedMessages,
        config: { ...config }
      };
      
      setCurrentSessionId(sessionId);
      saveSession(session);
    } catch (error) {
      console.error('发送消息错误:', error);
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId 
          ? { ...msg, content: `错误: ${errorMessage}` }
          : msg
      ));
      setIsLoading(false);
      streamingMessageIdRef.current = null;
    }
  };

  const handleCreateNewChat = () => {
    // 保存当前会话（如果有消息）
    if (messages.length > 1 || (messages.length === 1 && messages[0].content !== '你好！我是你的 AI 助手，有什么可以帮助你的吗？')) {
      const sessionId = currentSessionId || Date.now().toString();
      const session: ChatSession = {
        id: sessionId,
        title: generateSessionTitle(messages),
        date: formatDate(new Date()),
        messages: messages,
        config: { ...config }
      };
      saveSession(session);
    }
    
    // 创建新会话
    const newSessionId = Date.now().toString();
    const newMessages: Message[] = [
      { id: Date.now().toString(), role: 'assistant', content: '你好！我是你的 AI 助手，有什么可以帮助你的吗？' }
    ];
    
    setCurrentSessionId(newSessionId);
    setMessages(newMessages);
    localStorage.setItem(STORAGE_KEY_CURRENT_SESSION, newSessionId);
  };

  // 加载指定会话
  const handleLoadSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(session.id);
      setMessages(session.messages);
      setConfig(session.config);
      localStorage.setItem(STORAGE_KEY_CURRENT_SESSION, session.id);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-white text-black overflow-hidden font-sans">
      {/* 左侧边栏 - 历史记录 */}
      <div className="w-56 border-r border-gray-200 flex flex-col bg-gradient-to-b from-gray-50 to-white shadow-lg pt-16">
        <div className="p-4 border-b border-gray-200">
          <button 
            onClick={() => navigate('/agents')}
            className="text-black hover:text-gray-700 mb-4 text-sm flex items-center gap-2 transition-colors font-medium"
          >
            ← Back
          </button>
          <button 
            onClick={handleCreateNewChat}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded transition-colors font-medium flex items-center justify-center gap-2"
          >
            + New Chat
          </button>
        </div>
        
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <h3 className="px-2 py-2 text-xs font-bold text-black uppercase tracking-wider border-b border-gray-200 pb-2">History</h3>
          {sessions.map(session => (
            <div 
              key={session.id} 
              onClick={() => handleLoadSession(session.id)}
              className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 hover:shadow-sm text-black transition-all duration-200 text-sm truncate font-medium ${
                currentSessionId === session.id ? 'bg-red-50 border border-red-200' : ''
              }`}
            >
              {session.title}
              <div className="text-xs text-gray-800 mt-1 font-medium">{session.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 主聊天区域 */}
      <div className="flex-1 flex flex-col relative bg-white">
        {/* 头部 - 增加顶部 margin 避免被 HUD 遮挡 */}
        <div className="h-16 mt-16 border-b border-gray-200 flex items-center px-6 bg-gradient-to-r from-gray-50 to-white justify-between">
          <h2 className="text-xl font-bold text-black">
            {(() => {
              const selectedRole = PRESET_ROLES.find(role => role.prompt === config.systemPrompt);
              return selectedRole ? (selectedRole.nameCn || selectedRole.name) : 'AI Chat Assistant';
            })()}
          </h2>
          <div className="text-sm text-black mono font-semibold">
            {config.model} | Temp: {config.temperature}
          </div>
        </div>

        {/* 消息列表 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-4 rounded-xl shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-red-50 border border-red-200 text-black' 
                    : 'bg-gray-50 border border-gray-200 text-black'
                }`}
              >
                <div className="text-xs text-gray-800 mb-1 capitalize font-semibold">
                  {msg.role === 'user' ? '用户' : '助手'}
                </div>
                <div className="whitespace-pre-wrap leading-relaxed text-black">
                  {msg.content || (streamingMessageIdRef.current === msg.id ? '正在思考...' : '')}
                  {streamingMessageIdRef.current === msg.id && (
                    <span className="inline-block w-2 h-4 bg-red-600 ml-1 animate-pulse"></span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 输入区域 */}
        <div className="p-4 border-t border-gray-200 bg-gradient-to-t from-white to-gray-50">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-white border border-gray-300 rounded-lg p-3 text-black font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all shadow-sm"
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-all font-bold shadow-md hover:shadow-lg"
            >
              {isLoading ? '发送中...' : 'Send'}
            </button>
          </div>
        </div>
      </div>

      {/* 右侧边栏 - 设置 */}
      <div className="w-80 border-l border-gray-200 bg-gradient-to-b from-gray-50 to-white shadow-lg flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold text-lg text-black">Configuration</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* API 密钥 */}
          <div className="space-y-2">
            <label className="text-sm text-black font-medium">
              API Key
              {config.apiKey && config.apiKey === getDefaultApiKey() && (
                <span className="text-xs text-gray-500 ml-2">(使用环境变量)</span>
              )}
            </label>
            <input 
              type="password" 
              value={config.apiKey}
              onChange={(e) => setConfig({...config, apiKey: e.target.value})}
              placeholder={getDefaultApiKey() ? "使用环境变量或输入自定义 API Key" : "Enter your API Key"}
              className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm text-black font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all shadow-sm"
            />
            {getDefaultApiKey() && (
              <p className="text-xs text-gray-500">
                已从 .env 文件加载默认 API Key，留空则使用默认值
              </p>
            )}
          </div>

          {/* 模型选择 */}
          <div className="space-y-2">
            <label className="text-sm text-black font-medium">Model</label>
            <select 
              value={config.model}
              onChange={(e) => setConfig({...config, model: e.target.value})}
              className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm text-black font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all shadow-sm appearance-none"
            >
              {AVAILABLE_MODELS.map(model => (
                <option key={model.value} value={model.value}>
                  {model.displayName || model.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {(() => {
                const modelConfig = AVAILABLE_MODELS.find(m => m.value === config.model);
                if (modelConfig) {
                  const providerNames: Record<string, string> = {
                    'openai': 'OpenAI',
                    'deepseek': 'DeepSeek',
                    'qwen': 'Qwen',
                    'gemini': 'Google Gemini',
                    'claude': 'Anthropic Claude'
                  };
                  return `${providerNames[modelConfig.provider] || 'AI'} 模型`;
                }
                return 'AI 模型';
              })()}
            </p>
          </div>

          {/* 温度参数 */}
          <div className="space-y-2">
            <label className="text-sm text-black font-medium flex justify-between">
              <span>Temperature</span>
              <span className="font-bold">{config.temperature}</span>
            </label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1"
              value={config.temperature}
              onChange={(e) => setConfig({...config, temperature: parseFloat(e.target.value)})}
              className="w-full accent-red-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* 预设角色 */}
          <div className="space-y-2">
            <label className="text-sm text-black font-medium">Preset Roles</label>
            <select 
              value={PRESET_ROLES.find(role => role.prompt === config.systemPrompt)?.id || ''}
              onChange={(e) => {
                const selectedRole = PRESET_ROLES.find(role => role.id === e.target.value);
                if (selectedRole) {
                  setConfig({...config, systemPrompt: selectedRole.prompt});
                }
              }}
              className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm text-black font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all shadow-sm appearance-none"
            >
              <option value="">-- 选择预设角色 --</option>
              {PRESET_ROLES.map(role => (
                <option key={role.id} value={role.id}>
                  {role.nameCn || role.name}
                </option>
              ))}
            </select>
            {PRESET_ROLES.find(role => role.prompt === config.systemPrompt)?.description && (
              <p className="text-xs text-gray-600 mt-1">
                {PRESET_ROLES.find(role => role.prompt === config.systemPrompt)?.description}
              </p>
            )}
          </div>

          {/* 自定义系统提示词 */}
          <div className="space-y-2">
            <label className="text-sm text-black font-medium">System Prompt</label>
            <textarea 
              value={config.systemPrompt}
              onChange={(e) => setConfig({...config, systemPrompt: e.target.value})}
              rows={6}
              className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm text-black font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all shadow-sm resize-none placeholder-gray-500"
              placeholder="Define the AI's behavior..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
