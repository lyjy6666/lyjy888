import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black/90 text-white relative overflow-hidden">
      {/* 背景动画效果 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-indigo-600/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* 网站名称 */}
      <motion.h1 
        className="text-4xl font-light tracking-wider mb-10 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        lyjy的小站~
      </motion.h1>
      
      {/* 加载动画 */}
      <motion.div 
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      >
        <div className="w-16 h-16 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-white/60 text-sm flex items-center">
          <span className="mr-2">加载中</span>
          <span className="animate-pulse">●●●</span>
        </p>
      </motion.div>
      
      {/* 底部装饰元素 */}
      <motion.div 
        className="absolute bottom-10 w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
      ></motion.div>
    </div>
  );
};

export default Loading;