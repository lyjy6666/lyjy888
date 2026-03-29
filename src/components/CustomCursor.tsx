import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

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

    const handleMouseDown = () => {
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
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
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.cursor = 'auto';
      document.head.removeChild(styleElement);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* 外圈 - 白色半透明圆，点击时消失 */}
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full bg-white/30 transition-all duration-150 ease-out ${isMouseDown ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? '22px' : '18px',
          height: isHovering ? '22px' : '18px',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* 内圈 - 白色实心圆 */}
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
