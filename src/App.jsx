import React, { useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Settings, Play, Send, GraduationCap, Briefcase, 
  ChevronRight, Mail, Phone, MessageCircle, ExternalLink, Github, Linkedin, Twitter, X,
  Cpu, Zap, Shield, Globe, Database, Calendar, Award, BookOpen, MapPin, Terminal, Smartphone, Lock, Code2
} from 'lucide-react';
import Navbar from './components/Navbar';
import IntroAnimation from './components/IntroAnimation';
import RacingGame from './components/RacingGame';
import profileImg from './assets/WhatsApp Image 2026-05-07 at 2.05.51 PM.jpeg';

const PROJECT_DATA = [
  { 
    name: "Clinic Management System", 
    tech: "Django / React", 
    desc: "A comprehensive solution for patient flow, appointments, and pharmacy billing.", 
    icon: <Database />,
    specs: {
      engine: "Django REST Framework & React v18",
      torque: ["Patient Registration & Tracking", "Doctor Schedule Management", "Real-time Pharmacy Billing", "Inventory Auto-updates"],
      aero: "Responsive Admin Dashboard with real-time data visualization.",
      chassis: "MySQL Database with optimized relational schema.",
      performance: "Highly available architecture for critical medical data."
    }
  },
  { 
    name: "City 360 App", 
    tech: "Flutter / Firebase", 
    desc: "Interactive mobile experience for seamless city navigation and local services.", 
    icon: <Smartphone />,
    specs: {
      engine: "Flutter, Dart, Firebase",
      torque: ["Live Service Discovery", "Google Maps Integration", "User Ratings & Feedback", "Local Business Directory"],
      aero: "Smooth cross-platform mobile UI.",
      chassis: "Firebase Realtime DB for live updates.",
      performance: "Optimized for low-bandwidth environments."
    }
  },
  { 
    name: "Travel Planner Web Application", 
    tech: "HTML / CSS / JS", 
    desc: "A comprehensive web application designed to streamline the travel planning process, allowing users to discover and organize their trips efficiently.", 
    icon: <Globe />,
    specs: {
      engine: "HTML, CSS, JavaScript",
      torque: ["Sleek, responsive user interface", "Interactive navigation logic", "Intuitive exploration tool", "Cross-device compatibility"],
      aero: "UI/UX best practices simplifying complex travel data.",
      chassis: "Dynamic logic enhancing user engagement and site flow.",
      performance: "Seamless experience across mobile, tablet, and desktop devices."
    }
  }
];

const EDUCATION_DATA = [
  {
    category: "Education",
    items: [
      {
        type: "Degree",
        title: "Bachelor of Computer Applications (BCA)",
        inst: "Fr. Porukara CMI College of Advanced Studies, Champakulam, Alappuzha, Kerala",
        period: "2021 – 2024",
        location: "Kerala",
        details: ["Specialized in software development and advanced computer applications."],
        icon: <GraduationCap />
      },
      {
        type: "Secondary",
        title: "Higher Secondary Education",
        inst: "NSS Higher Secondary School, Changanacherry, Kottayam, Kerala",
        period: "2019 – 2021",
        location: "Kerala",
        details: ["Focused on computer science and core science subjects."],
        icon: <BookOpen />
      },
      {
        type: "Secondary",
        title: "Secondary Education",
        inst: "NSS High School, Changanacherry, Kottayam, Kerala",
        period: "2018 – 2019",
        location: "Kerala",
        details: ["Completed standard curriculum with strong foundational academics."],
        icon: <Award />
      }
    ]
  }
];

