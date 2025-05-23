import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './Home.css';

function MyModel() {
  const { scene } = useGLTF('/3D/Santhosh.glb');
  const group = useRef();
  const smallWidth = useRef(false);

  // for mole on face
  let headMesh = scene.getObjectByName("Head");
  let defaultQuat = headMesh.quaternion.clone();
  let mole = scene.getObjectByName("Circle");
  let moleWorldPos = new THREE.Vector3();
  mole.getWorldPosition(moleWorldPos);
  headMesh.worldToLocal(moleWorldPos);
  headMesh.add(mole);
  mole.position.copy(moleWorldPos);

  const mouse = useRef(new THREE.Vector2());
  const isInside = useRef(false);

  useEffect(() => {

    const canvas = document.querySelector('.home-container');

    const handleMouseMove = (event) => {

      if (!isInside.current || smallWidth.current) {
        return;
      }

      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 0.99;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 0.5;
      const target = new THREE.Vector3(mouse.current.x, mouse.current.y, 0.5);
      group.current.getObjectByName("Head")?.lookAt(target);
      group.current.rotation.y = mouse.current.x * 0.5;
      
      // ***** Eyes Looking at center ***** //
      // let leftEye = group.current.getObjectByName("LeftEye");
      // let rightEye = group.current.getObjectByName("RightEye");
      // if(mouse.current.x < leftEye.position.x + 0.02 && mouse.current.x > rightEye.position.x - 0.02 && mouse.current.y < -0.04) {
      //   leftEye.rotation.y = -0.2;
      //   rightEye.rotation.y = 0.2;
      // }
      // else{
      //   leftEye.rotation.y = 0;
      //   rightEye.rotation.y = 0;
      // }

      // ***** Model object names ***** //
      // console.log("*****************************");
      // scene.traverse(obj => console.log(obj.name));
      // console.log("*****************************");
    };

    const handleMouseEnter = () => {
      isInside.current = true;
    };
    handleMouseEnter();

    const handleMouseLeave = () => {
      isInside.current = false;
      group.current.rotation.y = 0;
    };

    const handleResize = () => {
      if (window.innerWidth < 800) {
        if(isInside.current) handleMouseLeave();
        smallWidth.current = true;
      }
      else {
        smallWidth.current = false;
      }
    };
    handleResize();
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useFrame(()=>{
    if(!isInside.current) {
      group.current.getObjectByName("Head")?.quaternion.slerp(defaultQuat, 0.1);
    }
  });

  return <primitive ref={group} object={scene} scale={9} position={[0,-15,0]} />;
}

export default function Home() {
  const constraintsRef = useRef(null);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div className="home-container" ref={constraintsRef}>
      {/* Animated Background Elements */}
      <motion.div 
        className="bg-circle pink"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          transition: { duration: 15, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <motion.div 
        className="bg-circle blue"
        animate={{
          x: [0, -25, 0],
          y: [0, 20, 0],
          transition: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }
        }}
      />

      {/* Main Content */}
      <div className="hero-section">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className='topLeft'>
            <span className="gradient-text">Hello, I'm</span>
            <h1>Santhosh</h1>
            <motion.a 
              // href="#projects"
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="primary-btn"
            >
              View Work
            </motion.a>
          </div>
          <div className='bottomRight'>
          <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <h1>Passionate</h1><h1 className="pr" >Developer</h1>
            </motion.span>
          </div>
        </motion.div>

        {/* 3D Model Section */}
        <motion.div 
          className="hero-model"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.7 }}
        >
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight />
            {/* <pointLight position={[10, 10, 10]} /> */}
            <directionalLight position={[-2, 1, 3]} intensity={3} color="rgba(255,0,212,0.3)" />
            <directionalLight position={[2, -1, 3]} intensity={3} color="rgba(0,212,255,0.3)" />
            <Sparkles count={100} size={2} speed={0.5} scale={[10,9,3]} color="pink" />
            <MyModel />
            <OrbitControls 
              enableZoom={false}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </motion.div>
      </div>

      {/* Scrolling Indicator */}
      <motion.div 
        className="scroll-indicator"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Scroll</span>
        <div className="arrow"></div>
      </motion.div>
    </motion.div>
  );
}