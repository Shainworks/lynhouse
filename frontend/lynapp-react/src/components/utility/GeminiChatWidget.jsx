import { useState, useRef, useEffect } from 'react';
import { geminiChat } from '../../services/api';
import './GeminiChatWidget.css';

const BOT_AVATAR = '🏡';
const USER_AVATAR = '👤';

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'bot',
  text: "Hi! I'm **Lyn AI**, your real estate assistant. Ask me anything about buying, selling, renting, investing, or property valuations! 🏠",
};

export default function GeminiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setHasNewMessage(false);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { id: Date.now(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await geminiChat(text);
      const botMsg = { id: Date.now() + 1, role: 'bot', text: res.data.reply };
      setMessages(prev => [...prev, botMsg]);
      if (!isOpen) setHasNewMessage(true);
    } catch (err) {
      const errText = err?.response?.data?.details || err?.response?.data?.error || 'Sorry, something went wrong. Please try again.';
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: `⚠️ ${errText}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Render markdown-like bold (**text**) and line breaks
  const renderText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part.split('\n').map((line, j, arr) => (
        <span key={`${i}-${j}`}>{line}{j < arr.length - 1 && <br />}</span>
      ));
    });
  };

  const QUICK_QUESTIONS = [
    'How do I start investing in real estate?',
    'What affects property prices?',
    'What is a good ROI for a rental?',
  ];

  return (
    <>
      {/* Floating toggle button */}
      <button
        id="gemini-chat-toggle"
        className={`gcw-toggle${isOpen ? ' gcw-toggle--open' : ''}`}
        onClick={() => setIsOpen(o => !o)}
        aria-label={isOpen ? 'Close chat' : 'Open Lyn AI chat'}
        title="Chat with Lyn AI"
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {hasNewMessage && !isOpen && <span className="gcw-badge" />}
      </button>

      {/* Chat panel */}
      <div className={`gcw-panel${isOpen ? ' gcw-panel--open' : ''}`} role="dialog" aria-label="Lyn AI Chatbot">
        {/* Header */}
        <div className="gcw-header">
          <div className="gcw-header-left">
            <div className="gcw-avatar-ring">
              <span className="gcw-bot-avatar">{BOT_AVATAR}</span>
              <span className="gcw-online-dot" />
            </div>
            <div>
              <p className="gcw-title">Lyn AI</p>
              <p className="gcw-subtitle">Real Estate Assistant · Powered by Gemini</p>
            </div>
          </div>
          <button className="gcw-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="gcw-messages" role="log" aria-live="polite">
          {messages.map(msg => (
            <div key={msg.id} className={`gcw-msg gcw-msg--${msg.role}`}>
              {msg.role === 'bot' && <span className="gcw-msg-avatar">{BOT_AVATAR}</span>}
              <div className="gcw-bubble">{renderText(msg.text)}</div>
              {msg.role === 'user' && <span className="gcw-msg-avatar gcw-msg-avatar--user">{USER_AVATAR}</span>}
            </div>
          ))}

          {loading && (
            <div className="gcw-msg gcw-msg--bot">
              <span className="gcw-msg-avatar">{BOT_AVATAR}</span>
              <div className="gcw-bubble gcw-bubble--typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick questions (only when no user messages yet) */}
        {messages.length === 1 && (
          <div className="gcw-quick">
            {QUICK_QUESTIONS.map((q, i) => (
              <button key={i} className="gcw-quick-btn" onClick={() => { setInput(q); inputRef.current?.focus(); }}>
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="gcw-input-area">
          <textarea
            ref={inputRef}
            id="gemini-chat-input"
            className="gcw-input"
            placeholder="Ask about real estate..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            aria-label="Chat message input"
          />
          <button
            id="gemini-chat-send"
            className="gcw-send-btn"
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
