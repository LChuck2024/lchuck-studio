import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRESET_ROLES, DEFAULT_AI_CONFIG } from '../config/chatbot';
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
  selectedRoleId: string;
}

const STORAGE_KEY_SESSIONS = 'chatbot_sessions';
const STORAGE_KEY_CURRENT_SESSION = 'chatbot_current_session_id';

/** 从旧版 config 迁移：兼容 systemPrompt 匹配 */
function migrateConfig(config: { systemPrompt?: string; selectedRoleId?: string }): string {
  if (config.selectedRoleId && PRESET_ROLES.some(r => r.id === config.selectedRoleId)) {
    return config.selectedRoleId;
  }
  const matched = PRESET_ROLES.find(r => r.prompt === config.systemPrompt);
  return matched?.id || DEFAULT_AI_CONFIG.defaultRoleId;
}

export const Chatbot: React.FC = () => {
  const navigate = useNavigate();
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: '你好！我是你的 AI 助手，有什么可以帮助你的吗？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<string>(DEFAULT_AI_CONFIG.defaultRoleId);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const streamingMessageIdRef = useRef<string | null>(null);

  const selectedRole = PRESET_ROLES.find(r => r.id === selectedRoleId) || PRESET_ROLES[0];

  useEffect(() => {
    const savedSessions = localStorage.getItem(STORAGE_KEY_SESSIONS);
    const savedCurrentSessionId = localStorage.getItem(STORAGE_KEY_CURRENT_SESSION);
    
    if (savedSessions) {
      try {
        const parsed: unknown[] = JSON.parse(savedSessions);
        const migratedSessions: ChatSession[] = parsed.map((s: any) => ({
          ...s,
          selectedRoleId: migrateConfig(s.config || { systemPrompt: s.config?.systemPrompt, selectedRoleId: s.selectedRoleId })
        }));
        setSessions(migratedSessions);
        
        if (savedCurrentSessionId) {
          const current = migratedSessions.find(s => s.id === savedCurrentSessionId);
          if (current) {
            setCurrentSessionId(current.id);
            setMessages(current.messages);
            setSelectedRoleId(current.selectedRoleId);
            return;
          }
        }
        
        if (migratedSessions.length > 0) {
          const latest = migratedSessions[0];
          setCurrentSessionId(latest.id);
          setMessages(latest.messages);
          setSelectedRoleId(latest.selectedRoleId);
        }
      } catch (e) {
        console.error('加载会话失败:', e);
      }
    }
  }, []);

  const saveSession = React.useCallback((session: ChatSession, updateList: boolean = true) => {
    setSessions(prev => {
      const updated = updateList
        ? [session, ...prev.filter(s => s.id !== session.id)]
        : prev.map(s => s.id === session.id ? session : s);
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(updated));
      return updated;
    });
    localStorage.setItem(STORAGE_KEY_CURRENT_SESSION, session.id);
  }, []);

  const generateSessionTitle = (msgs: Message[]): string => {
    const first = msgs.find(m => m.role === 'user');
    if (first) {
      const t = first.content.slice(0, 30);
      return t.length < first.content.length ? t + '...' : t;
    }
    return '新对话';
  };

  const formatDate = (date: Date): string =>
    date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (currentSessionId && messages.length > 0) {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        const session: ChatSession = {
          id: currentSessionId,
          title: generateSessionTitle(messages),
          date: formatDate(new Date()),
          messages,
          selectedRoleId
        };
        saveSession(session, false);
      }, 1000);
    }
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [messages, currentSessionId, selectedRoleId, saveSession]);

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
      
      const updatedMessages = [...messages, userMessage, { id: assistantId, role: 'assistant' as const, content: fullContent }];
      const sessionId = currentSessionId || Date.now().toString();
      saveSession({
        id: sessionId,
        title: generateSessionTitle(updatedMessages),
        date: formatDate(new Date()),
        messages: updatedMessages,
        selectedRoleId
      });
      setCurrentSessionId(sessionId);
    } catch (err) {
      const msg = err instanceof Error ? err.message : '未知错误';
      setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: `错误: ${msg}` } : m));
      setIsLoading(false);
      streamingMessageIdRef.current = null;
    }
  };

  const handleCreateNewChat = () => {
    if (messages.length > 1 || (messages.length === 1 && messages[0].content !== '你好！我是你的 AI 助手，有什么可以帮助你的吗？')) {
      saveSession({
        id: currentSessionId || Date.now().toString(),
        title: generateSessionTitle(messages),
        date: formatDate(new Date()),
        messages,
        selectedRoleId
      });
    }
    const newId = Date.now().toString();
    setCurrentSessionId(newId);
    setMessages([{ id: newId, role: 'assistant', content: '你好！我是你的 AI 助手，有什么可以帮助你的吗？' }]);
    localStorage.setItem(STORAGE_KEY_CURRENT_SESSION, newId);
  };

  const handleLoadSession = (sessionId: string) => {
    const s = sessions.find(x => x.id === sessionId);
    if (s) {
      setCurrentSessionId(s.id);
      setMessages(s.messages);
      setSelectedRoleId(s.selectedRoleId);
      localStorage.setItem(STORAGE_KEY_CURRENT_SESSION, s.id);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-white text-black overflow-hidden font-sans">
      {/* 左侧边栏 */}
      <div className="w-56 border-r border-gray-200 flex flex-col bg-gradient-to-b from-gray-50 to-white shadow-lg pt-16">
        <div className="p-4 border-b border-gray-200">
          <button onClick={() => navigate('/')} className="text-black hover:text-gray-700 mb-4 text-sm flex items-center gap-2 transition-colors font-medium">
            ← Back
          </button>
          <button onClick={handleCreateNewChat} className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded transition-colors font-medium flex items-center justify-center gap-2">
            + New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <h3 className="px-2 py-2 text-xs font-bold text-black uppercase tracking-wider border-b border-gray-200 pb-2">History</h3>
          {sessions.map(s => (
            <div
              key={s.id}
              onClick={() => handleLoadSession(s.id)}
              className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 hover:shadow-sm text-black transition-all duration-200 text-sm truncate font-medium ${
                currentSessionId === s.id ? 'bg-red-50 border border-red-200' : ''
              }`}
            >
              {s.title}
              <div className="text-xs text-gray-800 mt-1 font-medium">{s.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 主聊天区域 */}
      <div className="flex-1 flex flex-col relative bg-white">
        <div className="h-16 mt-16 border-b border-gray-200 flex items-center px-6 bg-gradient-to-r from-gray-50 to-white justify-between">
          <h2 className="text-xl font-bold text-black">{selectedRole.nameCn || selectedRole.name}</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-xl shadow-sm ${
                msg.role === 'user' ? 'bg-red-50 border border-red-200 text-black' : 'bg-gray-50 border border-gray-200 text-black'
              }`}>
                <div className="text-xs text-gray-800 mb-1 capitalize font-semibold">{msg.role === 'user' ? '用户' : '助手'}</div>
                <div className="whitespace-pre-wrap leading-relaxed text-black">
                  {msg.content || (streamingMessageIdRef.current === msg.id ? '正在思考...' : '')}
                  {streamingMessageIdRef.current === msg.id && <span className="inline-block w-2 h-4 bg-red-600 ml-1 animate-pulse"></span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 bg-gradient-to-t from-white to-gray-50">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="输入你的问题..."
              className="flex-1 bg-white border border-gray-300 rounded-lg p-3 text-black font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all shadow-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-all font-bold shadow-md hover:shadow-lg"
            >
              {isLoading ? '发送中...' : '发送'}
            </button>
          </div>
        </div>
      </div>

      {/* 右侧边栏 - Assistant Profile & Conversion */}
      <div className="w-80 border-l border-gray-200 bg-gradient-to-b from-gray-50 to-white shadow-lg flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold text-lg text-black">助手档案</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* 角色选择 */}
          <div className="space-y-2">
            <label className="text-sm text-black font-medium">切换助手</label>
            <select
              value={selectedRoleId}
              onChange={e => setSelectedRoleId(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm text-black font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all shadow-sm appearance-none"
            >
              {PRESET_ROLES.map(r => (
                <option key={r.id} value={r.id}>{r.nameCn || r.name}</option>
              ))}
            </select>
          </div>

          {/* Assistant Profile */}
          <div className="space-y-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl border-2 border-gray-200">
                {selectedRole.avatar || '🤖'}
              </div>
              <div>
                <h3 className="font-bold text-lg text-black">{selectedRole.nameCn || selectedRole.name}</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{selectedRole.description}</p>
            {selectedRole.capabilities && selectedRole.capabilities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedRole.capabilities.map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Need Human Help? - Conversion CTA */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-bold text-black">Need Human Help?</h3>
            <button
              onClick={() => setShowPdfModal(true)}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors shadow-md"
            >
              获取 270+ 课程数据库 (PDF)
            </button>
            <a
              href="https://www.xiaohongshu.com/user/profile/5f38d8a3000000000101f0a2"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-4 border-2 border-red-600 text-red-600 hover:bg-red-50 rounded-lg font-bold text-center transition-colors"
            >
              预约架构师 1V1 咨询
            </a>
          </div>
        </div>
      </div>

      {/* PDF Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50" onClick={() => setShowPdfModal(false)}>
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-black mb-4">获取 270+ 课程数据库</h3>
            <div className="w-48 h-48 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center text-4xl text-gray-400 border-2 border-dashed border-gray-300">
              扫码获取
            </div>
            <p className="text-sm text-gray-600 text-center mb-4">
              请将下方二维码保存至相册，或点击链接获取
            </p>
            <a
              href="#"
              className="block w-full py-2 text-center text-red-600 font-bold hover:underline"
            >
              获取 2026 避坑指南 PDF →
            </a>
            <button
              onClick={() => setShowPdfModal(false)}
              className="mt-4 w-full py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
