import { useState, useCallback } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { categories } from '@/data/tools';

interface HeaderProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const navLinks = [
  { id: 'hot', label: '热门工具' },
  { id: 'chat', label: 'AI 对话' },
  { id: 'image', label: 'AI 绘画' },
  { id: 'video', label: 'AI 视频' },
  { id: 'code', label: 'AI 编程' },
];

export default function Header({ activeCategory, onCategoryChange, onSearch, searchQuery }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleNavClick = useCallback(
    (catId: string) => {
      onCategoryChange(catId);
      setMobileMenuOpen(false);
      const el = document.getElementById('tools-grid');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
    [onCategoryChange]
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-[#050505] border-b border-[#222222]">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-2xl font-black tracking-[-0.03em] text-[#F59E0B] select-none"
          onClick={(e) => {
            e.preventDefault();
            onCategoryChange('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          AI Hub
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3 py-2 text-sm font-semibold tracking-[0.04em] uppercase transition-colors duration-150 border-b-2 ${
                activeCategory === link.id
                  ? 'text-white border-[#F59E0B]'
                  : 'text-[#888888] border-transparent hover:text-white hover:border-[#F59E0B]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Search + Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div
            className={`hidden sm:flex items-center border transition-colors duration-200 bg-[#111111] ${
              searchFocused ? 'border-[#F59E0B]' : 'border-[#222222]'
            }`}
          >
            <Search className="w-4 h-4 text-[#F59E0B] ml-3" />
            <input
              type="text"
              placeholder="搜索 AI 工具..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="bg-transparent text-white px-3 py-2 text-[13px] font-mono w-52 outline-none placeholder:text-[#555555]"
            />
          </div>

          {/* Mobile search icon */}
          <button className="sm:hidden text-[#F59E0B]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Search className="w-5 h-5" />
          </button>

          {/* Hamburger */}
          <button
            className="lg:hidden text-[#F59E0B]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050505] border-t border-[#222222] px-6 py-4">
          {/* Mobile search input */}
          <div className="flex sm:hidden items-center border border-[#222222] bg-[#111111] mb-4">
            <Search className="w-4 h-4 text-[#F59E0B] ml-3" />
            <input
              type="text"
              placeholder="搜索 AI 工具..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="bg-transparent text-white px-3 py-2 text-[13px] font-mono w-full outline-none placeholder:text-[#555555]"
            />
          </div>
          <div className="flex flex-col gap-2">
            {categories.slice(0, 8).map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleNavClick(cat.id)}
                className={`text-left px-3 py-2 text-sm font-semibold tracking-[0.04em] uppercase transition-colors duration-150 ${
                  activeCategory === cat.id ? 'text-[#F59E0B]' : 'text-[#888888] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
