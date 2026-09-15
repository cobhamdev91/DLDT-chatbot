/**
 * Chatbot Popup Widget for Dấu chân Kinh Bắc
 * Embeds the WorkflowHub chat widget as a floating popup.
 * 
 * Usage: Include chatbot-popup.css and chatbot-popup.js in your HTML.
 * The widget auto-initializes on page load.
 */

(function () {
    'use strict';

    // ===== CONFIGURATION =====
    const CONFIG = {
        projectId: '01e54cda-a723-491d-8859-518f9f45d570',
        publicToken: '21632fe7-5b18-4d58-b81e-07862dbe6045',
        hostOrigin: 'https://workflowhub-web-id11.onrender.com',
        botName: 'Kinh Bắc Assistant',
        greetingText: 'Xin chào! 👋 Tôi là <strong>trợ lý AI Kinh Bắc</strong>. Hãy hỏi tôi về điểm đến, ẩm thực hay lịch trình du lịch nhé!',
        greetingDelay: 3000,       // ms before showing greeting
        greetingAutoHide: 10000,   // ms before auto-hiding greeting
    };

    // ===== STATE =====
    let isOpen = false;
    let isChatLoaded = false;
    let greetingDismissed = false;

    // ===== CREATE DOM ELEMENTS =====

    function createWidget() {
        // 1. Greeting Tooltip
        const greeting = document.createElement('div');
        greeting.className = 'chatbot-greeting';
        greeting.id = 'chatbot-greeting';
        greeting.innerHTML = `
            <button class="chatbot-greeting__close" id="chatbot-greeting-close" aria-label="Đóng">&times;</button>
            <p class="chatbot-greeting__text">${CONFIG.greetingText}</p>
        `;

        // 2. Floating Action Button
        const fab = document.createElement('button');
        fab.className = 'chatbot-fab';
        fab.id = 'chatbot-fab';
        fab.setAttribute('aria-label', 'Mở chatbot');
        fab.innerHTML = `
            <span class="fab-icon-chat">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
            </span>
            <span class="fab-icon-close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </span>
            <span class="chatbot-fab__badge hidden" id="chatbot-badge">1</span>
        `;

        // 3. Popup Window
        const popup = document.createElement('div');
        popup.className = 'chatbot-popup';
        popup.id = 'chatbot-popup';
        popup.innerHTML = `
            <div class="chatbot-popup__header">
                <div class="chatbot-popup__header-left">
                    <div class="chatbot-popup__avatar">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none"/>
                            <circle cx="8" cy="10" r="1.5" fill="currentColor" stroke="none"/>
                            <circle cx="16" cy="10" r="1.5" fill="currentColor" stroke="none"/>
                        </svg>
                    </div>
                    <div class="chatbot-popup__info">
                        <span class="chatbot-popup__name">${CONFIG.botName}</span>
                        <span class="chatbot-popup__status">
                            <span class="chatbot-popup__status-dot"></span>
                            Đang hoạt động
                        </span>
                    </div>
                </div>
                <div class="chatbot-popup__header-actions">
                    <button class="chatbot-popup__header-btn" id="chatbot-refresh" aria-label="Làm mới" title="Làm mới">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="23 4 23 10 17 10"/>
                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                        </svg>
                    </button>
                    <button class="chatbot-popup__header-btn" id="chatbot-close" aria-label="Đóng" title="Đóng">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="chatbot-popup__body" id="chatbot-body">
                <div class="chatbot-popup__loader" id="chatbot-loader">
                    <div class="chatbot-popup__spinner"></div>
                    <span class="chatbot-popup__loader-text">Đang kết nối...</span>
                </div>
            </div>
        `;

        // Append to body
        document.body.appendChild(greeting);
        document.body.appendChild(popup);
        document.body.appendChild(fab);
    }

    // ===== CHAT IFRAME =====

    function loadChatIframe() {
        if (isChatLoaded) return;

        const body = document.getElementById('chatbot-body');
        const iframeUrl = `${CONFIG.hostOrigin}/embed/projects/${CONFIG.projectId}/chat?publicToken=${CONFIG.publicToken}`;

        const iframe = document.createElement('iframe');
        iframe.src = iframeUrl;
        iframe.allow = 'clipboard-write';
        iframe.title = 'Chatbot Kinh Bắc';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';

        iframe.addEventListener('load', function () {
            const loader = document.getElementById('chatbot-loader');
            if (loader) {
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 300);
            }
        });

        body.appendChild(iframe);
        isChatLoaded = true;

        console.log('[ChatbotPopup] Mounted iframe:', iframeUrl);
    }

    function refreshChat() {
        const body = document.getElementById('chatbot-body');
        const existingIframe = body.querySelector('iframe');
        if (existingIframe) existingIframe.remove();

        // Re-add loader
        const loader = document.createElement('div');
        loader.className = 'chatbot-popup__loader';
        loader.id = 'chatbot-loader';
        loader.innerHTML = `
            <div class="chatbot-popup__spinner"></div>
            <span class="chatbot-popup__loader-text">Đang kết nối lại...</span>
        `;
        body.prepend(loader);

        isChatLoaded = false;
        loadChatIframe();
    }

    // ===== TOGGLE =====

    function openPopup() {
        const popup = document.getElementById('chatbot-popup');
        const fab = document.getElementById('chatbot-fab');
        const greeting = document.getElementById('chatbot-greeting');
        const badge = document.getElementById('chatbot-badge');

        isOpen = true;
        popup.classList.add('is-open');
        fab.classList.add('is-open');
        fab.setAttribute('aria-label', 'Đóng chatbot');

        // Hide greeting
        greeting.classList.remove('is-visible');
        greetingDismissed = true;

        // Hide badge
        badge.classList.add('hidden');

        // Load chat on first open
        if (!isChatLoaded) {
            loadChatIframe();
        }
    }

    function closePopup() {
        const popup = document.getElementById('chatbot-popup');
        const fab = document.getElementById('chatbot-fab');

        isOpen = false;
        popup.classList.remove('is-open');
        fab.classList.remove('is-open');
        fab.setAttribute('aria-label', 'Mở chatbot');
    }

    function togglePopup() {
        if (isOpen) {
            closePopup();
        } else {
            openPopup();
        }
    }

    // ===== GREETING =====

    function showGreeting() {
        if (greetingDismissed || isOpen) return;
        const greeting = document.getElementById('chatbot-greeting');
        const badge = document.getElementById('chatbot-badge');

        greeting.classList.add('is-visible');
        badge.classList.remove('hidden');

        // Auto-hide after a duration
        setTimeout(() => {
            if (!greetingDismissed && !isOpen) {
                greeting.classList.remove('is-visible');
            }
        }, CONFIG.greetingAutoHide);
    }

    function dismissGreeting() {
        const greeting = document.getElementById('chatbot-greeting');
        greeting.classList.remove('is-visible');
        greetingDismissed = true;
    }

    // ===== EVENT BINDINGS =====

    function bindEvents() {
        document.getElementById('chatbot-fab').addEventListener('click', togglePopup);
        document.getElementById('chatbot-close').addEventListener('click', closePopup);
        document.getElementById('chatbot-refresh').addEventListener('click', refreshChat);
        document.getElementById('chatbot-greeting-close').addEventListener('click', function (e) {
            e.stopPropagation();
            dismissGreeting();
        });

        // Close popup on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen) {
                closePopup();
            }
        });

        // Optional: clicking outside popup closes it
        // document.addEventListener('click', function (e) {
        //     const popup = document.getElementById('chatbot-popup');
        //     const fab = document.getElementById('chatbot-fab');
        //     if (isOpen && !popup.contains(e.target) && !fab.contains(e.target)) {
        //         closePopup();
        //     }
        // });
    }

    // ===== INIT =====

    function init() {
        createWidget();
        bindEvents();

        // Show greeting after delay
        setTimeout(showGreeting, CONFIG.greetingDelay);
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
