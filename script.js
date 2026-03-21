// ── HAMBURGER MENU ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    mobileMenu.classList.contains('open') &&
    !mobileMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});


// ── SCROLL FADE-IN ───────────────────────────────────────
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));


// ── ACTIVE NAV LINK ON SCROLL ────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));


// ── CONTACT SEND BUTTON ──────────────────────────────────
document.getElementById('sendBtn').addEventListener('click', async () => {
  const btn     = document.getElementById('sendBtn');
  const status  = document.getElementById('formStatus');
  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const message = document.getElementById('fmessage').value.trim();

  if (!name || !email || !message) {
    status.style.display = 'block';
    status.style.color   = '#e74c3c';
    status.textContent   = '⚠️ Please fill in all fields.';
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled    = true;

  try {
    const res = await fetch('https://formspree.io/f/mzdjqdol', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    if (res.ok) {
      btn.textContent       = '✅ Sent!';
      btn.style.background  = '#10b981';
      btn.style.borderColor = '#10b981';
      status.style.display  = 'block';
      status.style.color    = '#10b981';
      status.textContent    = "Thanks! I'll get back to you soon.";
      document.getElementById('fname').value    = '';
      document.getElementById('femail').value   = '';
      document.getElementById('fmessage').value = '';
    } else {
      throw new Error('Failed');
    }
  } catch {
    btn.textContent      = 'Send Message';
    btn.disabled         = false;
    status.style.display = 'block';
    status.style.color   = '#e74c3c';
    status.textContent   = '❌ Something went wrong. Try emailing directly.';
  }

  setTimeout(() => {
    btn.textContent       = 'Send Message';
    btn.style.background  = '';
    btn.style.borderColor = '';
    btn.disabled          = false;
  }, 4000);
});