/* ============================================
   INTERNAL AFFAIRS - JAVASCRIPT
   Modern Interior Design Website
   GSAP Animations & Interactivity
   ============================================ */

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ============================================
// PRELOADER
// ============================================

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 2500);
    }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 0.6,
            delay: index * 0.1,
            opacity: 0,
            y: 30,
            ease: 'power3.out'
        });
    });
};

// ============================================
// PORTFOLIO FILTERS
// ============================================

const setupPortfolioFilters = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterBtns.length || !portfolioItems.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Animate and filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    gsap.to(item, {
                        duration: 0.3,
                        opacity: 1,
                        pointerEvents: 'auto'
                    });
                    item.classList.remove('hidden');
                } else {
                    gsap.to(item, {
                        duration: 0.3,
                        opacity: 0,
                        pointerEvents: 'none'
                    });
                    item.classList.add('hidden');
                }
            });
        });
    });
};

// ============================================
// CONTACT FORM
// ============================================

const setupContactForm = () => {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        const whatsapp = document.getElementById('whatsapp').checked;
        
        // Validate
        if (!name || !phone || !email || !service || !message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Create mailto link with form data
        const subject = encodeURIComponent(`Design Inquiry - ${service}`);
        const body = encodeURIComponent(
            `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`
        );
        
        // For demo, just log and show success message
        console.log('Form submitted:', { name, phone, email, service, message, whatsapp });
        
        // Show success message
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = '✓ Message Sent Successfully!';
        btn.style.background = '#27ae60';
        
        // Reset form
        form.reset();
        
        // Restore button after 3 seconds
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 3000);
        
        // WhatsApp message option
        if (whatsapp) {
            const whatsappMessage = encodeURIComponent(
                `Hi, I'm ${name}. I'm interested in ${service}. ${message}`
            );
            const whatsappUrl = `https://wa.me/919830059421?text=${whatsappMessage}`;
            window.open(whatsappUrl, '_blank');
        }
    });
};

// ============================================
// BACK TO TOP BUTTON
// ============================================

const setupBackToTop = () => {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1,
            scrollTo: 0,
            ease: 'power3.out'
        });
    });
};

// ============================================
// SMOOTH SCROLL LINKS
// ============================================

const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just '#'
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                gsap.to(window, {
                    duration: 0.8,
                    scrollTo: target,
                    ease: 'power3.out'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        });
    });
};

// ============================================
// STAT COUNTERS
// ============================================

const setupStatCounters = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        const suffix = text.replace(/[0-9]/g, '').trim();
        
        if (isNaN(number)) return;
        
        gsap.from(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 2,
            textContent: 0,
            snap: { textContent: 1 },
            ease: 'power3.out',
            onUpdate: function() {
                stat.textContent = Math.ceil(this.targets()[0].textContent) + suffix;
            }
        });
    });
};

// ============================================
// ACCORDION ANIMATIONS
// ============================================

const setupAccordions = () => {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const accordion = button.closest('.accordion-item');
            const isOpen = !button.classList.contains('collapsed');
            
            // Animate when opening
            if (!isOpen) {
                const body = accordion.querySelector('.accordion-body');
                gsap.from(body, {
                    duration: 0.3,
                    opacity: 0,
                    height: 0,
                    ease: 'power2.out'
                });
            }
        });
    });
};

// ============================================
// SERVICE CARD HOVER EFFECTS
// ============================================

const setupServiceCards = () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                y: -8,
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.2)',
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                y: 0,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                ease: 'power2.out'
            });
        });
    });
};

// ============================================
// TESTIMONIAL CARD HOVER
// ============================================

const setupTestimonialCards = () => {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                y: -8,
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.2)',
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                y: 0,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                ease: 'power2.out'
            });
        });
    });
};

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const setupNavbarScroll = () => {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }
    });
};

// ============================================
// LAZY LOADING IMAGES
// ============================================

const setupLazyLoading = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
};

// ============================================
// PORTFOLIO IMAGE HOVER ZOOM
// ============================================

const setupPortfolioZoom = () => {
    const portfolioImages = document.querySelectorAll('.portfolio-image img');
    
    portfolioImages.forEach(img => {
        const card = img.closest('.portfolio-card');
        
        if (card) {
            card.addEventListener('mouseenter', () => {
                gsap.to(img, {
                    duration: 0.3,
                    scale: 1.1,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(img, {
                    duration: 0.3,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        }
    });
};

// ============================================
// FORM INPUT FOCUS EFFECTS
// ============================================

const setupFormInputs = () => {
    const inputs = document.querySelectorAll('.form-control, .form-select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                duration: 0.2,
                borderColor: '#d4a574',
                ease: 'power2.out'
            });
        });
        
        input.addEventListener('blur', () => {
            gsap.to(input, {
                duration: 0.2,
                borderColor: '#e0d5c7',
                ease: 'power2.out'
            });
        });
    });
};

// ============================================
// INITIALIZE ALL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Run all setup functions
    animateOnScroll();
    setupPortfolioFilters();
    setupContactForm();
    setupBackToTop();
    setupSmoothScroll();
    setupStatCounters();
    setupAccordions();
    setupServiceCards();
    setupTestimonialCards();
    setupNavbarScroll();
    setupLazyLoading();
    setupPortfolioZoom();
    setupFormInputs();
    
    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();
    
    // Refresh on window resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
});

// ============================================
// MOBILE MENU CLOSE ON LINK CLICK
// ============================================

document.addEventListener('click', (e) => {
    const navbar = document.querySelector('.navbar');
    const toggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (!navbar) return;
    
    // Close menu if clicking a nav link (except toggle button)
    if (e.target.closest('.nav-link') && !e.target.closest('.navbar-toggler')) {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            toggler.click();
        }
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll event handling
    });
}, { passive: true });

// Disable animations on mobile if needed
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    gsap.globalTimeline.timeScale(0);
    gsap.globalTimeline.timeScale(1);
}

console.log('Internal Affairs - Website Initialized ✓');
