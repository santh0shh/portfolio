import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import './Contact.css';

export default function Contact() {
  const formRef = useRef();
  const containerRef = useRef();
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [failureMsg, setFailureMsg] = useState('');

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    } else if (formData.message.trim().length < 2) {
      newErrors.message = 'Message must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setErrors(prev => ({ ...prev, [id]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setSubmitting(true);
    setSuccessMsg('');

    try {
      const response = await fetch('https://formsubmit.co/57a21c0dd41f725a348c59bb2667b9cc', {
        method: 'POST',
        body: new FormData(formRef.current),
      });
      if (response.ok) {
        setSuccessMsg(`Thank you, ${formData.name}! Your message has been sent.`);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFailureMsg('There was a problem submitting your form. Please try again.');
      }
    } catch (error) {
      setFailureMsg('Network error. Please try again later.');
    }
    setSubmitting(false);
    setTimeout(() => {
      setSuccessMsg('');
      setFailureMsg('');
    }, 5000);
  };

  return (
    <section id="contact" className="contact-section">
      {/* Background elements matching hero page */}
      <div className="bg-circle pink"></div>
      <div className="bg-circle blue"></div>

      <motion.div 
        className="container"
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Get In <span className="gradient-text">Touch</span>
        </motion.h2>

        <motion.p
          className="subtitle"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Let's build something amazing together
        </motion.p>

        <div className="contact-grid">
          {/* Contact Form */}
          <motion.div
            className="contact-form"
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className={(successMsg || failureMsg) && "pad"}>
              {successMsg && (
                <div className="success-message">
                  {successMsg}
                </div>
              )}
              {failureMsg && (
                <div id="success-message">
                  {failureMsg}
                </div>
              )}
              <div className={"form-group"+(errors.name ? " fge" : "" )}>
                <input
                  type="text"
                  id="name"
                  name = "name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  className={errors.name ? 'error' : ''}
                />
                <label htmlFor="name">Your Name</label>
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className={"form-group"+(errors.email ? " fge" : "" )}>
                <input
                  type="email"
                  id="email"
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  className={errors.email ? 'error' : ''}
                />
                <label htmlFor="email">Email Address</label>
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className={"form-group"+(errors.email ? " fge" : "" )}>
                <textarea
                  id="message"
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  className={errors.message ? 'error' : ''}
                ></textarea>
                <label htmlFor="message">Your Message</label>
                {errors.message && <div className="error-message">{errors.message}</div>}
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    Sending... <FaSpinner className="spin" />
                  </>
                ) : (
                  <>
                    Send Message <FiSend className="icon" />
                  </>
                )}
              </motion.button>
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="contact-info"
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3>Contact Information</h3>
            
            <div className="info-item">
              <FiMail className="icon" />
              <div>
                <h4>Email</h4>
                <a href="mailto:mr.santhosh116@gmail.com">mr.santhosh116@gmail.com</a>
              </div>
            </div>
            
            <div className="info-item">
              <FiMapPin className="icon" />
              <div>
                <h4>Location</h4>
                <p>Rajamundry, India</p>
              </div>
            </div>

            <div className="social-links labeled">
              <a href="https://github.com/santh0shh" target="_blank" rel="noopener noreferrer">
                <FiGithub className="social-icon" />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/santh0shh/" target="_blank" rel="noopener noreferrer">
                <FiLinkedin className="social-icon" />
                <span>LinkedIn</span>
              </a>
            </div>

            <p className="contact-desc">Feel free to reach out via email or connect through social platforms below!</p>
            {/* <div className="contact-model">
              <Canvas camera={{ position: [0, 0, 7], fov: 6 }}>
                <ambientLight intensity={2} />
                <MyModel />
              </Canvas>
            </div> */}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
