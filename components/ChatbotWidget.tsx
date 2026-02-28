import React, { useState, useRef, useEffect } from 'react';
import { PRESET_ROLES, DEFAULT_AI_CONFIG } from '../config/chatbot';
import { streamAIResponse, type AIConfig as ServiceAIConfig, type ChatMessage } from '../services/aiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const DEFAULT_GREETING = '你好！我是 LChuck Studio 的留学顾问，专注欧洲开放大学选课咨询。有什么可以帮助你的？';

const ChatBubbleIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: '1', role: 'assistant', content: DEFAULT_GREETING }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string>(DEFAULT_AI_CONFIG.defaultRoleId);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const streamingMessageIdRef = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedRole = PRESET_ROLES.find(r => r.id === selectedRoleId) || PRESET_ROLES[0];

  // 首次打开时加载默认角色和问候语
  useEffect(() => {
    if (isOpen && messages.length === 1 && messages[0].content === DEFAULT_GREETING) {
      setSelectedRoleId(DEFAULT_AI_CONFIG.defaultRoleId);
    }
  }, [isOpen]);

  // 外部触发：打开 Widget 并切换到指定角色（如 Agents 页的「试用教练」）
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ roleId?: string }>).detail;
      const roleId = detail?.roleId;
      if (roleId && PRESET_ROLES.some(r => r.id === roleId)) {
        setSelectedRoleId(roleId);
        const role = PRESET_ROLES.find(r => r.id === roleId);
        const greeting = roleId === 'study-abroad' ? DEFAULT_GREETING : `你好！已切换至 ${role?.nameCn || role?.name}，有什么可以帮助你的？`;
        setMessages([{ id: Date.now().toString(), role: 'assistant', content: greeting }]);
      }
      setIsOpen(true);
    };
    window.addEventListener('lchuck:open-chatbot', handler);
    return () => window.removeEventListener('lchuck:open-chatbot', handler);
  }, []);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    const assistantId = (Date.now() + 1).toString();
    streamingMessageIdRef.current = assistantId;
    setMessages(prev => [...prev, userMessage, { id: assistantId, role: 'assistant', content: '' }]);
    setInput('');
    setIsLoading(true);
    try {
      const messageHistory: ChatMessage[] = [...messages, userMessage].map(m => ({ role: m.role, content: m.content }));
      const serviceConfig: ServiceAIConfig = { systemPrompt: selectedRole.prompt };
      let fullContent = '';
      for await (const chunk of streamAIResponse(serviceConfig, messageHistory)) {
        fullContent += chunk;
        setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: fullContent } : m));
      }
      setIsLoading(false);
      streamingMessageIdRef.current = null;
    } catch (err) {
      const msg = err instanceof Error ? err.message : '未知错误';
      setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: `错误: ${msg}` } : m));
      setIsLoading(false);
      streamingMessageIdRef.current = null;
    }
  };

  const handleRoleSelect = (roleId: string) => {
    setSelectedRoleId(roleId);
    setRoleDropdownOpen(false);
    const role = PRESET_ROLES.find(r => r.id === roleId);
    const greeting = roleId === 'study-abroad' ? DEFAULT_GREETING : `你好！已切换至 ${role?.nameCn || role?.name}，有什么可以帮助你的？`;
    setMessages([{ id: Date.now().toString(), role: 'assistant', content: greeting }]);
  };

  // 关闭时显示 FAB
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 z-[150] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 hover:scale-110 animate-pulse pointer-events-auto"
        style={{
          bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
          background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
          boxShadow: '0 10px 40px -10px rgba(220, 38, 38, 0.5)',
        }}
      >
        <ChatBubbleIcon className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>
    );
  }

  // 打开时显示聊天窗口
  return (
    <div
      className="fixed z-[200] w-[350px] sm:w-[380px] max-w-[calc(100vw-2rem)] flex flex-col bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
      style={{
        bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
        right: '1.5rem',
        height: '600px',
        maxHeight: 'calc(100vh - 6rem)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white shrink-0">
        <div className="flex-1 min-w-0 relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="w-full flex items-center justify-center gap-2 text-sm font-bold text-black truncate hover:text-red-600 transition-colors"
          >
            <span>{selectedRole.avatar}</span>
            <span>{selectedRole.nameCn || selectedRole.name}</span>
            <span className="text-gray-400">▾</span>
          </button>
          {roleDropdownOpen && (
            <>
              <div className="fixed inset-0 z-[201]" onClick={() => setRoleDropdownOpen(false)} />
              <div className="absolute top-full left-0 right-0 mt-1 py-2 bg-white rounded-lg shadow-lg border border-gray-200 z-[202]">
                {PRESET_ROLES.map(r => (
                  <button
                    key={r.id}
                    onClick={() => handleRoleSelect(r.id)}
                    className={`w-full px-4 py-2 text-left text-sm font-medium flex items-center gap-2 hover:bg-gray-50 ${
                      selectedRoleId === r.id ? 'bg-red-50 text-red-600' : 'text-black'
                    }`}
                  >
                    <span>{r.avatar}</span>
                    <span>{r.nameCn || r.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="ml-2 p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-xl shadow-sm ${
              msg.role === 'user' ? 'bg-red-50 border border-red-200 text-black' : 'bg-gray-50 border border-gray-200 text-black'
            }`}>
              <div className="text-xs text-gray-600 mb-1">{msg.role === 'user' ? '你' : '助手'}</div>
              <div className="whitespace-pre-wrap leading-relaxed text-sm">
                {msg.content || (streamingMessageIdRef.current === msg.id ? '正在思考...' : '')}
                {streamingMessageIdRef.current === msg.id && <span className="inline-block w-2 h-4 bg-red-600 ml-1 animate-pulse" />}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="输入你的问题..."
            className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg text-sm font-bold"
          >
            {isLoading ? '...' : '发送'}
          </button>
        </div>
      </div>
    </div>
  );
};
