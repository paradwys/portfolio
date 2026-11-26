// Everything is wrapped in { } so these names don't leak into the rest of the page.
{
  // ---------- 1. Mobile menu ----------
  const button = document.getElementById('menu-btn');
  const links = document.getElementById('nav-links');
  button.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    button.setAttribute('aria-expanded', open);
  });
  // close the menu after a link is tapped
  links.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      links.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    }
  });

  // ---------- 2. Underline the section you're reading ----------
  const navLinks = [...links.querySelectorAll('a')];
  const watcher = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.toggle('active', a.hash === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach((section) => watcher.observe(section));

  // ---------- 3. Keep the footer year current ----------
  document.getElementById('year').textContent = new Date().getFullYear();
}
