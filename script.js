// ===== LOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
        revealOnScroll();
    }, 1500);
});

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 80);
});

// Cursor hover effect
const hoverElements = document.querySelectorAll('a, button, .skill-card, .portfolio-item, .social-link');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('hover');
    });
});

// ===== NAVBAR =====
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Scroll effect navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link on scroll
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Scroll to top button
    const scrollTop = document.querySelector('.scroll-top');
    if (window.scrollY > 500) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
});

// Hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== SCROLL TOP =====
document.querySelector('.scroll-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            bar.style.width = bar.dataset.progress;
        }
    });
};

// ===== PORTFOLIO FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ===== REVEAL ON SCROLL =====
const revealElements = document.querySelectorAll('.section-header, .about-content, .skill-card, .portfolio-item, .contact-content, .footer-content');

revealElements.forEach(el => el.classList.add('reveal'));

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });

    animateSkills();
}

window.addEventListener('scroll', revealOnScroll);

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = contactForm.querySelector('.btn');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    btn.style.pointerEvents = 'none';
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
        btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.pointerEvents = 'auto';
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// ===== NEWSLETTER FORM =====
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const btn = newsletterForm.querySelector('button');
    const originalIcon = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-check"></i>';
    
    setTimeout(() => {
        btn.innerHTML = originalIcon;
        input.value = '';
    }, 2000);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const shapes = document.querySelectorAll('.shape');
    const scrolled = window.scrollY;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== TYPING EFFECT (Optional untuk subtitle) =====
// Bisa diaktifkan jika ingin efek typing

// ===== FIGMA CANVAS PARALLAX =====
const figmaCanvas = document.querySelector('.figma-canvas');
if (figmaCanvas) {
    figmaCanvas.addEventListener('mousemove', (e) => {
        const rect = figmaCanvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        figmaCanvas.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    
    figmaCanvas.addEventListener('mouseleave', () => {
        figmaCanvas.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
}