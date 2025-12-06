// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-icon');
const contactForm = document.getElementById('contact-form');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

// Mobile Navigation Toggle - Support both click and touch
if (navToggle && navMenu) {
    const handleMenuToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
        
        // Prevent body scroll when menu is open
        if (isExpanded) {
            // Save current scroll position
            const scrollY = window.scrollY;
            document.body.classList.add('menu-open');
            document.body.style.overflow = 'hidden';
            document.body.style.overflowY = 'hidden';
            document.body.style.overflowX = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.bottom = '0';
            // Store scroll position for restoration
            document.body.dataset.scrollY = scrollY;
        } else {
            // Restore scroll position
            const scrollY = document.body.dataset.scrollY || 0;
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
            document.body.style.overflowY = 'auto';
            document.body.style.overflowX = 'hidden';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.bottom = '';
            // Restore scroll position
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY));
            }
            delete document.body.dataset.scrollY;
        }
    };
    
    navToggle.addEventListener('click', handleMenuToggle);
    navToggle.addEventListener('touchend', handleMenuToggle);
}

// Close mobile menu when clicking on a link - Support touch
const closeMobileMenu = () => {
    if (navMenu) {
        navMenu.classList.remove('active');
    }
    if (navToggle) {
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }
    // Restore body scroll completely
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    document.body.style.overflowY = 'auto';
    document.body.style.overflowX = 'hidden';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.height = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.bottom = '';
    
    // Force reflow to ensure scrolling is restored
    void document.body.offsetHeight;
};

document.querySelectorAll('.nav-link').forEach(link => {
    const handleLinkClick = (e) => {
        closeMobileMenu();
    };
    link.addEventListener('click', handleLinkClick);
    link.addEventListener('touchend', handleLinkClick);
});

// Close mobile menu when clicking outside - Support touch
const handleOutsideClick = (e) => {
    if (navMenu && navToggle) {
        const isClickInsideNav = navMenu.contains(e.target) || navToggle.contains(e.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
};

document.addEventListener('click', handleOutsideClick);
document.addEventListener('touchend', handleOutsideClick);

// Close mobile menu on window resize if it's desktop size
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth >= 769 && navMenu && navToggle) {
            closeMobileMenu();
        }
    }, 250);
});

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        if (window.innerWidth >= 769 && navMenu && navToggle) {
            closeMobileMenu();
        }
    }, 100);
});

// Function to update navbar background based on current theme and scroll position
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    
    // Use CSS variables for consistent theming
    navbar.style.background = 'var(--bg-primary)';
    navbar.style.borderBottomColor = 'var(--border-color)';
    navbar.style.boxShadow = 'var(--shadow-light)';
    
    // Add backdrop blur for modern look
    navbar.style.backdropFilter = 'blur(10px)';
}

// Dark Mode Toggle
if (themeToggle) {
    const handleThemeToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Add class to disable transitions
        document.body.classList.add('theme-switching');
        
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
        
        // Remove class after a tiny delay to re-enable transitions
        setTimeout(() => {
            document.body.classList.remove('theme-switching');
        }, 50);
    };
    
    themeToggle.addEventListener('click', handleThemeToggle);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);
if (themeToggle) {
    themeToggle.innerHTML = savedTheme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
}

// Smooth Scrolling for Navigation Links (honor reduced motion)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Update navbar background on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavbarBackground);
} else {
    updateNavbarBackground();
}
const anchorLinks = document.querySelectorAll('a[href^="#"]');
if (anchorLinks && anchorLinks.length > 0) {
    anchorLinks.forEach(anchor => {
        const handleAnchorClick = function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    // Close mobile menu if open
                    if (window.innerWidth < 769) {
                        closeMobileMenu();
                    }
                    // Small delay to allow menu close animation
                    setTimeout(() => {
                        target.scrollIntoView({
                            behavior: prefersReducedMotion ? 'auto' : 'smooth',
                            block: 'start'
                        });
                    }, window.innerWidth < 769 ? 300 : 0);
                }
            }
        };
        anchor.addEventListener('click', handleAnchorClick);
    });
}

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
    if (navLinks && navLinks.length > 0) {
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === currentId;
            link.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    }

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

