const body = document.body;
const navbar = document.querySelector('[data-navbar]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const mobileToggle = document.querySelector('[data-mobile-toggle]');
const mobileIconOpen = document.querySelector('[data-icon-open]');
const mobileIconClose = document.querySelector('[data-icon-close]');
const navLinks = [...document.querySelectorAll('[data-nav-link]')];
const revealItems = [...document.querySelectorAll('[data-reveal]')];
const counters = [...document.querySelectorAll('[data-counter]')];
const faqItems = [...document.querySelectorAll('[data-faq-item]')];
const tabButtons = [...document.querySelectorAll('[data-curriculum-tab]')];
const tabPanels = [...document.querySelectorAll('[data-curriculum-panel]')];
const yearTarget = document.querySelector('[data-current-year]');
const contactForm = document.querySelector('[data-contact-form]');
const formNote = document.querySelector('[data-form-note]');

const setNavbarState = () => {
  if (!navbar) return;
  navbar.classList.toggle('shadow-soft', window.scrollY > 12);
  navbar.classList.toggle('border-secondary/10', window.scrollY > 12);
};

const closeMobileMenu = () => {
  if (!mobileMenu || !mobileToggle) return;
  mobileMenu.classList.add('hidden');
  mobileToggle.setAttribute('aria-expanded', 'false');
  mobileIconOpen?.classList.remove('hidden');
  mobileIconClose?.classList.add('hidden');
  body.classList.remove('overflow-hidden');
};

mobileToggle?.addEventListener('click', () => {
  const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
  mobileMenu?.classList.toggle('hidden', isOpen);
  mobileToggle.setAttribute('aria-expanded', String(!isOpen));
  mobileIconOpen?.classList.toggle('hidden', !isOpen);
  mobileIconClose?.classList.toggle('hidden', isOpen);
  body.classList.toggle('overflow-hidden', !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
  revealObserver.observe(item);
});

const animateCounter = (counter) => {
  const target = Number(counter.dataset.counter || 0);
  const suffix = counter.dataset.suffix || '';
  const duration = 1500;
  const startedAt = performance.now();

  const update = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = `${Math.round(target * eased)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.45 }
);

counters.forEach((counter) => counterObserver.observe(counter));

faqItems.forEach((item) => {
  const button = item.querySelector('button');
  button?.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');

    faqItems.forEach((faq) => {
      faq.classList.remove('is-open');
      faq.querySelector('button')?.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.curriculumTab;

    tabButtons.forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle('bg-secondary', active);
      tab.classList.toggle('text-white', active);
      tab.classList.toggle('bg-white', !active);
      tab.classList.toggle('text-muted', !active);
      tab.setAttribute('aria-selected', String(active));
    });

    tabPanels.forEach((panel) => {
      panel.classList.toggle('hidden', panel.dataset.curriculumPanel !== target);
    });
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');

      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!formNote) return;
  formNote.textContent = 'Thank you. The admissions team will follow up with program details shortly.';
  contactForm.reset();
});

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

window.addEventListener('scroll', setNavbarState, { passive: true });
setNavbarState();
