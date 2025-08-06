import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// 项目数据
const projects = [
  {
    id: 1,
    title: '电子商务平台',
    description: '一个功能齐全的电子商务网站，支持产品展示、购物车、支付流程等功能。',
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=E-commerce%20website%20interface%2C%20modern%20design%2C%20product%20showcase%2C%20clean%20UI&sign=d9d4b57df8ca24f18f5e13d8e4b1f1a7',
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    link: '#'
  },
  {
    id: 2,
    title: '任务管理应用',
    description: '一个直观的任务管理工具，支持看板视图、日历视图和团队协作功能。',
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Task%20management%20application%20dashboard%2C%20kanban%20board%2C%20modern%20UI%2C%20productivity%20tool&sign=d040acc73e858db64ff24117be9051c4',
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'Redux'],
    link: '#'
  },
  {
    id: 3,
    title: '个人博客系统',
    description: '一个现代化的个人博客系统，支持Markdown编辑、标签分类和评论功能。',
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Blog%20website%20design%2C%20article%20layout%2C%20modern%20typography%2C%20clean%20interface&sign=c0374b0a50f4311b4201fae99fc597b6',
    technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Tailwind CSS'],
    link: '#'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">我的项目</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            探索我最近完成的一些项目，每个项目都展示了我的技术能力和设计理念。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <a 
                      href={project.link}
                      className="inline-flex items-center text-white font-medium hover:underline"
                    >
                      查看详情
                      <i className="fa-solid fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className={cn(
              "inline-flex items-center px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-medium shadow-md hover:shadow-lg transition-all"
            )}
          >
            查看更多项目
            <i className="fa-solid fa-arrow-right ml-2"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;