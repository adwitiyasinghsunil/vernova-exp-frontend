import React from 'react';
import { Mail, Youtube, Globe, Github, Twitter } from 'lucide-react';

// UPDATED: Points to your live Vercel backend
export const API_BASE_URL = "https://vernova-exp-backend.vercel.app/api";

export const ENDPOINTS = {
  TEXT: `${API_BASE_URL}/vernova-text-novagen-beta01`
};

export const SUGGESTIONS_POOL = [
  "Mask API keys in this Node.js snippet",
  "Check this HTML for XSS vulnerabilities",
  "Optimize this React component for rendering",
  "Generate a secure portfolio hero section",
  "Write a secure login form in PHP",
  "Explain SQL injection prevention",
  "Refactor this code to use fewer tokens",
];

export const ABOUT_CONTENT = {
  vernova: {
    title: "About Vernova AI",
    content: (
      <div className="space-y-4">
        <p>
          Vernova represents the next evolution in secure, client-side artificial intelligence. Unlike traditional models, Vernova prioritizes <span className="text-green-400">data sovereignty</span> and <span className="text-green-400">security-first code generation</span>.
        </p>
        <div className="grid grid-cols-1 gap-3 mt-4">
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <h4 className="font-bold text-white mb-1">Google for Startups</h4>
            <p className="text-sm text-zinc-400">Backed by the Google for Startups Cloud Program, ensuring enterprise-grade reliability.</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <h4 className="font-bold text-white mb-1">NVIDIA Powered</h4>
            <p className="text-sm text-zinc-400">Running on high-performance NVIDIA H100 Tensor Core GPU instances for real-time token optimization.</p>
          </div>
        </div>
      </div>
    )
  },
  founder: {
    title: "About the Founder",
    content: (
      <div className="space-y-4">
        <div className="border-b border-white/10 pb-4 mb-4">
          <h4 className="text-2xl font-bold text-white mb-1">Adwitiya Singh</h4>
          <p className="text-xs text-green-400 font-mono mb-2">Founder @ Vernova</p>
          <a href="mailto:vernovaai.foundersdesk@gmail.com" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
            <Mail className="w-3 h-3" /> vernovaai.foundersdesk@gmail.com
          </a>
        </div>
        
        <div className="space-y-3 text-zinc-300 text-sm leading-relaxed">
          <p>
            I am a <span className="text-white font-bold">16-year-old</span> innovator who kicked off my coding journey 4 years ago at age 12. It all started with my first laptop in 2020, moving quickly from gaming to a deep dive into AI & ML.
          </p>
          <p>
            With just a few chunks of code, I built my first Python AI, <span className="text-white font-bold">AIBA</span>. Since then, I've been certified by the <span className="text-green-400">Nvidia Deep Learning Institute</span>, contributed to Google DeepMind open source, and was invited as a Young Developer at <span className="text-white font-bold">GDG Ranchi</span>.
          </p>
          <p>
            Most recently, I showcased <span className="text-white font-bold">Mera Raasta</span>, an AI pothole detection system now collaborating with navigation providers to make roads safer for everyone.
          </p>
        </div>
        
        <div className="flex gap-3 mt-6 justify-center">
          <a href="https://www.youtube.com/@programmewithas" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-black transition-colors" title="YouTube"><Youtube className="w-5 h-5" /></a>
          <a href="https://adwitiyasinghportfolio.web.app" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-black transition-colors" title="Portfolio"><Globe className="w-5 h-5" /></a>
          <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-black transition-colors" title="GitHub"><Github className="w-5 h-5" /></a>
          <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-black transition-colors" title="Twitter"><Twitter className="w-5 h-5" /></a>
        </div>
      </div>
    )
  }
};