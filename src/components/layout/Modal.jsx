import React from 'react';
import { X } from 'lucide-react';
import { ABOUT_CONTENT } from '../../utils/constants';

export default function Modal({ activeModal, onClose }) {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl shadow-green-900/10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="mb-4">
          <span className="text-green-500 text-xs font-mono tracking-widest uppercase mb-2 block">Restricted Access // Info</span>
          <h3 className="text-2xl font-bold text-white font-techno tracking-wider">
            {ABOUT_CONTENT[activeModal].title}
          </h3>
        </div>
        <div className="text-zinc-300 leading-relaxed text-sm md:text-base">
          {ABOUT_CONTENT[activeModal].content}
        </div>
      </div>
    </div>
  );
}