import React, { useEffect, useRef } from 'react';

export const SnowParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const count = window.innerWidth < 768 ? 26 : 55;
    interface Particle {
      x: number;
      y: number;
      r: number;
      v: number;
      s: number;
      isGold: boolean;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.2 + 0.6,
        v: Math.random() * 0.45 + 0.2,
        s: Math.random() * Math.PI * 2,
        isGold: Math.random() < 0.45,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.v;
        p.s += 0.015;
        p.x += Math.sin(p.s) * 0.35;

        if (p.y > height + 6) {
          p.y = -6;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        if (p.isGold) {
          const alpha = 0.35 + Math.sin(p.s * 2.5) * 0.25;
          ctx.fillStyle = `rgba(217, 164, 65, ${alpha.toFixed(2)})`;
        } else {
          ctx.fillStyle = 'rgba(246, 238, 224, 0.4)';
        }
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-1"
      aria-hidden="true"
    />
  );
};
