import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 定义输入法类型
interface InputMethodTool {
  id: number;
  name: string;
  systems: string;
  url: string;
  stars: number;
  recommendation: string;
  pros: string;
  cons: string;
}

// 输入法数据
const inputMethodTools: InputMethodTool[] = [
  { id: 1, name: '搜狗输入法', systems: 'Windows、Mac、Linux', url: 'https://pinyin.sogou.com/', stars: 4.5, recommendation: '国内用户量最高的国民级输入法，词库生态最完善的全场景拼音输入法标杆。', pros: '海量词库实时更新，网络热词、全行业专业词库全覆盖；支持全拼、双拼、五笔全输入模式；智能联想、模糊音纠错能力行业顶尖；皮肤、快捷短语、表情包功能丰富，办公、聊天全场景适配；跨设备云同步完善。', cons: '免费版有弹窗广告与资讯推送，冗余功能多，有一定系统资源占用；多数进阶功能需登录账号。' },
  { id: 2, name: '微信输入法', systems: 'Windows、Mac', url: 'https://z.weixin.qq.com/', stars: 4.5, recommendation: '微信官方出品的纯净轻量化输入法，主打极致隐私保护，深度适配腾讯生态，办公聊天双适配。', pros: '完全无广告、无捆绑、无资讯推送，界面极简纯净；深度适配微信 / QQ 生态，文件引用、表情包联动便捷；长句输入准确率高，模糊音纠错能力优秀；隐私保护拉满，无多余用户数据收集；资源占用极低，老旧设备友好。', cons: '专业领域词库覆盖不足，词库丰富度不及头部产品；自定义设置自由度低，皮肤、拓展功能极少；双拼、五笔等小众模式适配不完善。' },
  { id: 3, name: '微软拼音输入法', systems: 'Windows 全版本原生自带', url: 'https://www.microsoft.com/zh-cn/', stars: 4.5, recommendation: 'Windows 系统原生免费输入法，零安装、纯净无广告，系统级兼容，办公场景首选原生工具。', pros: '完全免费，系统原生无广告无捆绑，零安装成本；与 Windows 深度整合，兼容性拉满，无卡顿、兼容问题；支持全拼、双拼、五笔，长句输入准确率高；U 模式生僻字输入、办公符号适配极佳。', cons: '词库更新慢，网络热词、专业词库覆盖不足；自定义设置自由度低，无个性化拓展功能；跨设备云同步限制多。' },
  { id: 4, name: '百度输入法', systems: 'Windows、Mac、Linux', url: 'https://srf.baidu.com/', stars: 4.5, recommendation: '百度旗下 AI 赋能全能型输入法，主打高输入准确率，兼顾纯净度与全场景功能性。', pros: 'AI 加持长句、生僻词输入准确率极高；海量词库覆盖热词与全行业专业词库；支持全拼、双拼、五笔、手写、语音输入；无强制弹窗广告，纯净模式可选；语音输入识别率行业领先，跨设备云同步完善。', cons: '部分拓展功能需登录账号；冗余功能较多，资源占用高于原生输入法；偶尔有可关闭的资讯推送。' },
  { id: 5, name: '讯飞输入法', systems: 'Windows、Mac', url: 'https://srf.xunfei.cn/', stars: 4.5, recommendation: '科大讯飞旗下主打语音输入的输入法，语音识别能力全球领先，长文本录入、会议记录办公首选。', pros: '语音输入识别率超 98%，支持多语种、多方言、离线语音识别；长句、专业术语输入准确率高；支持全拼、双拼、五笔、手写输入；纯净无广告，资源占用低，跨设备同步功能完善。', cons: '纯文字输入的词库丰富度不及搜狗、百度；自定义设置自由度一般；高阶语音功能需登录，免费版有语音时长限制。' },
  { id: 6, name: '中州韵输入法引擎（Rime）', systems: 'Windows（小狼毫）、Mac（鼠须管）、Linux', url: 'https://rime.im/', stars: 4.5, recommendation: '开源免费、极致自定义的专业级输入法引擎，极客、双拼 / 五笔用户、隐私敏感用户首选。', pros: '完全开源免费，无广告、无联网、无任何用户数据收集，隐私保护拉满；支持全输入方案，全拼、双拼、五笔、仓颉、方言、古汉语全适配；100% 深度自定义，码表、词库、界面、快捷键均可自由修改；无冗余功能，资源占用极低，稳定性拉满。', cons: '上手门槛极高，新手需大量学习成本；原生无图形化设置界面，需手动修改配置文件；无云同步功能，无智能热词、联想等大众化功能。' },
  { id: 7, name: '手心输入法', systems: 'Windows、Mac', url: 'https://www.xinshuru.com/', stars: 4, recommendation: '国内口碑极佳的纯净无广告输入法，主打轻量化、无捆绑，专注输入本身，办公场景友好。', pros: '完全无广告、无弹窗、无资讯推送，界面极简纯净；安装包体积极小，系统资源占用极低；支持全拼、双拼、五笔，智能联想、纠错能力优秀；词库可自定义，支持跨设备云同步，无强制登录要求。', cons: '词库更新速度慢，网络热词覆盖不足；拓展功能极少，无个性化皮肤、表情包等功能；官方更新频率低，新系统适配有延迟。' },
  { id: 8, name: 'QQ 输入法', systems: 'Windows、Mac', url: 'https://qq.pinyin.cn/', stars: 4, recommendation: '腾讯旗下全能型输入法，深度适配 QQ 生态，兼顾纯净度与功能性，办公、聊天双适配。', pros: '界面纯净，无强制弹窗广告，可开启纯净模式；词库丰富，支持全拼、双拼、五笔全模式；深度适配 QQ 生态，账号同步、表情包联动便捷；智能联想、长句输入准确率高，资源占用低，老旧电脑适配好。', cons: '功能丰富度不及搜狗，专业词库覆盖不足；更新频率低，新功能上线慢；拓展功能、皮肤数量较少。' },
  { id: 9, name: '苹果简体拼音输入法', systems: 'MacOS 原生自带', url: 'https://www.apple.com.cn/', stars: 4, recommendation: 'Mac 系统原生免费输入法，零安装、纯净无广告，与苹果生态深度整合，Mac 用户办公首选原生工具。', pros: '完全免费，系统原生无广告无捆绑，零安装成本；与 MacOS、苹果全系设备深度整合，跨设备接力、通用剪贴板适配完美；长句输入、智能纠错能力优秀，支持模糊音、双拼、生僻字输入；隐私保护拉满，资源占用极低。', cons: '词库更新慢，网络热词、国内专业词库覆盖不足；自定义设置自由度极低，无拓展功能；仅适配苹果生态。' },
  { id: 10, name: '万能五笔输入法', systems: 'Windows', url: 'https://www.wnwb.com/', stars: 4, recommendation: '国内头部五笔专属输入法，兼顾拼音输入，主打五笔用户全场景适配，专业文字录入办公首选。', pros: '五笔词库完善，支持 86 版、98 版、新世纪版全码表；拼音、五笔无缝混合输入，无需切换模式；支持自定义码表、词库，联想纠错能力强；界面简洁，资源占用低，老旧电脑适配极佳。', cons: '免费版有弹窗广告与资讯推送；部分进阶功能需付费解锁；拼音输入能力远不及主流拼音输入法；Mac 版功能严重精简。' },
  { id: 11, name: '小狼毫输入法（Windows 版 Rime）', systems: 'Windows', url: 'https://rime.im/download/', stars: 4.5, recommendation: 'Rime 引擎 Windows 专属版本，开源免费、极致自定义，Windows 平台极客、专业输入用户首选。', pros: '完全开源免费，无广告、无联网、无数据收集，隐私保护拉满；支持全输入方案，全拼、双拼、五笔、仓颉、方言全适配；深度自定义，码表、词库、界面、快捷键均可修改；资源占用极低，稳定性极强，Windows 全版本适配。', cons: '上手门槛极高，需修改配置文件完成设置；无图形化设置界面，新手学习成本高；无原生云同步功能，无智能热词、联想功能。' },
  { id: 12, name: '鼠须管输入法（Mac 版 Rime）', systems: 'MacOS', url: 'https://rime.im/download/', stars: 4.5, recommendation: 'Rime 引擎 Mac 专属版本，开源免费、极致自定义，Mac 平台极客、隐私敏感用户首选。', pros: '完全开源免费，无广告、无联网、无数据收集，完美适配 MacOS 生态与苹果芯片；支持全输入方案，全拼、双拼、五笔、仓颉、方言全适配；深度自定义，与 Mac 系统快捷键完美兼容；资源占用极低，稳定性极强。', cons: '上手门槛极高，需修改配置文件；无图形化设置界面，新手学习成本高；无云同步功能，无智能热词、联想功能。' },
  { id: 13, name: '必应输入法', systems: 'Windows', url: 'https://www.microsoft.com/zh-cn/bing/ime', stars: 3.5, recommendation: '微软旗下免费输入法，依托必应搜索引擎，主打纯净无广告、英文输入优化，中英文混合办公场景友好。', pros: '完全无广告、无弹窗、无捆绑，界面极简纯净；英文输入、专业术语输入准确率极高，完美适配中英文混合办公；支持全拼、双拼，智能联想、纠错能力优秀；与微软账号联动，云同步稳定，资源占用极低。', cons: '官方已停止更新，新系统适配有风险；词库更新停滞，网络热词覆盖不足；无五笔输入模式，拓展功能极少。' },
  { id: 14, name: '谷歌拼音输入法', systems: 'Windows、Mac', url: 'https://tools.google.com/dlpage/pinyin', stars: 3.5, recommendation: '谷歌旗下开源免费输入法，主打纯净无广告、隐私保护，谷歌生态用户、中英文混合输入场景首选。', pros: '完全开源免费，无广告、无捆绑，界面极简；中英文混合输入准确率极高，英文联想、纠错能力顶尖；支持全拼、双拼，输入逻辑流畅；隐私保护拉满，无多余数据收集，资源占用极低。', cons: '官方已停止更新，国内无服务器，云同步功能无法使用；词库更新停滞，国内热词、专业词库覆盖不足；无五笔模式，自定义功能少。' },
  { id: 15, name: '极点五笔输入法', systems: 'Windows', url: 'https://www.freewb.org/', stars: 3.5, recommendation: '老牌纯净五笔输入法，主打无广告、轻量化，专注五笔输入本身，专业五笔录入用户首选。', pros: '完全无广告、无捆绑，界面极简纯净；支持全版本五笔码表，拼音、五笔混合输入；自定义自由度极高，码表、词库、快捷键均可修改；资源占用极低，稳定性极强，老旧系统适配完美。', cons: '官方已停止更新，新系统适配有延迟；无云同步功能，需手动备份词库；无拼音智能联想、热词更新功能；仅支持 Windows 系统。' },
  { id: 16, name: '华为输入法', systems: 'Windows（华为 / 荣耀笔记本专属）', url: 'https://consumer.huawei.com/cn/', stars: 3.5, recommendation: '华为官方出品输入法，与华为生态深度整合，多设备协同适配拉满，华为设备办公首选。', pros: '完全无广告、无捆绑，界面纯净；与华为电脑、手机、平板深度整合，多屏协同、跨设备输入、剪贴板共享适配完美；支持全拼、双拼、五笔，语音输入识别率高；长句输入准确率优秀，资源占用低。', cons: '仅适配华为 / 荣耀笔记本，其他设备无法使用；词库丰富度不及主流输入法；自定义设置自由度低，拓展功能少。' },
  { id: 17, name: '紫光拼音输入法', systems: 'Windows', url: 'https://www.unispim.com/', stars: 3, recommendation: '国内老牌经典拼音输入法，主打稳定、纯净，适合怀旧用户、基础办公场景。', pros: '界面简洁，无强制弹窗广告，可开启纯净模式；拼音输入逻辑流畅，智能联想、模糊音适配优秀；词库可自定义，支持双拼输入；资源占用低，稳定性强，老旧系统适配好。', cons: '更新频率极低，功能严重滞后；网络热词、专业词库覆盖不足；无跨设备云同步功能；拓展功能极少，无五笔模式。' },
  { id: 18, name: '拼音加加输入法', systems: 'Windows', url: 'https://www.pinyinjiajia.cn/', stars: 3, recommendation: '老牌轻量化拼音输入法，主打极简输入、高效盲打，适合追求输入效率的办公用户。', pros: '安装包体积极小，无广告、无捆绑，资源占用极低；输入逻辑极简，支持双拼、全拼，盲打效率极高；支持自定义短语、词库，生僻字输入便捷；稳定性极强，老旧电脑适配完美。', cons: '官方已停止更新，新系统适配有风险；无云同步功能，词库更新停滞；无智能联想、热词更新功能；仅支持 Windows 系统。' },
  { id: 19, name: '多多输入法', systems: 'Windows', url: 'https://www.duoduome.com/', stars: 3.5, recommendation: '高度自定义的输入法生成平台，支持全输入方案自定义，小众输入方案、方言、专业码表用户首选。', pros: '支持全输入方案自定义，拼音、五笔、仓颉、方言、专业码表均可生成；完全无广告、无捆绑，资源占用极低；自定义自由度拉满，从界面到码表均可深度定制；支持海量第三方码表导入，适配小众输入需求。', cons: '上手门槛极高，新手无法快速上手；无原生智能联想、热词更新功能；无云同步功能，仅支持 Windows 系统；官方更新频率低。' },
  { id: 20, name: '章鱼输入法', systems: 'Windows、Mac', url: 'https://www.zhangyu.com/', stars: 3, recommendation: '轻量化极简输入法，主打无广告、高颜值，适合年轻用户、基础办公聊天场景。', pros: '界面极简高颜值，无广告、无弹窗、无资讯推送；支持全拼、双拼，智能联想、纠错能力优秀；自带海量免费高颜值皮肤，自定义便捷；安装包体积小，资源占用低。', cons: '专业词库覆盖不足，长句输入准确率一般；无五笔输入模式；更新频率低，进阶功能少；云同步功能不完善。' },
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

interface InputMethodProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InputMethod({ isOpen, onClose }: InputMethodProps) {
  const [selectedTool, setSelectedTool] = useState<InputMethodTool | null>(null);

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
                <i className="fa-solid fa-keyboard text-2xl text-blue-400"></i>
                <h3 className="text-white text-xl font-bold">输入法</h3>
                <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded-full">
                  共 {inputMethodTools.length} 款输入法
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
                {inputMethodTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(index * 0.015, 0.5) }}
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
                    <i className="fa-solid fa-keyboard text-4xl mb-3"></i>
                    <p className="text-sm">点击左侧输入法查看详情</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 底部说明 */}
            <div className="px-6 py-2 border-t border-white/10 bg-black/30 text-center">
              <p className="text-white/40 text-xs">
                <i className="fa-solid fa-info-circle mr-1"></i>
                建议仅保留 1-2 款常用输入法，避免安装过多造成系统资源占用
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
