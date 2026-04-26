// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
    });
}

// Fermer le menu mobile au clic sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
    });
});

// Header dynamique au scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    if (current > 100) {
        header.style.boxShadow = '0 1px 20px rgba(0,0,0,0.04)';
    } else {
        header.style.boxShadow = 'none';
    }
    lastScroll = current;
});

// Animation d'apparition au scroll
const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .value-item, .gallery-item, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Lightbox galerie
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<button class="lightbox-close" aria-label="Fermer">×</button><img src="" alt="">';
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        lightboxImg.src = item.getAttribute('href');
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});
