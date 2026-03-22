import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 定义系统清理工具类型
interface SystemCleanerTool {
  id: number;
  name: string;
  systems: string;
  url: string;
  stars: number;
  recommendation: string;
  pros: string;
  cons: string;
}

// 系统清理与优化工具数据
const systemCleanerTools: SystemCleanerTool[] = [
  { id: 1, name: '火绒安全软件', systems: 'Windows', url: 'https://www.huorong.cn/', stars: 5, recommendation: '国内口碑标杆纯净安全 + 系统优化工具，无广告无捆绑，装机必备首选。', pros: '个人版完全免费无广告无捆绑，无任何流氓行为；核心功能覆盖病毒查杀、弹窗拦截、启动项管理、垃圾清理、注册表清理、系统修复；彻底拦截广告弹窗、流氓软件捆绑，系统优化效果明显；资源占用极低，静默运行无打扰，自定义规则强大，数据安全性拉满。', cons: '仅支持Windows系统；无Mac/Linux版本；企业级防护、批量管理功能需付费；高阶系统优化功能不及专业工具。' },
  { id: 2, name: '微软电脑管家', systems: 'Windows 10/11', url: 'https://pcmanager.microsoft.com/zh-cn', stars: 5, recommendation: '微软官方原生系统管理工具，纯净无广告，系统级适配，新手首选。', pros: '完全免费，微软官方出品，无广告无捆绑无任何流氓行为；与Windows系统深度整合，兼容性拉满，无任何系统冲突风险；覆盖系统体检、病毒查杀、垃圾清理、启动项管理、弹窗拦截、浏览器保护；与Windows Defender深度联动，操作零门槛，新手友好，无任何冗余推送。', cons: '仅支持Windows 10/11，不兼容老旧系统；无Mac/Linux版本；高阶系统优化、注册表编辑功能缺失；自定义自由度低。' },
  { id: 3, name: 'CCleaner', systems: 'Windows、Mac', url: 'https://www.ccleaner.com/zh-cn', stars: 4.5, recommendation: '全球老牌系统清理标杆工具，清理深度行业顶尖，专业用户首选。', pros: '免费版核心清理功能完善，无广告无捆绑；垃圾清理、注册表清理、浏览器缓存清理、历史记录清理能力拉满，清理深度极高；内置启动项管理、软件卸载、磁盘分析、文件粉碎功能；系统兼容性强，老旧系统也能完美适配，资源占用极低。', cons: '免费版有功能限制，高阶系统优化、实时监控功能需付费解锁；曾经有过隐私争议，需关闭数据收集；Mac版功能精简；注册表清理新手操作有风险。' },
  { id: 4, name: 'Geek Uninstaller', systems: 'Windows', url: 'https://geekuninstaller.com/', stars: 4.5, recommendation: '专精型软件卸载工具，彻底清理残留，办公电脑必备。', pros: '免费版无广告无捆绑，安装包不足10MB，极致轻量化；一键卸载软件，深度扫描清理注册表、文件夹残留，彻底解决软件卸载不干净的问题；支持强制卸载、批量卸载、Windows应用卸载；启动速度极快，资源占用极低，操作零门槛。', cons: '仅支持Windows系统；免费版仅支持个人非商用，无批量卸载功能；核心全功能需付费买断；无Mac/Linux版本；无系统清理、优化功能。' },
  { id: 5, name: 'BleachBit', systems: 'Windows、Mac、Linux', url: 'https://www.bleachbit.org/', stars: 4.5, recommendation: '开源免费跨平台系统清理工具，隐私保护拉满，开源爱好者首选。', pros: '完全开源免费无广告无捆绑，无任何功能限制；全平台完美适配，Linux发行版全覆盖；深度清理系统垃圾、浏览器缓存、历史记录、临时文件，支持文件粉碎、隐私数据彻底清除；无任何用户数据收集，隐私保护拉满；资源占用极低，支持命令行操作。', cons: '界面偏技术向，新手友好度一般；无软件卸载、启动项管理进阶功能；注册表清理功能较弱；官方中文适配不完善。' },
  { id: 6, name: 'Revo Uninstaller', systems: 'Windows', url: 'https://www.revouninstaller.com/', stars: 4.5, recommendation: '专业级软件卸载工具，深度清理残留，卸载能力天花板。', pros: '免费版核心卸载功能完善，支持软件一键卸载、深度扫描残留；独家高级卸载模式，可监控软件安装全过程，彻底清理所有文件、注册表项；支持强制卸载、批量卸载、浏览器插件清理、启动项管理；系统兼容性强，老旧系统也能完美适配。', cons: '仅支持Windows系统；免费版有功能限制，深度扫描、批量卸载等核心功能需付费解锁；无Mac/Linux版本；上手有一定门槛。' },
  { id: 7, name: 'Wise Disk Cleaner', systems: 'Windows', url: 'https://www.wisecleaner.com.cn/wise-disk-cleaner.html', stars: 4.5, recommendation: '免费轻量化磁盘清理工具，主打安全清理，新手友好。', pros: '个人版完全免费无广告无捆绑，界面简洁，操作零门槛；深度清理系统垃圾、浏览器缓存、临时文件、无效注册表，清理效果明显；内置磁盘碎片整理、磁盘分析功能；可设置自动清理计划，资源占用极低，对老旧电脑友好，清理安全性高，无误删风险。', cons: '仅支持Windows系统；无Mac/Linux版本；无软件卸载、系统深度优化功能；高阶功能需付费解锁。' },
  { id: 8, name: 'Bulk Crap Uninstaller（BCU）', systems: 'Windows', url: 'https://www.bcuninstaller.com/', stars: 4.5, recommendation: '开源免费批量软件卸载工具，彻底清理流氓软件，极客首选。', pros: '完全开源免费无广告无捆绑，无任何功能限制；支持批量卸载软件，深度扫描清理残留文件、注册表项；可检测并卸载捆绑软件、流氓软件、隐藏软件；支持强制卸载、静默卸载、命令行操作；自定义自由度极高，资源占用极低。', cons: '仅支持Windows系统；界面偏技术向，新手友好度一般；无Mac/Linux版本；无系统清理、优化功能；上手有一定学习成本。' },
  { id: 9, name: 'Wise Care 365', systems: 'Windows', url: 'https://www.wisecleaner.com.cn/wise-care-365.html', stars: 4, recommendation: '国产全能型系统优化工具，一站式覆盖清理、优化、防护全需求。', pros: '免费版功能完善，无强制广告；覆盖系统垃圾清理、注册表清理、启动项管理、软件卸载、系统优化、隐私保护全功能；一键体检、一键优化，操作零门槛，新手友好；对Windows系统适配完善，优化效果明显，资源占用低。', cons: '免费版有功能限制，高阶系统优化、实时防护功能需付费解锁；偶尔有付费推广弹窗；无Mac/Linux版本；自定义自由度不及专业工具。' },
  { id: 10, name: 'Glary Utilities', systems: 'Windows', url: 'https://www.glarysoft.com/glary-utilities/', stars: 4, recommendation: '全球知名全能型系统优化工具，20+功能一站式覆盖，老电脑救星。', pros: '免费版核心功能完善，无广告无捆绑；内置20+系统工具，覆盖垃圾清理、注册表修复、软件卸载、启动项管理、磁盘优化、隐私保护、系统修复；一键优化，操作零门槛，新手友好；对老旧系统、低配电脑适配完美，优化效果明显，资源占用极低。', cons: '仅支持Windows系统；免费版有功能限制，高阶功能需付费解锁；无Mac/Linux版本；界面设计偏老旧；更新频率较低。' },
  { id: 11, name: 'DiskGenius', systems: 'Windows', url: 'https://www.diskgenius.cn/', stars: 4, recommendation: '国产专业级磁盘管理 + 数据恢复工具，磁盘优化、分区管理首选。', pros: '免费版核心功能完善，覆盖磁盘分区管理、碎片整理、坏道检测、数据恢复、系统备份；磁盘清理、优化能力极强，可彻底解决磁盘空间不足、卡顿问题；支持MBR/GPT分区转换、系统迁移、虚拟磁盘管理；稳定性极强，数据安全性高，国内用户适配性拉满。', cons: '仅支持Windows系统；免费版有功能限制，高级数据恢复、批量处理功能需付费解锁；无Mac/Linux版本；上手有一定学习成本，新手操作有风险。' },
  { id: 12, name: 'Autoruns', systems: 'Windows', url: 'https://learn.microsoft.com/zh-cn/sysinternals/downloads/autoruns', stars: 4, recommendation: '微软官方出品专业级启动项管理工具，彻底解决开机卡顿问题。', pros: '完全免费，微软官方出品，无广告无捆绑，系统级兼容；可查看并管理系统所有开机启动项、服务、计划任务、驱动、注册表项；彻底禁用流氓软件、无用程序的自启动，大幅提升开机速度、系统流畅度；专业级工具，无任何功能限制，数据安全性拉满。', cons: '仅支持Windows系统；界面偏技术向，上手门槛极高，新手误操作有系统崩溃风险；无Mac/Linux版本；无清理、优化其他功能。' },
  { id: 13, name: 'Process Explorer', systems: 'Windows', url: 'https://learn.microsoft.com/zh-cn/sysinternals/downloads/process-explorer', stars: 4, recommendation: '微软官方出品专业级进程管理工具，彻底解决系统卡顿、资源占用高问题。', pros: '完全免费，微软官方出品，无广告无捆绑，系统级兼容；可查看系统所有进程的资源占用、文件句柄、DLL加载情况；彻底关闭流氓软件、无用进程的后台运行，释放系统资源，大幅提升系统流畅度；专业级工具，无任何功能限制，稳定性极强。', cons: '仅支持Windows系统；界面偏技术向，上手门槛高，新手误操作有系统崩溃风险；无Mac/Linux版本；无清理、优化其他功能。' },
  { id: 14, name: 'CleanMyMac X', systems: 'MacOS', url: 'https://macpaw.com/cleanmymac', stars: 4, recommendation: 'Mac平台标杆级系统清理优化工具，新手友好，苹果生态完美适配。', pros: '原生适配MacOS全系芯片，与苹果系统深度整合，无任何兼容问题；功能全面，覆盖垃圾清理、缓存清理、软件卸载、启动项管理、内存释放、病毒查杀、隐私保护；一键清理优化，操作零门槛，新手友好；界面极简高颜值，优化效果明显，资源占用极低。', cons: '仅支持Mac系统；无免费版，免费试用仅支持有限清理，核心功能需付费订阅，价格不低；无Windows/Linux版本；深度清理能力不及开源工具。' },
  { id: 15, name: 'OnyX', systems: 'MacOS', url: 'https://www.titanium-software.fr/en/onyx.html', stars: 4, recommendation: 'Mac平台原生免费深度系统优化工具，专业用户首选。', pros: '完全免费无广告无捆绑，原生适配MacOS全系芯片，与苹果系统深度整合；功能专业全面，覆盖系统缓存清理、权限修复、磁盘验证、系统维护、启动项管理；可深度优化Mac系统性能，解决系统卡顿、异常问题；无任何用户数据收集，隐私保护拉满。', cons: '仅支持Mac系统；界面偏技术向，上手门槛高，新手误操作有系统崩溃风险；无Windows/Linux版本；无软件卸载、垃圾一键清理功能，操作较繁琐。' },
  { id: 16, name: 'Stacer', systems: 'Linux', url: 'https://oguzhaninan.github.io/Stacer-Web/', stars: 4, recommendation: 'Linux平台开源免费全能型系统优化工具，图形化界面，新手友好。', pros: '完全开源免费无广告无捆绑，适配绝大多数Linux发行版；图形化界面设计，操作零门槛，解决Linux系统优化命令行繁琐的痛点；功能全面，覆盖系统监控、垃圾清理、软件卸载、启动项管理、资源释放、磁盘优化；资源占用极低，稳定性极强。', cons: '仅支持Linux系统；无Windows/Mac版本；高阶系统优化功能不及专业命令行工具；官方更新频率低。' },
  { id: 17, name: '腾讯电脑管家', systems: 'Windows、Mac', url: 'https://guanjia.qq.com/', stars: 3.5, recommendation: '腾讯旗下全能型系统管理工具，纯净无捆绑，国内用户适配性强。', pros: '免费版无广告无捆绑，功能全面，覆盖病毒查杀、垃圾清理、软件卸载、启动项管理、弹窗拦截、系统修复；与微信/QQ生态深度联动，账号安全、游戏加速功能完善；界面简洁，操作零门槛，新手友好；对国内流氓软件、钓鱼网站适配性强。', cons: '免费版有部分功能限制，高阶功能需开通会员；冗余功能较多，资源占用比轻量化工具高；Mac版功能严重精简；偶尔有资讯推送。' },
  { id: 18, name: '360安全卫士极速版', systems: 'Windows', url: 'https://weishi.360.cn/jisuban/', stars: 3.5, recommendation: '360旗下纯净版系统优化工具，无广告无捆绑，功能全面。', pros: '完全无广告无捆绑，纯净模式默认开启；功能全面，覆盖病毒查杀、垃圾清理、软件卸载、启动项管理、弹窗拦截、系统修复；对国内流氓软件、恶意程序拦截能力极强；一键优化，操作零门槛，新手友好；老旧系统、低配电脑适配完善。', cons: '仅支持Windows系统；免费版有部分功能限制，高阶功能需开通会员；无Mac/Linux版本；冗余功能较多，资源占用比轻量化工具高；偶尔有产品推广。' },
  { id: 19, name: 'Defraggler', systems: 'Windows', url: 'https://www.ccleaner.com/defraggler', stars: 3.5, recommendation: 'CCleaner同厂出品免费磁盘碎片整理工具，专业级磁盘优化。', pros: '免费版无广告无捆绑，操作零门槛；专业级磁盘碎片整理，支持全盘、单个文件夹、单个文件整理，大幅提升磁盘读写速度；支持SSD优化、磁盘健康检测、坏道扫描；与Windows系统深度整合，兼容性强，资源占用极低，可后台静默运行。', cons: '仅支持Windows系统；无Mac/Linux版本；无系统清理、优化其他功能；官方更新频率低；SSD优化功能不及原生系统工具。' },
  { id: 20, name: 'MacBooster', systems: 'MacOS', url: 'https://www.macbooster.com/', stars: 3.5, recommendation: 'Mac平台全能型系统优化工具，一站式覆盖清理、优化、防护。', pros: '原生适配MacOS全系芯片，功能全面，覆盖垃圾清理、软件卸载、启动项管理、内存释放、病毒查杀、隐私保护；一键清理优化，操作零门槛，新手友好；对Mac系统卡顿、存储空间不足问题优化效果明显；内置重复文件、大文件扫描功能，清理精准度高。', cons: '仅支持Mac系统；免费版有清理上限，核心功能需付费订阅，价格不低；无Windows/Linux版本；深度优化能力不及OnyX；资源占用偏高。' },
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

interface SystemCleanerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SystemCleaner({ isOpen, onClose }: SystemCleanerProps) {
  const [selectedTool, setSelectedTool] = useState<SystemCleanerTool | null>(null);

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
                <i className="fa-solid fa-broom text-2xl text-emerald-400"></i>
                <h3 className="text-white text-xl font-bold">系统清理与优化工具</h3>
                <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded-full">
                  共 {systemCleanerTools.length} 款工具
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
                {systemCleanerTools.map((tool, index) => (
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
                      selectedTool?.id === tool.id ? 'border-emerald-500/50' : 'border-white/10 group-hover:border-white/20'
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
                        className="block w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-center py-3 rounded-xl font-medium transition-all hover:scale-[1.02] mt-4"
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
