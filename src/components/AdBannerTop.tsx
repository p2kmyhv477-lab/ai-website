import { useState } from 'react';
import { X } from 'lucide-react';

export default function AdBannerTop() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="max-w-[1200px] mx-auto px-6">
      <div
        className="relative bg-[#0F172A] border border-[#222222] h-[80px] sm:h-[120px] flex items-center justify-center overflow-hidden transition-all duration-300"
        style={{ margin: '24px auto' }}
      >
        {/* Ad label */}
        <span className="absolute top-0 left-0 bg-[#222222] text-[#888888] text-[11px] font-semibold px-3 py-1 tracking-[0.06em] uppercase">
          广告
        </span>

        {/* Close button */}
        <button
          onClick={() => setClosed(true)}
          className="absolute top-2 right-2 text-[#888888] hover:text-white transition-colors duration-150 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Ad content placeholder */}
        <div className="text-center">
          <p className="text-[#888888] text-sm">此处为广告位，支持图片/文字广告</p>
          <p className="text-[#555555] text-xs mt-1">1200 × 120 / 80</p>
        </div>
      </div>
    </div>
  );
}
