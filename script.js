/* ================================================
   SIŁOWNIA KLUCZE – script.js
   ================================================ */

// ===== NAVBAR: efekt przy scrollowaniu =====
const navbar   = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 350) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    // Blokuj scrollowanie gdy menu otwarte
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Zamknij menu po kliknięciu linka
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== ANIMACJE FADE-IN przy wejściu w widok =====
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target); // animuj tylko raz
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

// Elementy do animacji
const animatedElements = document.querySelectorAll(
    '.section-title, .about-text, .about-visual, ' +
    '.day-card, .price-card, .trainer-card, ' +
    '.gallery-item, .contact-item, .contact-map, ' +
    '.hours-note, .stats-bar .stat'
);

animatedElements.forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});

// ===== PODŚWIETLANIE AKTYWNEGO LINKU W NAVBAR =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navAnchors.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === `#${id}`) {
                    a.classList.add('active');
                }
            });
        }
    });
}, {
    threshold: 0.35
});

sections.forEach(section => sectionObserver.observe(section));

// ===== GALERIA: lightbox (proste powiększenie) =====
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; inset: 0; z-index: 9999;
            background: rgba(0,0,0,0.92);
            display: flex; align-items: center; justify-content: center;
            cursor: zoom-out; animation: fadeIn 0.2s ease;
        `;
        const bigImg = document.createElement('img');
        bigImg.src = img.src;
        bigImg.alt = img.alt;
        bigImg.style.cssText = `
            max-width: 90vw; max-height: 88vh;
            object-fit: contain; border-radius: 4px;
            box-shadow: 0 0 60px rgba(0,0,0,0.8);
        `;
        overlay.appendChild(bigImg);
        overlay.addEventListener('click', () => overlay.remove());
        document.body.appendChild(overlay);
    });
});

// ===== PŁYNNE SCROLLOWANIE (fallback dla starszych przeglądarek) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = navbar.offsetHeight;
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 10;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== AKTYWNY LINK - styl CSS =====
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active { color: var(--gold) !important; }
    .nav-links a.active::after { width: 100% !important; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;
document.head.appendChild(style);

// ===== BLOKADA DEVTOOLS =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'F12') {
        e.preventDefault();
        window.location.href = 'https://jakubbujakiewicz.pl';
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
        window.location.href = 'https://jakubbujakiewicz.pl';
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'U') {
        e.preventDefault();
        window.location.href = 'https://jakubbujakiewicz.pl';
    }
});
document.addEventListener('contextmenu', (e) => e.preventDefault());
