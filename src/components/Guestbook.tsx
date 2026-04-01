import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GuestbookProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Guestbook({ isOpen, onClose }: GuestbookProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      // 清空容器
      containerRef.current.innerHTML = '';
      setIsLoading(true);
      
      // 创建 giscus script
      const script = document.createElement('script');
      script.src = 'https://giscus.app/client.js';
      script.setAttribute('data-repo', 'lyjy6666/lyjy888');
      script.setAttribute('data-repo-id', 'R_kgDOPZDugw');
      script.setAttribute('data-category', 'Announcements');
      script.setAttribute('data-category-id', 'DIC_kwDOPZDug84C5ySO');
      script.setAttribute('data-mapping', 'pathname');
      script.setAttribute('data-strict', '0');
      script.setAttribute('data-reactions-enabled', '1');
      script.setAttribute('data-emit-metadata', '0');
      script.setAttribute('data-input-position', 'bottom');
      script.setAttribute('data-theme', 'transparent_dark');
      script.setAttribute('data-lang', 'zh-CN');
      script.setAttribute('crossorigin', 'anonymous');
      script.async = true;
      
      script.onload = () => setIsLoading(false);
      script.onerror = () => setIsLoading(false);
      
      containerRef.current.appendChild(script);
      
      // 超时处理
      setTimeout(() => setIsLoading(false), 5000);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 留言板容器 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-full max-w-3xl max-h-[80vh] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
          >
            {/* 头部 */}
            <div className="sticky top-0 z-10 bg-white/10 backdrop-blur-md border-b border-white/10 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-comments text-white/80 text-xl"></i>
                <h2 className="text-2xl font-bold text-white">访客留言板</h2>
                <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full">Beta</span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group"
                aria-label="关闭"
              >
                <i className="fa-solid fa-times text-white/80 group-hover:text-white transition-colors"></i>
              </button>
            </div>

            {/* 提示信息 */}
            <div className="px-5 pt-4">
              <p className="text-white/60 text-sm flex items-center gap-2">
                <i className="fa-solid fa-info-circle"></i>
                使用 GitHub 账号登录即可留言，期待你的足迹 ✨
              </p>
              {/* 本地环境提示 */}
              {typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
                <p className="text-yellow-400/80 text-xs mt-2 flex items-center gap-2">
                  <i className="fa-solid fa-exclamation-triangle"></i>
                  本地预览环境可能无法加载留言板，部署后即可正常使用
                </p>
              )}
            </div>

            {/* 加载状态 */}
            {isLoading && (
              <div className="px-5 py-10 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <p className="text-white/60 text-sm">正在加载留言板...</p>
              </div>
            )}

            {/* Giscus 评论区域 */}
            <div className="p-5 overflow-y-auto max-h-[calc(80vh-140px)]">
              <div 
                ref={containerRef}
                className="giscus rounded-xl overflow-hidden"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
