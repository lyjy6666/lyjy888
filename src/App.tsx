import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { AuthContext } from '@/contexts/authContext';
import Loading from '@/components/Loading';
import VersionAnimation from '@/components/VersionAnimation';
import CustomCursor from '@/components/CustomCursor';
import { motion } from 'framer-motion';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showVersionAnimation, setShowVersionAnimation] = useState(false);
  const [isReady, setIsReady] = useState(false);

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
    </AuthContext.Provider>
  );
}
