import React from 'react';

export default function IntroOverlay({ showIntro, whiteFlash }) {
  return (
    <>
      {/* Main Text Overlay */}
      {showIntro && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          <h1 className="text-5xl md:text-9xl font-black tracking-[0.1em] text-white font-techno text-center animate-intro">
            VERNOVA
          </h1>
        </div>
      )}

      {/* White Flash Effect */}
      {whiteFlash && (
        <div className="absolute inset-0 z-[60] bg-white animate-out fade-out duration-1000 pointer-events-none mix-blend-screen"></div>
      )}
    </>
  );
}