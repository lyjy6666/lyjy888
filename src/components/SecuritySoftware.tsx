import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 定义安全软件类型
interface SecurityTool {
  id: number;
  name: string;
  systems: string;
  url: string;
  stars: number; // 1-5
  recommendation: string;
  pros: string;
  cons: string;
}

// 安全软件数据
const securityTools: SecurityTool[] = [
  // 国内安全软件
  { id: 1, name: '火绒安全软件', systems: 'Windows', url: 'https://www.huorong.cn/', stars: 5, recommendation: '国内口碑标杆轻量化安全工具，无广告无捆绑，个人版永久免费，专注纯净底层防护。', pros: '系统资源占用极低，核心功能含病毒查杀、弹窗拦截、勒索防护、启动项管理；自定义规则强大，无冗余功能，静默防护无打扰，对流氓软件拦截能力拉满。', cons: '云查杀能力相对较弱，对新型未知威胁响应速度一般；无 Mac/Linux 版本。' },
  { id: 2, name: '360 安全卫士', systems: 'Windows', url: 'https://weishi.360.cn/', stars: 5, recommendation: '国内用户量最高的全能型安全与系统管理工具，一站式覆盖安全防护、系统优化、功能拓展。"你可以说360坏，但你不可以说他菜"', pros: '免费版功能全面，病毒查杀、木马拦截、系统修复、垃圾清理能力成熟；海量拓展工具，对国内恶意软件、钓鱼网站适配性极强，新手零门槛上手。', cons: '广告推送较多，需手动关闭；功能过于臃肿，对低配电脑不友好；安装包体积大。' },
  { id: 3, name: '360 杀毒', systems: 'Windows', url: 'https://sd.360.cn/', stars: 4.5, recommendation: '360 旗下专精型免费杀毒工具，专注病毒查杀，比安全卫士更轻量，无多余系统优化功能。', pros: '搭载多引擎杀毒体系，云查杀 + 启发式扫描，对勒索病毒、木马、蠕虫查杀率高；资源占用更低，支持离线查杀，可选纯净无广告模式。', cons: '功能相对单一，无系统优化功能；部分高级功能需配合360安全卫士使用。' },
  { id: 4, name: '腾讯电脑管家', systems: 'Windows、Mac', url: 'https://guanjia.qq.com/', stars: 4.5, recommendation: '腾讯旗下全能型安全工具，深度适配 Windows 生态，与腾讯账号体系无缝联动。', pros: '免费无捆绑，核心防护 + 系统优化双在线；深度整合 QQ / 微信账号安全、游戏加速、微信文件管理，对国内钓鱼网站、恶意软件拦截适配性强。', cons: '资源占用偏高，对低配电脑不友好；部分功能需登录QQ账号使用。' },
  { id: 5, name: '微软电脑管家', systems: 'Windows 10/11', url: 'https://pcmanager.microsoft.com/zh-cn', stars: 4.5, recommendation: '微软官方出品的原生免费安全管理工具，完美适配 Windows 系统，纯净无广告无捆绑。', pros: '系统原生级兼容，零学习成本；覆盖系统体检、病毒查杀、垃圾清理、启动项管理，与 Windows Defender 深度联动，无任何冗余推送。', cons: '仅支持 Windows 10/11；功能相对基础，无高级自定义规则；对国产流氓软件拦截能力一般。' },
  { id: 6, name: '联想电脑管家', systems: 'Windows', url: 'https://guanjia.lenovo.com.cn/', stars: 4, recommendation: '联想官方安全管理工具，主打硬件专属适配 + 纯净防护，完全无广告无捆绑。', pros: '资源占用低，核心安全防护 + 驱动管理、硬件检测、电池保护一体化；联想设备支持原厂驱动一键更新、故障报修，通用设备可正常使用全部核心安全功能。', cons: '非联想设备部分专属功能不可用；功能更新频率较慢；对新型威胁响应一般。' },
  { id: 7, name: '华为电脑管家', systems: 'Windows', url: 'https://consumer.huawei.com/cn/support/pc-manager/', stars: 3.5, recommendation: '华为官方安全与设备管理工具，深度适配华为生态，兼顾安全防护与多设备协同。', pros: '纯净无广告，内置系统安全防护、病毒查杀、系统漏洞修复；深度整合多屏协同、文件互传、电池管理，对华为笔记本 / 台式机做专属底层优化。', cons: '仅适配华为/荣耀设备，其他品牌电脑兼容性差；功能相对基础。' },
  { id: 8, name: '金山毒霸', systems: 'Windows', url: 'https://www.duba.net/', stars: 3, recommendation: '国内老牌经典杀毒软件，深耕安全领域二十余年，兼顾全面防护与系统优化。', pros: '搭载自研蓝芯杀毒引擎，对国产恶意软件、勒索病毒、钓鱼网站查杀拦截能力强；内置垃圾清理、软件管家、弹窗拦截、文档保护功能，老旧系统兼容性好。', cons: '免费版广告较多，有捆绑安装现象；云查杀能力相对较弱；口碑一般。' },
  { id: 9, name: '瑞星杀毒软件', systems: 'Windows', url: 'https://www.rising.com.cn/', stars: 3, recommendation: '国内老牌国家级安全厂商出品，经典终端防护工具，稳定可靠，适配国内网络环境。', pros: '搭载自研虚拟化引擎，对木马、病毒、勒索软件、钓鱼网站查杀能力突出；内置防火墙、系统加固、邮件防护、家长控制，支持离线查杀与智能云防护。', cons: '界面老旧，用户体验一般；资源占用偏高；免费版功能有限制。' },
  { id: 10, name: '智量终端安全', systems: 'Windows', url: 'https://www.wisevector.com/', stars: 4.5, recommendation: '国内自研轻量化专业杀毒软件，个人版免费，主打高查杀率、低占用、强主动防御。', pros: '纯自研杀毒引擎，无广告无捆绑，系统资源占用极低；主打智能启发式查杀、云联动防护，对新型勒索病毒、木马、恶意脚本拦截能力极强，规则自定义灵活。', cons: '知名度较低，用户社区小；无 Mac/Linux 版本；界面相对简单。' },
  { id: 11, name: '安天智甲终端防御系统（个人版）', systems: 'Windows、Mac、Linux', url: 'https://www.antiy.com/product/zhijia.html', stars: 4.5, recommendation: '国家级网络安全厂商安天出品，专业级终端防护软件，个人版免费使用。', pros: '搭载自研 AVL 杀毒引擎，多次在国际杀毒评测中斩获佳绩，病毒查杀率极高；跨平台适配，内置系统加固、行为防护、网络防火墙，对 APT 攻击、新型恶意软件预警拦截能力强。', cons: '界面偏技术向，新手有上手门槛；个人版功能相对企业版有所精简。' },
  { id: 12, name: '江民杀毒软件', systems: 'Windows', url: 'http://www.jiangmin.com/', stars: 2.5, recommendation: '国内最早自研杀毒引擎的老牌安全软件，主打稳定可靠的基础防护，适配老旧系统。', pros: '自主研发杀毒引擎，对国产恶意软件、传统病毒、木马查杀能力强；内置实时防护、防火墙、系统修复、邮件防护功能，界面简洁，操作简单，兼容性极佳。', cons: '软件更新缓慢，对新型威胁响应慢；界面老旧，用户体验差；功能相对单一。' },
  { id: 13, name: '微点主动防御软件', systems: 'Windows', url: 'http://www.micropoint.com.cn/', stars: 3, recommendation: '国内首创行为分析主动防御的安全软件，主打未知威胁拦截，而非单纯特征码查杀。', pros: '核心优势是行为分析主动防御，无需频繁更新病毒库，即可拦截新型未知病毒、木马、勒索软件；内置防火墙、系统加固功能，对零日漏洞攻击、新型恶意软件拦截能力极强。', cons: '界面老旧，用户体验一般；病毒库更新慢；知名度低，社区小。' },
  { id: 14, name: '2345 安全卫士', systems: 'Windows', url: 'https://safe.2345.cc/', stars: 2.5, recommendation: '国产轻量级全能型安全工具，主打简单易用，兼顾安全防护与系统优化。', pros: '界面简洁，一键体检、病毒查杀、垃圾清理、弹窗拦截功能齐全；资源占用低，对老旧电脑友好，新手零门槛操作，支持离线查杀。', cons: '有捆绑安装现象，广告较多；口碑一般；对新型威胁拦截能力较弱。' },
  { id: 15, name: '野葱安全', systems: 'Windows', url: 'https://anquan.yecong.com/', stars: 3.5, recommendation: '国产新兴轻量化安全工具，主打纯净无广告、极简操作，适配新手用户。', pros: '完全无广告无捆绑，安装包体积极小；核心功能含病毒查杀、弹窗拦截、垃圾清理、启动项管理，资源占用低，无冗余功能，一键操作零学习成本。', cons: '功能相对基础，无高级自定义规则；知名度低；对新型威胁响应一般。' },
  // 国际知名安全软件
  { id: 16, name: 'Microsoft Defender（微软卫士）', systems: 'Windows 10/11 系统原生自带', url: 'https://www.microsoft.com/zh-cn/windows/comprehensive-security', stars: 5, recommendation: '微软官方系统原生免费杀毒软件，Windows 用户默认安全首选，深度整合系统底层。', pros: '完全免费，原生无广告无捆绑；资源占用极低，系统兼容性拉满；国际权威杀毒评测常年稳居第一梯队，查杀率比肩付费专业软件，覆盖病毒查杀、防火墙、勒索软件防护、家长控制全功能。', cons: '仅支持 Windows 10/11；对国产流氓软件拦截能力一般；无深度自定义规则。' },
  { id: 17, name: '卡巴斯基安全软件（Kaspersky）', systems: 'Windows、Mac、Linux', url: 'https://www.kaspersky.com.cn/', stars: 5, recommendation: '全球顶级旗舰安全软件，主打极致查杀率与全方位网络防护，付费安全软件标杆。', pros: '自研顶级杀毒引擎，国际权威评测常年位居榜首，对病毒、木马、勒索软件、零日攻击、APT 攻击查杀拦截能力拉满；内置防火墙、隐私保护、安全支付、家长控制、VPN 功能，资源占用优化优秀。', cons: '付费软件价格较高；免费版功能极其有限；在部分国家存在信任争议。' },
  { id: 18, name: '比特梵德（Bitdefender）', systems: 'Windows、Mac', url: 'https://www.bitdefender.com/', stars: 5, recommendation: '罗马尼亚老牌顶级杀毒软件，常年位居国际杀毒评测榜首，主打全方位终端安全防护。', pros: '自研杀毒引擎查杀率全球领先，对新型恶意软件、勒索病毒、钓鱼网站拦截能力极强；资源占用极低，静默防护无打扰；免费版基础防护完善，付费版覆盖防火墙、系统优化、隐私保护、家长控制全维度。', cons: '免费版功能相对基础；付费版价格较高；对国产流氓软件适配性一般。' },
  { id: 19, name: 'ESET NOD32 防病毒软件', systems: 'Windows、Mac、Linux', url: 'https://www.eset.com/cn/', stars: 4.5, recommendation: '欧洲老牌顶级安全软件，主打轻量、极速、低占用、高查杀率，老旧设备友好。', pros: '自研 ThreatSense 引擎，查杀速度快，系统资源占用极低，老旧电脑也能流畅运行；误报率极低，对病毒、木马、勒索软件、恶意脚本查杀能力强，静默运行无打扰，稳定性极强。', cons: '付费软件，免费试用版有时限；界面相对传统；对国产流氓软件适配性一般。' },
  { id: 20, name: 'Malwarebytes Anti-Malware', systems: 'Windows、Mac', url: 'https://www.malwarebytes.com/', stars: 4.5, recommendation: '全球知名专精型反恶意软件工具，主流杀毒软件的黄金搭档，主打顽固威胁查杀。', pros: '对传统杀毒软件容易忽略的广告软件、捆绑软件、挖矿程序、新型勒索软件查杀能力极强；界面简洁，扫描速度快，资源占用低，可完美搭配其他杀毒软件使用，无冲突，免费版支持手动扫描查杀。', cons: '免费版无实时防护功能；付费版价格较高；不适合作为主防护软件。' },
  { id: 21, name: '诺顿 360（Norton 360）', systems: 'Windows、Mac', url: 'https://us.norton.com/', stars: 4.5, recommendation: '赛门铁克旗下全球顶级旗舰安全软件，老牌安全厂商，主打个人数字生活全场景防护。', pros: '自研顶级杀毒引擎，查杀率稳居国际第一梯队；内置防火墙、VPN、密码管理器、身份盗窃保护、云备份、家长控制功能，家庭用户友好，防护维度全面，稳定性拉满。', cons: '付费软件价格较高；资源占用偏高，对低配电脑不友好；订阅制模式。' },
  { id: 22, name: '迈克菲（McAfee）', systems: 'Windows、Mac', url: 'https://www.mcafee.com/zh-cn/index.html', stars: 3.5, recommendation: '英特尔旗下全球知名安全软件，全球设备预装覆盖率极高，主打多设备跨平台防护。', pros: '自研杀毒引擎，对病毒、木马、钓鱼网站、网络攻击查杀拦截能力强；内置防火墙、实时防护、隐私保护、身份安全、家长控制功能，支持多设备统一管理，界面友好，新手易上手。', cons: '资源占用偏高，对低配电脑不友好；预装软件难以卸载干净；订阅制价格较高。' },
  { id: 23, name: 'Avast 免费杀毒软件', systems: 'Windows、Mac', url: 'https://www.avast.com/zh-cn/index', stars: 4, recommendation: '全球用户量超 4 亿的知名免费杀毒软件，基础防护完善，新手友好度高。', pros: '免费版功能全面，覆盖实时病毒查杀、木马拦截、网页防护、邮件防护、WiFi 安全检测；AI 赋能杀毒引擎，查杀率高，对新型恶意软件响应速度快，内置免费密码管理器，付费版可解锁进阶防护功能。', cons: '免费版有广告推送；隐私争议历史；高级功能需付费。' },
  { id: 24, name: 'Avira 小红伞', systems: 'Windows、Mac', url: 'https://www.avira.com/zh-cn', stars: 4.5, recommendation: '德国老牌知名免费杀毒软件，以严谨的查杀能力和极低的误报率著称，主打纯净高效。', pros: '自研杀毒引擎，查杀率高，误报率极低，对勒索软件、木马、恶意软件拦截能力强；免费版提供基础实时防护、病毒查杀、网页防护，无广告无捆绑，德国技术严谨可靠。', cons: '免费版功能相对基础；界面广告推广付费版；无防火墙功能。' },
  { id: 25, name: 'AVG 杀毒软件', systems: 'Windows、Mac', url: 'https://www.avg.com/zh-cn', stars: 4, recommendation: 'Avast 旗下知名免费杀毒软件，主打轻量、高效的基础防护，全球用户量极大。', pros: '免费版提供完善的实时病毒查杀、木马拦截、网页防护、邮件防护、WiFi 安全检测；与 Avast 共享顶级杀毒引擎，查杀率稳居国际前列，扫描速度快，资源占用低，界面简洁，新手零门槛。', cons: '免费版有广告推送；高级功能需付费；与 Avast 功能重复。' },
  { id: 26, name: '科摩多（Comodo）互联网安全套装', systems: 'Windows', url: 'https://www.comodo.com/', stars: 4, recommendation: '美国知名安全厂商出品，主打顶级防火墙与主动防御功能，免费版无功能限制。', pros: '免费版提供顶级防火墙、自动沙箱、主动防御、病毒查杀全功能；默认拒绝模式，可拦截所有未知程序运行，从根源杜绝恶意软件入侵；支持深度自定义规则，对零日攻击、新型恶意软件拦截能力极强。', cons: '界面复杂，新手有较高上手门槛；仅支持 Windows；弹窗提示较多。' },
  { id: 27, name: '趋势科技（Trend Micro）安全软件', systems: 'Windows、Mac', url: 'https://www.trendmicro.com/zh_cn/', stars: 4, recommendation: '全球知名网络安全厂商，亚太地区市场占有率极高，主打云端智能防护与反钓鱼。', pros: '自研云端智能杀毒引擎，对钓鱼网站、新型勒索软件、网络诈骗拦截能力全球领先；内置防火墙、实时防护、隐私保护、家长控制、安全支付功能，资源占用低，对国内网络环境适配性好。', cons: '付费软件，免费试用版有时限；资源占用中等；对国产流氓软件适配性一般。' },
  { id: 28, name: 'Sophos Home', systems: 'Windows、Mac', url: 'https://home.sophos.com/', stars: 4, recommendation: '全球知名企业级安全厂商推出的个人版安全软件，主打企业级防护能力下放。', pros: '免费版提供企业级的病毒查杀、实时防护、网页防护、恶意软件拦截、家长控制功能；支持远程管理多台设备，家庭用户友好；对勒索软件、恶意网站、挖矿程序拦截能力强，无广告无捆绑。', cons: '免费版功能相对基础；界面偏技术向；高级功能需付费。' },
  { id: 29, name: 'F-Secure 安全软件', systems: 'Windows、Mac', url: 'https://www.f-secure.com/zh_CN/', stars: 4, recommendation: '芬兰老牌顶级安全厂商，欧洲皇室御用安全品牌，主打极致的隐私保护与稳定防护。', pros: '自研杀毒引擎，查杀率稳居国际前列，对病毒、勒索软件、网络攻击防护能力强；极其注重用户隐私，无多余用户数据收集；内置防火墙、VPN、家长控制功能，静默运行无打扰，稳定性极强。', cons: '付费软件，价格较高；免费试用版有时限；对国产流氓软件适配性一般。' },
  { id: 30, name: '熊猫安全（Panda Security）', systems: 'Windows、Mac', url: 'https://www.pandasecurity.com/zh-cn/', stars: 3.5, recommendation: '西班牙知名安全厂商，全球最早推出云杀毒技术的厂商之一，主打轻量云端防护。', pros: '云端杀毒引擎，无需本地更新大量病毒库，资源占用极低，老旧电脑也能流畅运行；免费版提供基础病毒查杀、实时防护、网页防护功能，界面简洁，新手友好，对挖矿程序、木马查杀能力突出。', cons: '免费版功能有限，有广告；云端依赖网络；对新型威胁响应一般。' },
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

interface SecuritySoftwareProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SecuritySoftware({ isOpen, onClose }: SecuritySoftwareProps) {
  const [selectedTool, setSelectedTool] = useState<SecurityTool | null>(null);

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
                <i className="fa-solid fa-shield-halved text-2xl text-green-400"></i>
                <h3 className="text-white text-xl font-bold">安全软件</h3>
                <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded-full">
                  共 {securityTools.length} 款软件
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

            {/* 顶部提示 */}
            <div className="px-6 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-b border-amber-500/30">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-triangle-exclamation text-amber-400"></i>
                <p className="text-amber-200 text-sm">
                  <span className="font-semibold">重要提示：</span>所有软件均提供官方正版链接，请勿从第三方网站、下载站下载，避免捆绑恶意软件。
                </p>
              </div>
            </div>

            {/* 主内容区 */}
            <div className="flex flex-1 min-h-0">
              {/* 左侧工具列表 */}
              <div 
                className="flex-1 overflow-y-auto p-4 space-y-2 tier-chart-scrollbar"
              >
                {securityTools.map((tool, index) => (
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
                      selectedTool?.id === tool.id ? 'border-green-500/50' : 'border-white/10 group-hover:border-white/20'
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
                        className="block w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-center py-3 rounded-xl font-medium transition-all hover:scale-[1.02] mt-4"
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
                    <i className="fa-solid fa-shield-halved text-4xl mb-3"></i>
                    <p className="text-sm">点击左侧软件查看详情</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 底部说明 */}
            <div className="px-6 py-2 border-t border-white/10 bg-black/30 text-center">
              <p className="text-white/40 text-xs">
                <i className="fa-solid fa-info-circle mr-1"></i>
                同一台电脑建议仅保留 1 款常驻后台的主防护软件，避免多款安全软件同时开启实时防护造成系统冲突
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
