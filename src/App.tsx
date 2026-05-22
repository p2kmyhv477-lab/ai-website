import { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import AdBannerTop from '@/components/AdBannerTop';
import CategoryFilter from '@/components/CategoryFilter';
import ToolCardGrid from '@/components/ToolCardGrid';
import FeaturedSection from '@/components/FeaturedSection';
import Footer from '@/components/Footer';
import { getToolsByCategory, searchTools, type CategoryId } from '@/data/tools';

const ScrollImageHelix = lazy(() => import('@/components/ScrollImageHelix'));
const SidebarAd = lazy(() => import('@/components/SidebarAd'));

function LoadingFallback() {
  return (
    <div className="w-full h-[300px] lg:h-[500px] bg-[#050505] flex items-center justify-center">
      <div className="text-[#888888] text-sm">Loading...</div>
    </div>
  );
}

function SidebarFallback() {
  return (
    <div className="w-full lg:w-[300px] h-[400px] lg:h-[600px] bg-[#0F172A] border border-[#222222] flex items-center justify-center">
      <div className="text-[#888888] text-sm">Loading...</div>
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    if (searchQuery.trim()) {
      return searchTools(searchQuery);
    }
    return getToolsByCategory(activeCategory);
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat as CategoryId);
    setSearchQuery('');
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <Header
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />

      {/* Hero Banner */}
      <HeroBanner />

      {/* Top Ad Banner */}
      <AdBannerTop />

      {/* Category Filter */}
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Main Content Area */}
      <div className="max-w-[1200px] mx-auto px-6 pt-10">
        {/* Section title */}
        {searchQuery ? (
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-white">
              搜索结果: "{searchQuery}"
            </h2>
            <p className="text-sm text-[#888888] mt-1">
              找到 {filteredTools.length} 个工具
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-white">
              {activeCategory === 'all'
                ? '全部工具'
                : activeCategory === 'hot'
                ? '热门推荐'
                : categories.find((c) => c.id === activeCategory)?.label || '工具列表'}
            </h2>
            <p className="text-sm text-[#888888] mt-1">
              共 {filteredTools.length} 个工具
            </p>
          </div>
        )}

        {/* Tool Grid + Sidebar layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main grid */}
          <div className="flex-1 min-w-0">
            <ToolCardGrid tools={filteredTools} />
          </div>

          {/* Sidebar Ad - Desktop only (moves below on mobile) */}
          <div className="hidden lg:block">
            <div className="sticky top-[140px]">
              <Suspense fallback={<SidebarFallback />}>
                <SidebarAd />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Sidebar Ad - Mobile/Tablet */}
        <div className="lg:hidden mt-10">
          <Suspense fallback={<SidebarFallback />}>
            <SidebarAd />
          </Suspense>
        </div>
      </div>

      {/* Scroll Image Helix */}
      <div className="mt-10">
        <Suspense fallback={<LoadingFallback />}>
          <ScrollImageHelix />
        </Suspense>
      </div>

      {/* Featured Section */}
      <FeaturedSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Need to import categories for the display label
import { categories } from '@/data/tools';
