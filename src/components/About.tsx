import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">关于我</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-800">
                  <img 
                    src="https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=Portrait%20of%20a%20young%20developer%20smiling%2C%20modern%20style%2C%20soft%20lighting%2C%20professional%20headshot&sign=6f963fdd42e32c014b7c3a0906ef2034" 
                    alt="John Doe" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  5+
                  <span className="text-sm font-normal block">年经验</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-3"
            >
              <h3 className="text-2xl font-bold mb-4">前端开发者 & UI设计师</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                我是一名充满热情的前端开发者和UI设计师，拥有5年以上的专业经验。我热衷于创建既美观又实用的数字产品，专注于提供卓越的用户体验。
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                我的技术栈包括React、TypeScript、Tailwind CSS等现代前端技术，同时具备良好的设计感和用户体验思维。我相信优秀的代码和出色的设计同样重要。
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <h4 className="font-semibold mb-2">教育背景</h4>
                  <p className="text-gray-600 dark:text-gray-300">计算机科学学士</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">北京大学，2015-2019</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">工作状态</h4>
                  <p className="text-gray-600 dark:text-gray-300">自由职业者</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">可接项目合作</p>
                </div>
              </div>

              <a 
                href="#" 
                className={cn(
                  "inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
                )}
              >
                下载我的简历
                <i className="fa-solid fa-download ml-2"></i>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;