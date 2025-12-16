/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Visitor Counter - Tracks unique visits
   */
  function initVisitorCounter() {
    const counterElement = document.getElementById('visitorCount');
    if (!counterElement) return;

    // Get stored visitor count
    let visitorCount = localStorage.getItem('portfolioVisitorCount');
    
    if (!visitorCount) {
      // First time visitor
      visitorCount = 1;
    } else {
      // Increment count
      visitorCount = parseInt(visitorCount) + 1;
    }
    
    // Store updated count
    localStorage.setItem('portfolioVisitorCount', visitorCount);
    
    // Animate counter from 0 to current count
    animateCounter(counterElement, visitorCount);
    
    // Track unique session (for more accurate analytics)
    trackSession();
  }

  function animateCounter(element, targetCount) {
    let currentCount = 0;
    const increment = Math.ceil(targetCount / 50);
    const duration = 1500; // 1.5 seconds
    const stepTime = duration / (targetCount / increment);
    
    const counter = setInterval(() => {
      currentCount += increment;
      if (currentCount >= targetCount) {
        element.textContent = targetCount.toLocaleString();
        clearInterval(counter);
      } else {
        element.textContent = currentCount.toLocaleString();
      }
    }, stepTime);
  }

  function trackSession() {
    // Track unique sessions (resets after browser close)
    const sessionKey = 'portfolioSession';
    const currentSession = sessionStorage.getItem(sessionKey);
    
    if (!currentSession) {
      // New session - you can send this to your analytics
      sessionStorage.setItem(sessionKey, Date.now());
      console.log('📊 New visitor session started');
      
      // If you want to track this in Google Analytics
      if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
          'page_title': document.title,
          'page_location': window.location.href
        });
      }
    }
  }

  /**
   * Dark Mode / Light Mode Toggle
   */
  const initThemeToggle = () => {
    const toggleBtn = document.querySelector('.theme-toggle-btn');
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      if (toggleBtn) toggleBtn.innerHTML = '<i class="bi bi-sun"></i>';
    }
    
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        toggleBtn.innerHTML = isDark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      });
    }
  };

  /**
   * Add Scroll Progress Bar
   */
  const initScrollProgressBar = () => {
    let scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) {
      scrollProgress = document.createElement('div');
      scrollProgress.className = 'scroll-progress';
      document.body.appendChild(scrollProgress);
    }

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = scrollPercent + '%';
    });
  };

  /**
   * Smooth Scroll to Section
   */
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };

  /**
   * Parallax Effect on Hero Section
   */
  const initParallaxEffect = () => {
    const heroSection = document.querySelector('#hero');
    if (!heroSection) return;

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const heroImg = heroSection.querySelector('img');
      if (heroImg) {
        heroImg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    });
  };

  /**
   * Number Counter Animation
   */
  const initCounterAnimation = () => {
    const counters = document.querySelectorAll('[data-purecounter-end]');
    
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          const element = entry.target;
          const target = parseInt(element.dataset.purecounterEnd);
          let current = 0;
          const increment = target / 30;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              element.textContent = target;
              clearInterval(timer);
            } else {
              element.textContent = Math.ceil(current);
            }
          }, 30);
          
          element.dataset.animated = 'true';
        }
      });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
  };

  /**
   * Enhanced Skill Progress Animation
   */
  const initEnhancedSkillAnimation = () => {
    const skillsSection = document.querySelector('.skills-animation');
    if (!skillsSection) return;

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.skillsAnimated) {
          const progressBars = entry.target.querySelectorAll('.progress-bar');
          progressBars.forEach((bar, index) => {
            const width = bar.getAttribute('aria-valuenow');
            setTimeout(() => {
              bar.style.width = width + '%';
            }, index * 100);
          });
          entry.target.dataset.skillsAnimated = 'true';
        }
      });
    }, observerOptions);

    observer.observe(skillsSection);
  };

  /**
   * Intersection Observer for Fade-in Effects
   */
  const initFadeInOnScroll = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
    });
  };

  /**
   * Add Scroll Reveal for Stats
   */
  const initStatsReveal = () => {
    const statsItems = document.querySelectorAll('.stats-item');
    
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting && !entry.target.dataset.revealed) {
          setTimeout(() => {
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
          }, index * 100);
          entry.target.dataset.revealed = 'true';
        }
      });
    }, observerOptions);

    statsItems.forEach(item => observer.observe(item));
  };

  /**
   * Create Slide Up Animation
   */
  const createAnimations = () => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `;
    document.head.appendChild(style);
  };

  /**
   * Enhance Portfolio Items with Stagger Animation
   */
  const initPortfolioStagger = () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Only apply initial animation on page load, don't interfere with Isotope filtering
    portfolioItems.forEach((item, index) => {
      if (!item.dataset.initialAnimated) {
        item.style.animation = `slideUp 0.6s ease forwards`;
        item.style.animationDelay = `${index * 0.1}s`;
        item.dataset.initialAnimated = 'true';
        
        // Remove animation after it completes to not interfere with Isotope
        setTimeout(() => {
          item.style.animation = '';
          item.style.animationDelay = '';
        }, 600 + (index * 100));
      }
    });
  };

  /**
   * FAQ Toggle Functionality
   */
  const initFaqToggle = () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
      const question = item.querySelector('h3');
      const toggle = item.querySelector('.faq-toggle');

      const clickHandler = () => {
        const isActive = item.classList.contains('faq-active');
        
        // Close all other FAQ items
        faqItems.forEach((otherItem) => {
          otherItem.classList.remove('faq-active');
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('faq-active');
        }
      };

      if (question) question.addEventListener('click', clickHandler);
      if (toggle) toggle.addEventListener('click', clickHandler);
    });
  };

  /**
   * Tooltip on Hover for Portfolio Items - Removed to prevent conflicts
   * CSS handles the hover effects properly
   */
  const initPortfolioTooltip = () => {
    // CSS handles hover effects - no JavaScript needed
    // This prevents conflicts with Isotope filtering
  };

  /**
   * Add Active State to Navigation on Scroll
   */
  const initNavHighlight = () => {
    const navLinks = document.querySelectorAll('.navmenu a[href^="#"]');
    
    window.addEventListener('scroll', () => {
      let current = '';
      
      document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
          link.classList.add('active');
        }
      });
    });
  };

  /**
   * Initialize Theme Toggle Button
   */
  const createThemeToggleButton = () => {
    const existingBtn = document.querySelector('.theme-toggle-btn');
    if (!existingBtn) {
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'theme-toggle-btn';
      toggleBtn.innerHTML = '<i class="bi bi-moon"></i>';
      toggleBtn.title = 'Toggle Dark Mode';
      document.body.appendChild(toggleBtn);
    }
  };

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Initialize all new features on load
   */
  window.addEventListener('load', () => {
    initVisitorCounter();
    createAnimations();
    createThemeToggleButton();
    initThemeToggle();
    initScrollProgressBar();
    initSmoothScroll();
    initParallaxEffect();
    initCounterAnimation();
    initEnhancedSkillAnimation();
    initFadeInOnScroll();
    initStatsReveal();
    initPortfolioTooltip();
    initNavHighlight();
    initFaqToggle();
    initMobileEnhancements();
    
    // Delay portfolio stagger to run after Isotope is fully initialized
    setTimeout(() => {
      initPortfolioStagger();
    }, 500);
  });

  /**
   * Mobile-Specific Enhancements
   */
  function initMobileEnhancements() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Add mobile class to body
      document.body.classList.add('mobile-device');
      
      // Improve touch scrolling
      document.body.style.webkitOverflowScrolling = 'touch';
      
      // Remove hover effects on mobile (use tap instead)
      document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('touchstart', function() {
          this.classList.add('touch-active');
        });
        
        item.addEventListener('touchend', function() {
          setTimeout(() => {
            this.classList.remove('touch-active');
          }, 300);
        });
      });
      
      // Optimize animations for mobile performance
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
      }
      
      // Mobile menu auto-close on link click
      const navLinks = document.querySelectorAll('.navmenu a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          const header = document.getElementById('header');
          if (header && header.classList.contains('header-show')) {
            header.classList.remove('header-show');
          }
        });
      });
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
      setTimeout(() => {
        window.scrollTo(0, window.scrollY + 1);
        window.scrollTo(0, window.scrollY - 1);
      }, 100);
    });
    
    // Improve viewport height on mobile browsers
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
  }

})();