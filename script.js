/* ===== Reveal on scroll ===== */
const reveals = document.querySelectorAll('.reveal');
document.querySelectorAll('.service-row.reveal').forEach((el, i) => {
    el.style.setProperty('--reveal-delay', (i * 110) + 'ms');
});
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => io.observe(el));

/* ===== Lightbox (flash plates + hero) ===== */
const allFigs = Array.from(document.querySelectorAll('.flash-plate, .fig-frame'));
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCap = document.getElementById('lb-cap');
let idx = 0;

function openLb(el) {
    idx = allFigs.indexOf(el);
    if (idx === -1) return;
    showLb(allFigs[idx]);
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}
function showLb(el) {
    const img = el.querySelector('img');
    if (!img) return;
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    const plate = el.dataset.plate;
    lbCap.textContent = plate ? `PL. ${plate}` : (img.alt || '');
}
function closeLb() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}
function step(d) {
    if (!allFigs.length) return;
    idx = (idx + d + allFigs.length) % allFigs.length;
    showLb(allFigs[idx]);
}

allFigs.forEach(el => el.addEventListener('click', () => openLb(el)));
document.getElementById('lb-close').addEventListener('click', closeLb);
document.getElementById('lb-prev').addEventListener('click', e => { e.stopPropagation(); step(-1); });
document.getElementById('lb-next').addEventListener('click', e => { e.stopPropagation(); step(1); });
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
window.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
});

/* ===== Custom cursor ===== */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
if (dot && ring && window.matchMedia('(hover: hover)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
        if (!dot.classList.contains('visible')) {
            dot.classList.add('visible');
            ring.classList.add('visible');
        }
    });
    function tick() {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(tick);
    }
    tick();
    document.addEventListener('mouseleave', () => {
        dot.classList.remove('visible');
        ring.classList.remove('visible');
    });
    document.querySelectorAll('.flash-plate, .fig-frame').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('zoom'));
        el.addEventListener('mouseleave', () => ring.classList.remove('zoom'));
    });
}

/* ===== Mobile nav close ===== */
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav').classList.remove('open');
    });
});

/* ===== Form mailto ===== */
function submitForm(e) {
    e.preventDefault();
    const f = e.target;
    const nom = f.nom.value.trim();
    const contact = f.contact.value.trim();
    const type = f.type.value;
    const emplacement = f.emplacement.value.trim();
    const message = f.message.value.trim();
    const subject = `Demande RDV — ${type}${nom ? ' — ' + nom : ''}`;
    const body = [
        `Nom : ${nom}`,
        `Contact : ${contact}`,
        `Type : ${type}`,
        emplacement ? `Emplacement : ${emplacement}` : '',
        '',
        'Description :',
        message
    ].filter(Boolean).join('\n');
    window.location.href = `mailto:lesdeuxaiguilles@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return false;
}
window.submitForm = submitForm;