const EXPERIENCE_DATA = [
  {
    category: "Experience & Training",
    items: [
      {
        type: "Experience",
        title: "Manager",
        inst: "McDonald's",
        period: "Professional Experience",
        location: "On-site",
        details: [
          "Team Leadership: Orchestrated daily operations and managed team coordination to ensure high-performance standards in a fast-paced environment.",
          "Conflict Resolution: Handled complex customer service scenarios and resolved issues efficiently to maintain brand reputation.",
          "Operational Efficiency: Managed staff scheduling and inventory reporting while strictly adhering to quality and hygiene protocols."
        ],
        icon: <Briefcase />
      },
      {
        type: "Training",
        title: "Python Full Stack & Data Science",
        inst: "Faith InfoTech Academy, Technopark",
        period: "Professional Training",
        location: "On-site",
        details: [
          "Backend Development: Specialized in Python and Django frameworks to build robust web architectures.",
          "API & Database: Developed REST APIs and managed complex data using Oracle and MySQL with a focus on CRUD operations.",
          "Data Insights: Gained a solid foundation in Data Science fundamentals to integrate analytical thinking into web solutions."
        ],
        icon: <Terminal />
      },
      {
        type: "Internship",
        title: "Full Stack & Mobile Development",
        inst: "Internship",
        period: "Professional Internship",
        location: "Remote",
        details: [
          "Cross-Platform Apps: Engineered mobile applications using Flutter and Dart for a seamless user experience.",
          "Scalable Backends: Gained hands-on exposure to Node.js for backend logic and feature testing."
        ],
        icon: <Smartphone />
      },
      {
        type: "Internship",
        title: "Web Development",
        inst: "Internship",
        period: "Professional Internship",
        location: "Remote",
        details: [
          "Full-Cycle Development: Built interactive web pages using HTML, CSS, and JavaScript, backed by PHP for server-side logic.",
          "Database Management: Performed structured database operations using SQL to support application data flow."
        ],
        icon: <Globe />
      },
      {
        type: "Training",
        title: "Cybersecurity Training",
        inst: "G-TECH",
        period: "Certification",
        location: "On-site",
        details: [
          "System Security: Trained in cybersecurity fundamentals, focusing on identifying threats and implementing protection methods to secure digital assets."
        ],
        icon: <Shield />
      }
    ]
  }
];

