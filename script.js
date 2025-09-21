// --- Dynamic year in footer ---
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// --- Theme handling ---
const root = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn?.querySelector('.theme-icon');

const getSystemPref = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  if (toggleBtn && icon) {
    const isDark = theme === 'dark';
    toggleBtn.setAttribute('aria-pressed', String(isDark));
    icon.textContent = isDark ? '🌞' : '🌙'; // show the opposite as a hint
    toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  const theme = saved || getSystemPref();
  applyTheme(theme);
}

function toggleTheme() {
  const current = root.getAttribute('data-theme') || getSystemPref();
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
}

initTheme();
toggleBtn?.addEventListener('click', toggleTheme);

// Respond to system preference changes (if user hasn't set a manual choice)
if (window.matchMedia) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener?.('change', (e) => {
    const saved = localStorage.getItem('theme');
    if (!saved) applyTheme(e.matches ? 'dark' : 'light');
  });
}

// --- Button click demo (kept from your original) ---
const cta = document.getElementById('cta');
cta?.addEventListener('click', () => {
  alert('You clicked the button! 🎉 Now make it do something useful.');
});

// --- Contact form demo handler ---
const form = document.getElementById('contact-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  console.log('Form submitted (demo):', data);
  alert('Thanks! (This is just a demo — wire up a real backend later.)');
  form.reset();
});
