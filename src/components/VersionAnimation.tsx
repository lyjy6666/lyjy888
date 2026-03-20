import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VersionAnimationProps {
  onComplete: () => void;
}

// 烟花粒子类型
interface FireworkParticle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
  delay: number;
}

// 生成烟花
const generateFirework = (centerX: number, centerY: number, color: string, baseId: number): FireworkParticle[] => {
  const particles: FireworkParticle[] = [];
  const count = 20 + Math.floor(Math.random() * 10);
  
  for (let i = 0; i < count; i++) {
    particles.push({
      id: baseId + i,
      x: centerX,
      y: centerY,
      angle: (360 / count) * i + Math.random() * 20 - 10,
      speed: 60 + Math.random() * 60,
      size: 2 + Math.random() * 3,
      color: color,
      delay: Math.random() * 0.2,
    });
  }
  return particles;
};

// 颜色组
const fireworkColors = [
  '#f97316', '#fbbf24', '#fb923c', '#fcd34d', '#fff', 
  '#ef4444', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981'
];

const VersionAnimation: React.FC<VersionAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0); // 用数字表示阶段
  const [fireworks, setFireworks] = useState<FireworkParticle[]>([]);
  const fireworkIdRef = useRef(0);
  const hasTriggered = useRef<Set<number>>(new Set());
  const [countdown, setCountdown] = useState(14);

  // 跳过动画
  const handleSkip = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // 倒计时
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 触发烟花
  const triggerFireworks = useCallback((count: number, phaseNum: number) => {
    if (hasTriggered.current.has(phaseNum)) return; // 防止重复触发
    hasTriggered.current.add(phaseNum);
    
    const positions = Array.from({ length: count }, () => ({
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 45,
    }));
    
    let allParticles: FireworkParticle[] = [];
    positions.forEach((pos, idx) => {
      const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
      allParticles = [...allParticles, ...generateFirework(pos.x, pos.y, color, fireworkIdRef.current + idx * 30)];
    });
    
    fireworkIdRef.current += count * 30;
    setFireworks(allParticles);
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    // 阶段1: 初始闪烁 (0-1.5秒)
    timers.push(setTimeout(() => setPhase(1), 1500));
    
    // 阶段2: 展开 (1.5-3秒)
    timers.push(setTimeout(() => {
      setPhase(2);
      triggerFireworks(3, 2);
    }, 3000));
    
    // 阶段3: 烟花2 (3-5秒)
    timers.push(setTimeout(() => {
      setPhase(3);
      triggerFireworks(4, 3);
    }, 5000));
    
    // 阶段4: 烟花3 (5-7秒)
    timers.push(setTimeout(() => {
      setPhase(4);
      triggerFireworks(5, 4);
    }, 7000));
    
    // 阶段5: 庆祝 (7-9秒)
    timers.push(setTimeout(() => setPhase(5), 9000));
    
    // 阶段6: 旋转 (9-11秒)
    timers.push(setTimeout(() => setPhase(6), 11000));
    
    // 阶段7: 缩小 (11-12.5秒)
    timers.push(setTimeout(() => setPhase(7), 12500));
    
    // 完成
    timers.push(setTimeout(() => onComplete(), 14000));
    
    return () => timers.forEach(t => clearTimeout(t));
  }, [onComplete, triggerFireworks]);

  // 阶段判断
  const showFireworks = phase >= 2 && phase <= 4;
  const showMeteor = phase === 2;
  const showCelebration = phase === 5;
  const isSpinning = phase === 6;
  const isShrinking = phase === 7;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      {/* 跳过按钮和倒计时 */}
      <div className="absolute top-6 right-6 z-[200] flex items-center gap-3">
        <motion.span
          className="text-white/50 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {countdown}s
        </motion.span>
        <motion.button
          className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white/70 hover:text-white text-sm transition-all border border-white/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleSkip}
        >
          跳过 ✕
        </motion.button>
      </div>

      {/* 深色背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />

      {/* 背景光效 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/15 rounded-full blur-3xl" />
      </div>

      {/* 烟花效果 */}
      <AnimatePresence>
        {showFireworks && fireworks.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: particle.color,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{
              x: Math.cos((particle.angle * Math.PI) / 180) * particle.speed * 3,
              y: Math.sin((particle.angle * Math.PI) / 180) * particle.speed * 3 + 60,
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0.3],
            }}
            transition={{ duration: 1.5, delay: particle.delay, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* 扫光效果 */}
      {showCelebration && (
        <motion.div
          className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] pointer-events-none"
          initial={{ x: '-200%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]" />
        </motion.div>
      )}

      {/* 主版本号 */}
      <motion.div
        className="fixed z-10 flex flex-col items-center justify-center"
        initial={{ scale: 0, opacity: 0, rotate: -180, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
        animate={{
          scale: isShrinking ? 0.12 : 1,
          opacity: 1,
          rotate: isSpinning ? 720 : isShrinking ? -12 : 0,
          top: '50%',
          left: isShrinking ? '24px' : '50%',
          bottom: isShrinking ? '24px' : 'auto',
          x: isShrinking ? '0%' : '-50%',
          y: isShrinking ? '0%' : '-50%',
        }}
        transition={{
          type: 'spring',
          stiffness: isShrinking ? 150 : 60,
          damping: isShrinking ? 18 : 10,
          rotate: { duration: 2, ease: 'easeInOut' },
        }}
      >
        <motion.h1
          className="text-[18vw] md:text-[12vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 select-none whitespace-nowrap leading-none"
          style={{
            textShadow: '0 0 30px rgba(251, 146, 60, 0.6), 0 0 60px rgba(251, 146, 60, 0.4)',
            WebkitTextStroke: '2px rgba(251, 146, 60, 0.7)',
          }}
        >
          V3.1
        </motion.h1>

        {/* 副标题 */}
        <AnimatePresence>
          {phase >= 2 && phase <= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="mt-6 flex flex-col items-center"
            >
              <p className="text-white/70 text-2xl md:text-3xl tracking-[0.5em] font-light">焕新启程</p>
              <p className="text-white/40 text-sm mt-2 tracking-wider">A NEW JOURNEY BEGINS</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 环形光效 */}
      {phase >= 1 && phase <= 5 && (
        <>
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full border-2 border-orange-500/30 pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full border border-amber-400/20 pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </>
      )}

      {/* 流星效果 */}
      {showMeteor && Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`meteor-${i}`}
          className="absolute w-1 h-16 bg-gradient-to-b from-white/80 via-orange-300/50 to-transparent rounded-full"
          style={{ left: `${15 + i * 18}%`, top: '-5%', transform: 'rotate(45deg)' }}
          initial={{ y: '0vh', opacity: 0 }}
          animate={{ y: '130vh', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, delay: i * 0.5, ease: 'linear' }}
        />
      ))}

      {/* 庆祝文字 */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed top-[18%] inset-x-0 flex justify-center text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 whitespace-nowrap">
              🎉 全新升级 🎉
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 底部进度条 */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 14, ease: 'linear' }}
          />
        </div>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase">Version 3.1 Release</p>
      </div>
    </div>
  );
};

export default VersionAnimation;
