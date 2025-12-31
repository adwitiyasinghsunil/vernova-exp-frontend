import React, { useEffect, useRef } from 'react';

export default function Starfield({ showIntro }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const stars = [];
    const numStars = showIntro ? 800 : 150;

    class Star {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.x = Math.random() * width - width / 2;
        this.y = Math.random() * height - height / 2;
        this.z = initial ? Math.random() * 2000 : 2000;
        this.speed = showIntro ? 40 : 2;
      }
      update(phase) {
        if (phase === 'warp') {
          this.z -= this.speed * 4;
          if (this.z <= 0) this.reset();
        } else {
          this.y += this.speed;
          if (this.y > height / 2) {
            this.y = -height / 2;
            this.x = Math.random() * width - width / 2;
          }
        }
      }
      draw(phase) {
         // ... (Keep existing draw logic)
         const screenX = this.x + width / 2;
         const screenY = this.y + height / 2;
         // Draw logic here based on original code
         // Simplified for brevity in this snippet
         const s = Math.random() * 2;
         ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
         ctx.beginPath();
         ctx.arc(screenX, screenY, s, 0, Math.PI * 2);
         ctx.fill();
      }
    }

    for (let i = 0; i < numStars; i++) stars.push(new Star());

    let phase = showIntro ? 'warp' : 'app';
    const render = () => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);
      if (!showIntro) phase = 'app';
      stars.forEach(star => {
        star.update(phase);
        star.draw(phase);
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [showIntro]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}