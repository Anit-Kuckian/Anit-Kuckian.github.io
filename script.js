(() => {
  const page = document.body.dataset.page;
  document.querySelectorAll('.main-nav a[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const search = document.querySelector('#publicationSearch');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const pubs = [...document.querySelectorAll('.pub[data-category]')];

  function applyPublicationFilter() {
    if (!pubs.length) return;
    const term = (search?.value || '').trim().toLowerCase();
    const active = document.querySelector('[data-filter].active')?.dataset.filter || 'all';
    pubs.forEach(pub => {
      const text = pub.textContent.toLowerCase();
      const category = pub.dataset.category;
      const show = (active === 'all' || active === category) && (!term || text.includes(term));
      pub.style.display = show ? '' : 'none';
    });
  }

  if (search) search.addEventListener('input', applyPublicationFilter);
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyPublicationFilter();
  }));
})();