import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { AITool } from '@/data/tools';

interface ToolCardProps {
  tool: AITool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const [hovered, setHovered] = useState(false);

  const stars = Array.from({ length: 5 }, (_, i) => i < tool.rating);

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-[#0A0A0A] p-4 relative cursor-pointer transition-all duration-200 hover:bg-[#111111] hover:border-[#F59E0B] hover:-translate-y-1 group"
      style={{ border: '1px solid transparent', margin: '-1px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tool icon */}
      <div className="w-10 h-10 border border-[#222222] overflow-hidden bg-[#050505]">
        <img
          src={tool.image}
          alt={tool.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Tool name */}
      <h3 className="mt-3 text-lg font-bold tracking-[-0.01em] text-white leading-tight">
        {tool.name}
      </h3>

      {/* Category tag */}
      <span className="mt-2 inline-block text-[11px] font-semibold tracking-[0.06em] uppercase text-[#F59E0B] border border-[rgba(245,158,11,0.3)] px-2 py-0.5">
        {tool.categoryLabel}
      </span>

      {/* Description */}
      <p className="mt-2 text-[13px] text-[#888888] leading-relaxed line-clamp-2">
        {tool.description}
      </p>

      {/* Bottom bar */}
      <div className="mt-4 pt-3 border-t border-[#222222] flex items-center justify-between">
        {/* Rating */}
        <div className="flex items-center gap-0.5">
          {stars.map((filled, i) => (
            <span
              key={i}
              className={`text-[13px] ${filled ? 'text-[#F59E0B]' : 'text-[#333333]'}`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Price tag */}
        <span
          className={`text-xs font-semibold ${
            tool.priceType === 'free'
              ? 'text-[#22C55E]'
              : tool.priceType === 'paid'
              ? 'text-[#EF4444]'
              : 'text-[#F59E0B]'
          }`}
        >
          {tool.priceType === 'free' ? '免费' : tool.priceType === 'paid' ? '付费' : '免费/付费'}
        </span>
      </div>

      {/* Visit button - appears on hover */}
      {hovered && (
        <div className="absolute bottom-4 right-4 bg-[#F59E0B] text-[#050505] px-4 py-1.5 text-xs font-bold flex items-center gap-1 animate-in fade-in duration-200">
          <span>访问网站</span>
          <ExternalLink className="w-3 h-3" />
        </div>
      )}
    </a>
  );
}
