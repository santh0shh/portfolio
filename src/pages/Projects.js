import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import './Projects.css';

const projects = [
  {
    title: "NutriFit",
    description: "A full-stack responsive web application for health and fitness, featuring dynamic content and user interaction",
    tags: ["HTML", "CSS", "JS", "PHP", "MySQL"],
    live: "http://nutrifit.rf.gd/",
    image: "nutrifit.png",
    video: "nutrifit.mp4"
  },
  {
    title: "Bread",
    description: "A frontend e-commerce bakery website with a sleek, high-quality UI for exploring and selecting fresh items",
    tags: ["JavaScript", "HTML", "CSS", "Animations"],
    live: "https://naveenjosh641.github.io/Bread-Basket/",
    image: "bread.png",
    video: "bread.mp4"
  },
  {
    title: "Relieving Letter Automation",
    description: "Automated system for generating and approving official documents with digital signatures, used by many employees across colleges",
    tags: ["HTML", "CSS", "PHP", "CSV"],
    live: "https://aec.edu.in/relieving_appointment/",
    image: "relieving.png",
    video: "relieving.mp4"
  },
  {
    title: "Home Theater",
    description: "A responsive web application for home theater services, featuring a sleek design and user-friendly interface",
    tags: ["HTML", "CSS", "JS", "FormSubmit"],
    live: "http://localhost/",
    image: "omeTheater.png",
    video: "omeTheater.mp4"
  }
];

export default function Projects() {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="projects-dark">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My <span className="gradient-text">Web Projects</span>
        </motion.h2>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Where code meets visual artistry
        </motion.p>

        <div className="projects-grid" ref={ref}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.5, duration: 0.1 }}
            >
              <div className="project-image">
                <img src={"projects/"+project.image} alt={project.title} />
                <video src={"projects/"+project.video} autoPlay loop muted playsInline />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.live} target="_blank" rel="noreferrer">
                      {/* <FiExternalLink size={24} /> */}
                      Visit Site
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-info">
                <div className='sep'>
                  <h3>{project.title}</h3>
                  <a href={project.live} target="_blank" rel="noreferrer">
                    <FiExternalLink size={24} />
                  </a>
                </div>
                <p>{project.description}</p>
                <div className="tech-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}