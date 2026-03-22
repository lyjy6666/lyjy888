import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 定义桌面美化工具类型
interface DesktopBeautifyTool {
  id: number;
  name: string;
  systems: string;
  url: string;
  stars: number;
  recommendation: string;
  pros: string;
  cons: string;
}

// 桌面美化工具数据
const desktopBeautifyTools: DesktopBeautifyTool[] = [
  { id: 1, name: 'Wallpaper Engine', systems: 'Windows', url: 'https://store.steampowered.com/app/431960/Wallpaper_Engine/', stars: 5, recommendation: '全球动态壁纸天花板，Steam销量冠军，桌面美化首选。', pros: '动态壁纸资源库海量，涵盖二次元、风景、科技、创意等全类型，支持视频、网页、3D、交互式壁纸；硬件加速优化顶级，壁纸运行流畅，资源占用极低，不会影响系统性能；支持壁纸自定义、剪辑、特效添加，可制作专属壁纸；内置锁屏美化、音频可视化、桌面图标美化功能；一次性买断制，价格极低，无后续付费。', cons: '仅支持Windows系统；无官方Mac版本；需安装Steam平台；部分高画质3D壁纸对显卡有一定要求；Mac仅能通过第三方工具使用。' },
  { id: 2, name: 'Lively Wallpaper', systems: 'Windows 10/11', url: 'https://rocksdanister.github.io/lively/', stars: 5, recommendation: '开源免费动态壁纸工具，Wallpaper Engine完美平替，无任何付费门槛。', pros: '完全开源免费无广告无捆绑，微软商店一键安装，零门槛；支持视频、网页、GIF、3D、交互式动态壁纸，硬件加速优化完善，资源占用极低；完美适配Windows 10/11，支持多显示器、高刷新率、深色模式；内置壁纸编辑器，可自定义制作专属壁纸，无任何功能限制。', cons: '仅支持Windows 10/11，不兼容老旧系统；无Mac/Linux版本；壁纸资源库不及Wallpaper Engine丰富；高阶自定义功能有差距。' },
  { id: 3, name: 'Fences', systems: 'Windows', url: 'https://www.stardock.com/products/fences/', stars: 4.5, recommendation: '桌面图标分区管理标杆工具，彻底解决桌面杂乱问题，职场办公首选。', pros: '桌面图标分区管理发明者，可将桌面图标按类型、用途分组收纳，一键整理杂乱桌面；支持分区折叠、自动排序、规则自动分类，新文件自动归入对应分区；支持桌面快照、备份还原，多显示器完美适配；界面极简，与Windows系统风格完美统一，资源占用极低。', cons: '仅支持Windows系统；无免费版，免费试用仅30天，核心功能需付费买断；无Mac/Linux版本；高阶功能对个人用户有冗余。' },
  { id: 4, name: '酷呆桌面（Coodesker）', systems: 'Windows', url: 'https://www.coodesker.com/', stars: 4.5, recommendation: '国产免费桌面图标分区工具，Fences完美平替，无广告无捆绑。', pros: '完全免费无广告无捆绑，功能与Fences高度一致；支持桌面图标分区收纳、折叠、自动排序、规则自动分类，一键整理杂乱桌面；支持多显示器适配、桌面快照、备份还原；界面极简，与Windows系统完美适配，资源占用极低，操作零门槛。', cons: '仅支持Windows系统；无Mac/Linux版本；高阶自定义功能不及Fences；官方更新频率较低；偶尔有兼容性小问题。' },
  { id: 5, name: 'Rainmeter', systems: 'Windows', url: 'https://www.rainmeter.net/', stars: 4.5, recommendation: '开源免费桌面定制神器，极客首选，可100%自定义桌面。', pros: '完全开源免费无广告无捆绑，无任何功能限制；可高度自定义桌面，支持皮肤插件拓展，实现桌面仪表盘、系统监控、天气、日历、快捷启动、音乐可视化全功能；全球皮肤资源库海量，可打造专属个性化桌面；资源占用极低，稳定性极强，自定义自由度拉满。', cons: '上手门槛极高，新手需要大量学习成本；原生无基础功能，需手动安装皮肤插件；无Mac/Linux版本；部分第三方皮肤资源占用偏高。' },
  { id: 6, name: 'TranslucentTB', systems: 'Windows 10/11', url: 'https://github.com/TranslucentTB/TranslucentTB', stars: 4.5, recommendation: '开源免费任务栏美化工具，一键实现任务栏透明/模糊/亚克力效果。', pros: '完全开源免费无广告无捆绑，微软商店一键安装，零门槛；一键实现Windows任务栏透明、模糊、亚克力、纯色效果，支持动态效果切换；支持多显示器适配、深色模式、全屏自动隐藏；资源占用极低，常驻后台无感知，与系统深度整合，无兼容性问题。', cons: '仅支持Windows 10/11；功能单一，仅能美化任务栏；无Mac/Linux版本；自定义自由度有限。' },
  { id: 7, name: 'Mydockfinder', systems: 'Windows', url: 'https://www.mydockfinder.com/', stars: 4.5, recommendation: 'Windows仿Mac全套桌面美化工具，还原度天花板，苹果风格爱好者首选。', pros: '完美复刻MacOS桌面全套体验，包括Dock栏、启动台、状态栏、访达、窗口动画、毛玻璃效果；功能全面，覆盖Dock栏美化、窗口管理、文件预览、桌面图标美化、全局手势；支持高度自定义，可调整细节效果，与Windows系统深度整合，稳定性强。', cons: '仅支持Windows系统；无免费版，需付费买断，门槛不低；无Mac/Linux版本；部分动画效果对电脑配置有一定要求；上手有一定学习成本。' },
  { id: 8, name: 'StartAllBack', systems: 'Windows 11', url: 'https://startallback.com/', stars: 4.5, recommendation: 'Windows 11开始菜单 + 任务栏美化工具，还原经典Windows风格，自定义自由度拉满。', pros: '完美适配Windows 11，可还原Windows 10经典开始菜单、任务栏、资源管理器；支持开始菜单、任务栏、右键菜单、窗口动画全自定义，可实现透明、毛玻璃、圆角等效果；修复Windows 11操作逻辑痛点，大幅提升操作效率；资源占用极低，无广告无捆绑，稳定性极强。', cons: '仅支持Windows 11；无免费版，免费试用仅30天，需付费买断；无Mac/Linux版本；仅针对开始菜单、任务栏美化，无其他桌面美化功能。' },
  { id: 9, name: 'Open-Shell', systems: 'Windows 10/11', url: 'https://open-shell.github.io/Open-Shell-Menu/', stars: 4.5, recommendation: '开源免费开始菜单美化工具，StartAllBack完美平替，无任何付费门槛。', pros: '完全开源免费无广告无捆绑，无任何功能限制；可自定义Windows开始菜单，还原Windows 7/10经典风格，支持透明、毛玻璃、自定义皮肤；支持开始菜单布局、快捷键、右键菜单全自定义；与Windows系统深度整合，兼容性强，资源占用极低，稳定性拉满。', cons: '仅支持Windows系统；无Mac/Linux版本；任务栏美化功能较弱；界面设置偏技术向，新手友好度一般。' },
  { id: 10, name: 'RoundedTB', systems: 'Windows 11', url: 'https://github.com/torchgm/RoundedTB', stars: 4, recommendation: '开源免费任务栏圆角美化工具，一键实现任务栏圆角、分割效果。', pros: '完全开源免费无广告无捆绑，微软商店一键安装，零门槛；一键给Windows 11任务栏添加圆角、分割效果，打造极简美观的任务栏；支持自定义圆角大小、任务栏边距、分割区域；资源占用极低，常驻后台无感知，与TranslucentTB完美兼容，可搭配实现极致美化。', cons: '仅支持Windows 11；功能单一，仅能美化任务栏圆角；无Mac/Linux版本；自定义自由度有限。' },
  { id: 11, name: 'BitDock', systems: 'Windows', url: 'https://www.bitdock.cn/', stars: 4, recommendation: 'Windows免费Dock栏美化工具，Mac风格Dock栏，新手友好。', pros: '免费版核心功能完善，无广告无捆绑；完美复刻Mac风格Dock栏，支持图标收纳、快捷启动、窗口预览、毛玻璃效果；支持自定义皮肤、图标、动画效果，内置天气、日历、系统监控小工具；界面极简，操作零门槛，资源占用极低，与Windows系统适配完善。', cons: '免费版有功能限制，高阶工具、自定义功能需付费解锁；无Mac/Linux版本；动画流畅度不及Mac原生；多显示器适配有瑕疵。' },
  { id: 12, name: '桌面日历', systems: 'Windows', url: 'https://chs.desktopcal.com/', stars: 4, recommendation: '国产免费桌面日历工具，美化 + 实用兼顾，职场办公首选。', pros: '完全免费无广告无捆绑，直接嵌入桌面，不遮挡桌面图标；支持日程待办、事项记录、提醒、日历视图，双击即可编辑，操作零门槛；支持皮肤自定义、透明度调整、字体大小设置，与桌面风格完美融合；资源占用极低，常驻后台无感知，数据自动备份。', cons: '仅支持Windows系统；无Mac/Linux版本；功能单一，仅日历待办相关；美化自由度有限。' },
  { id: 13, name: 'SAO Utils', systems: 'Windows', url: 'https://www.gpbeta.com/', stars: 4, recommendation: '二次元风格桌面美化神器，炫酷交互式界面，动漫爱好者首选。', pros: '免费版核心功能完善，无广告无捆绑；完美复刻《刀剑神域》SAO风格交互式界面，炫酷全息启动菜单、手势操作、桌面挂件；支持快捷启动、系统监控、天气、日历、音乐播放功能；高度自定义，可打造专属二次元桌面；资源占用低，动画流畅，稳定性强。', cons: '仅支持Windows系统；免费版有功能限制，高阶特效、挂件需付费解锁；无Mac/Linux版本；仅适合二次元爱好者，普适性一般。' },
  { id: 14, name: 'RocketDock', systems: 'Windows', url: 'https://rocketdock.com/', stars: 3.5, recommendation: '经典老牌免费Dock栏美化工具，轻量稳定，怀旧用户首选。', pros: '完全免费无广告无捆绑，安装包体积极小，极致轻量化；经典Mac风格Dock栏，支持图标收纳、快捷启动、窗口最小化、动画效果；支持皮肤、图标、插件拓展，自定义自由度高；资源占用极低，启动速度极快，老旧电脑也能流畅运行。', cons: '仅支持Windows系统；官方已停止更新，新系统适配有风险；无Mac/Linux版本；功能单一，无其他美化功能；界面设计偏老旧。' },
  { id: 15, name: 'Plash', systems: 'MacOS', url: 'https://sindresorhus.com/plash', stars: 3.5, recommendation: 'Mac开源免费壁纸工具，可将任意网页设为桌面壁纸，自定义自由度拉满。', pros: '完全开源免费无广告无捆绑，原生适配MacOS全系芯片；可将任意网页、视频、在线文档设为桌面壁纸，实现交互式动态壁纸；支持透明度调整、交互权限设置、自动刷新；与Mac系统深度整合，资源占用极低，操作零门槛。', cons: '仅支持Mac系统；无Windows/Linux版本；功能单一，仅壁纸相关；无内置壁纸资源库，需手动添加网页链接。' },
  { id: 16, name: 'Dynamic Wallpaper Engine', systems: 'MacOS', url: 'https://github.com/czqasngit/dynamic-wallpaper', stars: 3.5, recommendation: 'Mac免费动态壁纸工具，Wallpaper Engine Mac平替，新手友好。', pros: '完全免费无广告无捆绑，Mac App Store一键安装；支持视频、GIF、动态图片壁纸，硬件加速优化完善，资源占用极低；支持多显示器适配、自动深色模式切换、定时切换壁纸；内置海量免费动态壁纸资源，操作零门槛，新手友好。', cons: '仅支持Mac系统；无Windows/Linux版本；不支持交互式、3D壁纸；自定义自由度不及付费工具；壁纸资源库不及Wallpaper Engine丰富。' },
  { id: 17, name: 'Stardock Start11', systems: 'Windows 10/11', url: 'https://www.stardock.com/products/start11/', stars: 3.5, recommendation: 'Stardock出品专业级开始菜单美化工具，功能全面，企业级适配。', pros: '完美适配Windows 10/11，支持多种开始菜单风格，可还原经典Windows 7/10界面；支持开始菜单、任务栏、右键菜单、窗口动画全自定义，可实现透明、毛玻璃、圆角、皮肤定制；与Fences、WindowBlinds完美兼容，可打造全套桌面美化方案；稳定性极强，无兼容性问题。', cons: '仅支持Windows系统；无免费版，免费试用仅30天，需付费买断；无Mac/Linux版本；价格偏高，对个人用户性价比一般。' },
  { id: 18, name: '猎豹轻桌面', systems: 'Windows', url: 'https://desktop.liebao.cn/', stars: 3.5, recommendation: '国产免费桌面整理工具，一键整理杂乱桌面，新手友好。', pros: '完全免费无广告无捆绑，一键整理桌面图标，自动分类收纳；支持图标分区、折叠、自动排序、壁纸更换；内置桌面日历、待办事项、天气挂件；界面简洁，操作零门槛，资源占用极低，老旧电脑适配好。', cons: '仅支持Windows系统；无Mac/Linux版本；自定义自由度不及头部工具；高阶功能缺失；官方更新频率低。' },
  { id: 19, name: 'uBar', systems: 'MacOS', url: 'https://brawersoftware.com/products/ubar', stars: 3.5, recommendation: 'Mac Dock栏替代工具，Windows风格任务栏，功能更强大。', pros: '原生适配MacOS全系芯片，打造Windows风格任务栏，替代原生Dock栏；支持窗口预览、进度条显示、多显示器适配、快捷键自定义；可显示系统资源占用、天气、日历、通知，功能比原生Dock栏更全面；界面极简，支持皮肤自定义，资源占用极低。', cons: '仅支持Mac系统；无免费版，需付费买断，门槛不低；无Windows/Linux版本；上手有一定学习成本；与原生系统部分功能有兼容问题。' },
  { id: 20, name: 'Wallcat', systems: 'MacOS', url: 'https://wallcat.com/', stars: 3, recommendation: 'Mac免费高质量壁纸工具，每日更新4K超清壁纸，极简操作。', pros: '完全免费无广告无捆绑，Mac App Store一键安装；每日更新一张精选4K超清高质量壁纸，涵盖风景、极简、创意、艺术全类型；一键设置壁纸，支持自动每日更换、历史壁纸查看；与Mac系统深度整合，资源占用极低，操作零门槛。', cons: '仅支持Mac系统；无Windows/Linux版本；功能单一，仅壁纸更换；无动态壁纸、自定义功能；壁纸数量有限，每日仅更新一张。' },
];

