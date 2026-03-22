import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 定义压缩解压工具类型
interface CompressionTool {
  id: number;
  name: string;
  systems: string;
  url: string;
  stars: number;
  recommendation: string;
  pros: string;
  cons: string;
}

// 压缩解压工具数据
const compressionTools: CompressionTool[] = [
  { id: 1, name: '7-Zip', systems: 'Windows、Linux', url: 'https://www.7-zip.org/', stars: 5, recommendation: '全球公认开源免费压缩解压标杆，无广告无限制，装机必备首选。', pros: '完全开源免费，无广告无捆绑，无任何功能限制；自研7z格式压缩比行业顶尖，远超同类软件；支持几乎所有压缩格式，兼容ZIP、RAR、7z、ISO等全格式；支持加密压缩、分卷压缩、批量处理、命令行操作；安装包不足2MB，资源占用极低，老旧电脑适配完美。', cons: '无官方Mac版本；界面设计偏老旧，新手友好度一般；无额外拓展功能，仅专注压缩解压核心需求。' },
  { id: 2, name: 'Bandizip', systems: 'Windows、Mac', url: 'https://www.bandisoft.com/bandizip/', stars: 4.5, recommendation: '跨平台高颜值全能压缩解压工具，新手友好，国内用户首选。', pros: '免费版无广告无捆绑，界面极简美观，操作零门槛；压缩解压速度极快，支持全格式兼容，完美适配RAR、7z、ZIP等主流格式；支持加密压缩、分卷压缩、批量处理、图片预览、恶意文件扫描；全平台适配，对新系统、新芯片适配完美。', cons: '免费版有部分功能限制；高阶批量处理、格式转换、智能修复功能需付费解锁；Mac版功能比Windows版有明显精简。' },
  { id: 3, name: 'WinRAR', systems: 'Windows、Mac、Linux', url: 'https://www.win-rar.com/', stars: 4.5, recommendation: '全球老牌经典压缩解压工具，RAR格式发明者，格式兼容性天花板。', pros: 'RAR格式原生支持，格式兼容性拉满，几乎无无法解压的文件；压缩解压速度快，支持加密压缩、分卷压缩、批量处理、文件修复；对老旧系统、老旧文件兼容性极强，稳定性拉满；安装包体积极小，资源占用极低。', cons: '免费版有弹窗广告，付费买断门槛高；界面设计多年未更新，偏老旧；压缩比不及7-Zip；Mac版功能精简，适配性一般。' },
  { id: 4, name: 'PeaZip', systems: 'Windows、Linux、Mac', url: 'https://peazip.github.io/', stars: 4.5, recommendation: '开源免费跨平台全能压缩工具，全格式支持，隐私保护拉满。', pros: '完全开源免费无广告，无任何功能限制；支持200+压缩格式，全平台完美适配；支持强加密压缩、分卷压缩、批量处理、文件校验、安全删除；界面可自定义，支持命令行操作，无任何用户数据收集，隐私保护拉满。', cons: '界面设计偏技术向，新手友好度一般；RAR格式仅支持解压，不支持压缩；压缩速度不及头部商业工具；官方中文适配不完善。' },
  { id: 5, name: 'NanaZip', systems: 'Windows 10/11', url: 'https://github.com/M2Team/NanaZip', stars: 4.5, recommendation: '7-Zip分支开源免费压缩工具，完美适配Windows新系统，现代界面设计。', pros: '完全开源免费无广告，基于7-Zip内核开发，压缩比、兼容性拉满；完美适配Windows 10/11，原生支持右键菜单、深色模式、高DPI缩放；支持全格式压缩解压，加密、分卷、批量处理功能完善；微软商店一键安装，新手零门槛。', cons: '仅支持Windows 10/11，不兼容老旧系统；无Mac/Linux版本；界面自定义自由度低；拓展功能不及7-Zip丰富。' },
  { id: 6, name: 'The Unarchiver', systems: 'MacOS', url: 'https://theunarchiver.com/', stars: 4.5, recommendation: 'Mac平台装机必备免费解压工具，完美解决Mac原生解压兼容问题。', pros: '完全免费无广告无捆绑，Mac App Store一键安装；原生适配MacOS全系芯片，支持几乎所有压缩格式，解决Mac原生无法解压RAR、7z、ISO等格式的痛点；解压速度快，资源占用极低，操作零门槛，自动适配编码无乱码。', cons: '仅支持解压，不支持压缩功能；仅适配Mac系统；无加密、分卷、批量处理进阶功能；界面极简，无自定义设置。' },
  { id: 7, name: 'Keka', systems: 'MacOS', url: 'https://www.keka.io/zh-cn/', stars: 4.5, recommendation: 'Mac专属免费开源压缩解压全能工具，完美适配苹果生态。', pros: '免费开源无广告，Mac App Store一键安装；原生适配MacOS全系芯片，支持全格式压缩解压，完美兼容RAR、7z、ZIP等格式；支持加密压缩、分卷压缩、批量处理、自动分卷；界面极简，拖拽式操作，新手零门槛，资源占用极低。', cons: '仅支持Mac系统；进阶批量处理、文件修复功能需付费解锁；界面自定义自由度低；压缩比不及7-Zip。' },
  { id: 8, name: 'WinZip', systems: 'Windows、Mac', url: 'https://www.winzip.com/', stars: 4, recommendation: '全球老牌商业压缩工具，主打云集成、企业级安全防护。', pros: '格式兼容性强，支持全主流格式；压缩解压速度快，支持强加密压缩、分卷压缩、批量处理；深度整合百度网盘、阿里云、OneDrive等云存储，支持云端文件直接压缩解压；企业级安全防护、文件共享、权限管理完善。', cons: '免费版仅30天试用，核心功能需付费订阅，价格昂贵；免费版有弹窗广告；安装包体积大，资源占用偏高；对个人用户性价比极低。' },
  { id: 9, name: '360压缩', systems: 'Windows', url: 'https://yasuo.360.cn/', stars: 4, recommendation: '国产免费压缩解压工具，新手友好，国内格式适配性强。', pros: '完全免费无广告（可开启纯净模式），界面简洁，操作零门槛；支持全格式压缩解压，对国内特殊格式、分卷文件适配性极强；支持加密压缩、分卷压缩、批量处理、恶意文件扫描、图片预览；内置云解压功能，与360云盘深度联动。', cons: '仅支持Windows系统；默认安装有捆绑推荐，需手动关闭纯净模式；无Mac/Linux版本；压缩比不及7-Zip；偶尔有资讯推送。' },
  { id: 10, name: '好压', systems: 'Windows', url: 'https://haozip.2345.cc/', stars: 3.5, recommendation: '国产老牌免费压缩解压工具，兼容性强，老旧系统友好。', pros: '完全免费，支持全格式压缩解压，对老旧文件、特殊格式兼容性极强；支持加密压缩、分卷压缩、批量处理、文件修复、图片格式转换；界面简洁，操作零门槛，对老旧电脑、老旧系统适配完美；资源占用极低。', cons: '免费版有弹窗广告、资讯推送；安装时有捆绑软件推荐，需手动取消；无Mac/Linux版本；压缩比一般；官方更新频率低。' },
  { id: 11, name: 'B1 Free Archiver', systems: 'Windows、Mac、Linux、Android', url: 'https://b1.org/', stars: 3.5, recommendation: '跨平台免费压缩解压工具，全设备适配，新手友好。', pros: '完全免费无广告无捆绑，全平台完美适配；支持全主流格式压缩解压，界面极简美观，拖拽式操作零门槛；支持加密压缩、分卷压缩、批量处理；原生支持多语言，中文适配完善，资源占用极低。', cons: '压缩速度一般，大文件处理效率低；压缩比不及头部工具；进阶批量处理、文件修复功能缺失；官方更新频率低。' },
  { id: 12, name: 'Hamster Free Archiver', systems: 'Windows', url: 'https://www.hamstersoft.com/free-archiver/', stars: 3.5, recommendation: '免费轻量化压缩工具，主打批量处理、多格式转换，新手友好。', pros: '完全免费无广告无捆绑，界面极简美观，操作零门槛；支持全主流格式压缩解压，批量处理能力极强，支持上百个文件同时处理；支持加密压缩、分卷压缩、格式转换；对低配电脑、老旧系统友好，资源占用极低。', cons: '仅支持Windows系统；无Mac/Linux版本；压缩比一般；无文件修复、命令行操作进阶功能；官方更新停滞。' },
  { id: 13, name: 'Ashampoo ZIP Free', systems: 'Windows', url: 'https://www.ashampoo.com/zh-cn/0110/freetools/ashampoo-zip-free', stars: 3.5, recommendation: '德国出品免费压缩工具，主打严谨稳定、界面友好。', pros: '完全免费无广告，德国技术出品，稳定性极强；支持全主流格式压缩解压，界面设计现代美观，操作零门槛；支持加密压缩、分卷压缩、批量处理、文件修复、云存储集成；资源占用低，对新系统适配完美。', cons: '仅支持Windows系统；免费版有部分功能限制，高阶功能需付费解锁；无Mac/Linux版本；压缩比不及7-Zip。' },
  { id: 14, name: 'Archiver', systems: 'MacOS', url: 'https://archiverapp.com/', stars: 3.5, recommendation: 'Mac专属付费高颜值压缩工具，主打精细化管理、多媒体优化。', pros: '原生适配MacOS全系芯片，界面极简高颜值，完美适配苹果生态；支持全格式压缩解压，加密、分卷、批量处理功能完善；独家图片、视频压缩优化，可大幅减小多媒体文件体积且画质损耗极低；支持文件拆分、合并、密码恢复，操作零门槛。', cons: '仅支持Mac系统；无免费版，需付费买断，门槛不低；压缩比不及开源工具；批量处理速度一般。' },
  { id: 15, name: 'IZArc', systems: 'Windows', url: 'https://www.izarc.org/', stars: 3, recommendation: '老牌免费压缩工具，主打老旧系统、老旧格式兼容。', pros: '完全免费无广告，支持几乎所有冷门、老旧压缩格式；支持加密压缩、分卷压缩、批量处理、文件修复、ISO镜像制作；对Windows XP等老旧系统适配完美，安装包体积极小，资源占用极低。', cons: '仅支持Windows系统；界面设计极度老旧，新手友好度低；官方已停止更新，新系统适配有风险；压缩速度、压缩比不及现代工具。' },
  { id: 16, name: 'Xarchiver', systems: 'Linux', url: 'https://github.com/ib/xarchiver', stars: 3.5, recommendation: 'Linux平台轻量级开源免费压缩工具，桌面环境原生适配。', pros: '完全开源免费无广告，适配绝大多数Linux发行版；支持全主流格式压缩解压，界面极简轻量，资源占用极低；支持加密压缩、分卷压缩、批量处理；与Linux桌面环境深度整合，右键菜单完美适配，新手零门槛。', cons: '仅支持Linux系统；无Windows/Mac版本；进阶功能较少；压缩比不及7-Zip。' },
  { id: 17, name: 'File Roller', systems: 'Linux', url: 'https://wiki.gnome.org/Apps/FileRoller', stars: 3.5, recommendation: 'GNOME桌面环境原生默认压缩工具，开源免费，系统级适配。', pros: '完全开源免费无广告，GNOME桌面原生自带，零安装成本；与Linux系统深度整合，兼容性拉满，无任何适配问题；支持全主流格式压缩解压，加密、分卷、批量处理功能完善；界面极简，操作零门槛，资源占用极低。', cons: '仅支持Linux GNOME桌面环境；自定义自由度低；进阶功能较少；压缩比不及专业工具。' },
  { id: 18, name: 'Movist Pro', systems: 'MacOS', url: 'https://macpaw.com/archiver', stars: 3, recommendation: 'Mac专属高端付费压缩工具，主打企业级安全、批量自动化。', pros: '原生适配MacOS全系芯片，企业级加密压缩技术，安全防护拉满；支持全格式压缩解压，批量自动化处理、脚本操作功能完善；支持大文件分卷、文件修复、云端同步；界面设计专业，稳定性极强，适合企业用户。', cons: '仅支持Mac系统；无免费版，订阅制价格昂贵；个人用户功能冗余；上手有一定门槛。' },
  { id: 19, name: 'Quick Zip', systems: 'Windows', url: 'https://github.com/quickzip/quickzip', stars: 3, recommendation: '开源免费轻量级压缩工具，主打批量处理、极速操作。', pros: '完全开源免费无广告，无任何功能限制；支持全主流格式压缩解压，批量处理速度极快，支持上千个文件同时操作；支持加密压缩、分卷压缩、命令行操作；安装包体积极小，资源占用极低，老旧电脑适配好。', cons: '仅支持Windows系统；界面设计偏简陋，新手友好度一般；无Mac/Linux版本；官方更新频率低。' },
  { id: 20, name: 'ZArchiver PC版', systems: 'Windows', url: 'https://zarchiver.app/pc/', stars: 3, recommendation: '安卓端顶级压缩工具的PC版本，主打轻量、全格式兼容，手机用户无缝适配。', pros: '完全免费无广告，界面极简，操作逻辑与手机版一致，手机用户零学习成本；支持全主流格式压缩解压，对冷门格式、分卷文件适配性极强；支持加密压缩、分卷压缩、批量处理；安装包体积极小，资源占用极低。', cons: '仅支持Windows系统；PC版功能比手机版有精简；无Mac/Linux版本；进阶功能较少；官方更新频率低。' },
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

interface CompressionToolProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CompressionTool({ isOpen, onClose }: CompressionToolProps) {
  const [selectedTool, setSelectedTool] = useState<CompressionTool | null>(null);

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
                <i className="fa-solid fa-file-zipper text-2xl text-amber-400"></i>
                <h3 className="text-white text-xl font-bold">压缩解压工具</h3>
                <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded-full">
                  共 {compressionTools.length} 款工具
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
                {compressionTools.map((tool, index) => (
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
                      selectedTool?.id === tool.id ? 'border-amber-500/50' : 'border-white/10 group-hover:border-white/20'
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
                        className="block w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-center py-3 rounded-xl font-medium transition-all hover:scale-[1.02] mt-4"
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
