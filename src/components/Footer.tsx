export default function Footer() {
  const linkClass =
    'text-sm text-[#888888] hover:text-white transition-colors duration-150 leading-[2.2] block';

  return (
    <footer className="w-full bg-[#050505] border-t border-[#222222] mt-20">
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-10">
        {/* Top section */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
          {/* Left: Logo + description */}
          <div className="max-w-[300px]">
            <span className="text-2xl font-black tracking-[-0.03em] text-[#F59E0B]">
              AI Hub
            </span>
            <p className="mt-3 text-sm text-[#888888] leading-relaxed">
              发现最好用的 AI 工具，提升工作效率。一站式 AI 工具导航平台。
            </p>
          </div>

          {/* Right: Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16">
            {/* Column 1: Categories */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.06em] uppercase text-[#F59E0B] mb-3">
                分类导航
              </h4>
              <a href="#" className={linkClass} onClick={(e) => { e.preventDefault(); }}>
                AI 对话
              </a>
              <a href="#" className={linkClass} onClick={(e) => { e.preventDefault(); }}>
                AI 绘画
              </a>
              <a href="#" className={linkClass} onClick={(e) => { e.preventDefault(); }}>
                AI 视频
              </a>
              <a href="#" className={linkClass} onClick={(e) => { e.preventDefault(); }}>
                AI 编程
              </a>
            </div>

            {/* Column 2: About */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.06em] uppercase text-[#F59E0B] mb-3">
                关于我们
              </h4>
              <a href="#" className={linkClass} onClick={(e) => { e.preventDefault(); }}>
                关于 AI Hub
              </a>
              <a href="#" className={linkClass} onClick={(e) => { e.preventDefault(); }}>
                联系方式
              </a>
              <a href="#" className={linkClass} onClick={(e) => { e.preventDefault(); }}>
                提交工具
              </a>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.06em] uppercase text-[#F59E0B] mb-3">
                法律信息
              </h4>
              <a href="#" className={linkClass} onClick={(e) => { e.preventDefault(); }}>
                隐私政策
              </a>
              <a href="#" className={linkClass} onClick={(e) => { e.preventDefault(); }}>
                使用条款
              </a>
              <a href="#" className={linkClass} onClick={(e) => { e.preventDefault(); }}>
                免责声明
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-10 pt-6 border-t border-[#222222] flex flex-col sm:flex-row sm:justify-between gap-2">
          <span className="text-[13px] text-[#888888]">
            &copy; 2024 AI Hub. All rights reserved.
          </span>
          <span className="text-[13px] text-[#F59E0B] font-semibold">
            Made with AI for Humans
          </span>
        </div>
      </div>
    </footer>
  );
}
