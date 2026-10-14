/* ==========================================================================
   MUHAMMAD ABBAS NADEEM — PORTFOLIO JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. PRELOADER
     -------------------------------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('hidden');
    });
    // Fallback hide after 1.5 seconds
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1500);
  }

  /* --------------------------------------------------------------------------
     2. WHITE & BLACK THEME TOGGLE
     -------------------------------------------------------------------------- */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlEl = document.documentElement;

  // Check saved theme or default to light (white theme)
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.setAttribute('data-lucide', 'sun');
    } else {
      themeIcon.setAttribute('data-lucide', 'moon');
    }
    if (window.lucide) lucide.createIcons();
  }

  /* --------------------------------------------------------------------------
     3. NAVBAR SCROLL & MOBILE MENU
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const hamburger = navToggle ? navToggle.querySelector('.hamburger') : null;
  const navLinkItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      if (hamburger) hamburger.classList.toggle('active');
    });

    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        if (hamburger) hamburger.classList.remove('active');
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. TYPING EFFECT
     -------------------------------------------------------------------------- */
  const typingText = document.querySelector('.typing-text');
  const roles = [
    'Web Developer 💻',
    'SEO Specialist 🔍',
    'YouTube Automator 🚀',
    'Crypto & Forex Trader 📈'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = 1800; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  if (typingText) {
    type();
  }

  /* --------------------------------------------------------------------------
     5. PROJECT OVERVIEW MODAL DATA & LOGIC
     -------------------------------------------------------------------------- */
  const projectData = {
    flock: {
      badge: 'Web App & SEO Strategy',
      title: 'Flock Camera Map',
      subtitle: 'Find ALPR (Automatic License Plate Recognition) Cameras Near You',
      img: 'images/project-flock.svg',
      desc: 'An interactive web mapping platform designed to locate and track public ALPR camera installations nationwide. Built with real-time location mapping, fast search & filter functions, high SEO optimization for search engine dominance, and a mobile-first responsive user interface.',
      benefits: [
        'Interactive real-time camera search with pin-point mapping accuracy',
        'Search Engine Optimization (SEO) tuned for fast indexing & high organic ranking',
        'Ultra-fast response time with lightweight architecture & optimized assets',
        'Mobile-first responsive interface designed for smooth touch navigation'
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Leaflet / Map API', 'SEO Strategy'],
      link: 'https://flockcameramap.net/'
    },
    niwala: {
      badge: 'Mobile App & Admin Ecosystem',
      title: 'Niwala: Food Delivery App',
      subtitle: 'Complete Food Ordering & Live Dispatch System',
      img: 'images/project-niwala.svg',
      desc: 'A full-stack food delivery app ecosystem connecting customers, restaurant managers, delivery riders, and platform administrators. Designed with multi-role access control, real-time order tracking, and in-app chat integration.',
      benefits: [
        'Multi-Role Authentication (Customer, Restaurant, Delivery Rider, Admin)',
        'Real-time GPS order tracking and status updates via Google Maps',
        'In-app instant messaging between customer, rider, and restaurant',
        'Comprehensive Admin Panel for managing menus, orders, and platform earnings'
      ],
      tech: ['Android Studio', 'Java/Kotlin', 'Node.js', 'Express', 'MongoDB', 'Google Maps API'],
      link: null
    },
    blockchain: {
      badge: 'Decentralized Application (dApp)',
      title: 'Blockchain Voting System',
      subtitle: 'Decentralized, Tamper-Proof & Anonymous Digital Voting',
      img: 'images/project-blockchain.svg',
      desc: 'A next-generation voting platform leveraging smart contracts and blockchain technology to guarantee electoral integrity, eliminate double-voting, ensure voter anonymity, and maintain immutable vote ledgers.',
      benefits: [
        'Immutable & tamper-proof vote records secured on the blockchain',
        'Zero double-voting or unauthorized record manipulation',
        '100% anonymous & verifiable voter participation',
        'Real-time election counting & transparent public auditability'
      ],
      tech: ['Solidity', 'Smart Contracts', 'Web3.js', 'React', 'Ethereum / EVM'],
      link: null
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalBanner = document.getElementById('modal-banner');
  const modalDesc = document.getElementById('modal-desc');
  const modalBenefits = document.getElementById('modal-benefits');
  const modalTechTags = document.getElementById('modal-tech-tags');
  const modalLiveLink = document.getElementById('modal-live-link');

  const openModalBtns = document.querySelectorAll('.open-project-modal');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-project');
      const data = projectData[key];

      if (data) {
        modalBadge.textContent = data.badge;
        modalTitle.textContent = data.title;
        modalSubtitle.textContent = data.subtitle;

        // Banner Image
        modalBanner.innerHTML = `<img src="${data.img}" alt="${data.title}">`;

        modalDesc.textContent = data.desc;

        // Render Benefits List
        modalBenefits.innerHTML = data.benefits
          .map(item => `<li><i data-lucide="check-circle-2"></i> <span>${item}</span></li>`)
          .join('');

        // Render Tech Tags
        modalTechTags.innerHTML = data.tech
          .map(tag => `<span class="modal-tech-tag">${tag}</span>`)
          .join('');

        // Show/Hide Live Link Button
        if (data.link) {
          modalLiveLink.style.display = 'inline-flex';
          modalLiveLink.setAttribute('href', data.link);
        } else {
          modalLiveLink.style.display = 'none';
        }

        if (window.lucide) lucide.createIcons();

        // Open Modal
        projectModal.classList.add('active');
        document.body.classList.add('modal-open');
      }
    });
  });

  function closeModal() {
    projectModal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  /* --------------------------------------------------------------------------
     6. SCROLL REVEAL ANIMATIONS
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --------------------------------------------------------------------------
     7. STATS COUNTER ANIMATION
     -------------------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number.counter');
  let animatedStats = false;

  function animateStats() {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      let count = 0;
      const speed = Math.ceil(target / 25);

      const update = () => {
        count += speed;
        if (count < target) {
          stat.textContent = count;
          setTimeout(update, 50);
        } else {
          stat.textContent = target;
        }
      };

      update();
    });
  }

  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animateStats();
          animatedStats = true;
        }
      });
    }, { threshold: 0.2 });

    heroObserver.observe(heroSection);
  }

  /* --------------------------------------------------------------------------
     8. ACTIVE NAV LINK ON SCROLL
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  /* --------------------------------------------------------------------------
     9. CONTACT FORM SUBMISSION (DIRECT EMAIL TO ALEXHALE2367@GMAIL.COM + WHATSAPP)
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');

  if (contactForm && formAlert) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const message = document.getElementById('contact-message').value;

      formAlert.style.display = 'block';
      formAlert.innerHTML = `<i data-lucide="check-circle"></i> Thank you, <strong>${name}</strong>! Sending message to <strong>alexhale2367@gmail.com</strong>...`;
      
      if (window.lucide) lucide.createIcons();

      // 1. Direct Email API Dispatch to alexhale2367@gmail.com via FormSubmit
      try {
        fetch('https://formsubmit.co/ajax/alexhale2367@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: `New Portfolio Message from ${name}`
          })
        }).catch(err => console.log('Email dispatch status:', err));
      } catch (err) {
        console.log(err);
      }

      // 2. Also open direct WhatsApp chat
      const waText = `Hi Muhammad Abbas Nadeem,%0A%0ANew contact message from portfolio:%0A%0A👤 *Name:* ${encodeURIComponent(name)}%0A📧 *Email:* ${encodeURIComponent(email)}%0A💬 *Message:* ${encodeURIComponent(message)}`;
      const waUrl = `https://wa.me/923144882824?text=${waText}`;

      setTimeout(() => {
        window.location.href = waUrl;
      }, 800);

      contactForm.reset();

      setTimeout(() => {
        formAlert.style.display = 'none';
      }, 6000);
    });
  }

  /* --------------------------------------------------------------------------
     10. BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
  }

  /* --------------------------------------------------------------------------
     11. FOOTER YEAR
     -------------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
