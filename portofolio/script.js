// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animRing() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

// Hero glow follows mouse
const glow = document.getElementById('heroGlow');
const hero = document.getElementById('hero');

hero.addEventListener('mousemove', e => {
  const r = hero.getBoundingClientRect();
  glow.style.left = (e.clientX - r.left) + 'px';
  glow.style.top  = (e.clientY - r.top)  + 'px';
});

// Hamburger nav
const nav = document.getElementById('nav');
document.getElementById('hamburger').addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav-links a, .nav-cta').forEach(el => {
  el.addEventListener('click', () => nav.classList.remove('open'));
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// Skill bar animate on scroll
const skillBars = document.querySelectorAll('.skill-bar-fill');
const widths = [];

skillBars.forEach(b => { 
    widths.push(b.style.width); 
    b.style.width = '0'; 
});

const skillIo = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      skillBars.forEach((b, i) => { b.style.width = widths[i]; });
      skillIo.disconnect();
    }
  });
}, { threshold: 0.3 });

if (document.getElementById('skills')) {
    skillIo.observe(document.getElementById('skills'));
}

// Nav shadow on scroll
window.addEventListener('scroll', () => {
  document.getElementById('nav').style.boxShadow =
    window.scrollY > 40 ? '0 4px 40px rgba(0,0,0,0.6)' : 'none';
});