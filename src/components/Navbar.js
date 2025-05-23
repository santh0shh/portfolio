import { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    // const navbar = document.querySelector('.navbar');

      // if (currentScrollPos > 50) {
      //   navbar.classList.add('scrolled');
      // } else {
      //   navbar.classList.remove('scrolled');
      // }

      if (currentScrollPos > prevScrollPos) {
        setVisible(false); 
      } else {
        setVisible(true); 
      }
      setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <nav className={`navbar ${visible ? 'visible' : 'hidden'}`}>
      <button onClick={() => scrollToSection('home')}>Home</button>
      <button onClick={() => scrollToSection('about')}>About</button>
      <button onClick={() => scrollToSection('projects')}>Projects</button>
      <button onClick={() => scrollToSection('contact')}>Contact</button>
    </nav>
  );
}

export default Navbar;
