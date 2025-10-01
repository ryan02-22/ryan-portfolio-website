// Google Analytics Configuration
// Ganti 'GA_MEASUREMENT_ID' dengan ID Google Analytics Anda

const GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID'; // Ganti dengan ID Anda, contoh: 'G-XXXXXXXXXX'

// Google Analytics 4 Configuration
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', GA_MEASUREMENT_ID, {
    // Enhanced measurement settings
    send_page_view: true,
    allow_google_signals: true,
    allow_ad_personalization_signals: true,
    
    // Custom dimensions (optional)
    custom_map: {
        'custom_parameter_1': 'user_type',
        'custom_parameter_2': 'content_category'
    },
    
    // Privacy settings
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
});

// Custom events tracking
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
}

// Track page views for SPA
function trackPageView(pagePath, pageTitle) {
    if (typeof gtag !== 'undefined') {
        gtag('config', GA_MEASUREMENT_ID, {
            page_path: pagePath,
            page_title: pageTitle
        });
    }
}

// Track article views
function trackArticleView(articleId, articleTitle, category) {
    trackEvent('view_article', {
        article_id: articleId,
        article_title: articleTitle,
        content_category: category
    });
}

// Track form submissions
function trackFormSubmission(formName) {
    trackEvent('form_submit', {
        form_name: formName
    });
}

// Track button clicks
function trackButtonClick(buttonName, location) {
    trackEvent('button_click', {
        button_name: buttonName,
        location: location
    });
}

// Track search queries
function trackSearch(searchTerm, resultsCount) {
    trackEvent('search', {
        search_term: searchTerm,
        results_count: resultsCount
    });
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        trackEvent,
        trackPageView,
        trackArticleView,
        trackFormSubmission,
        trackButtonClick,
        trackSearch
    };
}
