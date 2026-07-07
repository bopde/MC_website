// Mansfield Consulting — shared behaviour

// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    document.body.classList.toggle('nav-open', open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }));
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pending = [...(entry.target.parentElement?.querySelectorAll(':scope > .reveal:not(.visible)') || [])];
      const idx = Math.max(pending.indexOf(entry.target), 0);
      entry.target.style.transitionDelay = Math.min(idx, 4) * 80 + 'ms';
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
revealEls.forEach(el => io.observe(el));

// Carousels
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const prev = carousel.querySelector('.car-btn[data-dir="-1"]');
  const next = carousel.querySelector('.car-btn[data-dir="1"]');
  if (!track || !prev || !next) return;

  const step = () => {
    const card = track.querySelector('.project-card');
    return card ? card.getBoundingClientRect().width + 22 : track.clientWidth * 0.8;
  };
  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 4;
    prev.toggleAttribute('disabled', track.scrollLeft <= 4);
    next.toggleAttribute('disabled', track.scrollLeft >= max);
  };
  [prev, next].forEach(btn => btn.addEventListener('click', () => {
    track.scrollBy({ left: step() * Number(btn.dataset.dir), behavior: 'smooth' });
  }));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});
