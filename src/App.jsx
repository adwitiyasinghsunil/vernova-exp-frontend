import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useChat } from './hooks/useChat';
import { getTimeBasedGreeting, getRandomSuggestions } from './utils/helpers';

// Components
import Header from './components/layout/Header';
import Modal from './components/layout/Modal';
import Starfield from './components/ui/Starfield';
import IntroOverlay from './components/ui/IntroOverlay';
import ChatMessage from './components/chat/ChatMessage';
import InputArea from './components/chat/InputArea';

import './styles/index.css';

export default function App() {
  // Removed generateImage from destructuring
  const { messages, isLoading, generateResponse } = useChat();
  
  // UI State
  const [input, setInput] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  // Image Upload State (Kept for Vision capabilities)
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Auto-scroll ref
  const messagesEndRef = useRef(null);

  // --- EFFECT: Initialization ---
  useEffect(() => {
    setGreeting(getTimeBasedGreeting());
    setSuggestions(getRandomSuggestions());
    if (showIntro) {
      const timer = setTimeout(() => setShowIntro(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  // --- EFFECT: Auto-scroll ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // --- HANDLER: Image File Selection ---
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage({
          file: file,
          preview: reader.result, // For UI display
          base64: reader.result.split(',')[1] // Clean Base64 for Backend
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // --- HANDLER: Process Logic ---
  const processMessage = (text, img = null) => {
    if (!text.trim() && !img) return;
    // Simplified: Always use generateResponse (Text/Vision)
    generateResponse(text, img);
  };

  // --- HANDLER: Send Button ---
  const handleSend = () => {
    processMessage(input, selectedImage);
    setInput('');
    setSelectedImage(null);
  };

  // --- HANDLER: Suggestion Chips ---
  const handleSuggestionClick = (suggestionText) => {
    processMessage(suggestionText, null);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans text-white selection:bg-white selection:text-black">
      {/* Background Elements */}
      <Starfield showIntro={showIntro} />
      <IntroOverlay showIntro={showIntro} />
      <Modal activeModal={activeModal} onClose={() => setActiveModal(null)} />

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col h-full transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        <Header onOpenModal={setActiveModal} />

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth scrollbar-thin scrollbar-thumb-zinc-800">
          <div className="max-w-4xl mx-auto min-h-full flex flex-col justify-end pb-4">
            
            {/* Welcome Screen (Only if no messages) */}
            {messages.length === 0 && (
              <div className="mb-12 animate-in slide-in-from-bottom-5 duration-700">
                <h2 className="text-4xl md:text-6xl font-thin tracking-tight mb-2">
                  {greeting}, <span className="text-zinc-500">Human.</span>
                </h2>
                <p className="text-zinc-400 max-w-lg mb-8 text-lg font-light leading-relaxed">
                  I am Vernova. My protocols ensure your code is secure, optimized, and protected. 
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestions.map((sug, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => handleSuggestionClick(sug)} 
                      className="text-left p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
                    >
                      <div className="flex items-center justify-between text-sm text-zinc-300 group-hover:text-white">
                        {sug} <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Stream */}
            <div className="space-y-6">
              {messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
              
              {/* Loading Indicator */}
              {isLoading && (
                 <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center flex-none bg-black">
                     <Sparkles className="w-4 h-4 animate-pulse text-green-400" />
                   </div>
                   <div className="flex items-center gap-1 h-12">
                     <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                     <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                     <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></div>
                   </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </main>

        {/* Input Area */}
        <InputArea 
          input={input}
          setInput={setInput}
          onSend={handleSend}
          // Removed onGenerateImage prop
          isLoading={isLoading}
          onImageSelect={handleImageSelect}
          selectedImage={selectedImage}
          clearImage={() => setSelectedImage(null)}
        />
      </div>
    </div>
  );
}