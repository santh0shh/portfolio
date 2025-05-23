import { useEffect } from 'react';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';

function App() {
  
  useEffect(() => {
    const isAtTop = window.scrollY < 50; // small threshold
    if (isAtTop) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, 10);
    }
    // alert(window.innerHeight+"  "+window.innerWidth);
  }, []);  

  return (
    <div>
      <Navbar />
      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="projects"><Projects /></section>
      <section id="contact"><Contact /></section>
    </div>
  );
}

export default App;