const SKILLS = [
  { name: "Python / Backend", level: 95 },
  { name: "Django / REST", level: 90 },
  { name: "React / Frontend", level: 88 },
  { name: "Tailwind CSS", level: 92 },
  { name: "SQL Databases", level: 85 },
  { name: "Flutter / Mobile", level: 75 }
];

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 selection:bg-blue-500 selection:text-white min-h-screen font-sans transition-colors duration-300 overflow-x-hidden w-full max-w-[100vw]">
      <AnimatePresence>
        {isLoading && <IntroAnimation onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className={isLoading ? "pointer-events-none overflow-hidden h-screen" : ""}
      >
        <Navbar />

        <AnimatePresence>
          {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
          {activeModal && <EducationModal type={activeModal} onClose={() => setActiveModal(null)} />}
        </AnimatePresence>

        {/* Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-500 origin-left z-[101]" 
          style={{ scaleX }} 
        />

        {/* 1. HERO SECTION */}
        <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 dark:from-blue-900/10 to-transparent -z-10 blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6">
                  <Code2 className="w-4 h-4" />
                  <span>Available for Opportunities</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                  Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Akshay</span><br />
                  Anilkumar.
                </h1>
                
                <h2 className="text-2xl md:text-3xl font-medium text-slate-600 dark:text-slate-300 mb-8">
                  Full Stack Python Developer & Data Science Enthusiast
                </h2>
                
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-xl">
                  I specialize in building robust backend systems, dynamic web applications, and leveraging data for impactful solutions. Dedicated to continuous learning and technical excellence.
                </p>

                <div className="flex flex-wrap gap-4">
                   <button onClick={() => document.getElementById('projects').scrollIntoView({behavior:'smooth'})} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/30">
                     View Projects
                   </button>
                   <button onClick={() => document.getElementById('contact').scrollIntoView({behavior:'smooth'})} className="px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-semibold transition-all">
                     Contact Me
                   </button>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="w-[400px] h-[400px] rounded-full overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl relative z-10">
                 <img src={profileImg} alt="Akshay" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out cursor-pointer" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full blur-2xl opacity-20 -z-10 animate-pulse"></div>
            </motion.div>

            {/* Mobile Photo (Hidden on laptop) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative flex lg:hidden w-full justify-center mt-2 mb-4"
            >
              <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full overflow-hidden border-[6px] border-white dark:border-slate-800 shadow-xl relative z-10">
                 <img src={profileImg} alt="Akshay" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out cursor-pointer" />
              </div>
              <div className="absolute inset-0 m-auto w-[300px] h-[300px] bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full blur-2xl opacity-20 -z-10 animate-pulse"></div>
            </motion.div>
          </div>
        </section>

        {/* 2. ABOUT SECTION */}
        <section id="about" className="py-24 px-6 md:px-12 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
              <div className="w-20 h-1.5 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  title: "Education & Academics", 
                  desc: "BCA Graduate from Fr. Porukara CMI College with a specialization in Full Stack Python.",
                  icon: <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                },
                { 
                  title: "Professional Experience", 
                  desc: "Hands-on internships in mobile/web development and operational leadership experience.",
                  icon: <Briefcase className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                }
              ].map((box, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveModal(i === 0 ? 'education' : 'experience')}
                  className="glass-panel p-8 cursor-pointer group hover:-translate-y-1"
                >
                  <div className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-2xl w-fit shadow-sm">{box.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{box.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{box.desc}</p>
                  <div className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                    View Full Details <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. PROJECTS SECTION */}
        <section id="projects" className="py-24 px-6 md:px-12 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
              <div className="w-20 h-1.5 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECT_DATA.map((p, i) => (
                <ProjectCard key={i} project={p} onOpenSpec={() => setSelectedProject(p)} />
              ))}
            </div>
          </div>
        </section>

        {/* 4. SKILLS SECTION */}
        <section id="skills" className="py-24 px-6 md:px-12 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
               <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Expertise</h2>
               <div className="w-20 h-1.5 bg-blue-600 dark:bg-blue-500 rounded-full mb-8"></div>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                 A comprehensive toolkit of modern technologies, focusing on robust backend architectures and responsive user interfaces.
               </p>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              {SKILLS.map((skill, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between font-semibold">
                    <span>{skill.name}</span>
                    <span className="text-slate-500">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CONTACT SECTION */}
        <section id="contact" className="py-24 px-6 md:px-12 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Connect</h2>
              <div className="w-20 h-1.5 bg-blue-600 dark:bg-blue-500 rounded-full mx-auto"></div>
              <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Open to discussing new projects, career opportunities, or simply having a tech conversation.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-6">
                {[
                  { icon: <MessageCircle />, label: "WhatsApp", val: "+91 8943281303", href: "https://wa.me/918943281303" },
                  { icon: <Mail />, label: "Email", val: "akakshayanil1112@gmail.com", href: "mailto:akakshayanil1112@gmail.com" },
                  { icon: <Phone />, label: "Phone", val: "+91 8943281303", href: "tel:+918943281303" }
                ].map((link, i) => (
                  <a key={i} href={link.href} target="_blank" rel="noreferrer" className="flex items-center gap-6 p-6 glass-panel group hover:border-blue-500 dark:hover:border-blue-400">
                    <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-110 transition-transform">
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">{link.label}</p>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">{link.val}</p>
                    </div>
                  </a>
                ))}

                <div className="flex gap-4 pt-4">
                   {[Github, Linkedin, Twitter].map((Icon, i) => (
                     <a key={i} href="#" className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 shadow-sm transition-all">
                       <Icon className="w-5 h-5" />
                     </a>
                   ))}
                </div>
              </div>

              <div className="glass-panel p-8 md:p-10">
                 <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
                 <form 
                   className="space-y-6" 
                   onSubmit={(e) => {
                     e.preventDefault();
                     const name = e.target.elements.name.value;
                     const msg = e.target.elements.message.value;
                     const fullMsg = `Hello Akshay, I'm ${name}. ${msg}`;
                     window.open(`https://wa.me/918943281303?text=${encodeURIComponent(fullMsg)}`, '_blank');
                   }}
                 >
                   <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Name</label>
                     <input name="name" type="text" required placeholder="John Doe" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                     <textarea name="message" rows="4" required placeholder="How can we collaborate?" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"></textarea>
                   </div>
                   <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
                     <Send className="w-5 h-5" /> Send via WhatsApp
                   </button>
                 </form>
              </div>
            </div>
          </div>

          <div className="mt-32 max-w-7xl mx-auto w-full">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Unwind & Drive</h2>
              <div className="w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full mx-auto"></div>
              <p className="mt-4 text-slate-600 dark:text-slate-400">Take a quick break with a classic top-down racing simulation.</p>
            </div>
            <RacingGame />
          </div>

          <footer className="mt-24 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Akshay Anilkumar. All rights reserved.</p>
          </footer>
        </section>
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, onOpenSpec }) {
  return (
    <div className="glass-panel p-8 h-full flex flex-col group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
      <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
        {project.icon}
      </div>
      <div className="mb-auto">
        <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">{project.tech}</div>
        <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{project.name}</h4>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{project.desc}</p>
      </div>
      
      <button onClick={onOpenSpec} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all mt-4">
        View Details <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden max-h-full flex flex-col"
      >
        <div className="p-6 md:p-10 overflow-y-auto">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-1/3">
               <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                  {project.icon}
               </div>
               <h2 className="text-3xl font-bold mb-3">{project.name}</h2>
               <div className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold rounded-full mb-6">{project.tech}</div>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{project.desc}</p>
            </div>

            <div className="w-full md:w-2/3 space-y-8">
               <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Core Tech Stack</h3>
                  <p className="text-lg font-medium text-slate-900 dark:text-white">{project.specs.engine}</p>
               </div>
               
               <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {project.specs.torque.map((t, i) => (
                       <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0"></div>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t}</span>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Frontend / UI</h3>
                    <p className="font-medium text-slate-900 dark:text-white">{project.specs.aero}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Backend / DB</h3>
                    <p className="font-medium text-slate-900 dark:text-white">{project.specs.chassis}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function EducationModal({ type, onClose }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden max-h-full flex flex-col"
      >
        <div className="p-6 md:p-10 overflow-y-auto">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>

          <div className="mb-12">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">
               {type === 'education' ? 'Academic Background' : 'Professional Journey'}
             </h2>
             <p className="text-slate-500 text-sm">
               {type === 'education' ? 'Educational Timeline' : 'Experience & Training Timeline'}
             </p>
          </div>

          <div className="space-y-12">
             {(type === 'education' ? EDUCATION_DATA : EXPERIENCE_DATA).map((section, idx) => (
               <div key={idx}>
                  <h3 className="text-xl font-bold mb-6 text-blue-600 dark:text-blue-400 border-b border-slate-100 dark:border-slate-800 pb-2">{section.category}</h3>

                  <div className="space-y-8">
                     {section.items.map((item, i) => (
                       <div key={i} className="relative pl-6 md:pl-8 border-l-2 border-slate-200 dark:border-slate-800">
                          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 border-blue-500"></div>
                          
                          <div className="mb-4">
                             <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-semibold rounded-full text-slate-600 dark:text-slate-300">{item.type}</span>
                             </div>
                             <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 font-medium">
                                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {item.inst}</span>
                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {item.location}</span>
                                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {item.period}</span>
                             </div>
                          </div>

                          <ul className="space-y-2 mt-4">
                             {item.details.map((detail, dIdx) => (
                               <li key={dIdx} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm">
                                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0"></div>
                                  <span className="leading-relaxed">{detail}</span>
                               </li>
                             ))}
                          </ul>
                       </div>
                     ))}
                  </div>
               </div>
             ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
