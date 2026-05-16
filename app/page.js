'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Code, Search, Cpu, Wifi, Database, Activity, ExternalLink, ShoppingCart, Star, Sun, Moon } from 'lucide-react';

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [theme, setTheme] = useState('dark');
  const themeRef = useRef('dark');
  const canvasRef = useRef(null);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    themeRef.current = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  // Custom Cursor & Mobile Ripple Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleTouch = (e) => {
      if (window.innerWidth <= 768) {
        const touch = e.touches ? e.touches[0] : e;
        const newRipple = { id: Date.now(), x: touch.clientX, y: touch.clientY };
        setRipples(prev => [...prev, newRipple]);
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouch);
    window.addEventListener('click', handleTouch);
    
    // Add hover states to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .shop-card, .amazon-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => setIsHovering(true));
      el.addEventListener('mouseleave', () => setIsHovering(false));
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('click', handleTouch);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', () => setIsHovering(true));
        el.removeEventListener('mouseleave', () => setIsHovering(false));
      });
    };
  }, []);

  // Abstract WebGL-style Background Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    let animationFrameId;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particles = [];
      const particleCount = width < 768 ? 40 : 150; // Massively reduce on mobile for performance
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
        });
      }
    };

    const draw = () => {
      const currentTheme = themeRef.current;
      ctx.fillStyle = currentTheme === 'light' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = currentTheme === 'light' ? 'rgba(212, 175, 55, 0.8)' : 'rgba(0, 240, 255, 0.8)';
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, true);
      }
      ctx.fill();
      update();
      animationFrameId = requestAnimationFrame(draw);
    };

    let mouseX = width / 2;
    let mouseY = height / 2;

    const update = () => {
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.y += p.vy;
        p.x += p.vx;

        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
           const currentTheme = themeRef.current;
           p.x += (dx / distance) * 3;
           p.y += (dy / distance) * 3;
           ctx.beginPath();
           ctx.strokeStyle = currentTheme === 'light' 
             ? `rgba(212, 175, 55, ${0.8 - distance/120})` 
             : `rgba(0, 240, 255, ${0.8 - distance/120})`;
           ctx.moveTo(p.x, p.y);
           ctx.lineTo(mouseX, mouseY);
           ctx.stroke();
        }

        if (p.x < 0 || p.x > width) p.vx = -p.vx;
        if (p.y < 0 || p.y > height) p.vy = -p.vy;
      }
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);
    init();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const history = [
    { year: "2022", title: "HARDWARE AWAKENING", desc: "Started with Arduino, diving into circuits, C++, and microcontrollers." },
    { year: "2023", title: "THE CODE MATRIX", desc: "Began serious coding. Mastered fundamentals of programming logic." },
    { year: "2025", title: "WEB ARCHITECTURE", desc: "Transitioned to Web Development, building modern React/Next.js apps." },
    { year: "2026", title: "OFFENSIVE SECURITY", desc: "Entered Ethical Hacking & Bug Bounty. Founded Synapse Lab." }
  ];

  const socials = [
    { name: "GITHUB", url: "https://github.com/GREENMAN-source", price: "FREE FOLLOW" },
    { name: "X (TWITTER)", url: "https://x.com/5kDhanvant8844", price: "FREE FOLLOW" },
    { name: "INSTAGRAM", url: "https://www.instagram.com/dhanvanth_l.p?igsh=MWQ1ZDBvNjJ5dDhreA==", price: "FREE FOLLOW" },
    { name: "FACEBOOK", url: "https://www.facebook.com/share/17MSAoYYVG/", price: "FREE FOLLOW" },
    { name: "DEV.TO", url: "https://dev.to/dhanvanth_l_p_", price: "FREE READS" }
  ];

  const storeItems = [
    { type: "SERVICE", title: "Custom Web Application", tech: "React / Next.js / Node", desc: "Full-stack web application development tailored to your business needs.", icon: <Code size={48} color="var(--accent-secondary)"/>, price: "₹3,000", rating: 5, reviews: 12 },
    { type: "SERVICE", title: "Security VAPT Testing", tech: "Penetration Testing", desc: "Deep vulnerability assessment and penetration testing for your infrastructure.", icon: <Shield size={48} color="var(--accent-secondary)"/>, price: "₹2,500", rating: 5, reviews: 8 },
    { type: "HARDWARE", title: "LifeFlow IV Monitor", tech: "ESP32 / IoT", desc: "Fully assembled IoT medical monitoring system. Alerts nurses before IV bags empty.", icon: <Activity size={48} color="var(--accent)"/>, price: "₹1,500", rating: 4.8, reviews: 3 },
    { type: "HARDWARE", title: "Smart Home Hub", tech: "Raspberry Pi / OpenCV", desc: "Facial recognition door lock system. Built, configured, and shipped to you.", icon: <Terminal size={48} color="var(--accent)"/>, price: "₹3,500", rating: 5, reviews: 5 },
    { type: "HARDWARE", title: "Automated Plant Care", tech: "Arduino", desc: "Automated irrigation system with moisture sensing and LCD display.", icon: <Cpu size={48} color="var(--accent)"/>, price: "₹800", rating: 4.5, reviews: 15 },
    { type: "HARDWARE", title: "RFID Attendance Tracker", tech: "Arduino / Node.js", desc: "Tap-in attendance system with backend database tracking.", icon: <Wifi size={48} color="var(--accent)"/>, price: "₹1,200", rating: 4.9, reviews: 7 },
    { type: "HARDWARE", title: "Weather Station Logger", tech: "BME280 / SD Card", desc: "Compact weather station tracking temp/humidity/pressure.", icon: <Database size={48} color="var(--accent)"/>, price: "₹500", rating: 4.7, reviews: 22 }
  ];

  const projects = [
    { title: "MakeMyTrip Clone", url: "https://github.com/GREENMAN-source/MakeMyTrip-Clone", type: "INTERNSHIP PROJECT", desc: "Interactive seat/room selection, live flight status, and dynamic pricing engine." },
    { title: "Synapse Lab", url: "https://synapslab.in", type: "AGENCY WEBSITE", desc: "Official website for Synapse Lab, showcasing high-performance security and development." }
  ];

  const handlePurchase = (itemTitle, itemPrice) => {
    window.location.href = `/checkout?item=${encodeURIComponent(itemTitle)}&price=${encodeURIComponent(itemPrice)}`;
  };

  return (
    <>
      <canvas id="starfield" ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, width: '100vw', height: '100vh', opacity: 0.6 }}></canvas>
      <div className="noise"></div>
      
      {/* Laptop Custom Cursor */}
      <div 
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`} 
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      ></div>

      {/* Mobile Touch Ripple Effect */}
      {ripples.map(r => (
        <motion.div 
          key={r.id}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            position: 'fixed',
            left: r.x - 20,
            top: r.y - 20,
            width: 40,
            height: 40,
            border: '2px solid var(--accent-secondary)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9999
          }}
        />
      ))}
      
      {/* Brutalist Nav */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, padding: '2rem 4rem', mixBlendMode: 'difference' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: '1.5rem', fontFamily: 'Syncopate, sans-serif' }}>SYNAPSE LAB</div>
          <div style={{ display: 'flex', gap: '3rem', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '2px', alignItems: 'center' }}>
            <a href="#journey">JOURNEY</a>
            <a href="#projects">PROJECTS</a>
            <a href="#store">STORE</a>
            <a href="#social">SOCIALS</a>
            <button 
              onClick={toggleTheme} 
              aria-label="Toggle Theme"
              style={{ 
                background: theme === 'dark' ? '#222' : '#ddd', 
                border: '1px solid var(--text-muted)', 
                borderRadius: '30px',
                display: 'flex',
                alignItems: 'center',
                width: '60px',
                height: '32px',
                padding: '2px',
                position: 'relative',
                cursor: 'none'
              }}
            >
              <motion.div 
                layout
                initial={false}
                animate={{ 
                  x: theme === 'dark' ? 26 : 0,
                  backgroundColor: theme === 'dark' ? '#000' : '#fff'
                }}
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}
              >
                {theme === 'dark' ? <Moon size={14} color="#fff" /> : <Sun size={14} color="#000" />}
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      <main style={{ position: 'relative', zIndex: 1, paddingBottom: '10rem' }}>
        
        {/* Massive Hero Section */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', padding: '0 4rem', position: 'relative', overflow: 'hidden' }}>
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <p style={{ color: 'var(--accent)', fontWeight: 600, letterSpacing: '4px', marginBottom: '1rem', fontFamily: 'monospace' }}>
              DHANVANTH L P [10TH GRADE FOUNDER]
            </p>
            <h1 style={{ fontSize: 'clamp(3rem, 10vw, 12rem)', lineHeight: 0.9, letterSpacing: '-5px', margin: 0 }}>
              BUILD<br/>
              SHARP<br/>
              <span style={{ color: 'transparent', WebkitTextStroke: '2px white' }}>SECURE</span>
            </h1>
          </motion.div>

          {/* Hacker Style Profile Photo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: 'absolute', right: '10%', top: '25%', zIndex: 1 }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <div style={{ 
              position: 'relative', 
              width: '400px', 
              height: '400px', 
              borderRadius: '50%', 
              padding: '8px',
              background: theme === 'light' ? 'linear-gradient(45deg, #d4af37 0%, #ffffff 100%)' : 'linear-gradient(45deg, #00f2fe 0%, #ff003c 100%)',
              boxShadow: theme === 'light' ? '0 0 50px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(255,255,255,0.8)' : '0 0 50px rgba(0, 242, 254, 0.4), inset 0 0 20px rgba(0,0,0,0.8)' 
            }}>
              <div style={{ 
                width: '100%', 
                height: '100%', 
                borderRadius: '50%', 
                overflow: 'hidden',
                background: 'var(--bg-dark)',
                border: '4px solid #000'
              }}>
                 <img src="/assets/media__1778900000709.jpg" alt="Dhanvanth L P" style={{ 
                   width: '100%', 
                   height: '100%', 
                   objectFit: 'cover',
                   filter: 'contrast(1.2) brightness(0.8) grayscale(0.5)'
                 }} onError={(e) => { e.target.src = '/assets/media__1778900000683.jpg'; }} />
              </div>
            </div>
          </motion.div>
        </section>

        {/* The Journey (Timeline) */}
        <section id="journey" className="container" style={{ paddingTop: '10rem' }}>
          <h2 className="section-title">01. TIMELINE</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {history.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                whileHover={{ x: 20, color: 'var(--accent-secondary)' }}
                style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '2rem', borderBottom: '1px solid #333', paddingBottom: '2rem', cursor: 'none' }}
              >
                <div style={{ fontSize: '3rem', fontFamily: 'Syncopate', color: 'inherit', transition: 'color 0.3s' }}>{item.year}</div>
                <div>
                  <h3 style={{ fontSize: '2rem', marginBottom: '1rem', transition: 'color 0.3s' }}>{item.title}</h3>
                  <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container" style={{ paddingTop: '15rem' }}>
          <h2 className="section-title">02. PROJECTS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {projects.map((proj, i) => (
              <motion.a 
                href={proj.url}
                target="_blank"
                rel="noreferrer"
                key={i}
                className="shop-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 240, 255, 0.1)', borderColor: 'var(--accent-secondary)' }}
                style={{ 
                  background: 'var(--bg-dark)', 
                  border: '1px solid var(--text-muted)', 
                  padding: '2rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between', 
                  height: '280px',
                  textDecoration: 'none',
                  color: 'inherit',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--accent)', color: '#000', padding: '0.2rem 1rem', fontSize: '0.8rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                  {proj.type}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', lineHeight: 1.2, marginTop: '1.5rem' }}>{proj.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>{proj.desc}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--text-muted)' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 'bold', color: 'var(--accent-secondary)' }}>VIEW LIVE</span>
                  <ExternalLink size={24} />
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Amazon-Style Storefront */}
        <section id="store" className="container" style={{ paddingTop: '15rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid var(--text-muted)', paddingBottom: '1rem', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: 700, letterSpacing: '-2px', fontFamily: 'Syncopate', margin: 0 }}>03. SYNAPSE STORE</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent-secondary)', fontFamily: 'monospace', fontSize: '1.2rem' }}>
              <ShoppingCart size={32} />
              <span>SECURE CHECKOUT</span>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {storeItems.map((item, i) => (
              <motion.div 
                key={i}
                className="amazon-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 240, 255, 0.1)', borderColor: 'var(--accent-secondary)' }}
                style={{ 
                  background: 'var(--bg-dark)', 
                  border: '1px solid var(--text-muted)', 
                  padding: '2rem', 
                  display: 'flex', 
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, background: item.type === 'HARDWARE' ? 'var(--accent)' : 'var(--accent-secondary)', color: '#000', padding: '0.2rem 1rem', fontSize: '0.8rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                  {item.type}
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px', marginBottom: '1.5rem', background: 'var(--bg-dark)', border: '1px solid var(--text-muted)', marginTop: '1rem' }}>
                  <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>{item.icon}</motion.div>
                </div>
                
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{item.title}</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={14} fill={idx < Math.floor(item.rating) ? "#ffa41c" : "transparent"} color={idx < Math.floor(item.rating) ? "#ffa41c" : "#555"} />
                  ))}
                  <span style={{ fontSize: '0.9rem', color: '#007185', marginLeft: '0.5rem', fontFamily: 'Inter' }}>{item.reviews} reviews</span>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 }}>{item.desc}</p>
                
                <div style={{ borderTop: '1px solid var(--text-muted)', paddingTop: '1.5rem', marginTop: 'auto' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                    {item.price}
                  </div>
                  <motion.button 
                    onClick={() => handlePurchase(item.title, item.price)}
                    whileHover={{ scale: 1.05, backgroundColor: '#ffd814' }}
                    whileTap={{ scale: 0.95 }}
                    style={{ 
                      width: '100%', 
                      padding: '1rem', 
                      background: '#FFD814', 
                      border: 'none', 
                      borderRadius: '100px', 
                      color: '#0f1111', 
                      fontWeight: 600, 
                      fontSize: '1rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'none'
                    }}
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Shopping Style Social Links */}
        <section id="social" className="container" style={{ paddingTop: '15rem' }}>
          <h2 className="section-title">04. SOCIAL NETWORK STORE</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {socials.map((social, i) => (
              <motion.a 
                href={social.url}
                target="_blank"
                rel="noreferrer"
                key={i}
                className="shop-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: '#fff', color: '#000' }}
                style={{ 
                  border: '1px solid var(--text-muted)', 
                  padding: '2rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between', 
                  height: '250px',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div>
                  <h3 style={{ fontSize: '2rem', lineHeight: 1, fontFamily: 'Syncopate' }}>{social.name}</h3>
                  <p style={{ fontFamily: 'monospace', marginTop: '1rem', color: 'inherit', opacity: 0.7 }}>REF: LINK-{1000 + i}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 'bold' }}>{social.price}</span>
                  <ExternalLink size={24} />
                </div>
              </motion.a>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}
