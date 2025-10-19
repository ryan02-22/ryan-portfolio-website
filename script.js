// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-icon');
const contactForm = document.getElementById('contact-form');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

// Page Transition System
class PageTransition {
    constructor() {
        this.overlay = document.getElementById('pageTransitionOverlay');
        this.pageContent = document.querySelector('.page-content');
        this.isTransitioning = false;
        this.init();
    }

    init() {
        // Add transition listeners to navigation links
        this.addNavigationListeners();
        
        // Add transition listeners to internal links
        this.addInternalLinkListeners();
        
        // Add transition listeners to buttons
        this.addButtonListeners();
    }

    addNavigationListeners() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    this.transitionToSection(href);
                }
            });
        });
    }

    addInternalLinkListeners() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    this.transitionToSection(href);
                }
            });
        });
    }

    addButtonListeners() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const href = button.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    this.transitionToSection(href);
                }
            });
        });
    }

    async transitionToSection(targetId) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        try {
            // Start transition
            await this.startTransition();
            
            // Scroll to target
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Wait for scroll to complete
            await this.waitForScroll();
            
            // End transition
            await this.endTransition();
            
        } catch (error) {
            console.error('Transition error:', error);
            this.endTransition();
        } finally {
            this.isTransitioning = false;
        }
    }

    async startTransition() {
        return new Promise((resolve) => {
            // Add transitioning class to content
            this.pageContent.classList.add('transitioning');
            
            // Show overlay with fade-in animation
            this.overlay.classList.add('active', 'fade-in');
            
            // Remove fade-in class after animation
            setTimeout(() => {
                this.overlay.classList.remove('fade-in');
                resolve();
            }, 400);
        });
    }

    async endTransition() {
        return new Promise((resolve) => {
            // Add fade-out animation
            this.overlay.classList.add('fade-out');
            
            // Remove transitioning class from content
            this.pageContent.classList.remove('transitioning');
            
            // Hide overlay after animation
            setTimeout(() => {
                this.overlay.classList.remove('active', 'fade-out');
                resolve();
            }, 300);
        });
    }

    async waitForScroll() {
        return new Promise((resolve) => {
            let scrollTimeout;
            
            const checkScroll = () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    resolve();
                }, 100);
            };
            
            window.addEventListener('scroll', checkScroll, { once: true });
            
            // Fallback timeout
            setTimeout(resolve, 1000);
        });
    }
}

// Initialize page transition system
const pageTransition = new PageTransition();

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Function to update navbar background based on current theme and scroll position
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    
    // Use CSS variables for consistent theming
    navbar.style.background = 'var(--bg-primary)';
    navbar.style.borderBottomColor = 'var(--border-color)';
    navbar.style.boxShadow = 'var(--shadow-light)';
    
    // Add backdrop blur for modern look
    navbar.style.backdropFilter = 'blur(10px)';
}

// Ultra-simple Dark Mode Toggle - NO DELAYS
themeToggle.addEventListener('click', () => {
    // Get current theme
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Change theme immediately
    document.body.setAttribute('data-theme', newTheme);
    
    // Update icon immediately
    themeToggle.innerHTML = newTheme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
    
    // Update navbar immediately
    updateNavbarBackground();
    
    // Save preference
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);
themeToggle.innerHTML = savedTheme === 'dark' 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';

// Update navbar background on page load
updateNavbarBackground();

// Smooth Scrolling for Navigation Links (honor reduced motion)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        }
    });
});

// Combined scroll handler for navbar, active nav, and parallax
function handleScroll() {
    // Update navbar background
    updateNavbarBackground();

    // Highlight active nav link
    const sections = document.querySelectorAll('main section');
    let currentId = '';
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
            currentId = `#${section.id}`;
        }
    });
    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === currentId;
        link.setAttribute('aria-current', isActive ? 'true' : 'false');
    });

    // Parallax effect (only if reduced motion is not preferred)
    if (!prefersReducedMotion) {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const floatingElements = document.querySelectorAll('.floating-element');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
}

// Navbar Background on Scroll + Active Nav
window.addEventListener('scroll', handleScroll);

