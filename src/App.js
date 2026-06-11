import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const PROJECTS = [
  {
    featured: true,
    tag: 'Computer Vision - NLP - Agentic AI',
    name: 'LeafGuard - Plant Disease Detection Platform',
    desc: 'End-to-end agricultural AI platform to help farmers detect and treat plant diseases. Two-stage pipeline: YOLO11-seg for leaf segmentation + EfficientNetV2-S for classification across 9 disease categories (81% test accuracy, mAP50 0.574). Includes a LangChain-powered AI chatbot, recommendation engine covering ~30 crops, 3D WebGL field simulation, product shop with SAR/VAT pricing, and KPI dashboard. Models exported in ONNX and TorchScript. Trained on Lightning AI.',
    stack: ['YOLO11-seg','EfficientNetV2-S','FastAPI','LangChain','ChromaDB','Lightning AI','WebGL','ONNX'],
    emoji: 'LeafGuard',
  },
  {
    tag: 'Autonomous Systems - CV',
    award: '1st Place + Hajj Finalist',
    name: 'Qirnas - AI Drone Swarm System',
    desc: 'Intelligent swarm system for autonomous medical delivery during Hajj. Built a custom RotorPy simulation, multi-sensor fusion with YOLO-based obstacle detection, multi-agent path planning, and a real-time web dashboard. Won 1st place at our college competition, selected as Hajj Hackathon Finalist (Makkah 2025), and presented at Sand & Fun Exhibition.',
    stack: ['YOLOv8','RotorPy','Multi-Agent AI','OpenCV','Path Planning'],
  },
  {
    tag: 'ML - Cybersecurity',
    name: 'Phishing Detection System',
    desc: 'Binary classification pipeline on ~650,000 URL samples and email phishing data. Engineered URL and email features, applied Isolation Forest outlier removal, ANOVA feature selection, and compared 4 classifiers. Random Forest achieved best on Accuracy, F1, and ROC-AUC.',
    stack: ['Random Forest','NLP','Feature Engineering','scikit-learn'],
  },
  {
    tag: 'NLP - Generative AI',
    name: 'Cookbot - Recipe Generation',
    desc: 'Modified GPT-2 decoder with BERT-based ingredient encoder and Knowledge Graph Attention Gates. Trained on 120K recipes from Recipe1M+. Outperformed GPT-2 baseline by +23.2% on ROUGE-L. Human evaluators rated outputs at 92% coherence and 96% clarity.',
    stack: ['GPT-2','BERT','Transformers','PyTorch'],
  },
  {
    tag: 'Multi-Agent Systems',
    name: 'EconoSphere - Dynamic Pricing AI',
    desc: 'Multi-agent simulation of dynamic e-commerce pricing using JADE framework with 3 specialized agents. Autonomous heuristic-based price optimization considering demand, competition, and profit via FIPA protocol.',
    stack: ['JADE','Java','Multi-Agent Systems'],
  },
  {
    tag: 'Recommender Systems',
    name: 'Hybrid Book Recommendation Engine',
    desc: 'Hybrid recommender on Book-Crossing dataset (278K users, 271K books, 1.14M ratings) combining neural collaborative filtering, content-based filtering, and KNN-based similarity. Handles cold-start scenarios effectively.',
    stack: ['Collaborative Filtering','Neural Networks','KNN','Python'],
  },
  {
    tag: 'NLP - Deep Learning',
    name: 'Grammar Auto-Correction System',
    desc: 'Grammatical error correction trained on JFLEG, Lang-8, and NUS corpora. Compared T5/BART transformer vs Seq2Seq LSTM with attention. T5 significantly outperformed on BLEU score, exact match, and perplexity.',
    stack: ['T5','BART','Seq2Seq LSTM','Transformers'],
  },
  {
    tag: 'Assistive AI - Embedded',
    name: 'Smart Walking Stick',
    desc: 'Intelligent assistive device for visually impaired users integrating 5 real-time sensors on Arduino Uno. Non-blocking real-time sensor fusion with obstacle detection, slip hazard alerts, and stability monitoring.',
    stack: ['Arduino','Sensor Fusion','Embedded C'],
  },
];

const SKILLS = [
  {
    title: 'AI & Machine Learning',
    items: ['Deep Learning','Computer Vision','NLP & Generative AI','Multi-Agent Systems','Recommender Systems','Cybersecurity ML'],
  },
  {
    title: 'Frameworks & Libraries',
    items: ['PyTorch / TensorFlow','OpenCV / YOLO','HuggingFace Transformers','LangChain / ChromaDB','scikit-learn / Pandas','JADE (Java MAS)'],
  },
  {
    title: 'Engineering & Tools',
    items: ['Python / Java','FastAPI','Feature Engineering','Arduino / Embedded','Drone Simulation (RotorPy)','Git / Jupyter / Colab'],
  },
];

const SOFT_SKILLS = ['Problem-solving','Analytical Thinking','Leadership','Team Collaboration','Communication','Time Management'];

