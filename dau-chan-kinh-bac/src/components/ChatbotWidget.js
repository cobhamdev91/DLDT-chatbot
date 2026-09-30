'use client';
import { useState, useEffect, useRef } from 'react';

const CONFIG = {
  projectId: '01e54cda-a723-491d-8859-518f9f45d570',
  publicToken: '21632fe7-5b18-4d58-b81e-07862dbe6045',
  hostOrigin: 'https://workflowhub-web-id11.onrender.com',
  botName: 'Kinh Bắc Assistant',
  greetingText: 'Xin chào! 👋 Tôi là trợ lý AI Kinh Bắc. Hãy hỏi tôi về điểm đến, ẩm thực hay lịch trình du lịch nhé!',
  greetingDelay: 3000,
  greetingAutoHide: 10000,
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatLoaded, setIsChatLoaded] = useState(false);
  const [isLoadingIframe, setIsLoadingIframe] = useState(true);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingDismissed, setGreetingDismissed] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const iframeUrl = `${CONFIG.hostOrigin}/embed/projects/${CONFIG.projectId}/chat?publicToken=${CONFIG.publicToken}`;

  // Expose openChatbot to window
  useEffect(() => {
    window.openChatbot = () => {
      setIsOpen(true);
      setIsChatLoaded(true);
      setShowGreeting(false);
      setGreetingDismissed(true);
    };

    return () => {
      delete window.openChatbot;
    };
  }, []);

  // Greeting timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!greetingDismissed && !isOpen) {
        setShowGreeting(true);
      }
    }, CONFIG.greetingDelay);

    return () => clearTimeout(timer);
  }, [greetingDismissed, isOpen]);

  // Greeting auto-hide
  useEffect(() => {
    if (showGreeting) {
      const hideTimer = setTimeout(() => {
        setShowGreeting(false);
      }, CONFIG.greetingAutoHide);
      return () => clearTimeout(hideTimer);
    }
  }, [showGreeting]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const togglePopup = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsChatLoaded(true);
      setShowGreeting(false);
      setGreetingDismissed(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleRefresh = (e) => {
    e.stopPropagation();
    setIsLoadingIframe(true);
    setRefreshKey((prev) => prev + 1);
  };

  const dismissGreeting = (e) => {
    e.stopPropagation();
    setShowGreeting(false);
    setGreetingDismissed(true);
  };

  return (
    <>
      {/* GREETING TOOLTIP */}
      <div
        className={`chatbot-greeting ${showGreeting && !isOpen ? 'is-visible' : ''}`}
        id="chatbot-greeting"
      >
        <button
          className="chatbot-greeting__close"
          id="chatbot-greeting-close"
          aria-label="Đóng"
          onClick={dismissGreeting}
        >
          &times;
        </button>
        <p className="chatbot-greeting__text">
          Xin chào! 👋 Tôi là <strong>trợ lý AI Kinh Bắc</strong>. Hãy hỏi tôi về điểm đến, ẩm thực hay lịch trình du lịch nhé!
        </p>
      </div>

      {/* POPUP WINDOW */}
      <div
        className={`chatbot-popup ${isOpen ? 'is-open' : ''}`}
        id="chatbot-popup"
        style={{
          display: 'flex',
          visibility: isOpen ? 'visible' : 'hidden',
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
      >
        {/* HEADER */}
        <div className="chatbot-popup__header">
          <div className="chatbot-popup__header-left">
            <div className="chatbot-popup__avatar">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none"/>
                <circle cx="8" cy="10" r="1.5" fill="currentColor" stroke="none"/>
                <circle cx="16" cy="10" r="1.5" fill="currentColor" stroke="none"/>
              </svg>
            </div>
            <div className="chatbot-popup__info">
              <span className="chatbot-popup__name">{CONFIG.botName}</span>
              <span className="chatbot-popup__status">
                <span className="chatbot-popup__status-dot"></span>
                Đang hoạt động
              </span>
            </div>
          </div>
          <div className="chatbot-popup__header-actions">
            <button
              className="chatbot-popup__header-btn"
              id="chatbot-refresh"
              aria-label="Làm mới"
              title="Làm mới"
              onClick={handleRefresh}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
            </button>
            <button
              className="chatbot-popup__header-btn"
              id="chatbot-close"
              aria-label="Đóng"
              title="Đóng"
              onClick={() => setIsOpen(false)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="chatbot-popup__body" id="chatbot-body" style={{ position: 'relative', flex: 1, width: '100%', height: '100%' }}>
          {isLoadingIframe && (
            <div className="chatbot-popup__loader" id="chatbot-loader" style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
              <div className="chatbot-popup__spinner"></div>
              <span className="chatbot-popup__loader-text">Đang kết nối...</span>
            </div>
          )}

          {isChatLoaded && (
            <iframe
              key={refreshKey}
              src={iframeUrl}
              allow="clipboard-write"
              title="Chatbot Kinh Bắc"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block'
              }}
              onLoad={() => setIsLoadingIframe(false)}
            />
          )}
        </div>
      </div>

      {/* FLOATING ACTION BUTTON */}
      <button
        className={`chatbot-fab ${isOpen ? 'is-open' : ''}`}
        id="chatbot-fab"
        aria-label={isOpen ? 'Đóng chatbot' : 'Mở chatbot'}
        onClick={togglePopup}
      >
        <span className="fab-icon-chat">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </span>
        <span className="fab-icon-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </span>
        {showGreeting && !isOpen && (
          <span className="chatbot-fab__badge" id="chatbot-badge">1</span>
        )}
      </button>
    </>
  );
}
