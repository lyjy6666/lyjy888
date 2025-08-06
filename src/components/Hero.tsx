import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-400/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block">你好，我是</span>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                John Doe
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
          >
            一名热爱创造的前端开发者，专注于构建美观、高效且用户友好的数字体验。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className={cn(
                "px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:-translate-y-1"
              )}
            >
              查看我的项目
            </a>
            <a
              href="#contact"
              className={cn(
                "px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-medium shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              )}
            >
              联系我
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
            className="mt-16 flex justify-center space-x-6"
          >
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <i className="fa-brands fa-github text-2xl"></i>
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <i className="fa-brands fa-linkedin text-2xl"></i>
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <i className="fa-brands fa-twitter text-2xl"></i>
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <i className="fa-brands fa-dribbble text-2xl"></i>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ 
          y: [0, 10, 0],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop'
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-500 dark:text-gray-400"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">向下滚动</span>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;