// 渲染星级
const renderStars = (stars: number) => {
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars % 1 !== 0;
  const emptyStars = 5 - Math.ceil(stars);
  
  return (
    <span className="text-yellow-400">
      {'★'.repeat(fullStars)}
      {hasHalfStar && '☆'}
      {'☆'.repeat(emptyStars)}
      <span className="text-white/60 text-xs ml-1">({stars} 星)</span>
    </span>
  );
};

interface DesktopBeautifyProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DesktopBeautify({ isOpen, onClose }: DesktopBeautifyProps) {
  const [selectedTool, setSelectedTool] = useState<DesktopBeautifyTool | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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

          {/* 主容器 */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl border border-white/10 w-full max-w-5xl h-[85vh] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* 标题栏 */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-black/30">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-palette text-2xl text-violet-400"></i>
                <h3 className="text-white text-xl font-bold">桌面美化工具</h3>
                <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded-full">
                  共 {desktopBeautifyTools.length} 款工具
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors p-2"
                aria-label="关闭"
              >
                <i className="fa-solid fa-times text-lg"></i>
              </button>
            </div>

            {/* 主内容区 */}
            <div className="flex flex-1 min-h-0">
              {/* 左侧工具列表 */}
              <div 
                className="flex-1 overflow-y-auto p-4 space-y-2 tier-chart-scrollbar"
              >
                {desktopBeautifyTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(index * 0.02, 0.5) }}
                    onClick={() => setSelectedTool(tool)}
                    className={`relative cursor-pointer group transition-all duration-300 ${
                      selectedTool?.id === tool.id ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                    }`}
                  >
                    <div className={`relative h-14 bg-white/5 rounded-lg overflow-hidden border transition-colors ${
                      selectedTool?.id === tool.id ? 'border-violet-500/50' : 'border-white/10 group-hover:border-white/20'
                    }`}>
                      {/* 内容 */}
                      <div className="absolute inset-0 flex items-center px-4">
                        {/* 排名 */}
                        <div className="w-8 text-center shrink-0">
                          <span className={`text-sm font-bold ${
                            index < 3 ? 'text-yellow-400' : 'text-white/60'
                          }`}>
                            {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`}
                          </span>
                        </div>
                        
                        {/* 名称 */}
                        <div className="flex-1 ml-3 min-w-0">
                          <span className="text-white font-semibold text-sm truncate block">{tool.name}</span>
                        </div>
                        
                        {/* 星级 */}
                        <div className="text-right shrink-0">
                          {renderStars(tool.stars)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 右侧详情面板 */}
              <AnimatePresence mode="wait">
                {selectedTool ? (
                  <motion.div
                    key={selectedTool.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-80 border-l border-white/10 bg-black/20 p-5 overflow-y-auto tier-chart-scrollbar"
                  >
                    {/* 关闭按钮 */}
                    <button
                      onClick={() => setSelectedTool(null)}
                      className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>

                    {/* 工具名称 */}
                    <div className="mb-4">
                      <h4 className="text-white text-lg font-bold mb-1">{selectedTool.name}</h4>
                      <div className="flex items-center gap-2">
                        {renderStars(selectedTool.stars)}
                      </div>
                    </div>

                    {/* 适配系统 */}
                    <div className="mb-4">
                      <h5 className="text-white/80 text-xs font-semibold mb-2 flex items-center gap-2">
                        <i className="fa-solid fa-desktop"></i>适配系统
                      </h5>
                      <div className="bg-white/5 rounded-lg p-2">
                        <p className="text-white/80 text-sm">{selectedTool.systems}</p>
                      </div>
                    </div>

                    {/* 推荐理由 */}
                    <div className="mb-4">
                      <h5 className="text-white/80 text-xs font-semibold mb-2 flex items-center gap-2">
                        <i className="fa-solid fa-thumbs-up"></i>推荐理由
                      </h5>
                      <div className="bg-white/5 rounded-lg p-2">
                        <p className="text-white/80 text-sm">{selectedTool.recommendation}</p>
                      </div>
                    </div>

                    {/* 核心优点 */}
                    <div className="mb-4">
                      <h5 className="text-white/80 text-xs font-semibold mb-2 flex items-center gap-2">
                        <i className="fa-solid fa-check text-green-400"></i>核心优点
                      </h5>
                      <div className="bg-green-500/10 rounded-lg p-2 border border-green-500/20">
                        <p className="text-green-300/90 text-sm">{selectedTool.pros}</p>
                      </div>
                    </div>

                    {/* 不足之处 */}
                    <div className="mb-4">
                      <h5 className="text-white/80 text-xs font-semibold mb-2 flex items-center gap-2">
                        <i className="fa-solid fa-exclamation-triangle text-orange-400"></i>不足之处
                      </h5>
                      <div className="bg-orange-500/10 rounded-lg p-2 border border-orange-500/20">
                        <p className="text-orange-300/90 text-sm">{selectedTool.cons}</p>
                      </div>
                    </div>

                    {/* 下载按钮 */}
                    {selectedTool.url && (
                      <a
                        href={selectedTool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white text-center py-3 rounded-xl font-medium transition-all hover:scale-[1.02] mt-4"
                      >
                        <i className="fa-solid fa-download mr-2"></i>前往官网下载
                      </a>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-80 border-l border-white/10 bg-black/20 p-5 flex flex-col items-center justify-center text-white/40"
                  >
                    <i className="fa-solid fa-mouse-pointer text-4xl mb-3"></i>
                    <p className="text-sm">点击左侧工具查看详情</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 底部说明 */}
            <div className="px-6 py-2 bg-black/30 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-white/40">
                <span>数据更新时间：2026年3月 | 仅供参考</span>
                <span>点击工具卡片查看详细信息</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
