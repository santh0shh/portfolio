// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Text3D } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './About.css';
import AnimatedBox from '../components/AnimatedBox';

// function BrainModel() {
//   const { scene } = useGLTF('/3d/MyModel.glb');
//   return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
// }

export default function About() {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const delayElements = {
    animate: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  }

  const experience = [
    {
      year: '2022-Present',
      role: 'B.Tech in Computer Science',
      marks: '8.02/10.0 CGPA',
      school: 'Aditya Engineering College'
    },
    {
      year: '2020-2022',
      role: 'MPC - Intermediate',
      marks: '9.26/10.0 CGPA',
      school: 'Bhashyam Junior College'
    },
    {
      year: '2019-2020',
      role: '10th Grade',
      marks: '10.0/10.0 CGPA',
      school: 'Sri Chaitanya Techno School'
    }
  ];
  // console.log("keerthi bunny");
  const skills = [
    ["C", "C++", "Java", "Python", "JavaScript", "C", "C++", "Java", "Python", "JavaScript"],
    ["HTML", "CSS", "React", "Node", "Express", "HTML", "CSS", "React", "Node", "Express"],
    ["PHP", "Flask","MongoDB", "MySQL", "Linux", "PHP", "Flask","MongoDB", "MySQL", "Linux"]
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="about-page"
      ref={ref}
    >
      <section className="about-hero">
        <div className="hero-content">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            More Than <span className="gradient-text">Just a Resume</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            I turn <strong>complex ideas</strong> into <strong>scalable code</strong>, 
            building products that users love and businesses value.
          </motion.p>
        </div>

        <motion.div className="about-hero-model">
          { isInView && <AnimatedBox />}
        </motion.div>
      </section>

      <section className="experience-section">
        <h2>Educational <span className="highlight">Journey</span></h2>
        
        <div className="timeline">
          {experience.map((item, index) => (
            <motion.div 
              key={index}
              className="timeline-item"
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-content">
                <h3>{item.role} <span>| {item.marks}</span></h3>
                <p>{item.school}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="skills-section">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          My <span className="highlight">Toolbox</span>
        </motion.h2>
        
        <motion.div
          className="slider-container"
          variants={isInView ? delayElements: {}}
        >
          {skills.map((skill, index) => (
              <motion.div
                key={index}
                className={"slider-track " + (index % 2 === 0 ? 'sliding' : 'reverse')}
              >
                {skill.map((item, idx) => (
                  <motion.span
                    key={idx}
                    className="slider-item"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.1 + idx * 0.2, duration: 0.6 }}
                  >
                    {item}
                  </motion.span>
                ))
                }
              </motion.div>
            ))
          }
        </motion.div>
      </section>

      <section className="philosophy-section">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Development <span className="highlight">Philosophy</span>
        </motion.h2>
        
        <div className="philosophy-grid">
          <motion.div 
            className="philosophy-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="card-icon">💻</div>
            <h3>Code First</h3>
            <p>Clean, maintainable code is the foundation of every successful project.</p>
          </motion.div>
          
          <motion.div 
            className="philosophy-card"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="card-icon">⚡</div>
            <h3>Performance Optimized</h3>
            <p>Applications should be blazing fast and efficient, from database to UI.</p>
          </motion.div>
          
          <motion.div 
            className="philosophy-card"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="card-icon">🔄</div>
            <h3>Full Stack Mindset</h3>
            <p>Seamless integration between frontend and backend for cohesive systems.</p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}