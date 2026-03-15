import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // 检测是否悬停在可交互元素上
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // 隐藏默认鼠标光标
    document.body.style.cursor = 'none';

    // 创建全局样式来强制隐藏所有元素的光标
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleElement);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.style.cursor = 'auto';
      document.head.removeChild(styleElement);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* 外圈 - 半透明圆 */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full bg-white/30 transition-transform duration-150 ease-out"
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? '22px' : '18px',
          height: isHovering ? '22px' : '18px',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* 内圈 - 白色小圆点 */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full bg-white transition-transform duration-75 ease-out"
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? '12px' : '10px',
          height: isHovering ? '12px' : '10px',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
