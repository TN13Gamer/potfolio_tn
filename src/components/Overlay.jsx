import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Mail, ChevronRight, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const TypewriterText = ({ text, delay = 0, className = "", keepCursor = false }) => {
  const [displayText, setDisplayText] = useState('')
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    let i = 0
    let interval;
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(text.substring(0, i))
        i++
        if (i > text.length) {
          clearInterval(interval)
          setIsDone(true)
        }
      }, 50)
    }, delay * 1000)
    return () => {
      clearTimeout(timer)
      if (interval) clearInterval(interval)
    }
  }, [text, delay])

  return (
    <span className={className}>
      {displayText}
      {(displayText.length > 0 && (!isDone || keepCursor)) && (
        <span 
          className="blinking-cursor" 
          style={{ animation: 'blink 1s step-end infinite' }}
        >_</span>
      )}
    </span>
  )
}

export default function Overlay() {
  return (
    <div className="scroll-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Thejas Nirmal</div>
        <div className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section hero">
        <motion.div 
          className="hero-wrapper"
          initial="hidden" animate="visible" variants={fadeUp}
        >
          <div className="hero-content">
            <p style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1.2rem', marginBottom: '10px' }}>Thejas Nirmal</p>
            <h1 className="main-title">
              <TypewriterText text="Hi, I'm" delay={0.5} /><br/>
              <TypewriterText text="Thejas Nirmal" delay={1.5} keepCursor={true} />
            </h1>
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 2.5, duration: 1 }}
              className="hero-description"
            >
              Developer | Hardware Enthusiast | F1 & Tech Explorer
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 2.8, duration: 1 }}
              className="subtitle"
            >
              CSE student at BMSIT&M bridging the gap between clean code and physical hardware.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 3, duration: 0.5 }}
              className="hero-buttons"
            >
              <a href="#contact" className="btn-primary">Let's Connect <ChevronRight size={18} style={{marginLeft:'5px'}}/></a>
              <a href="/resume.pdf" download className="btn-outline">Download Resume</a>
            </motion.div>
          </div>
          
          <motion.div 
            className="profile-img-wrapper"
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <img 
              src="/tn-logo.png" 
              alt="Thejas Nirmal" 
              className="profile-img"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
          <h2>About Me</h2>
        </motion.div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          <motion.div className="glass-panel" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '20px', color: '#fff' }}>My Profile</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              I am a Computer Science Engineering student currently in my 4th semester at BMSIT, focused on building functional, user-centric web applications and IoT solutions. I bridge the gap between software development and hardware integration.
            </p>
            
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', margin: '30px 0 20px 0', color: '#fff' }}>What I Like to Do</h3>
            <ul style={{ listStyle: 'none', color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '10px' }}>📸 Photography, Video Editing & YouTube</li>
              <li style={{ marginBottom: '10px' }}>🏎️ Formula 1 & JDM Car Culture</li>
              <li style={{ marginBottom: '10px' }}>🎮 Valorant & Tech Exploration</li>
              <li style={{ marginBottom: '10px' }}>🤖 Building Electronics & IoT Projects</li>
            </ul>
          </motion.div>

          <motion.div className="glass-panel" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '30px', color: '#fff' }}>Education</h3>
            
            <div className="edu-block">
              <div className="edu-icon" style={{ background: 'transparent' }}>
                <img src="/college-logo.png" alt="BMSIT" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div className="edu-details">
                <h3>B.E. Computer Science Engineering</h3>
                <h4>BMS Institute of Technology and Management</h4>
                <p>Currently in 4th Semester</p>
              </div>
            </div>

            <div className="edu-block">
              <div className="edu-icon" style={{ background: 'transparent' }}>
                <img src="/school-logo.png" alt="KV" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div className="edu-details">
                <h3>Class 12th (CBSE)</h3>
                <h4>Kendriya Vidyalaya Keltron Nagar</h4>
                <p>Score: 86.2% | Computer Science Stream</p>
              </div>
            </div>

            <div className="edu-block">
              <div className="edu-icon" style={{ background: 'transparent' }}>
                <img src="/school-logo.png" alt="KV" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div className="edu-details">
                <h3>Class 10th (CBSE)</h3>
                <h4>Kendriya Vidyalaya Keltron Nagar</h4>
                <p>Score: 85.6%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical Arsenal (Skills) */}
      <section id="skills" className="section">
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
          <h2>Technical Arsenal</h2>
        </motion.div>
        <motion.div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
          {['C / C++', 'Python', 'OOPs', 'Data Structures', 'VHDL', 'Operating Systems', 'DBMS', 'MySQL', 'Arduino & IoT', 'Firebase', 'Content Creator', 'Video Editing'].map((skill) => (
            <div key={skill} className="skill-badge">{skill}</div>
          ))}
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
          <h2>Featured Projects</h2>
        </motion.div>
        <div className="grid-container">
          <motion.div className="project-card" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <h3>🏨 Thayappura Booking</h3>
            <p>Full-stack resort booking application with an admin dashboard and Firebase integration.</p>
            <a href="https://thayappura.live/" target="_blank" rel="noreferrer" className="project-link">Live Site <ExternalLink size={16}/></a>
          </motion.div>

          <motion.div className="project-card" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <h3>🚘 Anti-Sleep Alarm System</h3>
            <p>Safety device for drivers using eye-blink detection sensors and Arduino.</p>
            <span style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 500 }}>Hardware / C++</span>
          </motion.div>

          <motion.div className="project-card" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <h3>🏎️ F1 Watch Party</h3>
            <p>Streaming community website for Formula 1 enthusiasts.</p>
            <a href="https://github.com/TN13Gamer/f1watchparty-web" target="_blank" rel="noreferrer" className="project-link">View Code <ExternalLink size={16}/></a>
          </motion.div>

          <motion.div className="project-card" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <h3>🤝 TaskConnect(Not Completed)</h3>
            <p>A platform designed for micro-tasking and freelance gig opportunities.</p>
            <a href="https://taskk-liard.vercel.app/" target="_blank" rel="noreferrer" className="project-link">View Project <ExternalLink size={16}/></a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section" style={{ textAlign: 'center', alignItems: 'center' }}>
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
          <h2>Get In Touch</h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} style={{ width: '100%' }}>
          <div className="footer-links">
            <a href="mailto:nirmaltheju123@gmail.com"><Mail size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Email Me</a>
            <a href="https://linkedin.com/in/thejas-nirmal-43418032a/" target="_blank" rel="noreferrer"><Linkedin size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> LinkedIn</a>
            <a href="https://github.com/TN13Gamer" target="_blank" rel="noreferrer"><Github size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> GitHub</a>
            <a href="https://instagram.com/___the_cockpit_lover___/" target="_blank" rel="noreferrer"><Instagram size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Instagram</a>
          </div>
          <footer className="footer">
            <p>© 2026 Thejas Nirmal. Engineered with precision. Designed with passion.</p>
          </footer>
        </motion.div>
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
      `}} />
    </div>
  )
}
