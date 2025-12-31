import React, { useRef } from 'react';
import { Send, Paperclip, Loader2, X } from 'lucide-react';

export default function InputArea({ input, setInput, onSend, isLoading, onImageSelect, selectedImage, clearImage }) {
  const fileInputRef = useRef(null);

  // --- NEW: Handle Paste (Ctrl+V) ---
  const handlePaste = (e) => {
    const items = e.clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      // 1. Handle Image Paste
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        
        // Create a synthetic event object to reuse onImageSelect logic
        const syntheticEvent = {
          target: {
             files: [file]
          }
        };
        
        if (onImageSelect) {
           onImageSelect(syntheticEvent);
        }
        e.preventDefault(); // Prevent pasting the image filename into text input
        return;
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <footer className="flex-none p-4 md:p-6 bg-gradient-to-t from-black via-black to-transparent">
      <div className="max-w-4xl mx-auto">
        
        {/* Image Preview */}
        {selectedImage && (
          <div className="mb-2 relative inline-block animate-in zoom-in-95 duration-200">
            <img src={selectedImage.preview} alt="Selected" className="h-16 w-auto rounded-lg border border-zinc-700" />
            <button onClick={clearImage} className="absolute -top-2 -right-2 bg-zinc-800 text-white rounded-full p-1 border border-zinc-600 hover:bg-zinc-700">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-700 to-zinc-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
          <div className="relative flex items-center bg-black rounded-2xl border border-zinc-800 p-1">
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-zinc-400 hover:text-white transition-colors hover:bg-zinc-900 rounded-xl"
              title="Upload Image for Analysis"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={onImageSelect}
              accept="image/*"
              className="hidden"
            />

            {/* Input with Paste Handler */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              onPaste={handlePaste} // <--- Added Listener
              placeholder="Ask Vernova (Ctrl+V to paste images)..."
              className="w-full bg-transparent p-3 text-white placeholder-zinc-600 focus:outline-none font-mono text-sm"
              autoComplete="off"
            />

            <button
              onClick={onSend}
              disabled={(!input.trim() && !selectedImage) || isLoading}
              className="p-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <div className="text-center mt-3 text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
          Vernova AI can make mistakes,  so double-check it • v1 BETA
        </div>
      </div>
    </footer>
  );
}