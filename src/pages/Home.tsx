import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import HolidayCalendar from '@/components/HolidayCalendar';

// 定义链接数据类型
interface LinkItem {
  id: number;
  title: string;
  icon: string;
  url: string;
}

// 定义社交媒体链接类型
interface SocialItem {
  id: number;
  icon: string;
  url: string;
  name: string;
}

// 定义名言数据类型
interface Quote {
  text: string;
  author: string;
}

export default function Home() {
  // 状态管理
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState('');
  // 特别鸣谢模态框状态
  const [isThanksModalOpen, setIsThanksModalOpen] = useState(false);
  // 学习模态框状态
   const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);



  const [greeting, setGreeting] = useState('');
  

 


  // 名言状态
  const [currentQuote, setCurrentQuote] = useState<Quote>({
    text: "加载中...",
    author: "获取名言中"
  });
  const [quoteLoading, setQuoteLoading] = useState(true);
  
  // 电影模态框状态
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  
  // 时间胶囊模态框状态
    const [isTimeCapsuleModalOpen, setIsTimeCapsuleModalOpen] = useState(false);
   // AI工具模态框状态
   const [isAIToolsModalOpen, setIsAIToolsModalOpen] = useState(false);
   // 其他功能模态框状态
   const [isOtherModalOpen, setIsOtherModalOpen] = useState(false);
  // 实用工具模态框状态
  const [isUtilityModalOpen, setIsUtilityModalOpen] = useState(false);
   // 意见反馈弹窗状态
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  // 传送门警告弹窗状态
  const [isPortalWarningOpen, setIsPortalWarningOpen] = useState(false);
  // 更新日志弹窗状态
  const [isUpdateLogOpen, setIsUpdateLogOpen] = useState(false);
  // 传送门倒计时
  const [portalCountdown, setPortalCountdown] = useState(10);
  // 假期日历模态框状态
  const [isHolidayCalendarOpen, setIsHolidayCalendarOpen] = useState(false);
  

  
  // 时间进度数据
  const [timeProgress, setTimeProgress] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
  });

  // 网站运行时间
   // 计算网站运行天数（从2025年8月4日开始）
   const calculateSiteRuntime = () => {
     const startDate = new Date('2025-08-04');
     const now = new Date();
     const diffTime = Math.abs(now.getTime() - startDate.getTime());
     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
     return `${diffDays}天`;
   };
   
   const siteRuntime = calculateSiteRuntime();



  // 本地备份名言，当API不可用时使用
  const backupQuotes: Quote[] = [
    { text: "生活就像海洋，只有意志坚强的人才能到达彼岸。", author: "马克思" },
    { text: "如果冬天来了，春天还会远吗？", author: "雪莱" },
    { text: "世界上只有一种真正的英雄主义，那就是在认清生活的真相后依然热爱生活。", author: "罗曼·罗兰" },
    { text: "我们唯一需要恐惧的是恐惧本身。", author: "富兰克林·罗斯福" },
    { text: "人的价值，在遭受诱惑的一瞬间被决定。", author: "柏拉图" }
  ];

   // 获取名言数据 - 直接使用本地备份数据以避免API错误
   const fetchQuote = () => {
     setQuoteLoading(true);
     
     // 短暂延迟模拟加载过程
     setTimeout(() => {
       // 使用随机本地备份名言
       const randomIndex = Math.floor(Math.random() * backupQuotes.length);
       setCurrentQuote(backupQuotes[randomIndex]);
       setQuoteLoading(false);
     }, 500);
   };
  
   // 初始获取名言并设置自动刷新
  useEffect(() => {
    fetchQuote();
    
    // 每30秒自动获取新名言
     const quoteInterval = setInterval(fetchQuote, 5000);
    
    return () => clearInterval(quoteInterval);
  }, []);
  
  // 计算时间进度并设置定时器
  useEffect(() => {
    const calculateTimeProgress = () => {
      const now = new Date();
      
      // 今日进度 (0-24小时)
      const hoursPassed = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
      const dailyProgress = Math.min(Math.round((hoursPassed / 24) * 100), 100);
      
      // 本周进度 (0-7天)
      const dayOfWeek = now.getDay() || 7; // 转换为周一为1，周日为7
      const weeklyProgress = Math.round((dayOfWeek / 7) * 100);
      
      // 本月进度 (0-当月天数)
      const dayOfMonth = now.getDate();
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const monthlyProgress = Math.round((dayOfMonth / daysInMonth) * 100);
      
      // 今年进度 (0-12个月)
      const monthOfYear = now.getMonth() + 1;
      const yearlyProgress = Math.round((monthOfYear / 12) * 100);
      
      setTimeProgress({
        daily: dailyProgress,
        weekly: weeklyProgress,
        monthly: monthlyProgress,
        yearly: yearlyProgress
      });
    };
    
    // 初始化计算
    calculateTimeProgress();
    
    // 每分钟更新一次进度
    const timer = setInterval(calculateTimeProgress, 60000);
    
    return () => clearInterval(timer);
   }, []);

   // 禁用右键菜单功能
   useEffect(() => {
     const handleContextMenu = (e: Event) => {
        e.preventDefault();
        toast('为优化体验，本站禁用右键', {
          position: 'bottom-right',
          className: 'bg-black/80 text-white border-none'
        });
     };
     
     document.addEventListener('contextmenu', handleContextMenu);
     return () => {
       document.removeEventListener('contextmenu', handleContextMenu);
     };
   }, []);
   // 传送门导航处理函数
    const cancelPortalNavigation = () => {
      setIsPortalWarningOpen(false);
      setPortalCountdown(10); // 重置倒计时
    };
    
    // 倒计时和自动导航效果
    useEffect(() => {
      if (!isPortalWarningOpen || portalCountdown <= 0) return;
      
      const timer = setTimeout(() => {
        setPortalCountdown(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }, [isPortalWarningOpen, portalCountdown]);
    
    // 当倒计时结束时自动导航
    useEffect(() => {
      if (portalCountdown === 0 && isPortalWarningOpen) {
        confirmPortalNavigation();
      }
    }, [portalCountdown, isPortalWarningOpen]);
   
   const confirmPortalNavigation = () => {
     setIsPortalWarningOpen(false);
     // 这里可以添加实际的导航逻辑
     window.open('https://travel.moe/go', '_blank');
   };
   
   // 链接数据
      // 当前页码状态
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 6; // 每页显示6个功能按钮
      
       // 功能按钮数据
      const featureLinks: LinkItem[] = [
        { id: 1, title: '天气', icon: 'fa-solid fa-cloud-sun', url: 'https://www.msn.cn/zh-cn/weather/forecast/in-%E5%B9%BF%E4%B8%9C%E7%9C%81,%E7%BD%97%E6%B9%96%E5%8C%BA?loc=eyJsIjoi572X5rmW5Yy6IiwiciI6IuW5v%2BS4nOecgSIsImMiOiLkuK3ljY7kurrmsJHlhbHlkozlm70iLCJpIjoiQ04iLCJnIjoiemgtY24iLCJ4IjoiMTE0LjEzMTk4NDkyIiwieSI6IjIyLjU1MDE4MTUifQ%3D%3D&weadegreetype=C&ocid=ansmsnw' },
         { id: 2, title: '影视', icon: 'fa-solid fa-film', url: '#' },
        { id: 3, title: '音乐', icon: 'fa-solid fa-music', url: 'https://music.imsyy.com/' },
        { id: 4, title: '学习', icon: 'fa-solid fa-book', url: '#' },
         { id: 8, title: 'AI工具', icon: 'fa-solid fa-robot', url: '#' },
         { id: 7, title: '实用工具', icon: 'fa-solid fa-wrench', url: 'https://fly63.com/tool/home.html' },
         { id: 6, title: '时间胶囊', icon: 'fa-solid fa-hourglass-half', url: '#' },
            { id: 9, title: '传送门', icon: 'fa-solid fa-link', url: 'https://travel.moe/go' },

             { id: 11, title: '假期日历', icon: 'fa-solid fa-calendar-days', url: '#' },
             { id: 10, title: '其他', icon: 'fa-solid fa-ellipsis-h', url: '#' },
       ];
      
      // 计算总页数
      const totalPages = Math.ceil(featureLinks.length / itemsPerPage);
      
      // 获取当前页显示的功能按钮
      const currentFeatureLinks = featureLinks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      
      // 处理鼠标滚轮事件实现翻页
      const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        if (e.deltaY > 0 && currentPage < totalPages) {
          // 向下滚动，下一页
          setCurrentPage(prev => prev + 1);
        } else if (e.deltaY < 0 && currentPage > 1) {
          // 向上滚动，上一页
          setCurrentPage(prev => prev - 1);
        }
      };
      
      // 处理页码点击事件
      const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
          setCurrentPage(page);
        }
      };

  // 社交媒体数据
