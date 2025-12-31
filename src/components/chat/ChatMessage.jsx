import React, { useRef, useEffect } from 'react';
import { Sparkles, Shield } from 'lucide-react';

const escapeHtmlInPre = (html) => {
  const container = document.createElement('div');
  container.innerHTML = html;

  container.querySelectorAll('pre code').forEach((code) => {
    code.textContent = code.innerHTML;
  });

  return container.innerHTML;
};

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current || isUser) return;

    const preTags = contentRef.current.querySelectorAll('pre');

    preTags.forEach((pre) => {
      if (pre.closest('.code-block-wrapper')) return;

      const codeEl = pre.querySelector('code');

      let language = 'text';
      if (codeEl?.className) {
        const match = codeEl.className.match(/language-([\w-]+)/);
        if (match) language = match[1];
      }

      const wrapper = document.createElement('div');
      wrapper.className =
        'code-block-wrapper relative rounded-lg border border-zinc-800 bg-zinc-950 mb-4 overflow-hidden';

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      Object.assign(pre.style, {
        margin: '0',
        border: 'none',
        borderRadius: '0',
        background: 'transparent',
      });

      const header = document.createElement('div');
      header.className =
        'sticky top-0 z-10 flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800';

      const langLabel = document.createElement('span');
      langLabel.className =
        'text-xs text-zinc-500 font-mono font-bold uppercase';
      langLabel.textContent = language;

      const button = document.createElement('button');
      button.className =
        'flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition';

      const copyIcon = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="8" y="8" width="14" height="14" rx="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10"/>
        </svg>
      `;

      const checkIcon = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;

      button.innerHTML = `${copyIcon}<span>Copy</span>`;

      button.onclick = async () => {
        await navigator.clipboard.writeText(codeEl?.innerText || '');
        button.innerHTML = `${checkIcon}<span className="text-green-400">Copied</span>`;
        setTimeout(() => {
          button.innerHTML = `${copyIcon}<span>Copy</span>`;
        }, 2000);
      };

      header.appendChild(langLabel);
      header.appendChild(button);
      wrapper.insertBefore(header, pre);
    });
  }, [message.text, isUser]);

  return (
    <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center bg-black mt-1">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      )}

      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 md:p-6 ${
          isUser
            ? 'bg-white text-black rounded-br-none'
            : 'bg-zinc-900 border border-zinc-800 rounded-bl-none'
        }`}
      >
        {/* ✅ IMAGE THUMBNAIL (USER + AI) */}
        {message.image && (
          <img
            src={message.image}
            alt="Uploaded"
            className="mb-4 max-h-64 rounded-lg border border-zinc-700 object-cover"
          />
        )}

        <div ref={contentRef}>
          {isUser ? (
            <div className="whitespace-pre-wrap">
              {message.text}
            </div>
          ) : (
            <div
              className="ai-response-content text-zinc-300"
              dangerouslySetInnerHTML={{
                __html: escapeHtmlInPre(message.text),
              }}
            />
          )}
        </div>

        {message.role === 'ai' && (
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
            <Shield className="w-3 h-3 text-green-500" />
            Verified Security • Vernova Core
          </div>
        )}
      </div>
    </div>
  );
}
