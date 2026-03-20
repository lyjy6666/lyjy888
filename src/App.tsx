import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { AuthContext } from '@/contexts/authContext';
import Loading from '@/components/Loading';
import VersionAnimation from '@/components/VersionAnimation';
import CustomCursor from '@/components/CustomCursor';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showVersionAnimation, setShowVersionAnimation] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const keySequence = useRef('');
  const easterEggTriggered = useRef(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  // 加载完成后显示版本动画
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setShowVersionAnimation(true);
  }, []);

  // 版本动画完成后显示主页面
  const handleVersionAnimationComplete = useCallback(() => {
    setShowVersionAnimation(false);
    setIsReady(true);
  }, []);

  // 模拟加载过程
  useEffect(() => {
    const timer = setTimeout(() => {
      handleLoadingComplete();
    }, 3500); // 3.5秒加载时间

    return () => clearTimeout(timer);
  }, [handleLoadingComplete]);

  // 彩蛋键盘监听 - LYJY
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      
      // 只追踪字母
      if (/^[A-Z]$/.test(key)) {
        keySequence.current += key;
        
        // 只保留最后4个字符
        if (keySequence.current.length > 4) {
          keySequence.current = keySequence.current.slice(-4);
        }
        
        // 检测彩蛋
        if (keySequence.current === 'LYJY' && !easterEggTriggered.current) {
          easterEggTriggered.current = true;
          setShowEasterEgg(true);
          
          // 5秒后自动关闭
          setTimeout(() => {
            setShowEasterEgg(false);
          }, 5000);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <CustomCursor />
      
      {isLoading && <Loading />}
      
      {showVersionAnimation && (
        <VersionAnimation onComplete={handleVersionAnimationComplete} />
      )}
      
      {isReady && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
          </Routes>
        </motion.div>
      )}

      {/* 彩蛋弹窗 */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-1 rounded-2xl shadow-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <div className="bg-gray-900 rounded-xl px-8 py-6 text-center">
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                >
                  🎉
                </motion.div>
                <motion.p
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  你触发了彩蛋！
                </motion.p>
                <p className="text-white/50 text-sm mt-2">LYJY - 小站名称</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
}