// Navbar Background on Scroll + Active Nav - Use passive listener for performance
window.addEventListener('scroll', handleScroll, { passive: true });

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
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in, section, .section-title');
    if (animatedElements && animatedElements.length > 0) {
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    
    // Initialize profile photo functionality
    initProfilePhoto();
    
        // Add animation classes to elements
        setTimeout(() => {
            // Hero section
            const heroText = document.querySelector('.hero-text');
            const heroImage = document.querySelector('.hero-image');
            if (!prefersReducedMotion) {
                if (heroText) heroText.classList.add('slide-in-left');
                if (heroImage) heroImage.classList.add('slide-in-right');
            }
            
            // About section
            if (!prefersReducedMotion) {
                document.querySelectorAll('.about-text, .about-timeline').forEach((el, index) => {
                    el.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
                });
            }
            
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
            const contactFormElement = document.querySelector('.contact-form');
            if (!prefersReducedMotion) {
                if (contactInfo) contactInfo.classList.add('slide-in-left');
                if (contactFormElement) contactFormElement.classList.add('slide-in-right');
            }
            
            // Schedule section
            const scheduleTable = document.querySelector('.schedule-table-container');
            const scheduleInfo = document.querySelector('.schedule-info');
            if (!prefersReducedMotion) {
                if (scheduleTable) scheduleTable.classList.add('slide-in-left');
                if (scheduleInfo) scheduleInfo.classList.add('slide-in-right');
            }
        
        
        // Add animation classes to section titles
        document.querySelectorAll('.section-title').forEach((title, index) => {
            title.classList.add('fade-in');
            title.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Add animation classes to stats
        document.querySelectorAll('.stat, .academic-stat').forEach((stat, index) => {
            stat.classList.add('scale-in');
            stat.style.animationDelay = `${index * 0.1}s`;
        });
    }, 100);

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

// Counter animation function
function animateCounter(element, targetValue, duration) {
    const startValue = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easeOutCubic for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutCubic);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = targetValue;
            element.classList.add('animate');
        }
    }
    
    requestAnimationFrame(updateCounter);
}

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
                    category.classList.add('visible');
                    
                    // Animate skill items within this category
                    const itemsInCategory = category.querySelectorAll('.skill-item');
                    itemsInCategory.forEach((item, itemIndex) => {
                        setTimeout(() => {
                            // Animate the progress bar and percentage
                            const progressBar = item.querySelector('.skill-progress');
                            const percentageElement = item.querySelector('.skill-percentage');
                            
                            if (progressBar && percentageElement) {
                                const targetWidth = progressBar.getAttribute('data-width');
                                
                                // Animate progress bar
                                progressBar.style.width = targetWidth + '%';
                                
                                // Animate percentage counter
                                animateCounter(percentageElement, parseInt(targetWidth), 2500);
                            }
                        }, itemIndex * 200);
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
if (filterBtns && filterBtns.length > 0 && projectCards && projectCards.length > 0) {
    filterBtns.forEach(btn => {
        const handleFilter = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
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
        };
        
        btn.addEventListener('click', handleFilter);
    });
}

// Contact Form Validation and Submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (!submitBtn) return;
        
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
}

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
    
    // Mobile responsive positioning
    const isMobile = window.innerWidth < 768;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: isMobile ? '80px' : '20px',
        right: isMobile ? '16px' : '20px',
        left: isMobile ? '16px' : 'auto',
        padding: isMobile ? '12px 16px' : '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: isMobile ? 'calc(100% - 32px)' : '300px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        fontSize: isMobile ? '0.9rem' : '1rem',
        wordWrap: 'break-word'
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
        const originalText = heroTitle.textContent || heroTitle.innerText;
        if (!prefersReducedMotion && originalText) {
            typeWriter(heroTitle, originalText, 50);
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
    if (!profileImg) return;
    
    // Handle image load error
    profileImg.addEventListener('error', () => {
        console.log('Image failed to load, using placeholder');
        profileImg.src = 'https://via.placeholder.com/300x300/667eea/ffffff?text=Ryan';
    });
    
    // Lazy load optimization for mobile
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imgObserver.unobserve(img);
                }
            });
        });
        imgObserver.observe(profileImg);
    }
}

// Mobile Schedule Table Fix - Untuk device Android seperti Samsung Galaxy S20 Ultra
function fixScheduleTableMobile() {
    const scheduleTable = document.querySelector('.schedule-table');
    const scheduleContainer = document.querySelector('.schedule-table-container');
    
    if (!scheduleTable || !scheduleContainer) return;
    
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    const isExtraSmall = window.innerWidth <= 360;
    
    if (isMobile) {
        // Force table to render properly
        scheduleTable.style.display = 'table';
        scheduleTable.style.tableLayout = 'auto';
        scheduleTable.style.width = 'auto';
        
        // Set min-width based on screen size (converted to rem: 16px = 1rem)
        if (isExtraSmall) {
            scheduleTable.style.minWidth = '34rem'; // 544px
        } else if (isSmallMobile) {
            scheduleTable.style.minWidth = '36rem'; // 576px
        } else {
            scheduleTable.style.minWidth = '40rem'; // 640px
        }
        
        // Ensure container allows scrolling
        scheduleContainer.style.overflowX = 'auto';
        scheduleContainer.style.webkitOverflowScrolling = 'touch';
        scheduleContainer.style.width = '100%';
        scheduleContainer.style.maxWidth = '100%';
        
        // Fix all cells to prevent text truncation
        const firstCells = scheduleTable.querySelectorAll('td:first-child, th:first-child');
        firstCells.forEach(cell => {
            // Set min-width based on screen size (in rem)
            if (isExtraSmall) {
                cell.style.minWidth = '16.5rem'; // 264px
            } else if (isSmallMobile) {
                cell.style.minWidth = '18rem'; // 288px
            } else {
                cell.style.minWidth = '20rem'; // 320px
            }
            cell.style.whiteSpace = 'normal';
            cell.style.wordWrap = 'break-word';
            cell.style.overflowWrap = 'anywhere';
            cell.style.wordBreak = 'break-word';
            cell.style.hyphens = 'auto';
        });
        
        // Add scroll hint for mobile
        if (!scheduleContainer.querySelector('.scroll-hint')) {
            const scrollHint = document.createElement('div');
            scrollHint.className = 'scroll-hint';
            scrollHint.textContent = '← Geser untuk melihat lebih banyak →';
            scrollHint.style.cssText = `
                text-align: center;
                padding: 0.5rem;
                font-size: 0.85rem;
                color: var(--text-secondary);
                background: var(--bg-secondary);
                border-radius: 0.5rem;
                margin-bottom: 0.625rem;
                display: block;
            `;
            scheduleContainer.insertBefore(scrollHint, scheduleTable);
        }
    } else {
        // Remove scroll hint on desktop
        const scrollHint = scheduleContainer.querySelector('.scroll-hint');
        if (scrollHint) {
            scrollHint.remove();
        }
    }
}

// Run on load and resize
window.addEventListener('load', fixScheduleTableMobile);
window.addEventListener('resize', debounce(fixScheduleTableMobile, 250));
window.addEventListener('orientationchange', () => {
    setTimeout(fixScheduleTableMobile, 100);
});