const EXPERIENCE = [
  {
    date: 'Jan 2026 - Apr 2026',
    role: 'AI Intern',
    org: 'CODE (RFQH)',
    bullets: [
      'Designed end-to-end data preprocessing pipelines for production AI systems.',
      'Built hybrid recommendation systems combining NLP semantic similarity with deep learning.',
      'Conducted experiments on model performance, regularization, and architecture optimization.',
    ],
  },
  {
    date: 'May 2026 - Present',
    role: 'Agentic AI Bootcamp',
    org: 'AAI Bootcamp',
    bullets: [
      'Building agentic AI systems, RAG pipelines, LLM orchestration, and production-ready applications.',
    ],
  },
  {
    date: '2025',
    role: 'Guest Instructor - Arduino & Embedded Systems',
    org: 'High School Workshop',
    bullets: [
      'Co-facilitated a hands-on workshop introducing Arduino, embedded systems, and sensor integration to high school students.',
    ],
  },
  {
    date: 'Aug - Sep 2025',
    role: 'AI & Drone Intern',
    org: 'Swarm Company',
    bullets: [
      'Built a deep learning child seatbelt detection system using OpenCV and Python.',
      'Investigated simulation constraints and hardware-software integration in autonomous drone systems.',
    ],
  },
  {
    date: '2022 - May 2026',
    role: 'BSc Artificial Intelligence',
    org: 'Princess Nourah bint Abdulrahman University | GPA 4.87 / 5.00',
    bullets: [
      'Thesis: Qirnas - AI-powered drone swarm for Hajj medical logistics. Won 1st place at our college competition and selected as Hajj Hackathon Finalist in Makkah.',
      'Presented at Sand & Fun Exhibition to academic and industry audiences.',
    ],
  },
];

const CERTS = [
  { issuer: 'MiSK Academy', name: 'Data Science & Artificial Intelligence' },
  { issuer: 'Duke University', name: 'Developing Explainable AI & XAI' },
  { issuer: 'IBM', name: 'Machine Learning with Python' },
  { issuer: 'AWS', name: 'Generative AI' },
  { issuer: 'DeepLearning.AI', name: 'AI for Medicine (3 courses)' },
  { issuer: 'Tuwaiq', name: 'Fundamental Drones Training' },
];

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeIn({ children, className = '' }) {
  const ref = useFadeIn();
  return <div ref={ref} className={`fade-item ${className}`}>{children}</div>;
}

const TYPING_PHRASES = ['AI Engineer','Computer Vision','NLP Researcher','Multi-Agent Systems','Deep Learning','Agentic AI'];

