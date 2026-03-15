import React, { useState } from 'react';

// 定义AI工具类型
interface AITool {
  id: number;
  name: string;
  company: string;
  url: string;
  stars: number; // 1-5
  pricing: '免费' | '半免费' | '收费';
  category: string;
  categoryIndex: number;
  positioning: string;
  audience: string;
  pros: string;
  cons: string;
}

// AI工具数据 - 100个精选AI工具
const aiTools: AITool[] = [
  // 一、通用多模态大模型&对话助手（22个）
  { id: 1, name: 'ChatGPT', company: 'OpenAI', url: 'https://chat.openai.com', stars: 5, pricing: '半免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '通用多模态对话大模型', audience: '全场景用户、办公人群、开发者', pros: '多模态能力顶尖，生态完善，全场景适配性强', cons: '高峰易卡顿，高级模型需付费订阅' },
  { id: 2, name: 'Claude 3', company: 'Anthropic', url: 'https://claude.ai', stars: 5, pricing: '半免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '超长上下文多模态大模型', audience: '企业用户、长文档处理人群、创作者', pros: '超长上下文窗口，多模态理解强，企业级安全合规', cons: '国内访问门槛高，长文本偶有信息遗漏' },
  { id: 3, name: 'Gemini', company: 'Google DeepMind', url: 'https://gemini.google.com', stars: 5, pricing: '半免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '通用多模态逻辑大模型', audience: '开发者、科研人群、逻辑推理需求用户', pros: '逻辑推理、代码能力顶尖，多模态交互全面', cons: '中文理解偶有偏差，国内访问受限' },
  { id: 4, name: '文心一言', company: '百度', url: 'https://yiyan.baidu.com', stars: 4, pricing: '免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '政企级通用多模态大模型', audience: '政企用户、办公人群、国内创作者', pros: '中文理解深厚，APP/PC端核心功能全免费，政企适配性强', cons: '高峰响应慢，代码能力略弱于头部竞品' },
  { id: 5, name: '通义千问', company: '阿里达摩院', url: 'https://tongyi.aliyun.com', stars: 4, pricing: '免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '商用级通用多模态大模型', audience: '电商从业者、企业用户、办公人群', pros: '长文本处理顶尖，个人端核心功能全免费，商用场景适配完善', cons: '回答偶有冗余，创意生成能力一般' },
  { id: 6, name: '豆包', company: '字节跳动', url: 'https://www.doubao.com', stars: 4, pricing: '半免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '全场景本土化通用AI助手', audience: '全年龄段普通用户、学生、办公人群', pros: '全场景适配，本土化体验拉满，核心功能永久免费', cons: '深度专业场景能力略逊国际顶流' },
  { id: 7, name: 'Llama 3', company: 'Meta', url: 'https://llama.meta.com', stars: 4, pricing: '免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '开源通用大模型', audience: '开发者、企业私有化部署用户', pros: '开源顶流，性能比肩闭源模型，自定义自由度极高', cons: '需自行部署，新手上手门槛较高' },
  { id: 8, name: '混元大模型', company: '腾讯', url: 'https://hunyuan.tencent.com', stars: 4, pricing: '半免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '社交生态适配通用多模态大模型', audience: '游戏从业者、社交内容创作者、企业用户', pros: '多模态生成能力强，深度适配社交、游戏生态', cons: '公开生态完善度不足，个人用户高级功能有限' },
  { id: 9, name: '讯飞星火', company: '科大讯飞', url: 'https://xinghuo.xfyun.cn', stars: 4, pricing: '半免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '语音交互优先通用大模型', audience: '教育从业者、工业用户、语音交互需求用户', pros: '语音交互行业顶尖，教育、工业垂直场景适配强', cons: '通用创意能力一般，高级功能需付费' },
  { id: 10, name: '智谱清言', company: '智谱AI', url: 'https://chatglm.cn', stars: 4, pricing: '半免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '开源+闭源双轨通用大模型', audience: '开发者、企业用户、内容创作者', pros: '开源闭源双线布局，多模态能力均衡，行业落地广', cons: '长文本响应速度一般，免费额度有限' },
  { id: 11, name: '月之暗面Kimi', company: '月之暗面', url: 'https://kimi.moonshot.cn', stars: 4, pricing: '半免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '超长上下文文档处理大模型', audience: '办公人群、学生、长文档处理需求用户', pros: '超长上下文能力突出，百万字文档解析效率高', cons: '高峰响应慢，复杂逻辑推理偶有幻觉' },
  { id: 12, name: 'DeepSeek', company: '深度求索', url: 'https://www.deepseek.com', stars: 4, pricing: '免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '代码&数学逻辑开源大模型', audience: '开发者、科研人群、数学逻辑需求用户', pros: '代码、数学逻辑能力顶尖，开源生态完善，个人端免费', cons: '多模态能力一般，创意生成表现平平' },
  { id: 13, name: 'Mistral Large', company: 'Mistral', url: 'https://mistral.ai', stars: 4, pricing: '半免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '轻量化高性能通用大模型', audience: '开发者、企业用户、海外多语言需求用户', pros: '轻量化高性能，多语言适配强，推理速度快', cons: '国内访问受限，中文场景优化不足' },
  { id: 14, name: 'Mistral AI', company: 'Mistral', url: 'https://mistral.ai', stars: 3, pricing: '免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '轻量化开源通用大模型', audience: '开发者、端侧部署需求用户', pros: '欧洲顶流开源模型，轻量化部署优势突出', cons: '大参数量版本性能略逊头部，中文适配一般' },
  { id: 15, name: 'Grok', company: 'xAI', url: 'https://x.ai', stars: 3, pricing: '收费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '实时联网通用大模型', audience: '海外用户、热点资讯需求用户、科技爱好者', pros: '实时联网能力强，热点响应快，逻辑推理优秀', cons: '国内访问受限，中文优化不足，无免费核心功能' },
  { id: 16, name: 'Qwen大模型', company: '阿里达摩院', url: 'https://qwenlm.github.io', stars: 3, pricing: '免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '多语言开源通用大模型', audience: '开发者、海外多语言需求用户', pros: '全球知名开源模型，多语言多模态能力均衡', cons: '闭源版功能有限，企业级服务门槛高' },
  { id: 17, name: '百川大模型', company: '百川智能', url: 'https://www.baichuan-ai.com', stars: 3, pricing: '半免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '长文本开源通用大模型', audience: '企业用户、开发者、内容创作者', pros: '长文本能力突出，开源生态完善，行业定制化强', cons: '多模态能力一般，个人用户免费额度有限' },
  { id: 18, name: '华为盘古大模型', company: '华为', url: 'https://www.huawei.com/cn/products/cloud/pangu', stars: 3, pricing: '半免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '行业级国产化通用大模型', audience: '政企用户、工业从业者、国产化需求用户', pros: '工业、政务等ToB场景适配顶尖，国产化能力强', cons: '个人用户功能少，创意生成能力一般' },
  { id: 19, name: '零一万物Yi大模型', company: '零一万物', url: 'https://www.lingyiwulian.com', stars: 3, pricing: '免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '开源通用大模型', audience: '开发者、私有化部署需求用户', pros: '开源性能优秀，长上下文能力强，部署灵活', cons: '生态完善度不足，多模态能力较弱' },
  { id: 20, name: '阶跃星辰StepFun', company: '阶跃星辰', url: 'https://www.stepfun.com', stars: 3, pricing: '半免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '多模态交互通用大模型', audience: '国内普通用户、内容创作者', pros: '多模态交互能力突出，本土化体验优秀', cons: '知名度较低，生态完善度不足，免费额度少' },
  { id: 21, name: 'Doubao开源大模型', company: '字节跳动', url: 'https://github.com/bytedance/Doubao', stars: 3, pricing: '免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '多模态开源大模型', audience: '开发者、国内本土化部署需求用户', pros: '多模态、代码能力强，开源协议宽松，开发者友好', cons: '生态尚在建设，社区资源少于头部开源模型' },
  { id: 22, name: 'Phi-3', company: '微软', url: 'https://azure.microsoft.com/en-us/products/phi-3', stars: 3, pricing: '免费', category: '通用多模态大模型&对话助手', categoryIndex: 1, positioning: '端侧轻量化开源大模型', audience: '开发者、端侧部署需求用户', pros: '小体积高性能，端侧部署能力顶尖，推理速度快', cons: '大参数量任务表现一般，长文本能力较弱' },

  // 二、AI绘画&视觉设计工具（22个）
  { id: 23, name: 'Midjourney', company: 'Midjourney', url: 'https://www.midjourney.com', stars: 5, pricing: '收费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '商用级AI绘画生成工具', audience: '专业设计师、创意从业者、商业广告团队', pros: '生成质感、创意上限顶尖，商用生态完善', cons: '无免费核心功能，上手有门槛，无中文原生界面' },
  { id: 24, name: 'DALL·E 3', company: 'OpenAI', url: 'https://openai.com/dall-e-3', stars: 5, pricing: '半免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '语义精准型文生图工具', audience: '内容创作者、办公人群、普通设计需求用户', pros: '语义理解精度天花板，深度集成ChatGPT，上手简单', cons: '可控性弱于开源模型，生成风格多样性不足' },
  { id: 25, name: 'Stable Diffusion', company: 'Stability AI', url: 'https://stability.ai', stars: 5, pricing: '免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '开源可控型AI绘画生成模型', audience: '开发者、专业设计师、AI绘画爱好者', pros: '全球最火开源模型，插件生态完善，可控性拉满', cons: '新手门槛高，需一定硬件配置，商用版权需自查' },
  { id: 26, name: '腾讯混元AI绘画', company: '腾讯', url: 'https://hunyuan.tencent.com', stars: 4, pricing: '半免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '中文语义优化AI绘画工具', audience: '国内内容创作者、新媒体从业者、设计师', pros: '中文语义理解顶尖，生成精度高，风格适配国内需求', cons: '生态完善度不足，高级功能需付费，插件少' },
  { id: 27, name: 'Leonardo.AI', company: 'Leonardo.AI', url: 'https://leonardo.ai', stars: 4, pricing: '半免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '游戏影视级AI资产生成工具', audience: '游戏设计师、影视从业者、3D创作者', pros: '游戏、影视级资产生成能力顶尖，模型丰富', cons: '免费额度有限，商用版权有约束，上手有门槛' },
  { id: 28, name: 'Ideogram', company: 'Ideogram', url: 'https://ideogram.ai', stars: 4, pricing: '半免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '文字生成精准型AI绘画工具', audience: '品牌设计师、海报创作者、电商设计师', pros: '文字生成精度行业第一，海报、品牌设计适配强', cons: '国内访问受限，免费额度少，长文本生成易出错' },
  { id: 29, name: 'Topaz Gigapixel AI', company: 'Topaz Labs', url: 'https://www.topazlabs.com/gigapixel', stars: 4, pricing: '收费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '专业级图像画质修复增强工具', audience: '摄影师、设计工作室、老照片修复从业者', pros: '图像超分、画质修复行业标杆，无损放大能力顶尖', cons: '需付费买断，仅支持图像修复，无生成能力' },
  { id: 30, name: '文心一格', company: '百度', url: 'https://yige.baidu.com', stars: 4, pricing: '半免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '商用合规型AI绘画工具', audience: '国内创作者、新媒体从业者、电商设计师', pros: '商用版权合规，中文适配强，风格丰富，上手简单', cons: '生成上限略逊国际顶流，高级功能需付费' },
  { id: 31, name: '即梦AI', company: '字节跳动', url: 'https://jimeng.jianying.com', stars: 4, pricing: '半免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '短视频适配型AI绘画工具', audience: '短视频创作者、新媒体运营、普通爱好者', pros: '生成速度快，风格全覆盖，适配短视频新媒体场景', cons: '专业设计场景能力不足，可控性一般' },
  { id: 32, name: 'Canva可画AI', company: 'Canva', url: 'https://www.canva.cn', stars: 4, pricing: '半免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '小白友好型AI设计工具', audience: '普通用户、新媒体运营、中小企业设计需求者', pros: '小白友好，设计功能全覆盖，商用素材库丰富', cons: '高级AI功能需付费，专业设计上限不足' },
  { id: 33, name: 'Figma AI', company: 'Figma', url: 'https://www.figma.com', stars: 4, pricing: '半免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: 'UI/UX专业级AI设计工具', audience: 'UI设计师、产品经理、交互设计团队', pros: 'UI/UX设计顶流，插件生态完善，协同设计能力强', cons: '国内访问不稳定，高级功能付费，上手有门槛' },
  { id: 34, name: 'Magnific AI', company: 'Magnific AI', url: 'https://magnific.ai', stars: 4, pricing: '收费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '极致画质增强AI工具', audience: '摄影师、设计师、影视后期从业者', pros: '图像超分、细节还原能力顶尖，画质增强效果突出', cons: '需付费使用，仅支持画质优化，无生成能力' },
  { id: 35, name: 'Runway ML', company: 'Runway', url: 'https://runwayml.com', stars: 3, pricing: '半免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '影视级创意AI设计工具', audience: '影视创作者、广告团队、创意设计师', pros: '创意设计全功能覆盖，适配影视级制作，插件丰富', cons: '国内访问受限，付费门槛高，生成稳定性一般' },
  { id: 36, name: 'Clipdrop', company: 'Stability AI', url: 'https://clipdrop.co', stars: 3, pricing: '半免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '轻量化AI图像编辑工具', audience: '设计师、新媒体运营、普通办公用户', pros: 'AI图像编辑功能全面，一键抠图、背景生成能力强', cons: '高级功能付费，国内访问不稳定，批量处理能力弱' },
  { id: 37, name: '醒图AI', company: '字节跳动', url: 'https://www.xingtu.app', stars: 3, pricing: '半免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '移动端AI人像修图工具', audience: '普通用户、短视频创作者、自媒体博主', pros: '移动端AI修图顶流，人像修图、画质修复能力强', cons: '专业设计功能不足，仅适配移动端，批量处理弱' },
  { id: 38, name: 'Picsart美易AI', company: 'Picsart', url: 'https://picsart.com', stars: 3, pricing: '半免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '全球移动端创意AI修图工具', audience: '海外用户、年轻创作者、自媒体博主', pros: '全球知名移动端修图工具，创意修图功能全面', cons: '广告多，高级功能付费，专业场景能力不足' },
  { id: 39, name: 'Blender AI插件', company: 'Blender', url: 'https://www.blender.org', stars: 3, pricing: '免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '开源3D设计AI辅助工具', audience: '3D设计师、游戏建模师、影视动画从业者', pros: '开源3D设计顶流，AI建模、渲染插件生态完善', cons: '新手门槛极高，需搭配Blender使用，硬件要求高' },
  { id: 40, name: '美图设计室AI', company: '美图', url: 'https://www.meitu.com', stars: 3, pricing: '半免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '电商场景AI设计工具', audience: '电商从业者、中小企业、新媒体运营', pros: '电商设计、海报生成能力强，商用场景适配完善', cons: '生成创意上限不足，高级功能需付费，可控性一般' },
  { id: 41, name: 'Photopea AI', company: 'Photopea', url: 'https://www.photopea.com', stars: 3, pricing: '半免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '在线PS替代AI设计工具', audience: '设计师、办公用户、无软件安装需求者', pros: '在线PS替代工具，AI编辑功能全，免费无下载', cons: '国内访问不稳定，界面无中文优化，上手有门槛' },
  { id: 42, name: 'Fotor AI', company: 'Fotor', url: 'https://www.fotor.com', stars: 3, pricing: '半免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '轻量化全场景AI设计工具', audience: '普通用户、新媒体运营、学生', pros: '小白友好，AI绘画、修图、设计功能全覆盖', cons: '免费版有水印，高级功能付费，生成上限一般' },
  { id: 43, name: 'SeaArt AI', company: 'SeaArt', url: 'https://seaart.ai', stars: 3, pricing: '半免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '国内开源AI绘画平台', audience: 'AI绘画爱好者、国内创作者、设计师', pros: '国内AI绘画平台，模型丰富，商用版权合规', cons: '免费额度有限，生成质感略逊头部平台，广告多' },
  { id: 44, name: '6pen Art', company: '6pen', url: 'https://6pen.art', stars: 3, pricing: '半免费', category: 'AI绘画&视觉设计工具', categoryIndex: 2, positioning: '国内轻量化AI绘画工具', audience: 'AI绘画新手、学生、普通爱好者', pros: '开源AI绘画平台，自定义程度高，免费额度充足', cons: '界面简陋，生成稳定性一般，生态完善度不足' },

  // 三、AI视频生成&剪辑工具（22个）
  { id: 45, name: 'Sora', company: 'OpenAI', url: 'https://openai.com/sora', stars: 5, pricing: '收费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '全球顶尖文生视频大模型', audience: '影视创作者、广告团队、专业内容机构', pros: '文生视频天花板，分钟级4K生成，场景连贯性顶尖', cons: '仅开放付费测试，国内无法访问，商用权限受限' },
  { id: 46, name: 'Pika Labs', company: 'Pika Labs', url: 'https://pika.art', stars: 5, pricing: '半免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '风格化AI视频生成工具', audience: '短视频创作者、广告设计师、创意从业者', pros: '风格化生成能力顶尖，视频编辑功能全，上手门槛低', cons: '国内访问受限，长视频生成稳定性一般，免费额度少' },
  { id: 47, name: 'Runway Gen-3', company: 'Runway', url: 'https://runwayml.com', stars: 4, pricing: '半免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '影视级AI视频生成工具', audience: '影视后期、广告团队、专业创意机构', pros: '影视级视频生成、特效制作能力顶尖，专业创作者首选', cons: '付费门槛高，国内访问受限，长视频生成成本高' },
  { id: 48, name: '剪映AI', company: '字节跳动', url: 'https://www.capcut.cn', stars: 4, pricing: '免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '全场景AI视频剪辑工具', audience: '全层级短视频创作者、自媒体、普通用户', pros: '国内剪辑顶流，AI功能全覆盖，本土化适配强，核心功能全免费', cons: '专业影视级功能不足，长视频剪辑性能一般' },
  { id: 49, name: 'HeyGen', company: 'HeyGen', url: 'https://www.heygen.com', stars: 4, pricing: '半免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: 'AI数字人视频生成工具', audience: '企业培训、跨境电商、知识付费创作者', pros: 'AI数字人视频生成顶流，对口型、多语言能力顶尖', cons: '国内访问受限，付费门槛高，免费额度极少' },
  { id: 50, name: 'Stable Video Diffusion', company: 'Stability AI', url: 'https://stability.ai', stars: 4, pricing: '免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '开源AI视频生成模型', audience: '开发者、视频创作者、AI爱好者', pros: '全球最火开源文生视频模型，自定义程度高，插件丰富', cons: '新手门槛高，硬件要求高，长视频生成能力弱' },
  { id: 51, name: 'Wonder Dynamics', company: 'Wonder Dynamics', url: 'https://wonderdynamics.com', stars: 4, pricing: '半免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '影视级AI动作捕捉工具', audience: '影视创作者、CG设计师、游戏动画团队', pros: '影视级AI动作捕捉、角色替换能力顶尖，一键真人转CG', cons: '国内访问受限，付费门槛高，仅适配影视制作场景' },
  { id: 52, name: 'Descript', company: 'Descript', url: 'https://www.descript.com', stars: 4, pricing: '半免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '文本驱动式AI音视频剪辑工具', audience: '播客创作者、短视频博主、知识付费从业者', pros: '文本式剪辑视频，自动字幕、配音、修音功能拉满', cons: '国内访问受限，中文适配一般，付费门槛高' },
  { id: 53, name: 'Topaz Video AI', company: 'Topaz Labs', url: 'https://www.topazlabs.com/topaz-video-ai', stars: 4, pricing: '收费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '专业级视频画质修复增强工具', audience: '影视工作室、摄影师、老视频修复从业者', pros: '视频修复、超分行业标杆，老视频翻新、无损放大能力强', cons: '需付费买断，仅支持视频优化，无生成剪辑能力' },
  { id: 54, name: 'DaVinci Resolve AI', company: 'Blackmagic Design', url: 'https://www.blackmagicdesign.com/products/davinciresolve', stars: 4, pricing: '半免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '专业级影视级AI剪辑调色工具', audience: '影视剪辑师、调色师、专业视频工作室', pros: '专业影视剪辑顶流，AI调色、降噪、修复功能行业标准', cons: '新手门槛极高，硬件要求高，轻量化剪辑适配差' },
  { id: 55, name: 'Wav2Lip', company: '开源社区', url: 'https://github.com/Rudrabha/Wav2Lip', stars: 4, pricing: '免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '开源AI音视频对口型工具', audience: '短视频创作者、影视后期、数字人开发者', pros: '开源AI对口型顶流，音画同步精度拉满，多语言适配', cons: '新手门槛高，需自行部署，无其他剪辑功能' },
  { id: 56, name: '可灵AI Kling', company: '快手', url: 'https://klingai.kuaishou.com', stars: 3, pricing: '半免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '国内长视频AI生成工具', audience: '国内视频创作者、广告团队、新媒体机构', pros: '国内文生视频头部，长视频生成能力强，本土化适配好', cons: '免费额度有限，生成质感略逊国际顶流，高级功能付费' },
  { id: 57, name: '即梦视频', company: '字节跳动', url: 'https://jimeng.jianying.com', stars: 3, pricing: '半免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '短视频适配AI视频生成工具', audience: '短视频创作者、自媒体博主、新媒体运营', pros: '生成速度快，风格全覆盖，完美适配短视频场景，上手简单', cons: '长视频生成能力弱，专业功能不足，可控性一般' },
  { id: 58, name: 'Luma AI Dream Machine', company: 'Luma AI', url: 'https://lumalabs.ai/dream-machine', stars: 3, pricing: '半免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '高质感AI视频生成工具', audience: '创意设计师、广告创作者、影视爱好者', pros: '文生视频质感顶尖，动态连贯性强，生成速度快', cons: '国内访问受限，免费额度极少，长视频生成能力弱' },
  { id: 59, name: 'D-ID', company: 'D-ID', url: 'https://www.d-id.com', stars: 3, pricing: '半免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: 'AI数字人驱动视频生成工具', audience: '企业培训、跨境电商、知识付费创作者', pros: 'AI数字人视频生成标杆，照片驱动数字人能力强', cons: '国内访问受限，付费门槛高，中文适配一般' },
  { id: 60, name: 'Opus Clip', company: 'Opus', url: 'https://opus.pro', stars: 3, pricing: '半免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: 'AI短视频二次剪辑工具', audience: '短视频创作者、自媒体博主、跨境内容创作者', pros: 'AI短视频剪辑顶流，一键长视频拆爆款，自动加字幕选高光', cons: '国内访问受限，中文适配一般，付费门槛高' },
  { id: 61, name: '智谱清影', company: '智谱AI', url: 'https://chatglm.cn', stars: 3, pricing: '半免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '国内多模态AI视频生成工具', audience: '国内内容创作者、企业宣传团队、新媒体机构', pros: '国内文生视频头部，长视频生成、多模态理解能力强', cons: '免费额度有限，生成稳定性一般，生态完善度不足' },
  { id: 62, name: 'ModelScope魔搭', company: '阿里达摩院', url: 'https://modelscope.cn', stars: 3, pricing: '免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '国内开源AI视频模型平台', audience: '开发者、AI爱好者、视频技术从业者', pros: '国内开源AI视频生成顶流，模型丰富，开发者友好', cons: '新手门槛高，无原生剪辑功能，个人用户体验一般' },
  { id: 63, name: 'Kapwing AI', company: 'Kapwing', url: 'https://www.kapwing.com', stars: 3, pricing: '半免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '海外在线AI视频剪辑工具', audience: '海外创作者、新媒体运营、跨境内容从业者', pros: '海外在线AI剪辑顶流，功能全，小白友好，适配新媒体', cons: '国内访问受限，免费版有水印，高级功能付费' },
  { id: 64, name: '万兴喵影AI', company: '万兴科技', url: 'https://filmora.wondershare.cn', stars: 3, pricing: '半免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '全平台AI视频剪辑工具', audience: '普通创作者、自媒体博主、中小企业宣传团队', pros: '全平台适配，AI剪辑、特效功能全，个人商用场景兼顾', cons: '高级功能付费，生成能力一般，广告较多' },
  { id: 65, name: '剪映专业版AI', company: '字节跳动', url: 'https://www.capcut.cn', stars: 3, pricing: '免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: 'PC端专业级AI视频剪辑工具', audience: '中长视频创作者、专业自媒体、剪辑工作室', pros: 'PC端专业级剪辑，AI功能全，适配中长视频，核心功能免费', cons: '专业影视级功能不足，长视频剪辑性能一般' },
  { id: 66, name: 'Runway Gen-2', company: 'Runway', url: 'https://runwayml.com', stars: 3, pricing: '半免费', category: 'AI视频生成&剪辑工具', categoryIndex: 3, positioning: '经典商用级AI视频生成工具', audience: '广告团队、创意机构、影视创作者', pros: '经典文生视频标杆，稳定性强，生态完善，广泛商用', cons: '生成上限不及Gen-3，付费门槛高，国内访问受限' },

  // 四、AI音频&语音处理工具（4个）
  { id: 67, name: 'ElevenLabs', company: 'ElevenLabs', url: 'https://elevenlabs.io', stars: 5, pricing: '半免费', category: 'AI音频&语音处理工具', categoryIndex: 4, positioning: '拟真级AI语音生成工具', audience: '有声书创作者、短视频博主、配音从业者', pros: 'AI语音生成天花板，人声拟真度、情感表现力行业第一', cons: '国内访问受限，付费门槛高，免费额度极少' },
  { id: 68, name: 'Suno AI', company: 'Suno', url: 'https://suno.ai', stars: 5, pricing: '半免费', category: 'AI音频&语音处理工具', categoryIndex: 4, positioning: '全链路AI歌曲生成工具', audience: '音乐创作者、短视频博主、自媒体、音乐爱好者', pros: 'AI歌曲生成顶流，一键生成完整带人声编曲的歌曲，风格全', cons: '国内访问受限，商用版权约束严格，免费额度少' },
  { id: 69, name: 'OpenAI Whisper', company: 'OpenAI', url: 'https://github.com/openai/whisper', stars: 4, pricing: '免费', category: 'AI音频&语音处理工具', categoryIndex: 4, positioning: '开源多语言语音转写模型', audience: '开发者、剪辑师、办公人群、同传从业者', pros: '开源语音转写标杆，多语言识别精度高，抗噪能力强', cons: '需自行部署，新手门槛高，无原生配音生成功能' },
  { id: 70, name: '讯飞听见', company: '科大讯飞', url: 'https://www.iflyrec.com', stars: 4, pricing: '半免费', category: 'AI音频&语音处理工具', categoryIndex: 4, positioning: '国内专业级语音转写同传工具', audience: '办公人群、会议从业者、媒体记者、同传人员', pros: '国内语音转写、同传顶流，方言适配强，专业场景精度高', cons: '高级功能付费，长文本转写免费额度有限' },

  // 五、AI办公&效率提升工具（15个）
  { id: 71, name: 'Microsoft 365 Copilot', company: 'Microsoft', url: 'https://www.microsoft.com/copilot', stars: 5, pricing: '收费', category: 'AI办公&效率提升工具', categoryIndex: 5, positioning: '全场景办公AI助手', audience: '企业办公人群、白领、微软生态用户', pros: '全球办公AI顶流，深度集成Office全家桶，全场景适配', cons: '必须付费订阅，国内适配一般，本土化功能不足' },
  { id: 72, name: 'WPS AI', company: '金山办公', url: 'https://www.wps.cn', stars: 5, pricing: '半免费', category: 'AI办公&效率提升工具', categoryIndex: 5, positioning: '本土化全场景办公AI助手', audience: '国内办公人群、学生、中小企业、政企用户', pros: '国内办公AI顶流，深度集成WPS全系列，核心功能免费', cons: '高级功能付费，超大型文档处理性能一般' },
  { id: 73, name: 'Notion AI', company: 'Notion', url: 'https://www.notion.so', stars: 4, pricing: '半免费', category: 'AI办公&效率提升工具', categoryIndex: 5, positioning: '全链路笔记&知识库AI工具', audience: '内容创作者、办公人群、学生、项目管理团队', pros: '全球笔记AI天花板，笔记、项目管理全场景AI赋能', cons: '国内访问不稳定，付费门槛高，中文适配一般' },
  { id: 74, name: 'ChatPDF', company: 'ChatPDF', url: 'https://www.chatpdf.com', stars: 4, pricing: '半免费', category: 'AI办公&效率提升工具', categoryIndex: 5, positioning: 'AI文档解析问答工具', audience: '办公人群、学生、科研人员、长文档处理用户', pros: 'AI文档解析标杆，百万字PDF一键解析，精准问答提取', cons: '国内访问受限，大文档处理需付费，免费额度有限' },
  { id: 75, name: 'GrammarlyGO', company: 'Grammarly', url: 'https://www.grammarly.com', stars: 4, pricing: '半免费', category: 'AI办公&效率提升工具', categoryIndex: 5, positioning: '英文写作AI润色工具', audience: '跨境从业者、留学生、英文写作需求用户', pros: '全球英文写作AI顶流，语法纠错、润色能力顶尖', cons: '中文适配弱，国内访问受限，高级功能付费' },
  { id: 76, name: 'Xmind AI', company: 'Xmind', url: 'https://xmind.cn', stars: 4, pricing: '半免费', category: 'AI办公&效率提升工具', categoryIndex: 5, positioning: 'AI思维导图生成工具', audience: '学生、办公人群、产品经理、项目管理者', pros: '国内思维导图顶流，AI一键生成，结构梳理、润色能力强', cons: '高级AI功能需付费，复杂思维导图生成稳定性一般' },
  { id: 77, name: 'Google Workspace Duet AI', company: 'Google', url: 'https://workspace.google.com/solutions/ai', stars: 4, pricing: '收费', category: 'AI办公&效率提升工具', categoryIndex: 5, positioning: '谷歌生态协同办公AI工具', audience: '海外办公人群、跨境团队、谷歌生态用户', pros: '谷歌办公AI顶流，深度集成谷歌全家桶，协同办公能力强', cons: '国内访问完全受限，必须付费订阅，中文适配一般' },
  { id: 78, name: '飞书妙计', company: '飞书', url: 'https://www.feishu.cn', stars: 4, pricing: '半免费', category: 'AI办公&效率提升工具', categoryIndex: 5, positioning: '会议AI转写纪要工具', audience: '企业办公人群、会议组织者、新媒体从业者', pros: '国内会议AI顶流，实时转写、纪要生成、重点提取能力强', cons: '需搭配飞书使用，高级功能付费，个人用户功能有限' },
  { id: 79, name: 'DeepL Write', company: 'DeepL', url: 'https://www.deepl.com/write', stars: 4, pricing: '半免费', category: 'AI办公&效率提升工具', categoryIndex: 5, positioning: '多语言AI写作润色工具', audience: '跨境从业者、留学生、商务写作需求用户', pros: '多语言AI写作润色标杆，翻译、润色精度远超同类工具', cons: '国内访问受限，中文适配一般，高级功能付费' },
  { id: 80, name: 'PDFelement AI', company: '万兴PDF', url: 'https://pdf.wondershare.cn', stars: 4, pricing: '半免费', category: 'AI办公&效率提升工具', categoryIndex: 5, positioning: '全功能AI PDF处理工具', audience: '办公人群、学生、企业法务、文档处理需求用户', pros: 'AI PDF处理顶流，解析、编辑、翻译、转换功能全覆盖', cons: '高级功能需付费购买，批量处理能力一般' },
  { id: 81, name: 'Miro AI', company: 'Miro', url: 'https://miro.com', stars: 3, pricing: '半免费', category: 'AI办公&效率提升工具', categoryIndex: 5, positioning: '在线白板AI协同工具', audience: '产品团队、设计团队、项目管理团队、头脑风暴小组', pros: '全球在线白板AI顶流，AI头脑风暴、协同设计能力强', cons: '国内访问受限，付费门槛高，中文适配一般' },
  { id: 82, name: '幕布AI', company: '幕布', url: 'https://mubu.com', stars: 3, pricing: '半免费', category: 'AI办公&效率提升工具', categoryIndex: 5, positioning: '大纲笔记&AI思维导图工具', audience: '学生、办公人群、知识管理需求用户', pros: '大纲笔记、思维导图工具，AI一键生成大纲，梳理结构高效', cons: '高级功能付费，生态完善度不足，多端同步一般' },
  { id: 83, name: 'Obsidian AI', company: 'Obsidian', url: 'https://obsidian.md', stars: 3, pricing: '半免费', category: 'AI办公&效率提升工具', categoryIndex: 5, positioning: '本地双链笔记AI工具', audience: '知识管理爱好者、科研人员、写作者', pros: '本地双链笔记顶流，AI插件生态完善，知识管理能力强', cons: '新手门槛高，AI功能需搭配插件，原生功能有限' },
  { id: 84, name: 'Trello AI', company: 'Trello', url: 'https://trello.com', stars: 3, pricing: '半免费', category: 'AI办公&效率提升工具', categoryIndex: 5, positioning: 'AI项目管理协同工具', audience: '中小企业团队、项目管理者、海外办公用户', pros: '全球项目管理AI标杆，AI任务拆解、团队协同能力强', cons: '国内访问受限，中文适配差，高级功能付费' },
  { id: 85, name: '滴答清单AI', company: '滴答清单', url: 'https://www.dida365.com', stars: 3, pricing: '半免费', category: 'AI办公&效率提升工具', categoryIndex: 5, positioning: 'AI任务管理&日程规划工具', audience: '办公人群、学生、时间管理需求用户', pros: '国内任务管理工具，AI任务拆解、日程规划能力强', cons: '高级AI功能付费，复杂项目管理能力不足' },

  // 六、AI编程&开发工具（15个）
  { id: 86, name: 'GitHub Copilot', company: 'GitHub', url: 'https://github.com/features/copilot', stars: 5, pricing: '半免费', category: 'AI编程&开发工具', categoryIndex: 6, positioning: '全球顶流AI编程辅助工具', audience: '全层级开发者、编程学习者、企业研发团队', pros: '全球AI编程顶流，代码生成、补全、调试能力顶尖，生态完善', cons: '核心功能需付费订阅，国内访问不稳定，新手引导不足' },
  { id: 87, name: 'Gemini Code Assist', company: 'Google', url: 'https://cloud.google.com/products/gemini/code-assist', stars: 4, pricing: '半免费', category: 'AI编程&开发工具', categoryIndex: 6, positioning: '谷歌生态AI编程辅助工具', audience: '开发者、谷歌云用户、GCP生态研发团队', pros: '谷歌旗舰AI编程工具，代码生成、调试、重构能力顶尖', cons: '国内访问受限，中文适配一般，深度集成仅支持谷歌生态' },
  { id: 88, name: 'Cursor', company: 'Cursor', url: 'https://cursor.sh', stars: 4, pricing: '半免费', category: 'AI编程&开发工具', categoryIndex: 6, positioning: 'AI原生代码编辑器', audience: '开发者、编程学习者、AI驱动开发需求用户', pros: 'AI原生代码编辑器，对话式编程、代码重构能力拉满，上手简单', cons: '大项目处理稳定性一般，内存占用高，付费门槛不低' },
  { id: 89, name: 'Replit', company: 'Replit', url: 'https://replit.com', stars: 4, pricing: '半免费', category: 'AI编程&开发工具', categoryIndex: 6, positioning: '在线AI编程开发平台', audience: '编程学习者、学生、轻量化开发需求开发者', pros: '全球知名在线AI编程平台，一键搭环境，全流程AI开发部署', cons: '国内访问受限，免费版算力有限，高级功能付费' },
  { id: 90, name: 'Google Colab AI', company: 'Google', url: 'https://colab.research.google.com', stars: 4, pricing: '半免费', category: 'AI编程&开发工具', categoryIndex: 6, positioning: '云端AI编程笔记本', audience: 'AI开发者、科研人员、学生、模型训练需求用户', pros: '谷歌AI编程笔记本，免费GPU算力，代码生成、模型训练能力强', cons: '国内访问受限，免费版算力有时间限制，中文适配一般' },
  { id: 91, name: 'Trae', company: '字节跳动', url: 'https://trae.ai', stars: 4, pricing: '免费', category: 'AI编程&开发工具', categoryIndex: 6, positioning: '本土化全链路AI开发平台', audience: '国内开发者、全栈工程师、企业研发团队', pros: '中文适配拉满，轻量化全平台，多模型集成，核心功能全免费', cons: '插件生态尚在早期，大项目处理易内存泄漏，稳定性待提升' },
  { id: 92, name: 'CodeLlama', company: 'Meta', url: 'https://github.com/facebookresearch/codellama', stars: 4, pricing: '免费', category: 'AI编程&开发工具', categoryIndex: 6, positioning: '开源代码大模型', audience: '开发者、企业私有化部署用户、AI模型研发人员', pros: '全球开源代码大模型标杆，多语言适配，自定义部署能力强', cons: '需自行部署，新手门槛高，无原生IDE集成' },
  { id: 93, name: 'JetBrains AI Assistant', company: 'JetBrains', url: 'https://www.jetbrains.com/ai', stars: 4, pricing: '收费', category: 'AI编程&开发工具', categoryIndex: 6, positioning: '专业IDE集成AI编程工具', audience: '专业开发者、企业研发团队、JetBrains生态用户', pros: '深度集成JetBrains全家桶，专业开发适配，代码重构能力强', cons: '必须付费订阅，仅支持自家IDE，新手门槛高' },
  { id: 94, name: 'VS Code AI', company: '微软', url: 'https://code.visualstudio.com', stars: 4, pricing: '免费', category: 'AI编程&开发工具', categoryIndex: 6, positioning: '主流编辑器原生AI编程工具', audience: '全层级开发者、编程学习者、微软生态用户', pros: '原生集成VS Code，全球使用率最高，插件生态完善，核心功能免费', cons: '高级功能需付费，大项目处理性能一般，内存占用高' },
  { id: 95, name: '豆包MarsCode', company: '字节跳动', url: 'https://www.marscode.cn', stars: 3, pricing: '半免费', category: 'AI编程&开发工具', categoryIndex: 6, positioning: '本土化AI编程辅助工具', audience: '国内开发者、编程学习者、全栈工程师', pros: '国内AI编程标杆，中文适配强，代码生成、调试全流程覆盖', cons: '海外生态适配一般，高级功能付费，IDE集成有限' },
  { id: 96, name: '通义灵码', company: '阿里达摩院', url: 'https://tongyi.aliyun.com/lingma', stars: 3, pricing: '免费', category: 'AI编程&开发工具', categoryIndex: 6, positioning: '企业级AI编程辅助工具', audience: '国内开发者、企业研发团队、阿里云生态用户', pros: '国内AI编程头部，多语言适配，深度集成主流IDE，核心功能免费', cons: '个人用户免费额度有限，创意代码生成能力一般' },
  { id: 97, name: 'Amazon CodeWhisperer', company: '亚马逊', url: 'https://aws.amazon.com/codewhisperer', stars: 3, pricing: '半免费', category: 'AI编程&开发工具', categoryIndex: 6, positioning: 'AWS生态AI编程辅助工具', audience: '开发者、AWS云用户、跨境研发团队', pros: 'AI编程能力强，代码安全检测优秀，免费额度充足', cons: '国内访问受限，中文适配一般，非AWS场景优势不足' },
  { id: 98, name: 'CodeGeeX', company: '智谱AI', url: 'https://codegeex.cn', stars: 3, pricing: '免费', category: 'AI编程&开发工具', categoryIndex: 6, positioning: '开源多语言AI编程工具', audience: '开发者、编程学习者、国内研发团队', pros: '国内开源AI编程标杆，多语言适配，代码生成、翻译能力强', cons: '大项目处理能力一般，生态完善度不足，IDE集成有限' },
  { id: 99, name: 'WindSurf', company: 'Codeium', url: 'https://codeium.com/windsurf', stars: 3, pricing: '半免费', category: 'AI编程&开发工具', categoryIndex: 6, positioning: 'AI原生代码编辑器', audience: '专业开发者、海外研发团队、AI驱动开发用户', pros: '知名AI原生代码编辑器，对话式编程、长代码处理能力突出', cons: '国内知名度低，访问受限，中文适配一般，付费门槛高' },
  { id: 100, name: 'Stable Code', company: 'Stability AI', url: 'https://stability.ai', stars: 3, pricing: '免费', category: 'AI编程&开发工具', categoryIndex: 6, positioning: '开源轻量化代码大模型', audience: '开发者、端侧部署需求用户、AI模型研发人员', pros: '全球开源代码大模型，多语言适配，轻量化高性能，部署灵活', cons: '需自行部署，新手门槛高，无原生IDE集成，生态完善度不足' },
];

// 分类列表
const categories = [
  { index: 1, name: '通用多模态大模型&对话助手', icon: 'fa-solid fa-robot' },
  { index: 2, name: 'AI绘画&视觉设计工具', icon: 'fa-solid fa-palette' },
  { index: 3, name: 'AI视频生成&剪辑工具', icon: 'fa-solid fa-video' },
  { index: 4, name: 'AI音频&语音处理工具', icon: 'fa-solid fa-music' },
  { index: 5, name: 'AI办公&效率提升工具', icon: 'fa-solid fa-briefcase' },
  { index: 6, name: 'AI编程&开发工具', icon: 'fa-solid fa-code' },
];

// 付费模式列表
const pricingModes = [
  { value: '全部', icon: 'fa-solid fa-layer-group', color: 'text-blue-400' },
  { value: '免费', icon: 'fa-solid fa-circle-check', color: 'text-green-400' },
  { value: '半免费', icon: 'fa-solid fa-circle-half-stroke', color: 'text-yellow-400' },
  { value: '收费', icon: 'fa-solid fa-coins', color: 'text-red-400' },
];

// 星级渲染
const renderStars = (stars: number) => {
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars % 1 !== 0;
  const elements = [];

  for (let i = 0; i < fullStars; i++) {
    elements.push(<i key={`full-${i}`} className="fa-solid fa-star text-yellow-400 text-xs"></i>);
  }
  if (hasHalfStar) {
    elements.push(<i key="half" className="fa-solid fa-star-half-alt text-yellow-400 text-xs"></i>);
  }
  for (let i = elements.length; i < 5; i++) {
    elements.push(<i key={`empty-${i}`} className="fa-regular fa-star text-yellow-400 text-xs"></i>);
  }

  return elements;
};

// 付费模式标签颜色
const getPricingColor = (pricing: string) => {
  switch (pricing) {
    case '免费': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case '半免费': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case '收费': return 'bg-red-500/20 text-red-400 border-red-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

interface AIToolsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AITools({ isOpen, onClose }: AIToolsProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState('');

  // 过滤工具
  const filteredTools = aiTools.filter(tool => {
    const matchesCategory = selectedCategory === null || tool.categoryIndex === selectedCategory;
    const matchesPricing = selectedPricing === '全部' || tool.pricing === selectedPricing;
    const matchesSearch = searchQuery === '' ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.positioning.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPricing && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* 模态框内容 */}
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 w-full max-w-6xl max-h-[90vh] shadow-2xl flex flex-col">
        {/* 标题栏 */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <div>
            <h3 className="text-white text-2xl font-bold">AI工具大全</h3>
            <p className="text-white/60 text-sm mt-1">100个精选AI工具，按费用和功能分类</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-2"
            aria-label="关闭"
          >
            <i className="fa-solid fa-times text-xl"></i>
          </button>
        </div>

        {/* 筛选栏 */}
        <div className="p-4 border-b border-white/10 space-y-4">
          {/* 搜索框 */}
          <div className="relative">
            <input
              type="text"
              placeholder="搜索工具名称、公司、定位..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pl-10 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
            />
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-white/40"></i>
          </div>

          {/* 功能分类 */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
              }`}
            >
              <i className="fa-solid fa-layer-group mr-2"></i>全部功能
            </button>
            {categories.map(cat => (
              <button
                key={cat.index}
                onClick={() => setSelectedCategory(cat.index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat.index
                    ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                    : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                }`}
              >
                <i className={`${cat.icon} mr-2`}></i>{cat.name}
              </button>
            ))}
          </div>

          {/* 费用筛选 */}
          <div className="flex gap-2">
            {pricingModes.map(mode => (
              <button
                key={mode.value}
                onClick={() => setSelectedPricing(mode.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPricing === mode.value
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                }`}
              >
                <i className={`${mode.icon} ${mode.color} mr-2`}></i>
                {mode.value}
              </button>
            ))}
          </div>
        </div>

        {/* 工具列表 */}
        <div className="flex-1 overflow-y-auto p-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            div[style*="scrollbar-width"]::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {filteredTools.length === 0 ? (
            <div className="text-center py-12">
              <i className="fa-solid fa-search text-white/20 text-5xl mb-4"></i>
              <p className="text-white/60">未找到匹配的AI工具</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTools.map(tool => (
                <div
                  key={tool.id}
                  className="bg-white/5 rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-all"
                >
                  {/* 头部：名称和星级 */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-semibold text-lg">{tool.name}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getPricingColor(tool.pricing)}`}>
                          {tool.pricing}
                        </span>
                      </div>
                      <p className="text-white/50 text-sm">{tool.company}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(tool.stars)}
                    </div>
                  </div>

                  {/* 定位 */}
                  <div className="mb-3">
                    <p className="text-blue-300 text-sm">
                      <i className="fa-solid fa-crosshairs mr-2"></i>
                      {tool.positioning}
                    </p>
                  </div>

                  {/* 适配人群 */}
                  <div className="mb-3">
                    <p className="text-white/70 text-sm">
                      <i className="fa-solid fa-users mr-2 text-white/50"></i>
                      {tool.audience}
                    </p>
                  </div>

                  {/* 优缺点 */}
                  <div className="space-y-2 mb-4">
                    <p className="text-green-400/80 text-xs">
                      <i className="fa-solid fa-circle-check mr-2"></i>
                      {tool.pros}
                    </p>
                    <p className="text-red-400/80 text-xs">
                      <i className="fa-solid fa-circle-xmark mr-2"></i>
                      {tool.cons}
                    </p>
                  </div>

                  {/* 访问按钮 */}
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 text-center py-2 rounded-lg transition-all font-medium"
                    onClick={onClose}
                  >
                    <i className="fa-solid fa-external-link-alt mr-2"></i>
                    访问官网
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 底部统计 */}
        <div className="p-4 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            共 <span className="text-white font-semibold">{filteredTools.length}</span> 个AI工具
            {selectedCategory !== null && ` · ${categories.find(c => c.index === selectedCategory)?.name}`}
            {selectedPricing !== '全部' && ` · ${selectedPricing}`}
          </p>
        </div>
      </div>
    </div>
  );
}
