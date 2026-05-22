import { type AITool } from '@/data/tools';
import ToolCard from './ToolCard';

interface ToolCardGridProps {
  tools: AITool[];
}

export default function ToolCardGrid({ tools }: ToolCardGridProps) {
  return (
    <div id="tools-grid">
      {tools.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-[#888888] text-lg">没有找到匹配的工具</p>
          <p className="text-[#555555] text-sm mt-2">请尝试其他关键词或分类</p>
        </div>
      ) : (
        <div
          className="grid gap-[1px]"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            background: '#222222',
          }}
        >
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