function TypingEffect() {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkTimer = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(blinkTimer);
  }, []);

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIdx];
    let delay = deleting ? 60 : 100;
    if (!deleting && charIdx === phrase.length) delay = 1600;
    if (deleting && charIdx === 0) delay = 400;
    const timer = setTimeout(() => {
      if (!deleting && charIdx < phrase.length) { setDisplayed(phrase.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }
      else if (!deleting && charIdx === phrase.length) { setDeleting(true); }
      else if (deleting && charIdx > 0) { setDisplayed(phrase.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }
      else if (deleting && charIdx === 0) { setDeleting(false); setPhraseIdx(i => (i + 1) % TYPING_PHRASES.length); }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, phraseIdx]);

  return (
    <div className="typing-box">
      <div className="typing-label">Currently working on</div>
      <div className="typing-text">{displayed}<span className="typing-cursor" style={{ opacity: blink ? 1 : 0 }}>|</span></div>
      <div className="typing-tags">
        {TYPING_PHRASES.map((p, i) => <span key={i} className={`typing-tag ${i === phraseIdx ? 'active' : ''}`}>{p}</span>)}
      </div>
      <div className="typing-location">Riyadh, Saudi Arabia</div>
    </div>
  );
}

function Nav() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-logo">Farah<span>.</span></div>
        <div className="nav-links">
          {['about','projects','skills','experience','contact'].map(s => (
            <button key={s} onClick={() => scrollTo(s)}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow fade-up">AI Engineer · Computer Vision · NLP · Multi-Agent Systems</div>
            <h1 className="hero-name fade-up delay-1">Farah<br />Alyami</h1>
            <p className="hero-title fade-up delay-2">Building intelligent systems at the intersection of machine learning, computer vision, and real-world impact.</p>
            <p className="hero-desc fade-up delay-3">Fresh AI graduate from Princess Nourah bint Abdulrahman University (GPA 4.87/5.00). Hajj Hackathon Finalist. Experienced across the full AI pipeline from data engineering to deployed models.</p>
            <div className="hero-btns fade-up delay-4">
              <button className="btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>View my work</button>
              <button className="btn-ghost" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Get in touch</button>
            </div>
          </div>
          <div className="hero-visual fade-up delay-2"><TypingEffect /></div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">
          <div>
            <div className="section-label">About me</div>
            <h2 className="section-title">Turning data into decisions</h2>
            <div className="about-text">
              <p>I'm a fresh AI graduate from PNU with hands-on experience in machine learning, computer vision, NLP, and multi-agent systems applied through research internships, competitions, and academic projects.</p>
              <p>My thesis project Qirnas, an AI-powered drone swarm for Hajj medical logistics, won 1st place at our college competition and was selected as a Hajj Hackathon Finalist in Makkah. It was also presented at the Sand & Fun Exhibition.</p>
              <p>I'm open to any opportunity where I can contribute meaningfully, any role, domain, or location.</p>
            </div>
          </div>
          <div className="about-stats">
            {[
              { num: '4.87', label: 'GPA out of 5.00' },
              { icon: 'trophy', num: 'Finalist', label: 'Hajj Hackathon\nMakkah 2025' },
              { icon: 'medal', num: '1st', label: 'Place - Qirnas\ncollege competition' },
              { num: '6', label: 'Certifications earned' },
            ].map((s, i) => (
              <FadeIn key={i}>
                <div className="stat-card">
                  {s.icon === 'trophy' && <div className="stat-icon">&#127942;</div>}
                  {s.icon === 'medal' && <div className="stat-icon">&#129351;</div>}
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-label">Projects</div>
        <h2 className="section-title">What I've built</h2>
        <p className="section-sub">Research projects, AI systems, and engineering work across domains.</p>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <FadeIn key={i} className={p.featured ? 'featured-wrap' : ''}>
              <div className={`project-card${p.featured ? ' featured' : ''}`}>
                {p.featured && (
                  <div className="featured-visual">
                    <span className="feat-emoji">&#127807;</span>
                    <span className="feat-label">{p.emoji}</span>
                  </div>
                )}
                <div className="project-body">
                  <div className="tag-row">
                    <span className="project-tag">{p.tag}</span>
                    {p.award && <span className="award-badge">{p.award}</span>}
                  </div>
                  <div className="project-name">{p.name}</div>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-stack">{p.stack.map(s => <span key={s} className="stack-pill">{s}</span>)}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-label">Skills</div>
        <h2 className="section-title">Technical toolkit</h2>
        <p className="section-sub">Core technologies across the full AI engineering stack.</p>
        <div className="skills-grid">
          {SKILLS.map((g, i) => (
            <FadeIn key={i}>
              <div className="skill-group">
                <div className="skill-group-title">{g.title}</div>
                {g.items.map(item => <div key={item} className="skill-item"><div className="skill-dot" />{item}</div>)}
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="subsection">
          <h2 className="section-title">Soft Skills</h2>
          <FadeIn>
            <div className="soft-skills-pills">
              {SOFT_SKILLS.map(skill => <span key={skill} className="soft-skill-pill">{skill}</span>)}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <div className="section-label">Experience</div>
        <h2 className="section-title">Background</h2>
        <p className="section-sub">Education, research, internships, and recognition.</p>
        <div className="timeline">
          {EXPERIENCE.map((e, i) => (
            <FadeIn key={i}>
              <div className="timeline-item">
                <div className="timeline-date">{e.date}</div>
                <div>
                  <div className="timeline-role">{e.role}</div>
                  <div className="timeline-org">{e.org}</div>
                  <ul className="tl-list">{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="subsection">
          <div className="section-label">Awards & Recognition</div>
          <div className="awards-grid">
            {[
              { icon: '&#127942;', title: 'Hajj Hackathon Finalist', desc: 'Health & Safety Forum, Makkah - May 2025. Ranked among top teams for AI-based healthcare logistics with Team Qirnas.' },
              { icon: '&#129351;', title: '1st Place - College Competition', desc: "Qirnas won 1st place at PNU's college competition and was presented at the Sand & Fun Exhibition." },
            ].map((a, i) => (
              <FadeIn key={i}>
                <div className="award-card">
                  <div className="award-icon" dangerouslySetInnerHTML={{ __html: a.icon }} />
                  <div><div className="award-title">{a.title}</div><div className="award-desc">{a.desc}</div></div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        <div className="subsection">
          <div className="section-label">Certifications</div>
          <div className="cert-grid">
            {CERTS.map((c, i) => (
              <FadeIn key={i}>
                <div className="cert-card">
                  <div className="cert-issuer">{c.issuer}</div>
                  <div className="cert-name">{c.name}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="contact-inner">
          <div className="section-label">Contact</div>
          <h2 className="section-title">Let's connect</h2>
          <p>Open to any opportunity, any role, any domain, any location. If you're working on something meaningful, I'd love to hear about it.</p>
          <div className="contact-links">
            <a href="mailto:FarahAlyami2@gmail.com" className="contact-link">Email: FarahAlyami2@gmail.com</a>
            <a href="https://linkedin.com/in/farah-alyami-68911a369" target="_blank" rel="noreferrer" className="contact-link">LinkedIn</a>
            <a href="https://github.com/farahalyami2-eng" target="_blank" rel="noreferrer" className="contact-link">GitHub</a>
          </div>
          <p className="phone">+966 559181578</p>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <footer className="footer">2026 Farah Dhafer Alyami - AI Engineer - Riyadh, Saudi Arabia</footer>
    </>
  );
}
