import { useRef, useEffect, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { featuredTools } from '@/data/tools';

export default function FeaturedSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  const animateAscii = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const time = Date.now();

    ctx.clearRect(0, 0, w, h);

    const ASCII_CHARS = ' .:-=+*#%@';
    const cols = Math.floor(w / 10);
    const rows = Math.floor(h / 14);
    const charWidth = w / cols;
    const charHeight = h / rows;

    ctx.font = `${Math.floor(charWidth * 1.2)}px "Geist Mono", "SF Mono", monospace`;
    ctx.textBaseline = 'top';

    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = x * charWidth;
        const py = y * charHeight;

        // Dynamic noise based on position and time
        const noise =
          Math.sin(x * 0.05 + time * 0.0005) *
          Math.cos(y * 0.05 - time * 0.0008) *
          0.5 +
          0.5;

        const brightness = noise;
        const charIndex = Math.floor(brightness * (ASCII_CHARS.length - 1));
        const char = ASCII_CHARS[charIndex];

        // Mouse highlight
        const dx = px - mouseX;
        const dy = py - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const highlight = dist < 80 ? 1 - dist / 80 : 0;

        // Chromatic aberration offset
        const offset = 1.5 * Math.sin(time * 0.002 + x * 0.05) * (1 + highlight * 0.5);

        // Draw with RGB separation (chroma dispersion)
        const baseAlpha = 0.08 + highlight * 0.2;

        // Red channel - amber
        ctx.fillStyle = `rgba(245, 158, 11, ${baseAlpha * 0.5})`;
        ctx.fillText(char, px - offset, py);

        // Green channel - white
        ctx.fillStyle = `rgba(255, 255, 255, ${baseAlpha * 0.3})`;
        ctx.fillText(char, px, py);

        // Blue channel - gray
        ctx.fillStyle = `rgba(139, 139, 138, ${baseAlpha * 0.4})`;
        ctx.fillText(char, px + offset, py);
      }
    }

    animRef.current = requestAnimationFrame(animateAscii);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);

    // IntersectionObserver to pause when not visible
    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animRef.current) {
          animRef.current = requestAnimationFrame(animateAscii);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    container.addEventListener('mousemove', handleMouseMove);

    animRef.current = requestAnimationFrame(animateAscii);

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animRef.current);
      animRef.current = 0;
      observer.disconnect();
    };
  }, [animateAscii]);

  return (
    <section className="relative max-w-[1200px] mx-auto px-6 my-20" ref={containerRef}>
      {/* ASCII background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-100"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Content layer */}
      <div className="relative z-[1]">
        <h2 className="text-3xl sm:text-[32px] font-extrabold tracking-[-0.02em] text-white leading-tight">
          精选推荐
        </h2>
        <p className="mt-2 text-base text-[#888888]">
          编辑精心挑选的优质 AI 工具
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-[1px]">
          {featuredTools.map((tool) => (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row gap-6 bg-[#0A0A0A] border border-[#222222] p-6 transition-all duration-200 hover:border-[#F59E0B] hover:bg-[#111111] group"
            >
              {/* Image */}
              <div className="shrink-0 w-full sm:w-[200px] h-[120px] border border-[#222222] overflow-hidden bg-[#050505]">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                  <span className="shrink-0 text-[11px] font-semibold tracking-[0.06em] uppercase text-[#F59E0B] border border-[rgba(245,158,11,0.3)] px-2 py-0.5 bg-[rgba(245,158,11,0.08)]">
                    推广
                  </span>
                </div>
                <p className="mt-2 text-sm text-[#888888] leading-relaxed line-clamp-3">
                  {tool.featuredDesc}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[#F59E0B] text-sm font-semibold">
                  <span>了解更多</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
