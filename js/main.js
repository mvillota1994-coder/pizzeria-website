/* ============================================
   Papa Presto Pizza — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    if (navbar && !navbar.classList.contains('navbar--solid')) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // --- Hero parallax ---
    const hero = document.querySelector('.hero');
    if (hero) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    if (scrolled < window.innerHeight) {
                        hero.style.setProperty('--parallax-y', `${scrolled * 0.35}px`);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // --- Mobile navigation toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Menu filter (menu.html) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuSections = document.querySelectorAll('.menu-section');

    if (filterButtons.length && menuSections.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;

                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Show/hide sections
                menuSections.forEach(section => {
                    if (filter === 'all' || section.dataset.category === filter) {
                        section.classList.remove('hidden');
                    } else {
                        section.classList.add('hidden');
                    }
                });
            });
        });
    }

    // --- Scroll-triggered animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for fade-in
    document.querySelectorAll(
        '.menu-card, .order-card, .feature-item, .info-card, .about-content, .about-image, .menu-section'
    ).forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Handle hash on page load (for menu filters) ---
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const filterBtn = document.querySelector(`.filter-btn[data-filter="${hash}"]`);
        if (filterBtn) {
            filterBtn.click();
        }
    }
});
