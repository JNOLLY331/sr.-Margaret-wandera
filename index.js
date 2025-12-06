
    function startCountdown() {
      const eventDate = new Date('2025-12-30T00:00:00').getTime();
      
      const updateCountdown = () => {
        const now = new Date().getTime();
        const timeLeft = eventDate - now;

        if (timeLeft < 0) {
          document.getElementById('days').textContent = '00';
          document.getElementById('hours').textContent = '00';
          document.getElementById('minutes').textContent = '00';
          document.getElementById('seconds').textContent = '00';
          return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
      };

      updateCountdown();
      setInterval(updateCountdown, 1000);
    }

    document.addEventListener('DOMContentLoaded', () => {
      startCountdown();
      const counterElement = document.getElementById('experienceCounter');
      if (counterElement) {
        animateCounter(counterElement, 30, 2000);
      }

      // Initialize PureCounter
      new PureCounter('.purecounter', {
        duration: 2, // Duration in seconds
        delay: 10,  // Delay in milliseconds before starting the animation
        once: true, // Animation only once
      });
    });

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const header = item.querySelector('.faq-header');
      header.addEventListener('click', () => {
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        item.classList.toggle('active');
      });
    });

    const swiper = new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
    });

    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 100,
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 25px rgba(5, 100, 83, 0.15)';
      } else {
        header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.12)';
      }
    });

     document.addEventListener('DOMContentLoaded', function() {
      const animateCounter = (element, target, duration = 2500) => {
        let current = 0;
        const increment = target / (duration / 16);
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(counter);
          }
          element.textContent = Math.floor(current);
        }, 16);
      };
      
      // Intersection Observer to trigger counters on scroll
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            
            animateCounter(document.getElementById('counter-age'), 52);
            animateCounter(document.getElementById('counter-siblings'), 7);
            animateCounter(document.getElementById('counter-parent'), 1);
            animateCounter(document.getElementById('counter-faith'), 30);
            
            console.log('[v0] Counters animated on scroll');
          }
        });
      }, { threshold: 0.5 });
      
      const statsSection = document.getElementById('milestones');
      if (statsSection) observer.observe(statsSection);
      
      // Initialize AOS animations
      if (window.AOS) {
        AOS.init({ duration: 1000, once: true, offset: 100 });
        console.log('[v0] AOS initialized');
      }
    });
  