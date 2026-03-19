const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    navLinks.classList.toggle('open');
  });
}

const closeMenu = () => {
  if (!menuToggle || !navLinks) {
    return;
  }

  menuToggle.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('open');
};

navLinkItems.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const targetId = link.getAttribute('href');
    const targetSection = targetId ? document.querySelector(targetId) : null;

    if (targetSection) {
      const offset = navbar ? navbar.offsetHeight + 18 : 0;
      const topPos = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: topPos,
        behavior: 'smooth'
      });
    }

    closeMenu();
  });
});

window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 16);
  }

  const scrollPosition = window.scrollY + (navbar ? navbar.offsetHeight + 30 : 90);

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPosition >= top && scrollPosition < top + height && id) {
      navLinkItems.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
});

// Reveal section content as it enters the viewport.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.2
  }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

document.addEventListener('click', (event) => {
  const clickedInsideNav = event.target.closest('.navbar');

  if (!clickedInsideNav) {
    closeMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});
