import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 定义视频播放器类型
interface VideoPlayerTool {
  id: number;
  name: string;
  systems: string;
  url: string;
  stars: number;
  recommendation: string;
  pros: string;
  cons: string;
}

// 本地视频播放器数据
const videoPlayerTools: VideoPlayerTool[] = [
  { id: 1, name: 'PotPlayer', systems: 'Windows', url: 'https://potplayer.daum.net/', stars: 5, recommendation: 'Windows平台全能视频播放器标杆，解码能力天花板，装机必备首选。', pros: '完全免费无广告无捆绑，无任何功能限制；自研解码引擎，支持几乎所有视频、音频格式，无无法播放的文件；支持4K/8K/HDR/3D视频，硬件加速优化顶级，低配电脑也能流畅播放高清视频；字幕自动匹配、音轨切换、倍速播放、画面调节功能拉满；自定义自由度极高，支持皮肤、插件拓展。', cons: '仅支持Windows系统；无官方Mac/Linux版本；上手有一定学习成本，高阶设置较复杂；官方原版无中文，需安装汉化包。' },
  { id: 2, name: 'IINA', systems: 'MacOS', url: 'https://iina.io/', stars: 5, recommendation: 'Mac平台原生免费播放器标杆，完美适配苹果生态，颜值与实力并存。', pros: '完全开源免费无广告，原生适配MacOS全系芯片，与苹果系统深度整合；基于MPV内核，解码能力拉满，支持几乎所有音视频格式；界面极简高颜值，完美适配Mac深色模式、触控板手势；支持4K/HDR/在线流媒体、字幕自动匹配、画中画播放；资源占用极低，启动速度极快。', cons: '仅支持Mac系统；无Windows/Linux版本；进阶自定义功能不及PotPlayer；部分冷门格式适配有瑕疵。' },
  { id: 3, name: 'VLC Media Player', systems: 'Windows、Mac、Linux、全平台', url: 'https://www.videolan.org/vlc/', stars: 5, recommendation: '全球公认开源免费全能播放器，全平台适配，格式兼容性天花板。', pros: '完全开源免费无广告无捆绑，无任何功能限制；全平台完美适配，支持几乎所有操作系统、所有音视频格式，甚至支持损坏文件修复播放；支持4K/8K/HDR、直播流、光盘、ISO镜像播放；硬件加速优化完善，资源占用极低，稳定性拉满；插件生态极其丰富，可无限拓展功能。', cons: '界面设计偏老旧，新手友好度一般；默认设置播放体验不及专属平台播放器；字幕美化、画面调节功能不及头部工具；高阶设置门槛高。' },
  { id: 4, name: 'MPV', systems: 'Windows、Mac、Linux', url: 'https://mpv.io/', stars: 4.5, recommendation: '开源免费极简播放器，极客首选，解码能力顶尖，可高度自定义。', pros: '完全开源免费无广告，无任何功能限制；全平台适配，解码能力拉满，支持所有音视频格式，4K/8K/HDR完美适配；硬件加速优化顶级，资源占用极低，启动速度毫秒级；支持命令行操作、脚本自定义、插件拓展，可100%自定义播放界面与功能。', cons: '原生无图形化操作界面，上手门槛极高，新手完全无法使用；默认无字幕匹配、播放列表等基础功能，需手动配置；无官方中文适配。' },
  { id: 5, name: 'MPC-HC', systems: 'Windows', url: 'https://mpc-hc.org/', stars: 4.5, recommendation: 'Windows开源免费轻量级播放器，老电脑救星，极致轻量化。', pros: '完全开源免费无广告，安装包不足10MB，极致轻量化；基于经典MPC内核，解码能力强，支持全主流音视频格式；硬件加速优化完善，Windows XP等老旧系统、低配电脑也能流畅运行；资源占用极低，启动速度极快，无任何冗余功能。', cons: '仅支持Windows系统；官方已停止更新，新系统、新格式适配有风险；界面设计极度老旧；无字幕自动匹配、在线流媒体等进阶功能。' },
  { id: 6, name: 'MPC-BE', systems: 'Windows', url: 'https://sourceforge.net/projects/mpcbe/', stars: 4.5, recommendation: 'MPC-HC分支开源播放器，更新活跃，兼顾轻量化与现代功能。', pros: '完全开源免费无广告，继承MPC-HC的轻量化与强解码能力；官方持续更新，完美适配Windows 10/11，支持新格式、新编码；支持4K/HDR、硬件加速、字幕自动匹配、音轨切换；资源占用极低，老旧电脑也能流畅运行，自定义自由度高。', cons: '仅支持Windows系统；界面设计偏老旧，新手友好度一般；无Mac/Linux版本；进阶功能不及PotPlayer丰富。' },
  { id: 7, name: 'Movist Pro', systems: 'MacOS', url: 'https://movistprime.com/', stars: 4.5, recommendation: 'Mac平台高端付费播放器，主打HDR/高清适配，苹果生态完美适配。', pros: '原生适配MacOS全系芯片，解码能力顶尖，支持所有音视频格式；对HDR/杜比视界/4K/8K视频适配拉满，画面还原度行业顶尖；支持硬件加速、字幕自动匹配、音轨无缝切换、画中画、触控板手势；界面极简高颜值，与Mac系统风格完美统一，资源占用极低。', cons: '仅支持Mac系统；无免费版，需付费买断，门槛不低；无Windows/Linux版本；自定义自由度不及MPV。' },
  { id: 8, name: '射手影音', systems: 'Windows、Mac', url: 'https://www.splayer.org/', stars: 4, recommendation: '国产开源免费播放器，主打智能字幕匹配，国内用户首选。', pros: '完全开源免费无广告，无任何功能限制；支持全主流音视频格式，解码能力强；独家智能字幕匹配功能，自动联网匹配影片的中文字幕，准确率极高，无需手动下载；支持4K/HDR、硬件加速、倍速播放、画面调节；界面简洁，操作零门槛，国内用户适配性拉满。', cons: '官方更新频率极低，新系统、新格式适配有风险；高阶自定义功能不及头部工具；Mac版功能严重精简；部分冷门格式适配有瑕疵。' },
  { id: 9, name: 'KMPlayer', systems: 'Windows、Mac', url: 'https://www.kmplayer.com/', stars: 4, recommendation: '韩国老牌全能播放器，全格式兼容，功能全面，新手友好。', pros: '免费版无广告，支持几乎所有音视频格式，解码能力强；支持4K/8K/HDR/3D视频、硬件加速、字幕自动匹配、音轨切换；内置视频剪辑、截图、GIF录制、倍速播放功能；界面美观，操作零门槛，全平台适配完善。', cons: '免费版有功能限制，部分高阶功能需付费解锁；国内版有资讯推送，需手动关闭；资源占用比轻量播放器高；大文件播放偶发卡顿。' },
  { id: 10, name: 'SMPlayer', systems: 'Windows、Mac、Linux', url: 'https://www.smplayer.info/', stars: 4, recommendation: '基于MPV内核开源免费播放器，主打记忆播放，全平台适配。', pros: '完全免费无广告无捆绑，全平台完美适配；基于MPV内核，解码能力拉满，支持所有音视频格式；独家记忆播放功能，关闭后再次打开可精准恢复播放进度、音量、字幕设置；支持4K/HDR、硬件加速、字幕自动匹配、皮肤自定义；资源占用极低，稳定性极强。', cons: '界面设计偏老旧，新手友好度一般；高阶自定义功能不及MPV；字幕美化功能较弱；官方中文适配不完善。' },
  { id: 11, name: 'GOM Player', systems: 'Windows', url: 'https://www.gomlab.com/gomplayer-media-player/', stars: 3.5, recommendation: '韩国老牌免费播放器，主打360度视频、损坏文件修复，新手友好。', pros: '免费版无广告，支持全主流音视频格式，解码能力强；支持损坏、未下载完成的视频修复播放，360度VR视频、4K/HDR视频完美适配；自动联网匹配字幕，支持3D播放、倍速播放、画面调节；界面简洁，操作零门槛，对低配电脑友好。', cons: '仅支持Windows系统；免费版有功能限制，高阶功能需付费解锁；无Mac/Linux版本；资源占用偏高；偶尔有推送广告。' },
  { id: 12, name: 'Elmedia Player', systems: 'MacOS', url: 'https://mac.eltima.com/media-player.html', stars: 3.5, recommendation: 'Mac平台全能播放器，主打流媒体播放、全格式兼容。', pros: '原生适配MacOS全系芯片，支持几乎所有音视频格式，解码能力强；支持4K/HDR、硬件加速、字幕自动匹配、画中画、AirPlay投屏；独家流媒体播放功能，可直接播放在线视频链接，无需下载；免费版核心功能完善，界面简洁，操作零门槛。', cons: '仅支持Mac系统；免费版有功能限制，高阶播放、编辑功能需付费解锁；无Windows/Linux版本；解码能力不及IINA、Movist Pro。' },
  { id: 13, name: '5KPlayer', systems: 'Windows、Mac', url: 'https://www.5kplayer.com/', stars: 3.5, recommendation: '跨平台免费4K播放器，主打高清播放、无线投屏。', pros: '完全免费无广告，支持全主流音视频格式，4K/5K/8K/HDR视频完美适配；解码能力强，硬件加速优化完善，低配电脑也能流畅播放高清视频；内置AirPlay/DLNA无线投屏功能，可直接投屏至电视、投影仪；支持在线视频下载、音频提取、截图功能。', cons: '安装时有捆绑软件推荐，需手动取消；资源占用比轻量播放器高；高阶自定义功能较少；官方更新频率低。' },
  { id: 14, name: '暴风影音', systems: 'Windows', url: 'https://www.baofeng.com/', stars: 3.5, recommendation: '国产老牌经典播放器，本地版无广告，格式兼容性极强。', pros: '本地纯净版完全无广告，支持几乎所有音视频格式，对老旧、冷门格式兼容性拉满；支持损坏文件修复播放，硬件加速优化完善，老旧电脑也能流畅运行；界面简洁，操作零门槛，国内用户适配性强。', cons: '仅支持Windows系统；官方版有弹窗广告、资讯推送，需手动安装本地纯净版；官方更新停滞，新格式、新系统适配有风险；高阶功能不及现代播放器。' },
  { id: 15, name: '迅雷影音', systems: 'Windows、Mac', url: 'https://video.xunlei.com/', stars: 3.5, recommendation: '国产播放器，主打边下边播、字幕匹配，迅雷用户首选。', pros: '完全免费，与迅雷深度整合，支持边下边播，未下载完成的视频可直接流畅播放；支持全主流音视频格式，解码能力强；自动联网匹配字幕，支持4K/HDR、倍速播放、画面调节、投屏功能；界面简洁，操作零门槛，国内用户适配性强。', cons: '免费版有弹窗广告、资讯推送；与迅雷深度绑定，非迅雷用户功能冗余；资源占用偏高；高阶自定义功能较少。' },
  { id: 16, name: 'Celluloid', systems: 'Linux', url: 'https://celluloid-player.github.io/', stars: 3.5, recommendation: 'Linux平台开源免费MPV前端播放器，轻量原生，GNOME桌面完美适配。', pros: '完全开源免费无广告，基于MPV内核，解码能力拉满，支持所有音视频格式；原生适配Linux GNOME桌面环境，界面极简，与系统风格完美统一；支持硬件加速、字幕匹配、播放列表、快捷键自定义；资源占用极低，启动速度极快。', cons: '仅支持Linux系统；无Windows/Mac版本；高阶自定义功能不及原生MPV；界面自定义自由度低。' },
  { id: 17, name: 'QuickTime Player', systems: 'MacOS原生自带', url: 'https://support.apple.com/zh-cn/guide/quicktime-player/welcome/mac', stars: 3, recommendation: 'Mac系统原生免费播放器，零安装成本，系统级完美适配。', pros: '完全免费，Mac系统原生自带，零安装成本；与苹果生态深度整合，完美适配全系芯片，资源占用极低，稳定性拉满；支持苹果原生格式，屏幕录制、音频提取、基础剪辑功能完善；操作零门槛，新手友好。', cons: '原生支持格式极少，无法播放RAR、MKV、AVI等主流格式，需安装插件；无字幕自动匹配、倍速播放等进阶功能；自定义自由度极低；仅支持Mac系统。' },
  { id: 18, name: 'DivX Player', systems: 'Windows、Mac', url: 'https://www.divx.com/', stars: 3, recommendation: '专业级高清视频播放器，主打DivX格式、4K/HDR高清解码。', pros: '免费版核心功能完善，支持DivX、HEVC、MP4等主流高清格式，4K/HDR解码能力顶尖；支持硬件加速、音轨无缝切换、字幕精准同步、播放列表管理；对高清视频优化到位，画面还原度高，资源占用低。', cons: '免费版有广告、功能限制，高阶专业功能需付费解锁；支持格式较少，冷门格式兼容性差；自定义自由度低；无Linux版本。' },
  { id: 19, name: 'Parole', systems: 'Linux', url: 'https://docs.xfce.org/apps/parole/start', stars: 3, recommendation: 'Xfce桌面环境原生默认播放器，开源免费，极致轻量。', pros: '完全开源免费无广告，Xfce桌面原生自带，零安装成本；与Linux系统深度整合，兼容性拉满，资源占用极低；支持全主流音视频格式，硬件加速、字幕匹配、播放控制功能完善；界面极简，操作零门槛，老旧设备适配完美。', cons: '仅支持Linux Xfce桌面环境；功能极度单一，无进阶播放功能；自定义自由度极低；无其他平台版本。' },
  { id: 20, name: 'OnyX', systems: 'MacOS', url: 'https://github.com/onyx-mac/onyx', stars: 3, recommendation: 'Mac平台开源免费轻量级播放器，主打极简播放、格式兼容。', pros: '完全开源免费无广告，原生适配MacOS全系芯片；支持全主流音视频格式，解码能力强，硬件加速优化完善；界面极简，无任何冗余功能，资源占用极低，启动速度极快；支持基础播放控制、字幕匹配、倍速播放。', cons: '仅支持Mac系统；功能极度单一，无进阶播放功能；自定义自由度极低；无Windows/Linux版本；官方更新频率低。' },
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

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoPlayer({ isOpen, onClose }: VideoPlayerProps) {
  const [selectedTool, setSelectedTool] = useState<VideoPlayerTool | null>(null);

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
                <i className="fa-solid fa-play text-2xl text-pink-400"></i>
                <h3 className="text-white text-xl font-bold">本地视频播放器</h3>
                <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded-full">
                  共 {videoPlayerTools.length} 款工具
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
                {videoPlayerTools.map((tool, index) => (
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
                      selectedTool?.id === tool.id ? 'border-pink-500/50' : 'border-white/10 group-hover:border-white/20'
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
                        className="block w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-center py-3 rounded-xl font-medium transition-all hover:scale-[1.02] mt-4"
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
