import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/** Chat bubble icon - inline SVG (no lucide-react dependency) */
const ChatBubbleIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const FloatingChatButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  // 在 Chatbot 页面本身不显示 FAB
  if (location.pathname === '/chatbot') {
    return null;
  }

  return (
    <Link
      to="/chatbot"
      className="fixed bottom-6 right-6 z-[150] group pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip - 左侧气泡 */}
      {isHovered && (
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-lg whitespace-nowrap">
          留学咨询 · AI 助手
        </span>
      )}

      {/* FAB 按钮 - 持续脉冲 + 悬停放大 */}
      <div
        className="
          w-14 h-14 sm:w-16 sm:h-16 rounded-full
          flex items-center justify-center text-white
          shadow-xl transition-all duration-300 ease-out
          group-hover:scale-110 group-hover:shadow-2xl
          animate-pulse
        "
        style={{
          background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
          boxShadow: '0 10px 40px -10px rgba(220, 38, 38, 0.5)',
        }}
      >
        <ChatBubbleIcon className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
    </Link>
  );
};
