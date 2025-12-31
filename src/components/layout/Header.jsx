import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Lock, Zap, Info, User } from 'lucide-react';

export default function Header({ onOpenModal }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex-none p-6 flex justify-between items-center backdrop-blur-sm bg-black/20 border-b border-white/10">
      <div className="flex items-center gap-3 cursor-default">
        <span className="font-bold tracking-widest text-xl text-white font-techno">VERNOVA AI</span>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-4 text-xs text-zinc-500 font-mono">
          <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> E2E MASKING</span>
          <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> NVIDIA ACCELERATED</span>
        </div>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            About Us <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-90' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-200 z-50">
              <button onClick={() => { onOpenModal('vernova'); setIsDropdownOpen(false); }} className="w-full text-left px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-white/5 flex items-center gap-2">
                <Info className="w-4 h-4" /> About Vernova
              </button>
              <button onClick={() => { onOpenModal('founder'); setIsDropdownOpen(false); }} className="w-full text-left px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-white/5 flex items-center gap-2">
                <User className="w-4 h-4" /> About Founder
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}