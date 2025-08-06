import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
}

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: '首页', href: '#' },
    { label: '关于', href: '#about' },
    { label: '技能', href: '#skills' },
    { label: '项目', href: '#projects' },
    { label: '联系', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
       {/* 顶部搜索框 - 确保在最上方 */}
       <div className="w-full bg-black/40 backdrop-blur-md py-3 px-4 border-b border-white/10">
         <div className="container mx-auto flex items-center justify-center">
           <div 
             className="relative w-full max-w-2xl cursor-pointer group"
             onClick={() => window.location.href = 'https://lyjysearch.netlify.app'}
           >
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

      {/* 导航栏 */}
      <div 
        className={cn(
          'w-full transition-all duration-300',
          isScrolled 
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm py-3' 
            : 'bg-transparent py-5'
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
             <a href="#" className="text-xl font-bold tracking-tight">
               <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                 John Doe
               </span>
             </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
              >
                {theme === 'light' ? (
                  <i className="fa-solid fa-moon"></i>
                ) : (
                  <i className="fa-solid fa-sun"></i>
                )}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
              >
                {theme === 'light' ? (
                  <i className="fa-solid fa-moon"></i>
                ) : (
                  <i className="fa-solid fa-sun"></i>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}
              >
                {mobileMenuOpen ? (
                  <i className="fa-solid fa-times"></i>
                ) : (
                  <i className="fa-solid fa-bars"></i>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t dark:border-gray-800">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;