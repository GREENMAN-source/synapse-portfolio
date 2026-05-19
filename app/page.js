'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useVelocity, useTransform } from 'framer-motion';
import { Terminal as TerminalIcon, Shield, Code, Search, Cpu, Wifi, Database, Activity, ExternalLink, ShoppingCart, Star, Sun, Moon, Zap, ChevronRight } from 'lucide-react';
import { auth, googleProvider, githubProvider } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

function MagneticWrapper({ children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };
  const reset = () => setPosition({ x: 0, y: 0 });
  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} animate={{ x: position.x, y: position.y }} transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}>
      {children}
    </motion.div>
  );
}

function TiltWrapper({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

function Typewriter({ text, delay = 0 }) {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);
  return <span>{displayedText}<span className="blink-cursor">_</span></span>;
}

export default function Home() {
  const [isHovering, setIsHovering] = useState(false);
  const [theme, setTheme] = useState('dark');
  const themeRef = useRef('dark');
  const canvasRef = useRef(null);
  const [ripples, setRipples] = useState([]);
  const [thunder, setThunder] = useState(false);
  const [hackerMode, setHackerMode] = useState(false);
  const keysPressed = useRef("");
  const isMouseDown = useRef(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Extreme Features State
  const [doomMode, setDoomMode] = useState(false);
  const [spinMode, setSpinMode] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [flipMode, setFlipMode] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [bursts, setBursts] = useState([]);
  const [barrelMode, setBarrelMode] = useState(false);
  const [invertMode, setInvertMode] = useState(false);
  const [quakeMode, setQuakeMode] = useState(false);
  const [dvdMode, setDvdMode] = useState(false);
  const [comicMode, setComicMode] = useState(false);
  const [partyMode, setPartyMode] = useState(false);
  const [discoMode, setDiscoMode] = useState(false);
  const [nyanMode, setNyanMode] = useState(false);
  const [dropMode, setDropMode] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  const skewVelocity = useTransform(scrollVelocity, [-1, 1], [-5, 5]);
  const skewSpring = useSpring(skewVelocity, { stiffness: 400, damping: 40 });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      setShowAuthModal(false);
    } catch (error) {
      console.error(error);
      alert("Auth Error: " + error.message);
    }
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    if (hackerMode) {
      document.documentElement.style.setProperty('--accent', '#00ff00');
      document.documentElement.style.setProperty('--accent-secondary', '#00ff00');
      document.documentElement.style.setProperty('--text-main', '#00ff00');
      document.documentElement.style.setProperty('--text-muted', '#00aa00');
      document.documentElement.style.fontFamily = 'monospace';
    } else {
      document.documentElement.style.removeProperty('--accent');
      document.documentElement.style.removeProperty('--accent-secondary');
      document.documentElement.style.removeProperty('--text-main');
      document.documentElement.style.removeProperty('--text-muted');
      document.documentElement.style.removeProperty('font-family');
    }
  }, [hackerMode]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  // Custom Cursor & Mobile Ripple & Fun Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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

    const handleRightClick = (e) => {
      e.preventDefault();
      setThunder(true);
      setTimeout(() => setThunder(false), 150);
      setTimeout(() => {
        setThunder(true);
        setTimeout(() => setThunder(false), 100);
      }, 250);
    };

    const handleKeyDown = (e) => {
      keysPressed.current = (keysPressed.current + e.key).slice(-6);
      const str = keysPressed.current.toLowerCase();
      if (str.includes("hack")) setHackerMode(prev => !prev);
      if (str.includes("doom")) setDoomMode(prev => !prev);
      if (str.includes("spin")) setSpinMode(prev => !prev);
      if (str.includes("matrix")) setMatrixMode(prev => !prev);
      if (str.includes("flip")) {
        setFlipMode(true);
        setTimeout(() => setFlipMode(false), 2000);
      }

      if (str.includes("barrel")) {
        setBarrelMode(true);
        setTimeout(() => setBarrelMode(false), 2000);
      }
      if (str.includes("invert")) setInvertMode(prev => !prev);
      if (str.includes("quake")) setQuakeMode(prev => !prev);
      if (str.includes("dvd")) setDvdMode(prev => !prev);
      if (str.includes("comic")) setComicMode(prev => !prev);
      if (str.includes("party")) {
        setPartyMode(true);
        const newConfetti = Array.from({ length: 50 }).map((_, i) => ({
          id: Date.now() + i,
          left: Math.random() * 100,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`
        }));
        setConfetti(newConfetti);
        setTimeout(() => setPartyMode(false), 3000);
      }
      if (str.includes("disco")) setDiscoMode(prev => !prev);
      if (str.includes("nyan")) {
        setNyanMode(true);
        setTimeout(() => setNyanMode(false), 3000);
      }
      if (str.includes("rick")) window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      if (str.includes("drop")) setDropMode(prev => !prev);

      if (e.key === '`' || e.key === '~') {
        setShowTerminal(prev => !prev);
      }
    };

    const handleMouseDown = (e) => {
      isMouseDown.current = true;
      setBursts(prev => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setBursts(prev => prev.filter(b => b.id !== Date.now()));
      }, 500);
    };
    const handleMouseUp = () => isMouseDown.current = false;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouch);
    window.addEventListener('click', handleTouch);
    window.addEventListener('contextmenu', handleRightClick);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Come back! 🚀 | Synapse Lab";
      } else {
        document.title = "Synapse Lab | Dhanvanth L P";
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

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
      window.removeEventListener('contextmenu', handleRightClick);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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

      // Disable particles entirely on mobile to instantly fix lag
      if (width < 768) return;

      const particleCount = 150;
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
      if (window.innerWidth < 768) return; // Completely disable draw loop on mobile

      const currentTheme = themeRef.current;
      ctx.fillStyle = currentTheme === 'light' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = currentTheme === 'light' ? 'rgba(212, 175, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)';
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
          if (isMouseDown.current) {
            p.x -= (dx / distance) * 5;
            p.y -= (dy / distance) * 5;
          } else {
            p.x += (dx / distance) * 3;
            p.y += (dy / distance) * 3;
          }
          ctx.beginPath();
          ctx.strokeStyle = currentTheme === 'light'
            ? `rgba(212, 175, 55, ${0.8 - distance / 120})`
            : `rgba(255, 255, 255, ${0.8 - distance / 120})`;
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
    { name: "INSTAGRAM", url: "https://www.instagram.com/dhanvanth_l.p?igsh=MWQ1ZDBvNjJ5dDhreA==", price: "PRIMARY CONTACT" },
    { name: "GITHUB", url: "https://github.com/GREENMAN-source", price: "PRIMARY PORTFOLIO" },
    { name: "X (TWITTER)", url: "https://x.com/5kDhanvant8844", price: "PRIMARY SOCIAL" },
    { name: "FACEBOOK", url: "https://www.facebook.com/share/17MSAoYYVG/", price: "PRIMARY NETWORK" },
    { name: "DEV.TO", url: "https://dev.to/dhanvanth_l_p_", price: "PRIMARY BLOG" }
  ];

  const storeItems = [
    { type: "SERVICE", title: "Custom Web Application", tech: "React / Next.js / Node", desc: "Full-stack web application development tailored to your business needs.", icon: <Code size={48} color="var(--accent-secondary)" />, price: "₹3,000", rating: 5, reviews: 12 },
    { type: "SERVICE", title: "Security VAPT Testing", tech: "Penetration Testing", desc: "Deep vulnerability assessment and penetration testing for your infrastructure.", icon: <Shield size={48} color="var(--accent-secondary)" />, price: "₹2,500", rating: 5, reviews: 8 },
    { type: "HARDWARE", title: "LifeFlow IV Monitor", tech: "ESP32 / IoT", desc: "Fully assembled IoT medical monitoring system. Alerts nurses before IV bags empty.", icon: <Activity size={48} color="var(--accent)" />, price: "₹1,500", rating: 4.8, reviews: 3 },
    { type: "HARDWARE", title: "Smart Home Hub", tech: "Raspberry Pi / OpenCV", desc: "Facial recognition door lock system. Built, configured, and shipped to you.", icon: <TerminalIcon size={48} color="var(--accent)" />, price: "₹3,500", rating: 5, reviews: 5 },
    { type: "HARDWARE", title: "Automated Plant Care", tech: "Arduino", desc: "Automated irrigation system with moisture sensing and LCD display.", icon: <Cpu size={48} color="var(--accent)" />, price: "₹800", rating: 4.5, reviews: 15 },
    { type: "HARDWARE", title: "RFID Attendance Tracker", tech: "Arduino / Node.js", desc: "Tap-in attendance system with backend database tracking.", icon: <Wifi size={48} color="var(--accent)" />, price: "₹1,200", rating: 4.9, reviews: 7 },
    { type: "HARDWARE", title: "Weather Station Logger", tech: "BME280 / SD Card", desc: "Compact weather station tracking temp/humidity/pressure.", icon: <Database size={48} color="var(--accent)" />, price: "₹500", rating: 4.7, reviews: 22 }
  ];

  const projects = [
    { 
      title: "TyrePro ERP Suite", 
      url: "https://github.com/GREENMAN-source/tyrepro", 
      liveDemo: "https://tyrepro-opal.vercel.app",
      type: "ENTERPRISE SYSTEM", 
      desc: "High-end, enterprise-grade tyre shop management system architected and developed entirely by me. Features real-time inventory tracking, GST-compliant invoicing, appointment scheduling, and a complete admin dashboard.",
      features: ["Inventory Management", "GST Invoicing", "Appointment Booking", "Analytics Dashboard"],
      tech: ["Next.js", "Express", "Prisma", "PostgreSQL", "TypeScript"]
    },
    { 
      title: "MakeMyTrip Frontend", 
      url: "https://github.com/GREENMAN-source/makemytrip-frontend", 
      liveDemo: "https://makemytrip-frontend-ten.vercel.app",
      type: "WEB APPLICATION", 
      desc: "Premium, fully responsive travel booking platform engineered and designed by me. Features interactive seat/room selection, live flight status tracking, and a dynamic pricing engine.",
      features: ["Interactive Seat Map", "Live Flight Tracking", "Dynamic Pricing Engine"],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"]
    },
    { 
      title: "MakeMyTrip Backend", 
      url: "https://github.com/GREENMAN-source/makemytrip-backend", 
      liveDemo: "https://makemytrip-backend-030l.onrender.com",
      type: "BACKEND API SERVICE", 
      desc: "High-performance Spring Boot backend custom-built by me to power the MakeMyTrip clone, providing robust RESTful APIs for flights, hotels, seat booking, and recommendations.",
      features: ["REST API", "JWT Auth", "Dynamic Pricing", "Recommendations"],
      tech: ["Spring Boot", "Java", "PostgreSQL", "Redis"]
    },
    { 
      title: "MakeMyTour Fullstack", 
      url: "https://github.com/GREENMAN-source/makemytour-fullstack", 
      type: "WEB APPLICATION", 
      desc: "A complete, premium full-stack travel tour booking application developed independently by me, featuring advanced tour packages, itinerary management, and seamless payment integration.",
      features: ["Tour Packages", "Itinerary Builder", "Payment Integration"],
      tech: ["TypeScript", "Next.js", "Node.js", "PostgreSQL"]
    },
    { 
      title: "Synapse Portfolio", 
      url: "https://github.com/GREENMAN-source/synapse-portfolio", 
      type: "PORTFOLIO WEBSITE", 
      desc: "This very portfolio — a high-end, brutalist, interaction-heavy personal website architected by me with 15+ easter eggs, particle physics backgrounds, and WebGL effects.",
      features: ["15+ Easter Eggs", "Particle Physics", "Dark/Light Mode", "Firebase Auth"],
      tech: ["Next.js", "Framer Motion", "Firebase", "JavaScript"]
    },
    { 
      title: "Synapse Lab", 
      url: "https://synapslab.in", 
      liveDemo: "https://synapslab.in",
      type: "AGENCY WEBSITE", 
      desc: "Official, elite-tier website for Synapse Lab, custom-architected by me to showcase high-performance security auditing and full-stack development with immersive 3D aesthetics.",
      features: ["Custom WebGL", "SEO Optimized", "CMS Integration"],
      tech: ["React", "Three.js", "Tailwind CSS", "Node.js"]
    },
    { 
      title: "LifeFlow IV Monitor", 
      url: "https://github.com/GREENMAN-source/-live-flow-hospital-iv-master-hub-indian-model", 
      type: "IoT / HARDWARE", 
      desc: "A sophisticated, healthcare-oriented IoT system engineered entirely by me that monitors IV fluid levels in real-time using ESP32 and HX711 load cells, actively reducing patient risk.",
      features: ["Real-time Monitoring", "Nurse Alerts", "Weight Sensing", "LCD Display"],
      tech: ["ESP32", "C++", "HX711", "Arduino"]
    }
  ];

  const handlePurchase = (itemTitle, itemPrice) => {
    window.location.href = `/checkout?item=${encodeURIComponent(itemTitle)}&price=${encodeURIComponent(itemPrice)}`;
  };

  useEffect(() => {
    if (doomMode) document.body.classList.add('doom-mode');
    else document.body.classList.remove('doom-mode');

    if (spinMode) document.body.classList.add('spin-mode');
    else document.body.classList.remove('spin-mode');

    if (flipMode) document.body.classList.add('flip-mode');
    else document.body.classList.remove('flip-mode');

    if (barrelMode) document.body.classList.add('barrel-mode');
    else document.body.classList.remove('barrel-mode');

    if (invertMode) document.body.classList.add('invert-mode');
    else document.body.classList.remove('invert-mode');

    if (quakeMode) document.body.classList.add('quake-mode');
    else document.body.classList.remove('quake-mode');

    if (comicMode) document.body.classList.add('comic-mode');
    else document.body.classList.remove('comic-mode');

    if (discoMode) document.body.classList.add('disco-mode');
    else document.body.classList.remove('disco-mode');

    if (dropMode) document.body.classList.add('drop-mode');
    else document.body.classList.remove('drop-mode');
  }, [doomMode, spinMode, flipMode, barrelMode, invertMode, quakeMode, comicMode, discoMode, dropMode]);

  return (
    <motion.div>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'var(--text-main)',
          transformOrigin: '0%',
          scaleX,
          zIndex: 999999
        }}
      />
      <canvas id="starfield" ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, width: '100vw', height: '100vh', opacity: doomMode ? 0.2 : 0.6 }}></canvas>
      <div className="noise" style={{ opacity: doomMode ? 0.8 : undefined }}></div>

      {matrixMode && (
        <div className="matrix-rain">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * -100}vh`,
              animation: `fall ${2 + Math.random() * 3}s linear infinite`
            }}>
              1010101011100110101
            </div>
          ))}
        </div>
      )}

      {dvdMode && (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/9b/DVD_logo.svg"
          className="dvd-logo"
          alt="DVD Logo"
          style={{ filter: 'invert(1)' }}
        />
      )}

      {nyanMode && (
        <img
          src="https://upload.wikimedia.org/wikipedia/en/e/ed/Nyan_cat_250px_frame.PNG"
          className="nyan-cat"
          alt="Nyan Cat"
        />
      )}

      {partyMode && confetti.map(c => (
        <div key={c.id} className="confetti" style={{ left: `${c.left}vw`, backgroundColor: c.color }} />
      ))}

      {showTerminal && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '300px', background: 'rgba(0,0,0,0.95)', borderBottom: '2px solid var(--text-main)', zIndex: 999999, color: '#0f0', fontFamily: 'monospace', padding: '2rem' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <p>SYNAPSE OS v9.0.1. Type 'help' for commands.</p>
              <p>&gt; {terminalInput}<span className="blink-cursor">_</span></p>
            </div>
            <input
              autoFocus
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (terminalInput === 'clear') setTerminalInput('');
                  setTerminalInput('');
                }
              }}
              style={{ background: 'transparent', border: 'none', color: 'transparent', outline: 'none' }}
            />
          </div>
        </motion.div>
      )}

      {/* Clicks Bursts */}
      {bursts.map(burst => (
        <motion.div
          key={burst.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            position: 'fixed',
            left: burst.x - 25,
            top: burst.y - 25,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: '2px solid var(--text-main)',
            pointerEvents: 'none',
            zIndex: 999998
          }}
        />
      ))}

      {showAuthModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 100000, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(10px)' }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            style={{ background: 'var(--bg-dark)', border: '1px solid var(--text-muted)', padding: '3rem', width: '90%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}
          >
            <button onClick={() => setShowAuthModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            <h2 style={{ fontSize: '2rem', fontFamily: 'Syncopate', textAlign: 'center', marginBottom: '1rem' }}>ACCESS</h2>

            <button onClick={() => handleSignIn(googleProvider)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: '#fff', color: '#000', padding: '1rem', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" style={{ width: '24px' }} alt="Google" />
              Sign in with Google
            </button>

            <button onClick={() => handleSignIn(githubProvider)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: '#333', color: '#fff', padding: '1rem', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg" style={{ width: '24px', filter: 'invert(1)' }} alt="GitHub" />
              Sign in with GitHub
            </button>
          </motion.div>
        </div>
      )}

      {/* Thunder Cursor + Trail */}
      <motion.div
        style={{ position: 'fixed', left: cursorXSpring, top: cursorYSpring, zIndex: 9999999, pointerEvents: 'none', color: 'var(--text-main)', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))' }}
      >
        <Zap size={32} fill="var(--text-main)" />
      </motion.div>

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

      {thunder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#ffffff',
          zIndex: 99999,
          pointerEvents: 'none',
          mixBlendMode: 'difference'
        }} />
      )}

      {/* Brutalist Nav */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, padding: '2rem 4rem', mixBlendMode: 'difference' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: '1.5rem', fontFamily: 'Syncopate, sans-serif' }}>SYNAPSE LAB</div>
          <div style={{ display: 'flex', gap: '3rem', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '2px', alignItems: 'center' }}>
            <MagneticWrapper><a href="#journey" style={{ display: 'block', padding: '0.5rem' }}>JOURNEY</a></MagneticWrapper>
            <MagneticWrapper><a href="#projects" style={{ display: 'block', padding: '0.5rem' }}>PROJECTS</a></MagneticWrapper>
            <MagneticWrapper><a href="#samples" style={{ display: 'block', padding: '0.5rem' }}>SAMPLES</a></MagneticWrapper>
            <MagneticWrapper><a href="#store" style={{ display: 'block', padding: '0.5rem' }}>STORE</a></MagneticWrapper>
            <MagneticWrapper><a href="#social" style={{ display: 'block', padding: '0.5rem' }}>SOCIALS</a></MagneticWrapper>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={user.photoURL} alt={user.displayName || 'User'} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--text-main)' }} />
                <button onClick={handleSignOut} style={{ background: 'transparent', border: '1px solid var(--text-main)', color: 'var(--text-main)', padding: '0.3rem 0.8rem', borderRadius: '30px', fontSize: '0.7rem', fontWeight: 'bold', fontFamily: 'monospace', cursor: 'pointer' }}>LOGOUT</button>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal(true)} style={{ background: 'var(--text-main)', border: 'none', color: 'var(--bg-dark)', padding: '0.3rem 0.8rem', borderRadius: '30px', fontSize: '0.7rem', fontWeight: 'bold', fontFamily: 'monospace', cursor: 'pointer' }}>LOGIN</button>
            )}

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
                cursor: 'pointer'
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
            <h1 style={{
              fontSize: 'clamp(3rem, 10vw, 12rem)',
              lineHeight: 0.9,
              letterSpacing: '-5px',
              margin: 0,
              background: theme === 'light' ? 'none' : 'linear-gradient(180deg, #FFFFFF 0%, #888888 100%)',
              WebkitBackgroundClip: theme === 'light' ? 'initial' : 'text',
              WebkitTextFillColor: theme === 'light' ? 'initial' : 'transparent',
              color: theme === 'light' ? '#000' : 'transparent'
            }}>
              <Typewriter text="BUILD" delay={500} /><br />
              <Typewriter text="SHARP" delay={1000} /><br />
              <span style={{
                color: 'transparent',
                WebkitTextStroke: theme === 'light' ? '2px #000' : '2px rgba(255,255,255,0.5)',
                WebkitTextFillColor: 'transparent',
                background: 'none'
              }}>
                <Typewriter text="SECURE" delay={1500} />
              </span>
            </h1>
          </motion.div>

          {/* Hacker Style Blob Avatar */}
          <div className="blob-avatar-wrapper" style={{ position: 'absolute', right: '10%', top: '15%', height: '70vh', width: 'clamp(300px, 40vw, 500px)', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            {/* Morphing Background Blob */}
            <motion.div
              animate={{
                borderRadius: [
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                  "30% 70% 70% 30% / 30% 30% 70% 70%",
                  "60% 40% 30% 70% / 60% 30% 70% 40%"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                width: '100%',
                maxWidth: '380px',
                aspectRatio: '1',
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                boxShadow: '0 0 50px rgba(37, 117, 252, 0.4)',
                zIndex: 0
              }}
            />

            {/* Avatar Image Layered on top */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: 'relative', zIndex: 2, height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', paddingBottom: '0' }}
            >
              <img
                src="/assets/cyber_avatar_transparent.png"
                alt="Dhanvanth Cyber Hacker Avatar"
                style={{
                  width: '220%', // Massive scale up to create a portrait bust
                  height: 'auto',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  transform: 'translateY(15%)', // Push down to align shoulders with the blob perfectly
                  filter: theme === 'light' ? 'drop-shadow(0px 10px 20px rgba(0,0,0,0.3))' : 'drop-shadow(0px 10px 30px rgba(0,0,0,0.8)) brightness(0.95) contrast(1.1)',
                  maskImage: 'linear-gradient(to bottom, black 50%, transparent 80%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 80%)'
                }}
              />
            </motion.div>

            {/* Floating Tech Icons */}
            {[
              { Icon: Code, color: '#f7df1e', top: '10%', left: '-10%', delay: 0 },
              { Icon: TerminalIcon, color: '#4af626', top: '30%', left: '90%', delay: 1 },
              { Icon: Shield, color: '#ff4b4b', top: '70%', left: '-5%', delay: 2 },
              { Icon: Database, color: '#336791', top: '80%', left: '80%', delay: 3 },
              { Icon: Cpu, color: '#ff9900', top: '-5%', left: '70%', delay: 1.5 },
              { Icon: Activity, color: '#ff00ff', top: '95%', left: '30%', delay: 2.5 }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4 + idx, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  top: item.top,
                  left: item.left,
                  background: 'var(--bg-dark)',
                  border: `2px solid ${item.color}`,
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: `0 10px 20px rgba(0,0,0,0.5), 0 0 15px ${item.color}40`,
                  zIndex: 3
                }}
              >
                <item.Icon size={28} color={item.color} />
              </motion.div>
            ))}
          </div>
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
                style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '2rem', borderBottom: '1px solid #333', paddingBottom: '2rem' }}
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
            {projects.filter(p => !p.liveDemo).map((proj, i) => (
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
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--accent)', color: '#000', padding: '0.2rem 1rem', fontSize: '0.8rem', fontWeight: 'bold', fontFamily: 'monospace', zIndex: 2 }}>
                  {proj.type}
                </div>
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', lineHeight: 1.2, marginTop: '1.5rem' }}>{proj.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{proj.desc}</p>

                  <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {proj.features.map((f, idx) => (
                      <span key={idx} style={{ fontSize: '0.7rem', padding: '0.3rem 0.8rem', border: '1px solid var(--text-muted)', borderRadius: '20px', color: 'var(--text-main)', fontFamily: 'monospace' }}>{f}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {proj.tech.map((t, idx) => (
                      <span key={idx} style={{ fontSize: '0.7rem', padding: '0.3rem 0.8rem', background: 'var(--text-main)', color: 'var(--bg-dark)', borderRadius: '4px', fontWeight: 'bold', fontFamily: 'monospace' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--text-muted)' }}>
                  <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'monospace', fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-main)', textDecoration: 'none' }}>
                      GITHUB <ExternalLink size={16} />
                    </span>
                    {proj.liveDemo && (
                      <a href={proj.liveDemo} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'monospace', fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--accent-secondary)', textDecoration: 'none' }} onClick={(e) => e.stopPropagation()}>
                        LIVE DEMO <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Samples Section */}
        <section id="samples" className="container" style={{ paddingTop: '15rem' }}>
          <h2 className="section-title">03. LIVE SAMPLES</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {projects.filter(p => p.liveDemo).map((proj, i) => (
              <motion.a
                href={proj.liveDemo}
                target="_blank"
                rel="noreferrer"
                key={i}
                className="shop-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -10, boxShadow: '0 25px 50px rgba(0, 240, 255, 0.15)', borderColor: 'var(--accent)' }}
                style={{
                  background: 'var(--bg-dark)',
                  border: '2px solid var(--text-muted)',
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '320px',
                  position: 'relative',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer'
                }}
              >
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--accent-secondary)', color: '#000', padding: '0.3rem 1.2rem', fontSize: '0.75rem', fontWeight: 'bold', fontFamily: 'monospace', zIndex: 2, letterSpacing: '1px' }}>
                  ACTIVE DEMO
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '2px' }}>{proj.type}</span>
                  <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2, marginTop: '0.5rem', letterSpacing: '-1px' }}>{proj.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{proj.desc}</p>
                  
                  <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {proj.tech.map((t, idx) => (
                      <span key={idx} style={{ fontSize: '0.7rem', padding: '0.3rem 0.8rem', background: 'var(--text-main)', color: 'var(--bg-dark)', borderRadius: '4px', fontWeight: 'bold', fontFamily: 'monospace' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--text-muted)' }}>
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '0.75rem', 
                      fontFamily: 'monospace', 
                      fontSize: '1rem', 
                      fontWeight: 'bold', 
                      color: 'var(--bg-dark)', 
                      backgroundColor: 'var(--text-main)', 
                      padding: '0.8rem 1.5rem', 
                      transition: 'all 0.3s ease',
                      boxShadow: '4px 4px 0px var(--accent)'
                    }}
                  >
                    LAUNCH PROJECT <ExternalLink size={18} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Amazon-Style Storefront */}
        <section id="store" className="container" style={{ paddingTop: '15rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid var(--text-muted)', paddingBottom: '1rem', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: 700, letterSpacing: '-2px', fontFamily: 'Syncopate', margin: 0 }}>04. SYNAPSE STORE</h2>
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
                      cursor: 'pointer'
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
          <h2 className="section-title">05. SOCIAL NETWORK STORE</h2>
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

        {/* Easter Egg Cheat Sheet */}
        <section className="container" style={{ paddingTop: '10rem', paddingBottom: '2rem', textAlign: 'center' }}>
          <div style={{
            border: '1px dashed var(--text-muted)',
            padding: '2rem',
            display: 'inline-block',
            background: 'var(--bg-dark)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--text-main)' }} />
            <p style={{ fontFamily: 'monospace', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', letterSpacing: '2px' }}>
              // CLASSIFIED SYSTEM CODES DETECTED //
            </p>
            <p style={{ fontFamily: 'monospace', color: 'var(--text-main)', fontSize: '1.1rem', lineHeight: '2' }}>
              Try typing these keywords anywhere on the site:<br />
              <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>hack</span> • <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>matrix</span> • <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>doom</span> • <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>barrel</span> • <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>party</span> • <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>dvd</span><br />
              <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>comic</span> • <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>disco</span> • <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>quake</span> • <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>drop</span> • <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>invert</span><br />
              <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>nyan</span> • <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>spin</span> • <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>flip</span> • <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>rick</span>
            </p>
          </div>
        </section>

      </main>
    </motion.div>
  );
}
