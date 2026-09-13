/* ============================================
   PROGRAMADOR COSTA — Script Avançado
   Com partículas, cursor customizado, tilt, etc.
   ============================================ */

(function () {
  'use strict';

  // ==========================================
  // LOADING SCREEN
  // ==========================================
  const loadingScreen = document.getElementById('loadingScreen');
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('loaded');
    }, 2500);
  });

  // ==========================================
  // CURSOR CUSTOMIZADO
  // ==========================================
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    // Cursor principal (segue imediatamente)
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Follower (segue com delay)
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = followerX - 20 + 'px';
    cursorFollower.style.top = followerY - 20 + 'px';

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Efeito hover em links e botões
  const interactiveElements = document.querySelectorAll('a, button, .service-card, .contact-link');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursorFollower.classList.remove('hover');
    });
  });

  // ==========================================
  // PARTICLES BACKGROUND
  // ==========================================
  const particlesContainer = document.getElementById('particles');
  const particlesCount = 50;

  function createParticles() {
    for (let i = 0; i < particlesCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Posição aleatória
      particle.style.left = Math.random() * 100 + '%';
      
      // Tamanho aleatório
      const size = Math.random() * 4 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Duração aleatória
      const duration = Math.random() * 20 + 15;
      particle.style.animationDuration = duration + 's';
      
      // Delay aleatório
      particle.style.animationDelay = Math.random() * 20 + 's';
      
      // Cor aleatória (azul, roxo ou verde)
      const colors = ['#00e5ff', '#7b2cff', '#00ff9d'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.background = color;
      particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
      
      particlesContainer.appendChild(particle);
    }
  }

  createParticles();

  // ==========================================
  // HEADER SCROLL EFFECT
  // ==========================================
  const header = document.getElementById('header');
  
  function updateHeader() {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ==========================================
  // MENU MOBILE
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');

  function toggleMenu() {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    nav.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
    }
  });

  // ==========================================
  // TYPEWRITER EFFECT
  // ==========================================
  const typewriterText = document.getElementById('typewriterText');
  const phrases = [
    'feitos para converter.',
    'com design premium.',
    'sob encomenda.',
    'para seu negócio.'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pausa antes de deletar
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pausa antes de digitar
    }

    setTimeout(typeWriter, typingSpeed);
  }

  // Iniciar typewriter após loading
  setTimeout(typeWriter, 3000);

  // ==========================================
  // REVEAL ON SCROLL
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // COUNTER ANIMATION
  // ==========================================
  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const increment = target / speed;
        
        const updateCount = () => {
          const count = +entry.target.innerText;
          if (count < target) {
            entry.target.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
          } else {
            entry.target.innerText = target;
          }
        };
        
        updateCount();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ==========================================
  // 3D TILT EFFECT
  // ==========================================
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ==========================================
  // MAGNETIC BUTTONS
  // ==========================================
  const magneticElements = document.querySelectorAll('.magnetic-link, .magnetic-btn');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });

  // ==========================================
  // SMOOTH SCROLL
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = header.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        
        window.scrollTo({ 
          top: top, 
          behavior: 'smooth' 
        });
      }
    });
  });

  // ==========================================
  // PARALLAX EFFECT
  // ==========================================
  const parallaxElements = document.querySelectorAll('.hero__glow, .hero__bg');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    parallaxElements.forEach((el, index) => {
      const speed = 0.5 + (index * 0.1);
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }, { passive: true });

  // ==========================================
  // CLOSE MENU ON RESIZE
  // ==========================================
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('open')) {
      closeMenu();
    }
  });

  // ==========================================
  // TERMINAL TYPING ANIMATION
  // ==========================================
  const terminalLines = document.querySelectorAll('.animate-typing');
  
  const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.style.animation = 'slideInRight 0.5s ease forwards';
        }, delay);
        terminalObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  terminalLines.forEach(line => terminalObserver.observe(line));

  // ==========================================
  // CONSOLE MESSAGE
  // ==========================================
  console.log('%c Programador Costa', 'color:#00e5ff; font-size:20px; font-weight:bold;');
  console.log('%cSite carregado com todas as animações! 🚀', 'color:#00ff9d; font-size:14px;');
  console.log('%cDesenvolvido com muita inteligência', 'color:#7b2cff; font-size:12px;');

})();