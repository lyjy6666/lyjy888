import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 定义办公软件类型
interface OfficeTool {
  id: number;
  name: string;
  systems: string;
  url: string;
  stars: number;
  recommendation: string;
  pros: string;
  cons: string;
  category: string;
}

// 分类定义
const categories = [
  { id: 'office', name: '基础办公套件', icon: 'fa-file-word', color: 'blue', count: 5 },
  { id: 'pdf', name: 'PDF工具', icon: 'fa-file-pdf', color: 'red', count: 8 },
  { id: 'notes', name: '笔记与知识管理', icon: 'fa-sticky-note', color: 'yellow', count: 7 },
  { id: 'mindmap', name: '思维导图与流程图', icon: 'fa-sitemap', color: 'purple', count: 6 },
  { id: 'collab', name: '协同办公与项目管理', icon: 'fa-users', color: 'green', count: 6 },
  { id: 'efficiency', name: '效率辅助工具', icon: 'fa-rocket', color: 'orange', count: 10 },
  { id: 'data', name: '数据处理与分析', icon: 'fa-chart-bar', color: 'cyan', count: 4 },
  { id: 'design', name: '设计与原型工具', icon: 'fa-palette', color: 'pink', count: 4 },
];

// 办公软件数据
const officeTools: OfficeTool[] = [
  // 基础办公套件
  { id: 1, name: 'Microsoft Office', systems: 'Windows、Mac', url: 'https://www.microsoft.com/zh-cn/microsoft-365/office', stars: 5, category: 'office', recommendation: '全球办公软件行业标杆，文档、表格、演示全场景旗舰工具，职场办公通用标准。', pros: '功能全面且专业，Word/Excel/PowerPoint/Outlook 覆盖全办公场景；格式兼容性拉满，是行业通用标准，无格式错乱问题；功能深度极强，Excel 函数、PPT 动画、Word 排版能力无出其右；跨设备协同、云同步完善。', cons: '买断制 / 订阅制价格昂贵；对电脑配置有一定要求，老旧设备运行卡顿；部分高阶功能学习门槛高；免费版仅网页版可用，功能严重受限。' },
  { id: 2, name: 'WPS Office', systems: 'Windows、Mac、Linux', url: 'https://www.wps.cn/', stars: 4.5, category: 'office', recommendation: '国产全能型办公套件，完美兼容 Office 格式，免费功能完善，国内职场、教育场景首选。', pros: '个人免费版功能完善，完美兼容 Office 全格式，无格式错乱问题；安装包体积小，对低配电脑友好；内置海量模板、PDF 工具、思维导图、流程图功能，一站式覆盖全办公场景；云文档、跨设备协同适配国内用户习惯。', cons: '免费版有弹窗广告、资讯推送；部分高阶功能需开通会员；超大文件处理能力不及 Office；部分复杂函数、宏命令兼容性有瑕疵。' },
  { id: 3, name: '金山文档', systems: 'Windows、Mac、网页版', url: 'https://www.kdocs.cn/', stars: 4.5, category: 'office', recommendation: '国产云端协同办公套件，主打多人实时协作，零安装、全平台适配，团队办公首选。', pros: '完全免费基础功能，网页版即开即用，零安装成本；支持多人实时协同编辑文档、表格、演示文稿，修改痕迹实时同步；完美兼容 Office 格式，内置海量模板；云存储自动保存，不怕文件丢失；跨平台全设备适配。', cons: '高阶功能需开通会员；离线编辑能力弱，极度依赖网络；超大文件、复杂函数处理能力不足；复杂排版格式兼容性有瑕疵。' },
  { id: 4, name: '腾讯文档', systems: 'Windows、Mac、网页版', url: 'https://docs.qq.com/', stars: 4.5, category: 'office', recommendation: '腾讯旗下云端协同办公套件，深度适配微信 / QQ 生态，主打轻量化多人协作，国内团队办公首选。', pros: '完全免费基础功能，网页版即开即用，零安装成本；深度适配微信 / QQ 生态，一键分享、权限设置便捷；支持多人实时协同编辑，修改痕迹实时留存；完美兼容 Office 格式，内置海量模板；跨设备同步便捷，稳定性强。', cons: '高阶功能需开通会员；离线编辑能力弱；复杂表格、专业排版功能不及桌面端 Office；超大文件处理能力有限。' },
  { id: 5, name: 'LibreOffice', systems: 'Windows、Mac、Linux', url: 'https://zh-cn.libreoffice.org/', stars: 4.5, category: 'office', recommendation: '开源免费办公套件，完全无功能限制，个人办公、Linux 用户首选。', pros: '完全开源免费，无广告无水印，无任何功能限制；覆盖文档、表格、演示、绘图、PDF 全基础功能；跨全平台适配，Linux 系统完美兼容；无任何付费诱导，离线使用无限制。', cons: '界面偏老旧，上手有一定门槛；复杂文档编辑、格式转换准确率一般；宏命令、高级函数兼容性不及 Office；批量处理功能不完善。' },
  // PDF工具
  { id: 6, name: 'Adobe Acrobat Pro DC', systems: 'Windows、Mac', url: 'https://www.adobe.com/cn/acrobat.html', stars: 5, category: 'pdf', recommendation: 'PDF 行业标准制定者，专业级 PDF 全流程旗舰工具，企业级 PDF 处理首选。', pros: 'PDF 格式兼容性拉满，无任何格式错乱问题；功能全面，覆盖 PDF 编辑、转换、合并、拆分、签名、OCR 识别、加密全流程；OCR 识别准确率行业顶尖，支持多语种；企业级安全加密、批量处理能力极强。', cons: '订阅制价格昂贵；安装包体积大，对电脑配置要求高；基础功能操作繁琐，新手学习门槛高；个人用户多数功能用不上，性价比低。' },
  { id: 7, name: '万兴 PDF（PDFelement）', systems: 'Windows、Mac', url: 'https://pdf.wondershare.cn/', stars: 4.5, category: 'pdf', recommendation: '国产全能型 PDF 工具，平替 Acrobat 的高性价比之选，个人与中小企业办公首选。', pros: '功能全面，覆盖 PDF 编辑、转换、合并、拆分、OCR 识别、签名、加密全流程；界面友好，新手零门槛上手；完美兼容 PDF 全格式，格式转换准确率极高；OCR 识别支持多语种，准确率比肩 Acrobat；买断制 / 订阅制价格亲民。', cons: '免费版有水印 + 功能限制；超大文件批量处理速度较慢；部分高阶企业功能不及 Acrobat；Mac 版功能比 Windows 版有精简。' },
  { id: 8, name: '福昕阅读器（Foxit PDF）', systems: 'Windows、Mac', url: 'https://www.foxit.com/zh-cn/pdf-reader.html', stars: 4.5, category: 'pdf', recommendation: '全球知名轻量化 PDF 工具，主打极速打开、低资源占用，PDF 阅读与基础处理首选。', pros: '安装包体积极小，PDF 文件打开速度极快，系统资源占用极低；免费版覆盖 PDF 阅读、标注、注释、签名基础功能；界面极简，操作零门槛；完美兼容 PDF 全格式，稳定性极强；企业级安全防护完善。', cons: '编辑、转换、OCR 等进阶功能需付费开通；订阅制价格不低；批量处理能力较弱；部分高阶功能学习门槛高。' },
  { id: 9, name: '嗨格式 PDF 转换器', systems: 'Windows、Mac', url: 'https://www.pdf.cn/', stars: 4, category: 'pdf', recommendation: '国产专精型 PDF 转换工具，主打高准确率格式转换，新手友好，办公文档转换首选。', pros: '格式转换能力极强，支持 PDF 与 Word/Excel/PPT/ 图片等 100 + 格式互转，转换准确率高，格式错乱少；界面极简，一键操作，新手零门槛；支持批量转换、OCR 识别、压缩、合并功能；对国内办公格式适配性极强。', cons: '免费版有页数限制 + 水印；核心进阶功能需开通会员；PDF 深度编辑能力较弱；非转换场景功能单一。' },
  { id: 10, name: '迅捷 PDF 转换器', systems: 'Windows、Mac', url: 'https://www.xunjiepdf.com/', stars: 4, category: 'pdf', recommendation: '国产全能型 PDF 工具，主打全功能覆盖，新手友好，一站式 PDF 办公首选。', pros: '功能全面，覆盖 PDF 转换、编辑、合并、拆分、压缩、OCR 识别、签名全流程；界面友好，一键操作，零学习成本；支持批量处理，转换准确率高，格式兼容性好；内置 PDF 阅读、标注功能，一站式满足办公需求。', cons: '免费版有功能限制 + 水印；核心功能需开通会员，订阅制价格不低；超大文件处理速度较慢；OCR 识别准确率不及头部专业工具。' },
  { id: 11, name: 'SmallPDF', systems: 'Windows、Mac、网页版', url: 'https://smallpdf.com/cn', stars: 3.5, category: 'pdf', recommendation: '全球知名轻量化在线 PDF 工具，主打即开即用，全平台适配，临时 PDF 处理首选。', pros: '网页版即开即用，零安装成本，全平台适配；界面极简，一键操作，新手零门槛；支持 PDF 转换、压缩、合并、拆分、编辑、签名全基础功能；免费版可满足日常轻量需求；文件处理速度快，格式兼容性好。', cons: '免费版有单日处理次数、文件大小限制；核心进阶功能需付费订阅；极度依赖网络，无网络无法使用；批量处理、OCR 识别能力较弱。' },
  { id: 12, name: 'iLovePDF', systems: 'Windows、Mac、网页版', url: 'https://www.ilovepdf.com/zh_cn', stars: 3.5, category: 'pdf', recommendation: '全球知名免费在线 PDF 工具，主打全功能免费覆盖，轻量 PDF 处理首选。', pros: '网页版即开即用，零安装成本；免费版覆盖绝大多数 PDF 基础功能，无强制付费诱导；支持 PDF 转换、合并、拆分、压缩、编辑、签名、OCR 识别；界面极简，操作零门槛；文件处理速度快，全平台适配。', cons: '免费版有文件大小、处理次数限制；进阶批量功能需付费订阅；极度依赖网络；OCR 识别准确率、复杂格式转换能力不及专业桌面工具。' },
  { id: 13, name: '金山 PDF', systems: 'Windows、Mac', url: 'https://www.wps.cn/pdf/', stars: 4, category: 'pdf', recommendation: 'WPS 旗下专精 PDF 工具，深度适配 WPS 生态，国产办公用户首选。', pros: '与 WPS Office 深度整合，无缝联动；免费版覆盖 PDF 阅读、标注、基础编辑功能；完美兼容 WPS 与 Office 格式，无格式错乱；界面友好，操作零门槛；批量转换、合并拆分功能完善，国内办公场景适配极佳。', cons: '高阶编辑、OCR、批量处理功能需开通 WPS 会员；免费版有广告推送；超大文件处理能力一般；独立版功能不及全能型 PDF 工具。' },
  // 笔记与知识管理
  { id: 14, name: '印象笔记', systems: 'Windows、Mac、网页版', url: 'https://www.yinxiang.com/', stars: 4.5, category: 'notes', recommendation: '全球知名老牌笔记软件，国内用户量最高的全场景笔记与知识管理工具，职场办公首选。', pros: '全平台跨设备同步，Windows、Mac、手机、平板全覆盖；功能全面，支持图文笔记、markdown、文档扫描、OCR 识别、网页剪藏；多级文件夹、标签体系完善，知识管理能力强；团队协同、共享笔记本功能完善；稳定性极强，数据安全有保障。', cons: '免费版有设备数量、上传流量限制；核心进阶功能需开通会员，订阅制价格不低；软件体积越来越大，启动速度变慢；markdown 支持不完善。' },
  { id: 15, name: '有道云笔记', systems: 'Windows、Mac、网页版', url: 'https://note.youdao.com/', stars: 4.5, category: 'notes', recommendation: '网易旗下国民级笔记软件，主打轻量化、高性价比，国内个人与职场用户首选。', pros: '免费版功能完善，无设备数量限制；全平台跨设备同步，稳定性强；支持图文笔记、markdown、文档扫描、OCR 识别、网页剪藏；与网易邮箱、有道词典深度联动；界面友好，新手零门槛上手；会员价格亲民。', cons: '免费版有上传流量限制；高阶 OCR、协同功能需开通会员；知识管理、标签体系不及印象笔记完善；超大附件、长笔记处理偶发卡顿。' },
  { id: 16, name: 'Notion', systems: 'Windows、Mac、网页版', url: 'https://www.notion.so/', stars: 4.5, category: 'notes', recommendation: '全球顶级全能型笔记与知识库工具，主打极致自定义，个人与团队一站式知识管理、项目管理首选。', pros: '100% 自定义，支持笔记、数据库、看板、日历、思维导图、知识库全功能；块编辑模式灵活度拉满，可搭建个人知识库、团队项目管理系统、企业官网等全场景；多人协同能力极强，权限管理精细；全平台跨设备同步，生态插件丰富。', cons: '国内无官方服务器，同步速度慢，偶尔无法访问；上手门槛极高，新手需要大量学习成本；免费版有存储空间、协作者数量限制；全中文适配不完善，部分功能无汉化。' },
  { id: 17, name: '语雀', systems: 'Windows、Mac、网页版', url: 'https://www.yuque.com/', stars: 4.5, category: 'notes', recommendation: '蚂蚁集团旗下企业级知识库与笔记工具，主打文档协作与知识沉淀，国内团队与个人用户首选。', pros: '国内服务器，同步速度快，稳定性极强；功能全面，支持图文笔记、markdown、思维导图、数据表、知识库；多人协同编辑能力顶尖，修改痕迹实时留存；权限管理精细，企业级安全防护完善；与支付宝、钉钉生态深度联动。', cons: '免费版有存储空间、协作者数量限制；高阶企业功能需付费开通；离线编辑能力较弱；客户端功能不如网页版完善。' },
  { id: 18, name: 'Obsidian', systems: 'Windows、Mac、Linux', url: 'https://obsidian.md/', stars: 4.5, category: 'notes', recommendation: '本地优先的双链笔记软件，主打极致隐私保护与知识网络构建，深度知识管理用户首选。', pros: '本地文件存储，完全离线可用，隐私保护拉满，无任何数据泄露风险；双链功能顶尖，可构建个人知识网络，关联笔记便捷；插件生态极其丰富，可自定义拓展全功能；完全免费基础功能，无广告无捆绑；markdown 支持完美。', cons: '上手门槛极高，新手需要大量学习成本；原生无云同步功能，同步需手动配置或付费开通；界面偏技术向，新手友好度低；多人协同功能不完善。' },
  { id: 19, name: '飞书妙计', systems: 'Windows、Mac、网页版', url: 'https://www.feishu.cn/product/妙计', stars: 4, category: 'notes', recommendation: '飞书旗下音视频转写笔记工具，主打会议记录、音视频转文字，职场办公会议首选。', pros: '音视频转文字准确率极高，支持多语种、多方言识别；支持录音、视频导入，自动生成字幕、笔记，可一键导出 Word；与飞书文档、会议深度整合，多人协同便捷；免费版可满足基础转写需求；时间轴与文稿联动，编辑便捷。', cons: '免费版有转写时长限制；高阶转写、导出功能需开通飞书会员；纯文字笔记、知识管理功能不及专业笔记软件；非飞书生态用户使用性价比低。' },
  { id: 20, name: '为知笔记', systems: 'Windows、Mac、Linux', url: 'https://www.wiz.cn/', stars: 4, category: 'notes', recommendation: '国产老牌全平台笔记软件，主打轻量化、全平台适配，Linux 用户、个人知识管理首选。', pros: '全平台完美适配，Linux 系统支持完善；免费版功能全面，无设备数量限制；支持图文笔记、markdown、网页剪藏、文档扫描、OCR 识别；多级目录、标签体系完善，知识管理能力强；团队协同、共享功能完善，会员价格亲民。', cons: '界面设计偏老旧，更新频率低；高阶 OCR、云存储空间需开通会员；生态插件、拓展能力不及头部工具；品牌知名度低，用户基数小。' },
  // 思维导图与流程图
  { id: 21, name: 'XMind', systems: 'Windows、Mac、Linux', url: 'https://www.xmind.cn/', stars: 5, category: 'mindmap', recommendation: '全球知名思维导图软件标杆，国内用户量最高，全场景适配，职场、教育场景首选。', pros: '界面极简美观，操作零门槛，新手友好；功能全面，支持思维导图、鱼骨图、组织结构图、甘特图、流程图；模板库海量，覆盖全行业场景；导出格式丰富，完美兼容 Office、PDF；稳定性极强，全平台跨设备同步完善。', cons: '免费版有水印、导出格式限制；核心进阶功能需开通会员，订阅制价格不低；复杂流程图、批量处理能力不及专业工具；Linux 版功能有精简。' },
  { id: 22, name: '亿图图示', systems: 'Windows、Mac、Linux', url: 'https://www.edrawsoft.cn/edrawmax/', stars: 4.5, category: 'mindmap', recommendation: '国产全能型绘图软件，一站式覆盖思维导图、流程图、工业设计全场景，职场办公绘图首选。', pros: '功能全面，支持思维导图、流程图、组织结构图、UML 图、电路图、建筑图纸等 280 + 绘图类型；内置海量正版模板、符号素材，新手零门槛上手；完美兼容 Visio 格式，导出格式丰富；全平台适配，协同功能完善。', cons: '免费版有水印、页数限制；核心进阶功能需开通会员，订阅制价格不低；安装包体积大，对低配电脑有一定压力；复杂工程绘图能力不及专业工业软件。' },
  { id: 23, name: '幕布', systems: 'Windows、Mac、网页版', url: 'https://mubu.com/', stars: 4, category: 'mindmap', recommendation: '极简大纲笔记 + 一键生成思维导图工具，主打轻量化、高效记录，职场、学生群体首选。', pros: '界面极简纯净，无广告无捆绑；大纲笔记编辑流畅，一键生成思维导图，零学习成本；全平台跨设备同步，稳定性强；多人协同、共享功能完善；免费版可满足基础需求，会员价格亲民。', cons: '思维导图自定义自由度低，样式、结构可选少；复杂绘图、流程图功能完全不支持；免费版有节点数量、存储空间限制；高阶功能少，更新频率低。' },
  { id: 24, name: 'MindManager', systems: 'Windows、Mac', url: 'https://www.mindmanager.cn/', stars: 4.5, category: 'mindmap', recommendation: '全球老牌专业级思维导图软件，主打企业级项目管理与可视化，中大型企业办公首选。', pros: '功能专业且全面，思维导图、项目管理、甘特图、流程图、数据分析一站式覆盖；与 Office、Project 深度整合，无缝联动；企业级协同、权限管理完善；自定义自由度极高，复杂项目可视化能力顶尖。', cons: '买断制 / 订阅制价格昂贵；上手门槛高，新手学习成本大；安装包体积大，对电脑配置要求高；界面偏老旧，对个人用户性价比低。' },
  { id: 25, name: 'ProcessOn', systems: '网页版、Windows、Mac 客户端', url: 'https://www.processon.com/', stars: 4, category: 'mindmap', recommendation: '国内知名在线流程图、思维导图工具，主打多人实时协同，零安装、即开即用，团队办公首选。', pros: '网页版即开即用，零安装成本；支持流程图、思维导图、UML 图、原型图全类型；多人实时协同编辑，修改痕迹实时同步；界面友好，操作零门槛；内置海量模板，免费版可满足基础需求。', cons: '免费版有文件数量、协作者数量限制；核心进阶功能、海量模板需开通会员；离线编辑能力弱，极度依赖网络；复杂绘图、自定义自由度不及桌面端专业工具。' },
  { id: 26, name: 'Visio', systems: 'Windows', url: 'https://www.microsoft.com/zh-cn/microsoft-365/visio/flowchart-software', stars: 5, category: 'mindmap', recommendation: '微软旗下专业级流程图、工业绘图软件，行业标准制定者，企业级专业绘图首选。', pros: '行业通用标准，格式兼容性拉满；功能专业全面，支持流程图、组织结构图、UML 图、工程图纸、网络拓扑图全类型；与 Office 套件深度整合，无缝联动；自定义自由度极高，企业级协同、权限管理完善。', cons: '仅支持 Windows 系统；订阅制 / 买断制价格昂贵；上手门槛高，新手学习成本大；无 Mac 版本，对个人用户性价比低；模板素材不及国产工具丰富。' },
  // 协同办公与项目管理
  { id: 27, name: '钉钉', systems: 'Windows、Mac、网页版', url: 'https://www.dingtalk.com/', stars: 4.5, category: 'collab', recommendation: '阿里巴巴旗下企业级协同办公平台，国内中小企业覆盖率最高，一站式办公全场景覆盖。', pros: '功能全面，覆盖即时通讯、会议、审批、考勤、项目管理、文档协同全办公场景；免费版可满足中小企业绝大多数需求；与支付宝、阿里云生态深度整合；稳定性极强，支持万人级会议、千人级协同；企业级安全防护拉满。', cons: '免费版有部分功能限制；高阶企业功能需付费开通；对个人用户友好度低，冗余功能多；系统资源占用偏高。' },
  { id: 28, name: '企业微信', systems: 'Windows、Mac、网页版', url: 'https://work.weixin.qq.com/', stars: 4.5, category: 'collab', recommendation: '腾讯旗下企业级协同办公平台，深度适配微信生态，客户连接与内部协同一体化首选。', pros: '与微信无缝打通，可直接添加微信客户，客户联系、社群运营能力顶尖；内部协同功能完善，覆盖即时通讯、会议、审批、文档、考勤全场景；免费版功能全面，无强制付费诱导；操作逻辑与微信一致，零学习成本。', cons: '项目管理、复杂流程审批能力不及专业工具；高阶企业功能需付费开通；免费版会议时长、人数有一定限制；冗余功能越来越多，资源占用偏高。' },
  { id: 29, name: '飞书', systems: 'Windows、Mac、网页版', url: 'https://www.feishu.cn/', stars: 4.5, category: 'collab', recommendation: '字节跳动旗下新一代企业级协同办公平台，主打高效协同与一站式办公，中大型企业首选。', pros: '功能全面且深度整合，即时通讯、会议、文档、项目管理、OKR、审批一站式覆盖；多人实时协同能力顶尖，文档、会议、项目无缝联动；界面简洁，操作逻辑流畅，上手门槛低；企业级数据安全与权限管理完善。', cons: '免费版有功能、存储空间限制；高阶企业功能需付费开通，价格不低；中小企业使用有功能冗余；对传统办公模式用户有一定学习成本。' },
  { id: 30, name: 'Trello', systems: 'Windows、Mac、网页版', url: 'https://trello.com/', stars: 4, category: 'collab', recommendation: '全球知名轻量化看板项目管理工具，主打极简操作，个人与小团队项目管理首选。', pros: '看板模式极简直观，操作零门槛，新手友好；全平台跨设备同步，稳定性强；支持自定义卡片、 checklist、标签、负责人、截止日期；插件生态丰富，可拓展全功能；免费版可满足小团队基础需求。', cons: '国内访问速度慢，偶尔无法访问；免费版有协作者、插件数量限制；复杂项目、多级任务管理能力不足；全中文适配不完善。' },
  { id: 31, name: '禅道', systems: 'Windows、Mac、Linux、网页版', url: 'https://www.zentao.net/', stars: 4.5, category: 'collab', recommendation: '国产开源项目管理软件，主打敏捷开发、全生命周期项目管理，研发团队首选。', pros: '开源版完全免费，无功能限制，可私有化部署；功能全面，覆盖需求、任务、缺陷、用例、迭代全研发流程；敏捷开发、瀑布模型全支持；权限管理精细，企业级安全防护完善；国产适配性强，访问速度快。', cons: '上手门槛高，新手学习成本大；界面设计偏技术向，非研发团队友好度低；免费版无官方技术支持；进阶企业版功能需付费。' },
  { id: 32, name: 'Asana', systems: 'Windows、Mac、网页版', url: 'https://asana.com/', stars: 4, category: 'collab', recommendation: '全球知名企业级项目管理工具，主打复杂项目全流程管理，中大型团队办公首选。', pros: '功能专业全面，支持列表、看板、甘特图、日历多视图；多级任务管理、依赖关系、里程碑设置完善；多人协同能力顶尖，权限管理精细；插件生态丰富，可与主流办公软件无缝联动；自定义自由度极高。', cons: '国内访问速度慢，稳定性差；免费版有协作者、功能限制；订阅制价格昂贵；上手门槛高，新手学习成本大；全中文适配不完善。' },
  // 效率辅助办公工具
  { id: 33, name: '7-Zip', systems: 'Windows、Linux', url: 'https://www.7-zip.org/', stars: 5, category: 'efficiency', recommendation: '全球公认的开源免费压缩解压软件，完全无广告无限制，办公压缩解压首选。', pros: '完全开源免费，无广告无捆绑，无任何功能限制；压缩比极高，远超同类软件；支持几乎所有压缩格式，兼容 ZIP、RAR、7z 等全格式；安装包体积极小，资源占用极低，老旧电脑适配完美；支持加密压缩、分卷压缩、批量处理。', cons: '仅支持 Windows、Linux 系统，无官方 Mac 版本；界面偏老旧，新手友好度一般；无额外拓展功能，仅专注压缩解压。' },
  { id: 34, name: 'Bandizip', systems: 'Windows、Mac', url: 'https://www.bandisoft.com/bandizip/', stars: 4.5, category: 'efficiency', recommendation: '轻量化全能型压缩解压软件，主打高颜值、高速度，新手友好，办公首选。', pros: '免费版无广告无捆绑，界面极简美观，操作零门槛；压缩解压速度极快，支持全格式兼容；支持加密压缩、分卷压缩、批量处理、图片预览；内置恶意文件扫描功能，安全性高；全平台适配，对新系统适配完美。', cons: '免费版有部分功能限制；进阶批量处理、格式转换功能需付费开通；Mac 版功能比 Windows 版有精简。' },
  { id: 35, name: '天若 OCR', systems: 'Windows', url: 'https://tianruoocr.cn/', stars: 4.5, category: 'efficiency', recommendation: '国产轻量化免费 OCR 识别工具，主打截图即识别，办公文字提取首选。', pros: '完全免费开源，无广告无捆绑，安装包体积极小；截图即识别，一键提取图片、PDF、视频中的文字，识别准确率高；支持多语种识别、翻译、排版还原；快捷键一键启动，操作零门槛；资源占用极低，可常驻后台。', cons: '仅支持 Windows 系统；免费版依赖各大平台 OCR 接口，需自行配置；离线识别能力弱；无批量识别、长文档识别功能。' },
  { id: 36, name: '讯飞听见', systems: 'Windows、Mac、网页版', url: 'https://www.iflyrec.com/', stars: 4.5, category: 'efficiency', recommendation: '科大讯飞旗下专业音视频转文字工具，转写准确率行业顶尖，会议记录、办公转写首选。', pros: '语音转文字准确率超 98%，支持多语种、多方言、专业领域术语识别；支持录音、音视频文件导入，自动生成字幕、文稿，可一键导出 Word/PDF；支持实时会议转写、多人声纹分离；免费版可满足基础转写需求。', cons: '免费版有转写时长限制；高阶转写、批量处理功能需付费开通；纯办公辅助功能单一；长文件转写速度较慢。' },
  { id: 37, name: '百度翻译', systems: 'Windows、Mac、网页版', url: 'https://fanyi.baidu.com/', stars: 4.5, category: 'efficiency', recommendation: '国内主流免费翻译工具，主打多语种翻译，办公文档翻译首选。', pros: '免费版支持 200 + 语种互译，文本翻译准确率高；支持文档翻译、截图翻译、划词翻译，办公场景适配极佳；界面极简，操作零门槛；与百度生态深度联动，全平台跨设备同步完善；免费版可满足日常办公翻译需求。', cons: '免费版文档翻译有页数、大小限制；高阶专业领域翻译、批量翻译需付费开通；长文档、专业术语翻译准确率不及人工翻译；离线翻译能力弱。' },
  { id: 38, name: '网易邮箱大师', systems: 'Windows、Mac', url: 'https://dashi.163.com/', stars: 4.5, category: 'efficiency', recommendation: '国内主流全能型邮件客户端，全邮箱账号适配，办公邮件管理首选。', pros: '完全免费，无广告无捆绑；支持网易、QQ、Gmail、企业邮箱等全平台邮箱账号，一站式管理；界面简洁，操作零门槛；支持邮件加密、定时发送、批量处理、附件管理；新邮件提醒及时，稳定性极强。', cons: '高阶企业功能、协同能力不及专业邮件客户端；部分小众企业邮箱适配有瑕疵；拓展功能、插件生态较少；Mac 版功能比 Windows 版有精简。' },
  { id: 39, name: 'Snipaste', systems: 'Windows、Mac', url: 'https://www.snipaste.com/', stars: 4.5, category: 'efficiency', recommendation: '全球知名轻量化截图工具，主打截图 + 贴图，办公效率首选。', pros: '免费版无广告无捆绑，界面极简，操作零门槛；截图功能精准，支持全屏、选区、窗口截图，自带标注、马赛克、箭头、文字功能；核心贴图功能，可将截图钉在屏幕最上方，办公对照、教程制作极佳；快捷键自定义完善，资源占用极低。', cons: '免费版有部分功能限制；长截图、滚动截图功能需付费开通；无 OCR 识别、录屏功能；批量截图处理能力弱。' },
  { id: 40, name: '火绒安全软件', systems: 'Windows', url: 'https://www.huorong.cn/', stars: 5, category: 'efficiency', recommendation: '国内口碑标杆轻量化安全工具，办公电脑必备，主打纯净防护与系统管理。', pros: '完全免费无广告无捆绑，系统资源占用极低；核心功能含病毒查杀、弹窗拦截、勒索防护、启动项管理；彻底拦截办公软件、网页弹窗广告，办公环境纯净；自定义规则强大，无冗余功能，静默防护无打扰。', cons: '仅支持 Windows 系统；无 Mac/Linux 版本；企业级防护功能需付费开通；拓展工具不及 360 丰富。' },
  { id: 41, name: '微软电脑管家', systems: 'Windows 10/11', url: 'https://pcmanager.microsoft.com/zh-cn', stars: 4.5, category: 'efficiency', recommendation: '微软官方原生系统管理工具，办公电脑必备，纯净无广告，系统优化首选。', pros: '完全免费，微软官方出品，无广告无捆绑，与 Windows 系统深度整合；覆盖系统体检、病毒查杀、垃圾清理、启动项管理、弹窗拦截；与 Windows Defender 深度联动，无任何冗余推送；操作零门槛，新手友好。', cons: '仅支持 Windows 10/11 系统；拓展功能、自定义自由度不及第三方工具；无 Mac/Linux 版本；高阶系统管理功能不足。' },
  { id: 42, name: '迅雷', systems: 'Windows、Mac', url: 'https://www.xunlei.com/', stars: 4, category: 'efficiency', recommendation: '国内主流下载工具，办公大文件、素材下载首选，主打极速下载、全格式支持。', pros: '下载能力极强，支持 HTTP、BT、磁力链全格式，冷门资源也能高速下载；界面极简，可开启纯净模式，无广告；支持批量下载、断点续传、云盘加速；免费版可满足日常办公下载需求。', cons: '免费版有下载速度限制；极速下载、云盘空间需开通会员；部分资源无法下载；冗余功能多，资源占用偏高。' },
  // 数据处理与分析
  { id: 43, name: 'Microsoft Excel', systems: 'Windows、Mac', url: 'https://www.microsoft.com/zh-cn/microsoft-365/excel', stars: 5, category: 'data', recommendation: '全球电子表格与数据分析行业标杆，职场办公数据处理通用标准。', pros: '功能专业且全面，函数、数据透视表、图表、Power Query、VBA 宏覆盖全数据分析场景；行业通用标准，格式兼容性拉满；处理百万级大数据能力极强，稳定性拉满；与 Office 套件深度整合，无缝联动。', cons: '买断制 / 订阅制价格昂贵；高阶函数、数据分析功能学习门槛极高；对电脑配置有一定要求，老旧设备运行卡顿；多人协同能力不及云端表格工具。' },
  { id: 44, name: 'WPS 表格', systems: 'Windows、Mac、Linux', url: 'https://www.wps.cn/', stars: 4.5, category: 'data', recommendation: '国产全能型电子表格工具，完美兼容 Excel 格式，免费功能完善，国内办公首选。', pros: '个人免费版功能完善，完美兼容 Excel 全格式，无格式错乱问题；内置海量函数、模板、图表，覆盖日常办公全场景；对低配电脑友好，启动速度快；与 WPS 文档、演示深度整合，一站式办公；云端协同、跨设备同步完善。', cons: '免费版有弹窗广告；高阶数据分析、Power Query、VBA 功能不及 Excel；超大文件、百万级数据处理能力不足；部分复杂函数兼容性有瑕疵。' },
  { id: 45, name: 'Tableau Desktop', systems: 'Windows、Mac', url: 'https://www.tableau.com/zh-cn', stars: 5, category: 'data', recommendation: '全球顶级专业数据可视化工具，主打商业智能与大数据分析，企业级数据分析首选。', pros: '数据可视化能力顶尖，拖拽式操作即可生成专业级仪表盘、交互式图表；支持连接几乎所有数据源，Excel、数据库、大数据平台全适配；处理亿级大数据能力极强，分析速度快；企业级协同、权限管理完善。', cons: '订阅制价格极其昂贵；上手门槛高，新手学习成本大；对电脑配置要求高；个人用户性价比极低，免费版仅网页版可用，功能严重受限。' },
  { id: 46, name: 'Power BI', systems: 'Windows、网页版', url: 'https://www.microsoft.com/zh-cn/power-platform/products/power-bi', stars: 4.5, category: 'data', recommendation: '微软旗下专业商业智能工具，主打数据可视化与自助式分析，Excel 用户进阶首选。', pros: '免费版功能完善，可满足绝大多数个人与小团队需求；与 Excel 深度整合，无缝联动，Excel 用户零门槛上手；支持连接全类型数据源，数据清洗、建模、可视化一站式完成；交互式仪表盘、报表制作能力顶尖；企业级协同功能完善。', cons: '仅支持 Windows 系统，无官方 Mac 桌面版；高阶企业功能需付费开通；上手有一定学习成本；大数据处理能力对电脑配置有要求。' },
  // 设计与原型工具
  { id: 47, name: 'Adobe Photoshop', systems: 'Windows、Mac', url: 'https://www.adobe.com/cn/products/photoshop.html', stars: 5, category: 'design', recommendation: '全球图像处理行业标杆，办公海报、物料、图片处理首选专业工具。', pros: '功能全面且专业，覆盖图片修图、海报设计、物料制作、UI 设计全场景；行业通用标准，格式兼容性拉满；插件生态极其丰富，可拓展无限功能；处理能力顶尖，支持超大文件、多层级设计。', cons: '订阅制价格昂贵；上手门槛极高，新手学习成本大；对电脑配置要求高，老旧设备运行卡顿；个人用户多数功能用不上，性价比低。' },
  { id: 48, name: 'Canva 可画', systems: 'Windows、Mac、网页版', url: 'https://www.canva.cn/', stars: 4.5, category: 'design', recommendation: '全球知名轻量化在线设计工具，主打零门槛设计，办公海报、PPT、物料制作首选。', pros: '免费版内置海量正版模板、图片、字体、素材，覆盖海报、PPT、简历、宣传物料全办公场景；拖拽式操作，零设计基础也能快速出片；界面极简，操作零门槛；支持多人协同编辑，一键导出多格式；全平台适配。', cons: '免费版素材有商用版权限制；高阶素材、模板、功能需开通会员；专业级设计、精细修图能力不及 Photoshop；极度依赖网络，离线编辑能力弱。' },
  { id: 49, name: 'Figma', systems: 'Windows、Mac、网页版', url: 'https://www.figma.com/', stars: 4.5, category: 'design', recommendation: '全球顶级 UI/UX 设计与原型工具，主打云端协同，产品、设计团队办公首选。', pros: '网页版即开即用，全平台适配；UI 设计、原型制作、交互动效一站式完成；多人实时协同编辑能力顶尖，团队协作效率拉满；组件化设计、资源库功能完善；插件生态极其丰富，免费版可满足个人与小团队基础需求。', cons: '国内访问速度慢，偶尔无法访问；免费版有文件数量、协作者限制；高阶企业功能需付费订阅；上手有一定学习成本，纯海报、图片修图能力不及专业工具。' },
  { id: 50, name: '墨刀', systems: 'Windows、Mac、网页版', url: 'https://modao.cc/', stars: 4, category: 'design', recommendation: '国产轻量化原型设计工具，主打零门槛快速原型制作，产品、设计团队办公首选。', pros: '国内服务器，访问速度快，稳定性强；界面极简，拖拽式操作，零门槛快速制作产品原型、交互动效；内置海量组件库、模板，新手友好；支持多人实时协同、原型分享、标注导出；与飞书、钉钉深度联动；免费版可满足基础需求。', cons: '免费版有页面数量、协作者限制；高阶功能、企业级权限管理需付费开通；专业级 UI 设计、精细修图能力不及头部工具；复杂交互动效支持不完善。' },
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

// 获取分类颜色
const getCategoryColor = (color: string) => {
  const colors: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
    blue: { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-300', iconBg: 'bg-blue-500/10' },
    red: { bg: 'bg-red-500/20', border: 'border-red-500/30', text: 'text-red-300', iconBg: 'bg-red-500/10' },
    yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', text: 'text-yellow-300', iconBg: 'bg-yellow-500/10' },
    purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/30', text: 'text-purple-300', iconBg: 'bg-purple-500/10' },
    green: { bg: 'bg-green-500/20', border: 'border-green-500/30', text: 'text-green-300', iconBg: 'bg-green-500/10' },
    orange: { bg: 'bg-orange-500/20', border: 'border-orange-500/30', text: 'text-orange-300', iconBg: 'bg-orange-500/10' },
    cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-300', iconBg: 'bg-cyan-500/10' },
    pink: { bg: 'bg-pink-500/20', border: 'border-pink-500/30', text: 'text-pink-300', iconBg: 'bg-pink-500/10' },
  };
  return colors[color] || colors.blue;
};

interface OfficeSoftwareProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OfficeSoftware({ isOpen, onClose }: OfficeSoftwareProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('office');
  const [selectedTool, setSelectedTool] = useState<OfficeTool | null>(null);

  // 过滤当前分类的工具
  const filteredTools = officeTools.filter(tool => tool.category === selectedCategory);

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
                <i className="fa-solid fa-briefcase text-2xl text-purple-400"></i>
                <h3 className="text-white text-xl font-bold">办公软件</h3>
                <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded-full">
                  共 {officeTools.length} 款软件
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
              {/* 左侧分类导航 */}
              <div className="w-44 border-r border-white/10 bg-black/20 py-3 overflow-y-auto tier-chart-scrollbar flex-shrink-0">
                <div className="flex flex-col gap-1 px-2">
                  {categories.map((cat) => {
                    const colorStyle = getCategoryColor(cat.color);
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setSelectedTool(null);
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all text-left ${
                          isActive 
                            ? `${colorStyle.bg} ${colorStyle.border} border ${colorStyle.text}` 
                            : 'bg-white/5 border border-transparent text-white/60 hover:bg-white/10 hover:text-white/80'
                        }`}
                      >
                        <i className={`fa-solid ${cat.icon} w-4 text-center`}></i>
                        <span className="flex-1 truncate">{cat.name}</span>
                        <span className={`text-xs ${isActive ? colorStyle.text : 'text-white/40'}`}>
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 中间工具列表 */}
              <div 
                className="flex-1 overflow-y-auto p-4 space-y-2 tier-chart-scrollbar"
              >
                {filteredTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(index * 0.03, 0.3) }}
                    onClick={() => setSelectedTool(tool)}
                    className={`relative cursor-pointer group transition-all duration-300 ${
                      selectedTool?.id === tool.id ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                    }`}
                  >
                    <div className={`relative h-14 bg-white/5 rounded-lg overflow-hidden border transition-colors ${
                      selectedTool?.id === tool.id ? 'border-purple-500/50' : 'border-white/10 group-hover:border-white/20'
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
                        className="block w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white text-center py-3 rounded-xl font-medium transition-all hover:scale-[1.02] mt-4"
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
                    <i className="fa-solid fa-briefcase text-4xl mb-3"></i>
                    <p className="text-sm">点击左侧软件查看详情</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 底部说明 */}
            <div className="px-6 py-2 border-t border-white/10 bg-black/30 text-center">
              <p className="text-white/40 text-xs">
                <i className="fa-solid fa-info-circle mr-1"></i>
                同类型软件建议仅保留 1 款主力工具，避免多款同类软件同时常驻后台造成系统卡顿
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
