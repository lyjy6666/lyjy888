import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ShutdownNoticeProps {
  onEnter: () => void;
}

export default function ShutdownNotice({ onEnter }: ShutdownNoticeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(118, 75, 162, 0.3) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.2) 0%, transparent 60%), linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1729 100%)',
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: Math.random() * 2 + 's',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-2xl mx-4"
      >
        <div
          className="rounded-3xl border border-white/20 backdrop-blur-xl p-10 md:p-14 text-center"
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.4)',
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 150, damping: 15 }}
            className="text-7xl mb-6"
          >
            📢
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            网站即将下线
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="w-24 h-1 mx-auto mb-8 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #667eea, #764ba2, #ec4899)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="space-y-4 text-white/70 text-base md:text-lg leading-relaxed mb-10"
          >
            <p>
              感谢大家一直以来对 <span className="text-white font-semibold">lyjy 的小站</span> 的支持与陪伴！
            </p>
            <p>
              本站即将进行域名迁移，届时将在新域名
              <span
                className="mx-2 px-3 py-1 rounded-lg font-mono font-semibold"
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                lyjy.netlify.app
              </span>
              继续为大家服务。
            </p>
            <p className="text-white/50 text-sm">
              请记得收藏新域名，我们不见不散！💜
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <a
              href="https://lyjy.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ec4899 100%)',
                boxShadow: hovered
                  ? '0 10px 40px rgba(102, 126, 234, 0.5)'
                  : '0 4px 20px rgba(102, 126, 234, 0.3)',
                transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              <i className="fas fa-external-link-alt" />
              访问新域名
            </a>

            <button
              onClick={onEnter}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-white/80 border border-white/20 bg-white/5 hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
            >
              <i className="fas fa-door-open" />
              继续浏览本站
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="pt-6 border-t border-white/10"
          >
            <div className="flex items-center justify-center gap-3 text-white/30 text-sm">
              <i className="far fa-star" />
              <span>记得收藏 lyjy.netlify.app 哦</span>
              <i className="far fa-star" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-center mt-6 text-white/20 text-sm"
        >
          lyjy 的小站 · 感谢有你
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
