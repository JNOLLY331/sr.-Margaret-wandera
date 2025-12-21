/* --- Counter & Countdown Logic --- */
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

/* --- Helper Function for Counter Animation --- */
const animateCounter = (element, target, duration = 1500) => {
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


document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    
    /* --- Intersection Observer for Stats Counter Animation --- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            
            // Animate counters in the experience badge and stats section
            animateCounter(document.getElementById('experienceCounter'), 30, 2000);
            animateCounter(document.getElementById('counter-age'), 52);
            animateCounter(document.getElementById('counter-siblings'), 7);
            animateCounter(document.getElementById('counter-parent'), 1);
            animateCounter(document.getElementById('counter-faith'), 30);
            
            // Initialize PureCounter for any other elements if needed (though custom animation overrides it)
            if (window.PureCounter) {
              new PureCounter('.purecounter', { duration: 2, delay: 10, once: true });
            }
          }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.getElementById('milestones');
    if (statsSection) observer.observe(statsSection);

    /* --- FAQ Toggle Logic --- */
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

    /* --- Swiper Initialization --- */
    const swiper = new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: {
            delay: 4000,
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

    /* --- AOS Initialization --- */
    if (window.AOS) {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true,
            offset: 100,
        });
    }

    /* --- Smooth Scroll Logic --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* --- Header Shadow Scroll Logic --- */
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 25px rgba(5, 100, 83, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.12)';
        }
    });

    /* --- NEW MOBILE MENU TOGGLE SCRIPT --- */
    const toggleButton = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    const iconList = 'bi-list';
    const iconClose = 'bi-x';
    
    if (toggleButton) {
        toggleButton.classList.add(iconList); 

        toggleButton.addEventListener('click', () => {
            // Toggle classes on the menu and the body
            navMenu.classList.toggle('mobile-active');
            body.classList.toggle('mobile-menu-open');

            // Toggle the icon
            if (navMenu.classList.contains('mobile-active')) {
                toggleButton.classList.remove(iconList);
                toggleButton.classList.add(iconClose);
            } else {
                toggleButton.classList.remove(iconClose);
                toggleButton.classList.add(iconList);
            }
        });

        // Close menu when a link is clicked (for smooth scroll)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-active');
                body.classList.remove('mobile-menu-open');
                toggleButton.classList.remove(iconClose);
                toggleButton.classList.add(iconList);
            });
        });
    }
});

  /* --- LIGHTBOX FUNCTIONALITY --- */
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxClose = document.getElementById('lightbox-close');
        const lightboxPrev = document.getElementById('lightbox-prev');
        const lightboxNext = document.getElementById('lightbox-next');
        
        let currentImageIndex = 0;
        let imageElements = [];

        // Get all family images
        const familyImages = document.querySelectorAll('.lightbox-trigger');
        
        familyImages.forEach((trigger, index) => {
            imageElements.push({
                src: trigger.getAttribute('data-src'),
                caption: trigger.getAttribute('data-caption')
            });

            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                currentImageIndex = index;
                openLightbox();
            });
        });

        function openLightbox() {
            lightbox.classList.add('active');
            updateLightboxImage();
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
        }

        function updateLightboxImage() {
            lightboxImg.src = imageElements[currentImageIndex].src;
            lightboxCaption.textContent = imageElements[currentImageIndex].caption;
        }

        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % imageElements.length;
            updateLightboxImage();
        }

        function prevImage() {
            currentImageIndex = (currentImageIndex - 1 + imageElements.length) % imageElements.length;
            updateLightboxImage();
        }

        // Event listeners
        lightboxClose.addEventListener('click', closeLightbox);
        lightboxNext.addEventListener('click', nextImage);
        lightboxPrev.addEventListener('click', prevImage);

        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });
    