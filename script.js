// ===== LUXE COLLECTIVE WEBSITE ===== //
// Menu Hamburger: Editoriale & Shop
// Hybrid design: The Blonde Salad + Zalando

document.addEventListener('DOMContentLoaded', function() {
    // Menu Elements
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
    
    // Mobile Menu Toggle
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        
        // Animate hamburger to X
        const hamburgerLines = menuToggle.querySelectorAll('.hamburger-line');
        hamburgerLines.forEach((line, index) => {
            if (mobileMenu.classList.contains('active')) {
                if (index === 0) line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) line.style.opacity = '0';
                if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                line.style.transform = '';
                line.style.opacity = '1';
            }
        });
        
        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        
        // Reset hamburger animation
        const hamburgerLines = menuToggle.querySelectorAll('.hamburger-line');
        hamburgerLines.forEach(line => {
            line.style.transform = '';
            line.style.opacity = '1';
        });
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    // Event Listeners
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu when clicking on links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });
    
    // Smooth scrolling for navigation links
    function smoothScrollTo(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Navigation link handlers
    desktopNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });
    
    // Hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });
    
    // Product card interactions
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const buyButton = card.querySelector('.btn-primary');
        
        if (buyButton) {
            buyButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Add to cart animation
                this.textContent = 'Aggiunto!';
                this.style.backgroundColor = 'var(--success-green)';
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    this.textContent = 'Acquista Ora';
                    this.style.backgroundColor = '';
                }, 2000);
                
                // You can add actual cart functionality here
                console.log('Prodotto aggiunto al carrello!');
            });
        }
    });
    
    // Article card interactions
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add read more functionality here
            console.log('Leggi articolo:', this.querySelector('.article-title').textContent);
        });
        
        // Add cursor pointer for clickable cards
        card.style.cursor = 'pointer';
    });
    
    // Scroll effects for header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow on scroll
        if (scrollTop > 0) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.editorial-section, .shop-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Observe cards for staggered animations
    const allCards = document.querySelectorAll('.article-card, .product-card');
    allCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Touch gestures for mobile menu
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchStartX - touchEndX;
        
        // Swipe left to close menu (if open)
        if (mobileMenu.classList.contains('active') && swipeDistance > swipeThreshold) {
            closeMobileMenu();
        }
    }
    
    // Add loading state
    function showLoading(element) {
        const originalText = element.textContent;
        element.textContent = 'Caricamento...';
        element.disabled = true;
        
        setTimeout(() => {
            element.textContent = originalText;
            element.disabled = false;
        }, 1000);
    }
    
    // Console welcome message
    console.log('%c🔥 LUXE COLLECTIVE', 'font-size: 24px; font-weight: bold; color: #C0A878;');
    console.log('%cHybrid design: The Blonde Salad + Zalando', 'font-size: 14px; color: #666;');
    console.log('%cMenu: Editoriale & Shop only', 'font-size: 12px; color: #999;');
});