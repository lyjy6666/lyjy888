import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 定义屏幕录制工具类型
interface ScreenRecorderTool {
  id: number;
  name: string;
  systems: string;
  url: string;
  stars: number; // 1-5
  recommendation: string;
  pros: string;
  cons: string;
}

// 屏幕录制工具数据
const screenRecorderTools: ScreenRecorderTool[] = [
  { id: 1, name: 'OBS Studio', systems: 'Windows、Mac、Linux', url: 'https://obsproject.com/zh-hans/download/', stars: 5, recommendation: '全球公认的开源免费录屏 & 直播标杆工具，无任何功能限制，专业创作者首选。', pros: '完全免费无广告无水印，无录制上限；插件生态丰富，支持多场景叠加、专业音频混音；硬件编码优化强，长时间录制稳定性拉满。', cons: '上手门槛高，新手需学习成本；无原生深度剪辑功能。' },
  { id: 2, name: 'Bandicam（班迪录屏）', systems: 'Windows、Mac', url: 'https://www.bandicam.cn/downloads/', stars: 4.5, recommendation: 'Windows 轻量级高画质录屏标杆，主打超高压缩比与低性能占用，游戏玩家优选。', pros: '自研高压缩技术，文件小画质损耗低；支持 4K 480fps 超高帧率录制；硬件加速优化顶级，低配电脑也能流畅运行。', cons: '免费版有 10 分钟时长限制 + 强制水印；无深度剪辑功能，买断制付费门槛高。' },
  { id: 3, name: 'Camtasia', systems: 'Windows、Mac', url: 'https://www.techsmith.com/download/camtasia/', stars: 4.5, recommendation: '专业级录屏 + 剪辑一体化旗舰工具，主打商务教程、微课制作，职场/教育从业者首选。', pros: '录屏功能细腻，自带专业级非线性剪辑系统；海量正版模板、特效、字幕素材；音画同步稳定性极强，支持交互式视频制作。', cons: '买断制价格昂贵，免费版仅 30 天试用且带水印；高帧率游戏录制优化一般，对电脑配置有要求。' },
  { id: 4, name: '剪映专业版', systems: 'Windows、Mac', url: 'https://www.capcut.cn/', stars: 4.5, recommendation: '国民级免费录屏 + 剪辑一体化工具，零门槛上手，录屏后可直接完成全流程出片。', pros: '完全免费无广告无时长限制；支持多模式录制，自带鼠标高亮、按键显示功能；内置海量免费剪辑素材与 AI 功能，新手零学习成本。', cons: '高帧率游戏录制优化一般，长时间高码率录制偶发崩溃；录屏参数自定义自由度低，性能占用偏高。' },
  { id: 5, name: 'EV 录屏', systems: 'Windows、Mac', url: 'https://www.ieway.cn/evcapture.html', stars: 4.5, recommendation: '国产良心免费轻量级录屏神器，无广告无水印，对低配电脑极度友好，网课/会议录制首选。', pros: '个人版完全免费无捆绑，界面极简一键录制；性能占用极低，老旧电脑流畅运行；支持多模式录制、音频混音、直播推流。', cons: '无专业剪辑功能，进阶标注特效少；Mac 版功能精简，高帧率游戏录制表现一般。' },
  { id: 6, name: 'Xbox Game Bar', systems: 'Windows 10/11 系统原生', url: '', stars: 4, recommendation: 'Windows 系统原生免费录屏工具，零安装零成本，游戏录制与应急录制首选。', pros: '完全免费无广告，系统原生无需安装；Win+Alt+R 一键启动，操作零门槛；游戏录制帧率稳定，硬件加速优化到位，性能占用极低。', cons: '不支持全屏桌面/资源管理器录制，仅能录制单个应用窗口；无选区录制、定时录制等进阶功能，参数自定义空间极小。' },
  { id: 7, name: 'QuickTime Player', systems: 'MacOS 系统原生', url: 'https://www.apple.com.cn/quicktime/player/', stars: 4, recommendation: 'Mac 原生免费录屏工具，零安装无水印，完美适配苹果生态，Mac 用户快速录屏基础首选。', pros: '完全免费无广告，系统原生无捆绑；一键启动全屏/选区录制，性能占用极低；文件体积控制优秀，完美适配苹果全系芯片。', cons: '原生不支持系统音频内录，需额外安装插件；无进阶录制与专业剪辑功能，帧率上限低，不适合高帧率录制。' },
  { id: 8, name: 'ShareX', systems: 'Windows', url: 'https://getsharex.com/', stars: 4, recommendation: '免费开源全能型录屏 + 截图工具，功能极度丰富，职场人、技术人员、效率控的宝藏工具。', pros: '完全免费开源无广告，无录制时长限制；支持录屏、GIF 录制、OCR 识别、截图标注全功能；支持自定义快捷键、自动化工作流，插件与分享渠道丰富。', cons: '界面偏技术向，新手上手有门槛；高帧率游戏录制优化一般，长时间高码率录制偶发稳定性问题。' },
  { id: 9, name: 'ApowerREC（傲软录屏）', systems: 'Windows、Mac、Linux', url: 'https://www.apowersoft.cn/record-all-screen', stars: 4, recommendation: '全平台适配全能型录屏软件，界面友好新手零门槛，网课、会议、游戏多场景均衡之选。', pros: '跨全平台适配，兼容性强；支持多模式录制，自带实时标注、定时录制、计划任务；内置基础剪辑功能，长时间录制稳定性强。', cons: '免费版有时长限制 + 强制水印；核心进阶功能需订阅付费，长期使用成本高；硬件加速优化不如专精工具。' },
  { id: 10, name: 'Action!', systems: 'Windows', url: 'https://mirillis.com/en/downloads/', stars: 4, recommendation: '专业级游戏录屏旗舰，主打高帧率、低延迟游戏录制，3A 游戏主播、游戏内容创作者优选。', pros: '支持最高 8K 240Hz HDR 录制，游戏录制帧率稳定无掉帧，性能占用极低；支持慢动作录制、实时直播推流、绿幕抠像；硬件加速优化顶级，断电可自动恢复录制文件。', cons: '仅支持 Windows 系统；免费版有水印 + 时长限制；买断制价格偏高，非游戏场景适配性一般。' },
  { id: 11, name: 'Loom', systems: 'Windows、Mac、Chrome 插件', url: 'https://www.loom.com/download', stars: 4, recommendation: '云端协同录屏神器，主打职场远程协作，录屏后一键生成分享链接，无需下载传输。', pros: '界面极简，一键录屏 + 摄像头画中画同录；支持实时标注，录完自动生成云端链接一键分享；支持观看者评论互动，跨设备访问方便。', cons: '免费版有单条 5 分钟时长上限、存储数量限制；核心功能需付费订阅，极度依赖网络，无本地深度剪辑功能。' },
  { id: 12, name: 'SimpleScreenRecorder', systems: 'Linux', url: 'http://www.maartenbaert.be/simplescreenrecorder/', stars: 4.5, recommendation: 'Linux 平台最优秀的免费开源录屏软件，完美适配各主流发行版，解决 Linux 专业录屏工具稀缺痛点。', pros: '完全免费开源，无水印无时长限制；支持全屏/选区/OpenGL 游戏录制，帧率稳定性能占用低；支持多轨音频录制，录屏参数自定义丰富。', cons: '仅支持 Linux 系统；界面偏技术向，新手有上手门槛；无深度剪辑功能，进阶特效少。' },
  { id: 13, name: '嗨格式录屏大师', systems: 'Windows、Mac', url: 'https://www.luping.com/', stars: 3.5, recommendation: '国产全能型录屏工具，全场景适配，界面友好新手零门槛，国内用户适配性拉满。', pros: '支持 7 大录制模式，最高 4K 120fps 原画录制；自带 AI 降噪、实时标注、定时录制；内置基础剪辑功能，长时间录制稳定性强。', cons: '免费版有时长限制 + 水印；核心高级功能需订阅付费，门槛不低；高阶特效不如专业旗舰工具。' },
  { id: 14, name: 'Movavi Screen Recorder', systems: 'Windows、Mac', url: 'https://www.movavi.com/screen-recorder.html', stars: 3.5, recommendation: '轻量级全能录屏 + 剪辑软件，界面极简直观，新手友好，适合个人用户、自媒体新手全场景适配。', pros: '界面清爽零学习成本，一键启动录制；自带鼠标高亮、定时录制、基础剪辑功能；导出格式丰富，适配全平台发布。', cons: '免费版有水印 + 时长限制；核心功能需付费解锁，订阅/买断制价格不低；专业级功能不足，低配电脑优化一般。' },
  { id: 15, name: '万彩录屏大师', systems: 'Windows、Mac', url: 'https://www.wcapture.cn/download', stars: 3.5, recommendation: '国产主打微课、动画课件的录屏一体化工具，录屏 + 动画制作深度融合，教育从业者专属优选。', pros: '支持多模式录制，自带教学标注、鼠标特效；内置海量动画课件模板、人物角色素材；完美适配国内在线教育场景，新手友好。', cons: '免费版强制添加水印；高级素材与功能需付费解锁；高帧率录制表现一般，录制文件体积偏大。' },
  { id: 16, name: 'ScreenPal', systems: 'Windows、Mac、Chrome', url: 'https://screenpal.com/', stars: 3.5, recommendation: '海外知名轻量级录屏工具，主打网课、远程教学、职场演示，全球用户基数大，成熟稳定。', pros: '界面友好上手简单，支持屏幕 + 摄像头同录；自带实时标注、脚本录制功能；内置基础剪辑工具，支持云端存储与一键分享。', cons: '免费版仅支持 15 分钟以内录制 + 强制水印；高清录制、长时长录制需付费订阅；国内访问云端服务速度不稳定。' },
  { id: 17, name: 'Icecream Screen Recorder', systems: 'Windows、Mac', url: 'https://icecreamapps.com/cn/Screen-Recorder/', stars: 3, recommendation: '轻量级极简录屏工具，安装包体积小巧，界面清爽，适合临时快速录屏，低配电脑友好。', pros: '安装包体积小，占用系统资源少；支持多模式录制，自带实时标注、截图、定时录制功能；支持 GIF 动图输出，操作简单。', cons: '免费版有 5 分钟时长限制 + 水印；高级功能需付费买断解锁；录屏参数自定义空间小，长时间录制稳定性一般。' },
  { id: 18, name: '野葱录屏', systems: 'Windows、Mac', url: 'https://luping.yecong.com/', stars: 3, recommendation: '国产轻量免费录屏工具，主打极简操作与长时长录制稳定性，安装包仅 5MB，网课、会议录制省心之选。', pros: '界面极简一键录制，零学习成本；支持多模式录制，自带麦克风智能降噪；长时间录制稳定性强，意外断电可自动保存，性能占用低。', cons: '免费版有功能限制，高级功能需开通会员；无专业剪辑功能，进阶标注特效少；高帧率游戏录制表现一般。' },
  { id: 19, name: 'Kap', systems: 'Mac', url: 'https://getkap.co/', stars: 3, recommendation: 'Mac 原生开源轻量录屏工具，界面极具 Mac 原生质感，主打轻量快速录屏与 GIF 导出，Mac 用户轻度录屏优选。', pros: '完全免费开源，界面极简清爽，完美适配 MacOS 生态；支持全屏/选区录制，自带鼠标点击高亮；支持 GIF 无损导出，操作一键完成，可插件扩展功能。', cons: '仅支持 Mac 系统；原生功能相对基础，系统音频内录设置繁琐；不适合长时长、高码率录制。' },
  { id: 20, name: 'Fraps', systems: 'Windows', url: 'https://fraps.com/download.php', stars: 2.5, recommendation: '经典老牌游戏录屏工具，主打 DirectX/OpenGL 游戏录制，适合老游戏、低配电脑的游戏录制需求。', pros: '游戏内帧率显示精准，录制无损画质，帧率稳定；操作极简，一键启动录制；对老款单机游戏、低配电脑适配性极强。', cons: '软件多年未更新，功能严重滞后；仅支持 Windows 系统；录制文件体积极大，仅支持游戏录制，不支持桌面/选区录制；免费版有 30 秒时长限制。' },
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

interface ScreenRecorderProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScreenRecorder({ isOpen, onClose }: ScreenRecorderProps) {
  const [selectedTool, setSelectedTool] = useState<ScreenRecorderTool | null>(null);

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
                <i className="fa-solid fa-video text-2xl text-red-400"></i>
                <h3 className="text-white text-xl font-bold">屏幕录制工具</h3>
                <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded-full">
                  共 {screenRecorderTools.length} 款工具
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
                {screenRecorderTools.map((tool, index) => (
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
                      selectedTool?.id === tool.id ? 'border-blue-500/50' : 'border-white/10 group-hover:border-white/20'
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
                        className="block w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-center py-3 rounded-xl font-medium transition-all hover:scale-[1.02] mt-4"
                      >
                        <i className="fa-solid fa-download mr-2"></i>前往官网下载
                      </a>
                    )}
                    {!selectedTool.url && (
                      <div className="block w-full bg-white/10 text-white/60 text-center py-3 rounded-xl font-medium mt-4">
                        <i className="fa-solid fa-info-circle mr-2"></i>系统内置，无需下载
                      </div>
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
