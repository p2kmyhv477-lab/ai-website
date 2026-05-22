import { categories, type CategoryId } from '@/data/tools';

interface CategoryFilterProps {
  activeCategory: CategoryId;
  onCategoryChange: (cat: CategoryId) => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="sticky top-16 z-[500] bg-[rgba(5,5,5,0.95)] backdrop-blur-xl border-b border-[#222222]">
      <div className="max-w-[1200px] mx-auto px-6 py-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id as CategoryId)}
              className={`shrink-0 px-4 py-2 text-[13px] font-semibold tracking-[0.04em] border transition-all duration-150 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#F59E0B] text-[#050505] border-[#F59E0B]'
                  : 'bg-transparent text-[#888888] border-[#222222] hover:border-[#F59E0B] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
