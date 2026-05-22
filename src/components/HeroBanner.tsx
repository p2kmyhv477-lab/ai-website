import { useRef, useEffect, useCallback } from 'react';

export default function HeroBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, speed: 0 });
  const distortionRef = useRef(0);
  const animRef = useRef<number>(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const mouse = mouseRef.current;

    // Calculate mouse speed
    const dx = mouse.x - mouse.prevX;
    const dy = mouse.y - mouse.prevY;
    const speed = Math.sqrt(dx * dx + dy * dy);
    mouse.speed = speed;
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;

    // Lerp distortion amount
    const targetDistortion = Math.min(speed * 0.02, 2);
    distortionRef.current += (targetDistortion - distortionRef.current) * 0.05;
    if (distortionRef.current < 0.01) distortionRef.current = 0;

    const distortion = distortionRef.current;
    const time = Date.now() * 0.001;

    // Create ImageData for pixel manipulation
    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;

    for (let y = 0; y < h; y += 2) {
      for (let x = 0; x < w; x += 2) {
        // Normalized coordinates
        const nx = x / w;
        const ny = y / h;

        // Center distance
        const cx = nx - 0.5;
        const cy = ny - 0.5;
        const dist = Math.sqrt(cx * cx + cy * cy);

        // Mouse-driven distortion
        const mdx = nx - mouse.x / w;
        const mdy = ny - mouse.y / h;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const mAngle = Math.atan2(mdy, mdx);
        const wave = Math.sin(mDist * 20 - time * 3) * 0.5 + 0.5;

        // Displaced coordinates
        const displaceX = x + Math.cos(mAngle) * wave * distortion * 3;
        const displaceY = y + Math.sin(mAngle) * wave * distortion * 3;

        // Paper grain noise
        const noiseX = Math.floor(displaceX) % w;
        const noiseY = Math.floor(displaceY) % h;
        const noiseVal = ((Math.sin(noiseX * 12.9898 + noiseY * 78.233 + time * 0.1) * 43758.5453) % 1) * 30 + 10;

        // Vignette
        const vignette = Math.max(0, 1 - dist * 1.5);

        // Base dark color with blue-purple tint
        const baseR = 5 + vignette * 8;
        const baseG = 5 + vignette * 5;
        const baseB = 8 + vignette * 12;

        // Mix with noise (paper texture)
        const finalR = Math.min(255, baseR + noiseVal * 0.4 + vignette * 15);
        const finalG = Math.min(255, baseG + noiseVal * 0.4 + vignette * 10);
        const finalB = Math.min(255, baseB + noiseVal * 0.5 + vignette * 5);

        // Fill 2x2 block for performance
        for (let dy = 0; dy < 2 && y + dy < h; dy++) {
          for (let dx = 0; dx < 2 && x + dx < w; dx++) {
            const idx = ((y + dy) * w + (x + dx)) * 4;
            data[idx] = finalR;
            data[idx + 1] = finalG;
            data[idx + 2] = finalB;
            data[idx + 3] = 255;
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    animRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Set initial mouse to center
    mouseRef.current.x = window.innerWidth / 2;
    mouseRef.current.y = window.innerHeight / 2;
    mouseRef.current.prevX = window.innerWidth / 2;
    mouseRef.current.prevY = window.innerHeight / 2;

    animRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, [animate]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ imageRendering: 'auto' }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, transparent 50%, #050505 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center text-center px-6 max-w-[900px]">
        <h1
          className="text-[40px] sm:text-[60px] lg:text-[80px] font-black leading-[0.95] tracking-[-0.04em] text-white"
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.8)' }}
        >
          发现最强大的 AI 工具
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-[#888888] tracking-[0.01em] max-w-[600px]">
          一站式 AI 工具导航，提升你的工作效率与创造力
        </p>
        <a
          href="#tools-grid"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('tools-grid')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="mt-10 bg-[#F59E0B] text-[#050505] px-10 py-3.5 text-base font-bold tracking-[0.04em] cursor-pointer transition-all duration-200 hover:bg-[#FBBF24] hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
        >
          开始探索
        </a>
      </div>
    </section>
  );
}
