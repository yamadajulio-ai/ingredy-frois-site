// ===== Mobile Menu Toggle =====
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
const navOverlay = document.querySelector('.nav__overlay');

let removeTrap = null;

function trapFocus(container) {
  const selectors = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
  const focusables = Array.from(container.querySelectorAll(selectors))
    .filter(el => !el.hasAttribute('disabled'));

  if (focusables.length === 0) return () => {};

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  function handleKeydown(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  document.addEventListener('keydown', handleKeydown);
  first.focus();

  return () => document.removeEventListener('keydown', handleKeydown);
}

function openMenu() {
  navToggle.classList.add('active');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Fechar menu');
  navLinks.classList.add('active');
  if (navOverlay) navOverlay.classList.add('active');
  document.body.classList.add('menu-open');

  if (navLinks) removeTrap = trapFocus(navLinks);
}

function closeMenu() {
  navToggle.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Abrir menu');
  navLinks.classList.remove('active');
  if (navOverlay) navOverlay.classList.remove('active');
  document.body.classList.remove('menu-open');

  if (removeTrap) {
    removeTrap();
    removeTrap = null;
  }
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Close menu with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle.classList.contains('active')) {
      closeMenu();
      navToggle.focus();
    }
  });
}

// ===== Header scroll effect =====
const header = document.querySelector('.header');

if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ===== Scroll animations =====
const fadeElements = document.querySelectorAll('.fade-in');

if (fadeElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));
}

// ===== Active nav link based on current page =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

// ===== CTA Tracking =====
function track(eventName, params) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
    return;
  }
  // fallback for development
  console.log('[track]', eventName, params);
}

document.querySelectorAll('a[data-cta="whatsapp"]').forEach(el => {
  el.addEventListener('click', () => {
    track('click_whatsapp', {
      page: currentPage,
      location: el.dataset.location || 'unknown'
    });
  });
});

// ===== Contact Form → WhatsApp redirect =====
const contactForm = document.getElementById('contactForm');
const whatsappText = document.getElementById('whatsappText');

if (contactForm && whatsappText) {
  contactForm.addEventListener('submit', function() {
    const name = document.getElementById('name')?.value?.trim() || '';
    const phone = document.getElementById('phone')?.value?.trim() || '';
    const email = document.getElementById('email')?.value?.trim() || '';
    const message = document.getElementById('message')?.value?.trim() || '';

    let text = `Olá! Meu nome é ${name}.`;
    if (phone) text += ` Telefone: ${phone}.`;
    if (email) text += ` E-mail: ${email}.`;
    if (message) text += ` ${message}`;

    whatsappText.value = text;

    track('submit_contact_form', { page: currentPage });
  });
}

// ===== WhatsApp Chat Widget =====
const waBtn = document.getElementById('waBtn');
const waChat = document.getElementById('waChat');
const waClose = document.getElementById('waClose');

if (waBtn && waChat) {
  waBtn.addEventListener('click', () => {
    waChat.classList.toggle('active');
  });

  if (waClose) {
    waClose.addEventListener('click', () => {
      waChat.classList.remove('active');
    });
  }

  document.addEventListener('click', (e) => {
    const widget = document.getElementById('waWidget');
    if (widget && !widget.contains(e.target)) {
      waChat.classList.remove('active');
    }
  });
}