const socialItems: SocialItem[] = [
  { id: 1, icon: 'fa-brands fa-github', url: 'https://github.com/lyjy6666', name: 'GitHub' },
  { id: 2, icon: 'fa-brands fa-tiktok', url: 'https://www.douyin.com/user/MS4wLjABAAAAK2HSwJN07NwDYxX-0A3YpvAPQ00MSUw-TCqKM-xlBFT70ozZdm9FxHgSHGapYT_S', name: '抖音' },
  { id: 3, icon: 'fa-brands fa-bilibili', url: 'https://space.bilibili.com/1983970346?spm_id_from=333.1007.0.0', name: 'bilibili' },
];

  // 更新时间和日期
  useEffect(() => {
    // 设置初始日期
    updateDate();
    
    // 设置问候语
    setGreeting(getGreeting());
    
    // 更新时间
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // 更新日期（每天更新一次）
    const dateTimer = setInterval(() => {
      updateDate();
      setGreeting(getGreeting());
    }, 86400000); // 24小时

    return () => {
      clearInterval(timer);
      clearInterval(dateTimer);
    };
  }, []);

  // 更新日期函数
  const updateDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    };
    setCurrentDate(new Date().toLocaleDateString('zh-CN', options));
  };

  // 获取问候语函数
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return '凌晨好';
    if (hour < 9) return '早上好';
    if (hour < 12) return '上午好';
    if (hour < 14) return '中午好';
    if (hour < 18) return '下午好';
    if (hour < 22) return '晚上好';
    return '夜深了';
  };

  // 格式化时间显示
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
     <div className="min-h-screen flex flex-col relative overflow-hidden">
       {/* 背景图片 */}
       <div className="absolute inset-0 z-0">
            <img 
     src="https://lf-code-agent.coze.cn/obj/x-ai-cn/268624684546/attachment/20241210m7963n_20250804152700.webp" 
    alt="Background" 
            className="w-full h-full object-cover"
          />
         {/* 背景渐变覆盖层，增强文字可读性 */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>
       </div>
 


        {/* 顶部通知栏 */}
        <div className="relative z-10 bg-black/40 text-white text-sm py-2 px-4 backdrop-blur-md flex justify-center">
          <span>{greeting}，欢迎来到我的主页</span>
           </div>
  
         {/* 搜索框 - 位于欢迎消息下方 */}
         <div 
           className="relative z-10 bg-black/40 backdrop-blur-md py-3 px-4 border-b border-white/10 cursor-pointer group"
           onClick={() => window.location.href = 'https://lyjysearch.netlify.app'}
         >
           <div className="container mx-auto flex items-center justify-center">
             <div className="relative w-full max-w-2xl">
               <input
                 type="text"
                 placeholder="点击搜索..."
                 className="w-full pl-10 pr-4 py-3 rounded-full border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all group-hover:border-blue-400 group-hover:bg-white/15"
                 readOnly
               />
               <i className="fa-solid fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 group-hover:text-blue-400 transition-colors"></i>
             </div>
           </div>
         </div>
  
         {/* 主内容区 */}
         <main className="relative z-10 flex-grow container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-center md:justify-between max-w-5xl">
         {/* 左侧：头像和名称 */}
         <div className="flex flex-col items-center md:items-start mb-10 md:mb-0 md:mr-10">
           <div className="relative mb-6">
             <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                <img 
                   src="https://lf-code-agent.coze.cn/obj/x-ai-cn/268624684546/attachment/49a4d7337146cc652592d861806afccf_20250804153303.jpg" 
                   alt="Avatar" 
                   className="w-full h-full object-cover rounded-full opacity-80"
                 />
             </div>
           </div>
             <h1 className="text-3xl md:text-4xl font-light text-white tracking-wider mb-2">lyjy的小站~</h1>
              <div className="hidden">
                {/* 已移至顶部的模态框状态 */}
              </div>
           
           {/* 简介/引用区域 */}
             {/* 名言区域 - 可点击切换 */}
             <div 
               className="mt-8 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 max-w-md w-full cursor-pointer hover:bg-white/15 transition-all duration-300 transform hover:scale-[1.02]"
               onClick={fetchQuote}
               title="点击切换名言"
             >
               <p className="text-white/90 text-base md:text-lg italic leading-relaxed">
                  "{quoteLoading ? '加载中...' : currentQuote.text}"
                  {quoteLoading && (
                    <div className="inline-block ml-2 animate-spin">
                      <i className="fa-solid fa-circle-notch fa-spin"></i>
                    </div>
                  )}
               </p>
               <p className="text-white/70 text-sm mt-3 text-right">
                 - {quoteLoading ? '获取中...' : currentQuote.author}
               </p>

             </div>
         </div>
 
         {/* 右侧：日期时间和链接 */}
         <div className="w-full md:w-auto">
            <div className="grid grid-cols-1 gap-4 mb-8">
              {/* 日期时间卡片 */}
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/10 w-full shadow-md">
                <p className="text-white/70 text-sm mb-1">{currentDate}</p>
                <p className="text-white text-3xl font-mono font-light">{formatTime(currentTime)}</p>

              </div>
           </div>
 
            {/* 链接卡片网格 */}
              {/* 添加鼠标滚轮事件监听器实现翻页 */}
              <div 
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
                onWheel={handleWheel}
                style={{ touchAction: 'none' }} // 防止触摸设备上的默认滚动行为
              >
                {/* 当前页的功能按钮 */}
                {currentFeatureLinks.map(link => (
                  <a 
                    key={link.id}
                    href={link.url}
                     className={`group bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/10 hover:bg-white/20 transition-all duration-300 flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:scale-105`}
                      aria-label={link.title}
                        onClick={(e) => {
                          e.preventDefault();
                          if (link.id === 1 || link.id === 3) {
                            // 天气和音乐按钮在新标签页打开
                            window.open(link.url, '_blank');
                           } else if (link.id === 2) {
                             // 影视按钮打开模态框
                             setIsMovieModalOpen(true);
                            } else if (link.id === 11) {
                              // 打开假期日历模态框
                              setIsHolidayCalendarOpen(true);
                            } else if (link.id === 4) {
                             setIsStudyModalOpen(true);
                           } else if (link.id === 7) {
                              setIsUtilityModalOpen(true);
                          } else if (link.id === 8) {
                              setIsAIToolsModalOpen(true);
                          } else if (link.id === 6) {
                              // 打开时间胶囊模态框
                              setIsTimeCapsuleModalOpen(true);
                          } else if (link.id === 9) {
                              // 打开传送门警告弹窗
                              setIsPortalWarningOpen(true);
                           } else if (link.id === 10) {
                               // 打开"其他"功能模态框
                            setIsOtherModalOpen(true);
                       }
                      }}
                  >
                    <i className={`${link.icon} text-white/80 text-xl mb-2 group-hover:text-white transition-colors`}></i>
                    <span className="text-white/80 text-sm group-hover:text-white transition-colors">{link.title}</span>
                  </a>
                ))}
              </div>
              
               {/* 分页按钮 - 移到假期日历下 */}
               {totalPages > 1 && (
                 <div className="mt-8 flex justify-center">
                   <div className="relative w-1/2 bg-white/20 h-1 rounded-full cursor-pointer">
                     <button
                       onClick={() => handlePageChange(1)}
                       className={`absolute left-0 top-0 h-full w-1/2 transition-all duration-300 ${
                         currentPage === 1 ? 'bg-white/40 rounded-l-full' : 'hover:bg-white/30 rounded-l-full'
                       }`}
                       aria-label="第一页"
                     ></button>
                     <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/30"></div>
                     <button
                       onClick={() => handlePageChange(2)}
                       className={`absolute right-0 top-0 h-full w-1/2 transition-all duration-300 ${
                         currentPage === 2 ? 'bg-white/40 rounded-r-full' : 'hover:bg-white/30 rounded-r-full'
                       }`}
                       aria-label="第二页"
                     ></button>
                   </div>
                 </div>
               )}
            
            {/* 电影网站选择模态框 */}
            {isMovieModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* 背景遮罩 */}
                <div 
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                  onClick={() => setIsMovieModalOpen(false)}
                ></div>
                
                {/* 模态框内容 */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 w-full max-w-md shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="text-white text-xl font-semibold">选择影视网站</h3>
                    <button 
                      onClick={() => setIsMovieModalOpen(false)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <i className="fa-solid fa-times text-lg"></i>
                    </button>
                  </div>
                  
                     <div className="space-y-4">
                       <a 
                         href="https://jpyy.com" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="block w-full bg-white/15 hover:bg-white/25 transition-colors p-4 rounded-xl text-white text-left font-medium"
                         onClick={() => setIsMovieModalOpen(false)}
                       >
                         <i className="fa-solid fa-film mr-2"></i>金牌影院（微卡，但无广）
                       </a>
                       
                       <a 
                         href="https://ixkw.cc" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="block w-full bg-white/15 hover:bg-white/25 transition-colors p-4 rounded-xl text-white text-left font-medium"
                         onClick={() => setIsMovieModalOpen(false)}
                       >
                          <i className="fa-solid fa-video mr-2"></i>星空影院（不卡，但视频中有广）
                        </a>
                        
                         <a 
                           href="https://jzb762.com/" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="block w-full bg-white/15 hover:bg-white/25 transition-colors p-4 rounded-xl text-white text-left font-medium"
                           onClick={() => setIsMovieModalOpen(false)}
                         >
                           <i className="fa-solid fa-tv mr-2"></i>极直播（体育比赛直播）
                         </a>
                      </div>
                  
                  <p className="text-white/40 text-xs text-center mt-6">
                    点击外部区域或关闭按钮也可关闭
                  </p>
                </div>
              </div>
              )}

              {/* 更新日志弹窗 */}
              {isUpdateLogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  {/* 背景遮罩 */}
                  <div 
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={() => setIsUpdateLogOpen(false)}
                  ></div>
                  
                  {/* 弹窗内容 */}
                  <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden">
                    {/* 标题栏 */}
                    <div className="flex justify-between items-center p-4 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-800">更新日志</h3>
                      <button 
                        onClick={() => setIsUpdateLogOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                        aria-label="关闭"
                      >
                        <i className="fa-solid fa-times"></i>
                      </button>
                    </div>
                    
                    {/* 内容区域 */}
                    <div className="p-6 max-h-[60vh] overflow-y-auto">
                      {/* 最新更新 */}
                        <div className="mb-8">  
                           <div className="flex items-center mb-3">
                             <div className="w-3 h-10 bg-blue-500 rounded-l mr-4"></div>
                             <h4 className="text-lg font-semibold text-gray-800">2026.1.29 更新 v2.4</h4>
                           </div>
                           <ul className="ml-7 space-y-2 text-gray-600">
                             <li className="flex items-start">
                               <i className="fa-solid fa-circle text-xs mt-1.5 mr-2 text-gray-400"></i>
                               <span>增加了假期日历</span>
                             </li>
                             <li className="flex items-start">
                               <i className="fa-solid fa-circle text-xs mt-1.5 mr-2 text-gray-400"></i>
                               <span>修复了一些已知问题</span>
                             </li>
                           </ul>
                         </div>
                         <div className="mb-8">  
                            <div className="flex items-center mb-3">
                              <div className="w-3 h-10 bg-gray-300 rounded-l mr-4"></div>
                              <h4 className="text-lg font-semibold text-gray-800">2025.8.27 更新 v2.2</h4>
                            </div>
                           <ul className="ml-7 space-y-2 text-gray-600">
                             <li className="flex items-start">
                               <i className="fa-solid fa-circle text-xs mt-1.5 mr-2 text-gray-400"></i>
                               <span>新增了一些内容</span>
                             </li>
                             <li className="flex items-start">
                               <i className="fa-solid fa-circle text-xs mt-1.5 mr-2 text-gray-400"></i>
                               <span>修复了一些已知问题</span>
                             </li>
                           </ul>
                         </div>
                        <div className="mb-8">  
                           <div className="flex items-center mb-3">
                             <div className="w-3 h-10 bg-gray-300 rounded-l mr-4"></div>
                             <h4 className="text-lg font-semibold text-gray-800">2025.8.11 更新 v2.1</h4>
                          </div>
                          <ul className="ml-7 space-y-2 text-gray-600">
                            <li className="flex items-start">
                              <i className="fa-solid fa-circle text-xs mt-1.5 mr-2 text-gray-400"></i>
                              <span>ai功能ui界面大调整</span>
                            </li>
                            <li className="flex items-start">
                              <i className="fa-solid fa-circle text-xs mt-1.5 mr-2 text-gray-400"></i>
                              <span>页面更加美观</span>
                            </li>
                            <li className="flex items-start">
                              <i className="fa-solid fa-circle text-xs mt-1.5 mr-2 text-gray-400"></i>
                              <span>修复了一些已知问题，提升体验感</span>
                            </li>
                          </ul>
                        </div>
                      
                      {/* 历史更新 */}
                      <div className="mb-8">  
                        <div className="flex items-center mb-3">
                          <div className="w-3 h-10 bg-gray-300 rounded-l mr-4"></div>
                          <h4 className="text-lg font-semibold text-gray-800">2025.8.6 更新 v2.0</h4>
                        </div>
                        <ul className="ml-7 space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <i className="fa-solid fa-circle text-xs mt-1.5 mr-2 text-gray-400"></i>
                            <span>新增传送门等功能</span>
                          </li>
                          <li className="flex items-start">
                            <i className="fa-solid fa-circle text-xs mt-1.5 mr-2 text-gray-400"></i>
                            <span>我的搜索页也上线啦，新增跳转搜索页按钮</span>
                          </li>
                          <li className="flex items-start">
                            <i className="fa-solid fa-circle text-xs mt-1.5 mr-2 text-gray-400"></i>
                            <span>修复了一些已知问题</span>
                          </li>
                        </ul>
                      </div>
                      
                      {/* 初始版本 */}
                      <div>  
                        <div className="flex items-center mb-3">
                          <div className="w-3 h-10 bg-gray-300 rounded-l mr-4"></div>
                          <h4 className="text-lg font-semibold text-gray-800">2025.8.4 发布 v1.0</h4>
                        </div>
                        <ul className="ml-7 space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <i className="fa-solid fa-circle text-xs mt-1.5 mr-2 text-gray-400"></i>
                            <span>网站上线啦</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* 底部按钮 */}
                    <div className="p-4 border-t border-gray-200 flex justify-end">
                      <button 
                        onClick={() => setIsUpdateLogOpen(false)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                      >
                        我知道了
                      </button>
                    </div>
                  </div>
                </div>
              )}
    </div>
         

          {/* 其他功能模态框 */}
          {isOtherModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* 背景遮罩 */}
              <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setIsOtherModalOpen(false)}
              ></div>
              
              {/* Modal content */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 w-full max-w-md shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white text-xl font-semibold">其他功能</h3>
                  <button 
                    onClick={() => setIsOtherModalOpen(false)}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="关闭"
                  >
                    <i className="fa-solid fa-times text-lg"></i>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white text-lg font-medium mb-4">特别鸣谢</h4>
                    <div className="space-y-4 text-white">
                      <div>
                        <p className="text-white/90 mb-2">个人空间网：</p>
                        <a href="http://gerenzhuye.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm break-all">gerenzhuye.com</a>
                      </div>
                      
                      <div>
                        <p className="text-white/90 mb-2">扣子空间：</p>
                        <a href="https://space.coze.cn/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm break-all">https://space.coze.cn/</a>
                      </div>
                      
                      <div>
                        <p className="text-white/90 mb-2">imsyy：</p>
                        <div className="flex flex-col space-y-1">
                          <a href="https://www.imsyy.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm break-all">https://www.imsyy.com/</a>
                          <a href="https://music.imsyy.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm break-all">https://music.imsyy.com/</a>
                       </div>
                     </div>
                     
                     <div className="pt-6 border-t border-white/10">
                       <h4 className="text-white text-lg font-medium mb-4">意见反馈</h4>
                        <button 
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                          onClick={() => {
                            setIsOtherModalOpen(false);
                            setIsFeedbackModalOpen(true);
                          }}
                        >
                         <i className="fa-solid fa-comment-dots mr-2"></i>提交意见反馈
                       </button>
                     </div>
                    </div>
                  </div>
                  
                </div>
                
                <p className="text-white/40 text-xs text-center mt-6">
                   点击外部区域或关闭按钮可关闭
                 </p>
               </div>
            </div>
          )}

          {/* 学习模态框 */}
          {isStudyModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* 背景遮罩 */}
              <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setIsStudyModalOpen(false)}
              ></div>
              
              {/* 模态框内容 */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 w-full max-w-md shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white text-xl font-semibold">学习资源</h3>
                  <button 
                    onClick={() => setIsStudyModalOpen(false)}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="关闭"
                  >
                    <i className="fa-solid fa-times text-lg"></i>
                  </button>
                </div>
                
                    <div className="space-y-4">
                        <a 
                          href="https://calc.kafuchino.top/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block w-full bg-white/15 hover:bg-white/25 transition-colors p-4 rounded-xl text-white text-left font-medium"
                          onClick={() => setIsStudyModalOpen(false)}
                        >
                          <i className="fa-solid fa-calculator mr-2"></i>函数计算器
                       </a>
                       
                       <a 
                         href="https://fanyi.youdao.com/" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="block w-full bg-white/15 hover:bg-white/25 transition-colors p-4 rounded-xl text-white text-left font-medium"
                         onClick={() => setIsStudyModalOpen(false)}
                       >
                         <i className="fa-solid fa-language mr-2"></i>有道翻译
                       </a>
                    </div>
                
                <p className="text-white/40 text-xs text-center mt-6">
                  点击外部区域或关闭按钮可关闭
                </p>
              </div>
            </div>
          )}
          {/* 时间胶囊模态框 */}
          {isTimeCapsuleModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* 背景遮罩 */}
              <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setIsTimeCapsuleModalOpen(false)}
              ></div>
              
              {/* 模态框内容 */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 w-full max-w-md shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white text-xl font-semibold">时间胶囊</h3>
                  <button 
                    onClick={() => setIsTimeCapsuleModalOpen(false)}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="关闭"
                  >
                    <i className="fa-solid fa-times text-lg"></i>
                  </button>
                </div>
                
                <div className="space-y-6 text-white">
                  <div>
                    <p className="text-white/90 mb-2">今日已经度过了 {Math.floor(currentTime.getHours())} 小时</p>
                    <div className="w-full bg-white/10 rounded-full h-2.5 mb-1">
                      <div 
                        className="bg-blue-500 h-2.5 rounded-full" 
                        style={{ width: `${timeProgress.daily}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-sm text-white/70">{timeProgress.daily}%</p>
                  </div>
                  
                  <div>
                    <p className="text-white/90 mb-2">本周已经度过了 {currentTime.getDay() || 7} 天</p>
                    <div className="w-full bg-white/10 rounded-full h-2.5 mb-1">
                      <div 
                        className="bg-blue-500 h-2.5 rounded-full" 
                        style={{ width: `${timeProgress.weekly}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-sm text-white/70">{timeProgress.weekly}%</p>
                  </div>
                  
                  <div>
                    <p className="text-white/90 mb-2">本月已经度过了 {currentTime.getDate()} 天</p>
                    <div className="w-full bg-white/10 rounded-full h-2.5 mb-1">
                      <div 
                        className="bg-blue-500 h-2.5 rounded-full" 
                        style={{ width: `${timeProgress.monthly}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-sm text-white/70">{timeProgress.monthly}%</p>
                  </div>
                  
                  <div>
                    <p className="text-white/90 mb-2">今年已经度过了 {currentTime.getMonth() + 1} 个月</p>
                    <div className="w-full bg-white/10 rounded-full h-2.5 mb-1">
                      <div 
                        className="bg-blue-500 h-2.5 rounded-full" 
                        style={{ width: `${timeProgress.yearly}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-sm text-white/70">{timeProgress.yearly}%</p>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/90">本站已经运行了 {siteRuntime}</p>
                  </div>
                </div>
                
                <p className="text-white/40 text-xs text-center mt-6">
                  点击外部区域或关闭按钮可关闭
                </p>
              </div>
            </div>
          )}
          
           {/* 实用工具模态框 */}
           {isUtilityModalOpen && (
             <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
               {/* 背景遮罩 */}
               <div 
                 className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                 onClick={() => setIsUtilityModalOpen(false)}
               ></div>
               
               {/* 模态框内容 */}
               <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6 w-full max-w-md shadow-2xl">
                 <div className="flex justify-between items-center mb-6">
                   <h3 className="text-white text-xl font-semibold">实用工具</h3>
                   <button 
                     onClick={() => setIsUtilityModalOpen(false)}
                     className="text-white/60 hover:text-white transition-colors"
                     aria-label="关闭"
                   >
                     <i className="fa-solid fa-times text-lg"></i>
                   </button>
                 </div>
                 
                       <div className="space-y-4">
          <a 
            href="https://tools.kafuchino.top/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full bg-white/15 hover:bg-white/25 transition-colors p-4 rounded-xl text-white text-center font-medium"
            onClick={() => setIsUtilityModalOpen(false)}
          >
            <i className="fa-solid fa-wrench mr-2"></i>kafuchino工具集
          </a>
          <a 
           href="https://unitools.fun/#categoryCode=image" 
           target="_blank" 
           rel="noopener noreferrer"
           className="block w-full bg-white/15 hover:bg-white/25 transition-colors p-4 rounded-xl text-white text-center font-medium"
           onClick={() => setIsUtilityModalOpen(false)}
         >
           <i className="fa-solid fa-image mr-2"></i>万事通工具箱
         </a>
         
         <a 
           href="https://fly63.com/tool/home.html" 
           target="_blank" 
           rel="noopener noreferrer"
           className="block w-full bg-white/15 hover:bg-white/25 transition-colors p-4 rounded-xl text-white text-center font-medium"
           onClick={() => setIsUtilityModalOpen(false)}
         >
           <i className="fa-solid fa-wrench mr-2"></i>fly63工具箱
         </a>
         
         <a 
           href="https://kaifa.baidu.com/" 
           target="_blank" 
           rel="noopener noreferrer"
           className="block w-full bg-white/15 hover:bg-white/25 transition-colors p-4 rounded-xl text-white text-center font-medium"
           onClick={() => setIsUtilityModalOpen(false)}
         >
           <i className="fa-solid fa-code mr-2"></i>kaifa.baidu.com <span className="text-red-400">! 开发专用 !</span>
         </a>
       </div>
                 
                 <p className="text-white/40 text-xs text-center mt-6">
                   点击外部区域或关闭按钮也可关闭
                 </p>
               </div>
             </div>
           )}
           
            {/* AI工具模态框 */}
            {isAIToolsModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* 背景遮罩 */}
                <div 
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                  onClick={() => setIsAIToolsModalOpen(false)}
                ></div>
                
                {/* 模态框内容 */}
                    <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6 w-full max-w-4xl shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white text-xl font-semibold">AI工具</h3>
                    <button 
                      onClick={() => setIsAIToolsModalOpen(false)}
                      className="text-white/60 hover:text-white transition-colors"
                      aria-label="关闭"
                    >
                      <i className="fa-solid fa-times text-lg"></i>
                    </button>
                  </div>
                   
                  <div className="space-y-6">
                    <div className="text-white text-lg font-medium mb-2">推荐</div>
                     <div className="space-y-2">
                       <a 
                         href="https://www.doubao.com" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="block w-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors px-6 py-4 rounded-lg text-white text-left font-medium"
                         onClick={() => setIsAIToolsModalOpen(false)}
                         title="豆包AI"
                       >
                          <i className="fa-solid fa-robot mr-3"></i>豆包（日常完全够用，推荐指数 <i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star-half-alt text-yellow-400"></i>）
                       </a>
                       
                       <a 
                         href="https://www.tongyi.com" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="block w-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors px-6 py-4 rounded-lg text-white text-left font-medium"
                         onClick={() => setIsAIToolsModalOpen(false)}
                         title="通义千问"
                       >                        
                          <i className="fa-solid fa-comment-dots mr-3"></i>通义千问（日常也够用，模型多，推荐指数 <i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star-half-alt text-yellow-400"></i>）
                       </a>
                       
                       <a 
                         href="https://space.coze.cn" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="block w-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors px-6 py-4 rounded-lg text-white text-left font-medium"
                         onClick={() => setIsAIToolsModalOpen(false)}
                         title="扣子空间"
                       >
                          <i className="fa-solid fa-cube mr-3"></i>扣子（较高难度需要用到，有很多ai专家和插件，推荐指数 <i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-regular fa-star text-yellow-400"></i>）
                       </a>
                       
                       <a 
                         href="https://www.trae.cn" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="block w-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors px-6 py-4 rounded-lg text-white text-left font-medium"
                         onClick={() => setIsAIToolsModalOpen(false)}
                         title="TRAE"
                       >
                           <i className="fa-solid fa-cogs mr-3"></i>trae（编程专用，效果好，推荐指数 <i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star-half-alt text-yellow-400"></i>）
                        </a>

                       <a 
                         href="https://www.haisnap.com" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="block w-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors px-6 py-4 rounded-lg text-white text-left font-medium"
                         onClick={() => setIsAIToolsModalOpen(false)}
                         title="haisnap"
                       >
                           <i className="fa-solid fa-code mr-3"></i>haisnap（基本主要与编程有关，推荐指数 <i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-regular fa-star text-yellow-400"></i>）
                         </a>

                        <a 
                          href="https://autoglm.zhipuai.cn/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block w-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors px-6 py-4 rounded-lg text-white text-left font-medium"
                          onClick={() => setIsAIToolsModalOpen(false)}
                          title="autoglm"
                        >
                           <i className="fa-solid fa-robot mr-3"></i>autoglm（可以自己操控电脑/手机，自己上各大平台搜索，推荐指数 <i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-regular fa-star text-yellow-400"></i>）
                        </a>

                         <div className="text-white text-lg font-medium mb-2">不太推荐</div>

                       <a 
                         href="https://www.deepseek.com" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="block w-full bg-gray-700 hover:bg-gray-600 transition-colors px-6 py-4 rounded-lg text-white text-left font-medium opacity-50 cursor-not-allowed"
                         title="DeepSeek"
                       >
                          <i className="fa-solid fa-microchip mr-3"></i>DeepSeek（错误多，推荐指数 <i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star-half-alt text-yellow-400"></i><i className="fa-regular fa-star text-yellow-400"></i><i className="fa-regular fa-star text-yellow-400"></i>）
                       </a>
                       
                       <a 
                         href="https://chatgpt.com" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="block w-full bg-gray-700 hover:bg-gray-600 transition-colors px-6 py-4 rounded-lg text-white text-left font-medium opacity-50"
                         title="ChatGPT"
                       >
                          <i className="fa-solid fa-brain mr-3"></i>ChatGPT（需要魔法嘿嘿，推荐指数 <i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star text-yellow-400"></i><i className="fa-solid fa-star-half-alt text-yellow-400"></i><i className="fa-regular fa-star text-yellow-400"></i><i className="fa-regular fa-star text-yellow-400"></i>）
                       </a>
                     </div>
                  </div>
                </div>
              </div>
            )}
            
               </main>

              {/* 假期日历模态框 */}
              <HolidayCalendar 
                isOpen={isHolidayCalendarOpen} 
                onClose={() => setIsHolidayCalendarOpen(false)} 
              />

               {/* 左下角版本号 */}
   <div className="fixed bottom-6 left-6 text-orange-300 text-4xl font-bold transform -rotate-12 z-20">v2.4</div>

            {/* 意见反馈弹窗 */}
            {isFeedbackModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* 背景遮罩 */}
                <div 
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                  onClick={() => setIsFeedbackModalOpen(false)}
                ></div>
                
                {/* 弹窗内容 */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
                  <button 
                    className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                    onClick={() => setIsFeedbackModalOpen(false)}
                    aria-label="关闭"
                  >
                    <i className="fa-solid fa-times text-lg"></i>
                  </button>
                  
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className="fa-solid fa-envelope text-blue-400 text-2xl"></i>
                    </div>
                    
                    <h3 className="text-white text-xl font-semibold mb-4">意见反馈</h3>
                    
                    <p className="text-white/90 text-base mb-6 leading-relaxed">
                      请通过 lyjy0505@qq.com 联系我，<br />感谢您的宝贵意见
                    </p>
                    
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl transition-colors"
                      onClick={() => setIsFeedbackModalOpen(false)}
                    >
                      我知道了
                    </button>
                  </div>
                </div>
              </div>
            )}
            
             {/* 传送门警告弹窗 */}
             {isPortalWarningOpen && (
               <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                 {/* 背景遮罩 */}
                 <div 
                   className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                   onClick={cancelPortalNavigation}
                 ></div>
                 
                 {/* 弹窗内容 */}
                 <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
                   <button 
                     className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                     onClick={cancelPortalNavigation}
                     aria-label="关闭"
                   >
                     <i className="fa-solid fa-times text-lg"></i>
                   </button>
                   
                   <div className="text-center py-6">
                     <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                       <i className="fa-solid fa-exclamation-triangle text-yellow-400 text-2xl"></i>
                     </div>
                     
                     <h3 className="text-white text-xl font-semibold mb-4">安全提示</h3>
                     
                     <p className="text-white/90 text-base mb-6 leading-relaxed">
                       您即将前往任意网站，请注意保护好您的财产安全
                     </p>
                     
                     <p className="text-white/70 text-sm mb-8">
                       将在 <span className="text-yellow-400 font-medium">{portalCountdown}</span> 秒后自动前往
                     </p>
                     
                     <div className="flex justify-center gap-4">
                       <button 
                         className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-xl transition-colors"
                         onClick={cancelPortalNavigation}
                       >
                         取消
                       </button>
                       <button 
                         className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl transition-colors"
                         onClick={confirmPortalNavigation}
                       >
                         前往
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
             )}
   


          {/* 底部社交链接 */}
          {/* 更新日志按钮 - 右下角固定位置 */}
           <button 
  onClick={() => window.open('https://lyjy.netlify.app', '_blank')}
  className="fixed bottom-20 right-6 bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50 transition-all duration-300 hover:scale-110"
  aria-label="访问lyjy.netlify.app"
>
  <i className="fa-solid fa-paper-plane"></i>
</button>
           <button 
  onClick={() => setIsUpdateLogOpen(true)}
  className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50 transition-all duration-300 hover:scale-110"
  aria-label="查看更新日志"
>
  <i className="fa-solid fa-history"></i>
</button>

          <footer className="relative z-10 bg-black/40 text-white py-6 px-4 backdrop-blur-sm">
          <div className="container mx-auto flex justify-center space-x-6">
             {socialItems.map(item => (
                 <a 
                   key={item.id}
                   href={item.url}
                   className="text-white/60 hover:text-white transition-colors hover:scale-110 duration-300"
                   aria-label={item.name}
                   target={item.name === '抖音' || item.name === 'GitHub' ? '_blank' : undefined}
                   rel={(item.name === '抖音' || item.name === 'GitHub') ? 'noopener noreferrer' : undefined}
                 >
                   <i className={item.icon}></i>
                 </a>
             ))}
       </div>
       

       </footer>
     </div>
   );
}