export interface AITool {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  rating: number;
  priceType: 'free' | 'paid' | 'freemium';
  image: string;
  url: string;
  featured?: boolean;
  featuredDesc?: string;
}

export const categories = [
  { id: 'all', label: '全部' },
  { id: 'hot', label: '热门推荐' },
  { id: 'chat', label: 'AI 对话' },
  { id: 'image', label: 'AI 绘画' },
  { id: 'video', label: 'AI 视频' },
  { id: 'code', label: 'AI 编程' },
  { id: 'music', label: 'AI 音乐' },
  { id: 'office', label: 'AI 办公' },
  { id: 'learning', label: 'AI 学习' },
  { id: 'search', label: 'AI 搜索' },
  { id: 'design', label: 'AI 设计' },
  { id: 'avatar', label: 'AI 数字人' },
  { id: 'translate', label: 'AI 翻译' },
] as const;

export type CategoryId = typeof categories[number]['id'];

export const tools: AITool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'chat',
    categoryLabel: 'AI 对话',
    description: 'OpenAI 开发的强大对话 AI，支持多种任务处理与创意写作',
    rating: 5,
    priceType: 'freemium',
    image: '/images/tool-chatgpt.jpg',
    url: 'https://chat.openai.com',
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'image',
    categoryLabel: 'AI 绘画',
    description: '顶级 AI 图像生成工具，以惊人的艺术质量著称',
    rating: 5,
    priceType: 'paid',
    image: '/images/tool-midjourney.jpg',
    url: 'https://www.midjourney.com',
  },
  {
    id: 'runway',
    name: 'Runway',
    category: 'video',
    categoryLabel: 'AI 视频',
    description: 'AI 视频编辑与生成平台，支持绿幕、转场等高级功能',
    rating: 4,
    priceType: 'freemium',
    image: '/images/tool-runway.jpg',
    url: 'https://runwayml.com',
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    category: 'code',
    categoryLabel: 'AI 编程',
    description: 'AI 代码补全助手，由 GitHub 与 OpenAI 联合开发',
    rating: 5,
    priceType: 'paid',
    image: '/images/tool-copilot.jpg',
    url: 'https://github.com/features/copilot',
  },
  {
    id: 'suno',
    name: 'Suno',
    category: 'music',
    categoryLabel: 'AI 音乐',
    description: 'AI 音乐创作工具，输入文字即可生成完整歌曲',
    rating: 4,
    priceType: 'freemium',
    image: '/images/tool-suno.jpg',
    url: 'https://www.suno.ai',
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    category: 'office',
    categoryLabel: 'AI 办公',
    description: 'Notion 内置 AI 助手，支持文档写作、总结与翻译',
    rating: 4,
    priceType: 'paid',
    image: '/images/tool-notion.jpg',
    url: 'https://www.notion.so/product/ai',
  },
  {
    id: 'claude',
    name: 'Claude',
    category: 'chat',
    categoryLabel: 'AI 对话',
    description: 'Anthropic 开发的 AI 助手，以安全性和长文本处理著称',
    rating: 5,
    priceType: 'freemium',
    image: '/images/tool-chatgpt.jpg',
    url: 'https://claude.ai',
    featured: true,
    featuredDesc: 'Anthropic 推出的新一代 AI 助手，支持超长上下文窗口，在代码分析、文档处理和创意写作方面表现出色。Claude 3 系列模型提供 Haiku、Sonnet 和 Opus 三种选择，满足不同场景需求。',
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    category: 'image',
    categoryLabel: 'AI 绘画',
    description: '开源 AI 图像生成模型，可本地部署，社区生态丰富',
    rating: 4,
    priceType: 'free',
    image: '/images/tool-midjourney.jpg',
    url: 'https://stability.ai',
  },
  {
    id: 'descript',
    name: 'Descript',
    category: 'video',
    categoryLabel: 'AI 视频',
    description: 'AI 音视频编辑工具，支持文字编辑视频、语音克隆等功能',
    rating: 4,
    priceType: 'freemium',
    image: '/images/tool-runway.jpg',
    url: 'https://www.descript.com',
  },
  {
    id: 'jasper',
    name: 'Jasper',
    category: 'office',
    categoryLabel: 'AI 办公',
    description: 'AI 写作助手，专注于营销文案、博客文章等商业写作',
    rating: 4,
    priceType: 'paid',
    image: '/images/tool-notion.jpg',
    url: 'https://www.jasper.ai',
  },
  {
    id: 'sora',
    name: 'Sora',
    category: 'video',
    categoryLabel: 'AI 视频',
    description: 'OpenAI 视频生成模型，可根据文本生成高质量视频',
    rating: 5,
    priceType: 'paid',
    image: '/images/tool-runway.jpg',
    url: 'https://openai.com/sora',
  },
  {
    id: 'tabnine',
    name: 'Tabnine',
    category: 'code',
    categoryLabel: 'AI 编程',
    description: 'AI 代码补全工具，支持多种 IDE 和编程语言',
    rating: 4,
    priceType: 'freemium',
    image: '/images/tool-copilot.jpg',
    url: 'https://www.tabnine.com',
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    category: 'search',
    categoryLabel: 'AI 搜索',
    description: '结合 AI 与搜索的新一代信息获取工具，提供结构化答案',
    rating: 5,
    priceType: 'freemium',
    image: '/images/tool-perplexity.jpg',
    url: 'https://www.perplexity.ai',
    featured: true,
    featuredDesc: 'Perplexity AI 是一款结合大语言模型与实时搜索的 AI 搜索引擎。它能够理解复杂问题，从多个来源综合信息，并以结构化、可追溯的方式呈现答案，每个回答都附带来源链接。',
  },
  {
    id: 'deep-l',
    name: 'DeepL',
    category: 'translate',
    categoryLabel: 'AI 翻译',
    description: 'AI 翻译工具，以高质量的翻译效果著称',
    rating: 4,
    priceType: 'freemium',
    image: '/images/tool-deepl.jpg',
    url: 'https://www.deepl.com',
  },
  {
    id: 'd-id',
    name: 'D-ID',
    category: 'avatar',
    categoryLabel: 'AI 数字人',
    description: '让照片开口说话的 AI 数字人平台，支持多种语言和表情',
    rating: 4,
    priceType: 'paid',
    image: '/images/tool-did.jpg',
    url: 'https://www.d-id.com',
  },
  {
    id: 'canva-ai',
    name: 'Canva AI',
    category: 'design',
    categoryLabel: 'AI 设计',
    description: '集成 AI 功能的在线设计平台，支持一键生成海报、Logo 等',
    rating: 4,
    priceType: 'freemium',
    image: '/images/tool-design.jpg',
    url: 'https://www.canva.com',
  },
];

export const featuredTools = tools.filter(t => t.featured);

export const getToolsByCategory = (categoryId: CategoryId) => {
  if (categoryId === 'all') return tools;
  if (categoryId === 'hot') return tools.filter(t => t.rating >= 5);
  return tools.filter(t => t.category === categoryId);
};

export const searchTools = (query: string) => {
  const lower = query.toLowerCase();
  return tools.filter(
    t =>
      t.name.toLowerCase().includes(lower) ||
      t.description.toLowerCase().includes(lower) ||
      t.categoryLabel.toLowerCase().includes(lower)
  );
};
