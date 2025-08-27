import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent inline-block">
              John Doe
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              一名充满热情的前端开发者，专注于构建美观、高效且用户友好的数字体验。
            </p>
        <div className="flex space-x-4">
           <a href="https://github.com/lyjy6666" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="抖音">
            <i className="fa-brands fa-tiktok"></i>
          </a>
           <a href="https://space.bilibili.com/1983970346?spm_id_from=333.1007.0.0" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="bilibili">
            <i className="fa-brands fa-bilibili"></i>
          </a>
        </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">首页</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">关于我</a></li>
              <li><a href="#skills" className="text-gray-400 hover:text-white transition-colors">技能</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors">项目</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">联系我</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">联系方式</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <i className="fa-solid fa-envelope mr-2"></i>
                <span>john.doe@example.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <i className="fa-solid fa-phone mr-2"></i>
                <span>+86 123 4567 8910</span>
              </li>
              <li className="flex items-center text-gray-400">
                <i className="fa-solid fa-map-marker-alt mr-2"></i>
                <span>北京市海淀区</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {currentYear} John Doe. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm mx-3">隐私政策</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm mx-3">使用条款</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;