// Intersection Observer for Animations (skip when reduced motion)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
if (!prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for DOM to be fully loaded
    setTimeout(() => {
        // Hero section
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');
        if (!prefersReducedMotion) {
            if (heroText) heroText.classList.add('slide-in-left');
            if (heroImage) heroImage.classList.add('slide-in-right');
        }
        
        // About section
        document.querySelectorAll('.about-text, .about-timeline').forEach((el, index) => {
            el.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        });
        
        // Skills section
        if (!prefersReducedMotion) {
            document.querySelectorAll('.skill-category').forEach((el, index) => {
                el.classList.add('fade-in');
                el.style.animationDelay = `${index * 0.2}s`;
            });
        }
        
        // Projects section
        if (!prefersReducedMotion) {
            document.querySelectorAll('.project-card').forEach((el, index) => {
                el.classList.add('fade-in');
                el.style.animationDelay = `${index * 0.1}s`;
            });
        }
        
        // Contact section
        const contactInfo = document.querySelector('.contact-info');
        const contactForm = document.querySelector('.contact-form');
        if (!prefersReducedMotion) {
            if (contactInfo) contactInfo.classList.add('slide-in-left');
            if (contactForm) contactForm.classList.add('slide-in-right');
        }
    }, 100);
});

// Skills Progress Animation with Intersection Observer
const skillBars = document.querySelectorAll('.skill-progress');
const skillItems = document.querySelectorAll('.skill-item');
const skillCategories = document.querySelectorAll('.skill-category');

// Create intersection observer for skills section
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillsSection = entry.target;
            
            // Animate skill categories with staggered delay
            skillCategories.forEach((category, categoryIndex) => {
                setTimeout(() => {
                    category.classList.add('animate');
                    
                    // Animate skill items within this category
                    const itemsInCategory = category.querySelectorAll('.skill-item');
                    itemsInCategory.forEach((item, itemIndex) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                            
                            // Animate the progress bar
                            const progressBar = item.querySelector('.skill-progress');
                            if (progressBar) {
                                const targetWidth = progressBar.getAttribute('data-width');
                                progressBar.style.setProperty('--target-width', targetWidth);
                                
                                setTimeout(() => {
                                    progressBar.classList.add('animate');
                                }, 200);
                            }
                        }, itemIndex * 150);
                    });
                }, categoryIndex * 300);
            });
            
            // Unobserve after animation to prevent re-triggering
            skillsObserver.unobserve(skillsSection);
        }
    });
}, { 
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
});

// Observe the skills section
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Project Filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
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

// Contact Form Validation and Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    try {
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const subject = formData.get('subject') || 'New Inquiry';
        const message = formData.get('message') || '';

        const waNumber = '6282328649895';
        const waText = encodeURIComponent(`Halo, saya ${name}\nEmail: ${email}\nSubjek: ${subject}\n\n${message}`);
        const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

        // Buka WhatsApp untuk pengiriman cepat
        window.open(waUrl, '_blank', 'noopener,noreferrer');

        // Fallback ke mailto jika WA tidak tersedia
        const mailto = `mailto:ryan73147@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\n${message}`)}`;
        setTimeout(() => {
            window.location.href = mailto;
        }, 500);

        showNotification('Mengarahkan ke WhatsApp/Email...', 'success');
        contactForm.reset();
    } catch (error) {
        showNotification('Gagal membuka WhatsApp/Email. Coba lagi.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Form Validation
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearFieldError);
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validate based on field type
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }
    
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    });
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        if (!prefersReducedMotion) {
            typeWriter(heroTitle, originalText, 50);
        } else {
            heroTitle.innerHTML = originalText;
        }
    }
});

// Add CSS for error states
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .error-message {
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 0.25rem;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce function (not used for scroll anymore)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Profile Photo Error Handling
function initProfilePhoto() {
    const profileImg = document.getElementById('profile-img');
    
    // Handle image load error
    profileImg.addEventListener('error', () => {
        console.log('Image failed to load, using placeholder');
        profileImg.src = 'https://via.placeholder.com/300x300/667eea/ffffff?text=Ryan';
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    
    // Initialize profile photo functionality
    initProfilePhoto();
    
    // Add smooth reveal animation to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });

    // Lazy-load all non-hero images
    const images = document.querySelectorAll('img:not(#profile-img)');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
            img.setAttribute('decoding', 'async');
        }
    });

    // Back to top
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) backToTop.classList.add('show');
            else backToTop.classList.remove('show');
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }
});
