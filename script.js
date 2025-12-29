// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggleBtn = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const contactForm = document.getElementById('contact-form');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===================
// MOBILE NAVIGATION
// ===================

const closeMobileMenu = () => {
    if (navMenu) navMenu.classList.remove('active');
    if (navToggle) {
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
};

if (navToggle && navMenu) {
    const handleMenuToggle = (e) => {
        e.preventDefault();
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    };

    navToggle.addEventListener('click', handleMenuToggle);
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => closeMobileMenu());
});

document.addEventListener('click', (e) => {
    if (navMenu && navToggle) {
        const isClickInsideNav = navMenu.contains(e.target) || navToggle.contains(e.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 769) closeMobileMenu();
});

// ===================
// THEME TOGGLE
// ===================

function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    navbar.style.background = 'var(--bg-primary)';
    navbar.style.borderBottomColor = 'var(--border-color)';
    navbar.style.backdropFilter = 'blur(10px)';
}

if (themeToggleBtn && themeIcon) {
    const handleThemeToggle = (e) => {
        e.preventDefault();
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.body.setAttribute('data-theme', newTheme);

        // Update icon class
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

        updateNavbarBackground();
        localStorage.setItem('theme', newTheme);
    };

    themeToggleBtn.addEventListener('click', handleThemeToggle);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);
if (themeIcon) {
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===================
// SMOOTH SCROLLING
// ===================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                if (window.innerWidth < 769) closeMobileMenu();
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: prefersReducedMotion ? 'auto' : 'smooth',
                        block: 'start'
                    });
                }, window.innerWidth < 769 ? 300 : 0);
            }
        }
    });
});

// ===================
// SCROLL HANDLERS
// ===================

function handleScroll() {
    updateNavbarBackground();

    // Active nav highlighting
    const sections = document.querySelectorAll('main section');
    let currentId = '';
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
            currentId = `#${section.id}`;
        }
    });
    if (navLinks && navLinks.length > 0) {
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === currentId;
            link.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });

// ===================
// SKILLS ANIMATION
// ===================

function animateCounter(element, targetValue, duration) {
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(targetValue * easeOutCubic);

        element.textContent = currentValue + '%';

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = targetValue + '%';
        }
    }

    requestAnimationFrame(updateCounter);
}

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItems = entry.target.querySelectorAll('.skill-item');
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    const progressBar = item.querySelector('.skill-progress');
                    const percentageElement = item.querySelector('.skill-percentage');

                    if (progressBar && percentageElement) {
                        const targetWidth = progressBar.getAttribute('data-width');
                        progressBar.style.width = targetWidth + '%';
                        animateCounter(percentageElement, parseInt(targetWidth), 2000);
                    }
                }, index * 100);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) skillsObserver.observe(skillsSection);

// ===================
// PROJECT FILTER
// ===================

if (filterBtns && filterBtns.length > 0 && projectCards && projectCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===================
// CONTACT FORM
// ===================

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (!submitBtn) return;

        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span>📤</span> Sending...';
        submitBtn.disabled = true;

        try {
            const name = formData.get('name') || '';
            const email = formData.get('email') || '';
            const subject = formData.get('subject') || 'New Inquiry';
            const message = formData.get('message') || '';

            const waNumber = '6282328649895';
            const waText = encodeURIComponent(`Halo, saya ${name}\nEmail: ${email}\nSubjek: ${subject}\n\n${message}`);
            const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

            window.open(waUrl, '_blank', 'noopener,noreferrer');
            showNotification('Mengarahkan ke WhatsApp...', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Gagal mengirim. Coba lagi.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 16px;
        left: 16px;
        max-width: calc(100% - 32px);
        padding: 12px 16px;
        border-radius: 8px;
        color: white;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        z-index: 10000;
        transform: translateY(-100px);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-size: 0.9rem;
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateY(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateY(-100px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===================
// BACK TO TOP
// ===================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded!');

    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('show', window.scrollY > 500);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    // Initialize on load
    updateNavbarBackground();
});

// ===================
// CSS ANIMATIONS
// ===================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
