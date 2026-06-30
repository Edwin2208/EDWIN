/* ===================================================
   EDWIN AMBUROSE S – Portfolio JavaScript
   =================================================== */
'use strict';

/* ── Page Loader ── */
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 600);
  }
  initAll();
});

function initAll() {
  initNavigation();
  initTypewriter();
  initScrollProgress();
  initScrollReveal();
  initScrollToTop();
  initCounters();
  initSkillBars();
  initCertUploads();
  initProjectScreenshots();
  initContactForm();
  initParallax();
}

/* ── Navigation ── */
function initNavigation() {
  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-links a');

  // Sticky + scroll class
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Hamburger
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click + active state
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ── Typewriter ── */
function initTypewriter() {
  const roles = [
    'AWS Cloud Practitioner',
    'Full Stack Developer',
    'Cloud Enthusiast',
    'Software Developer'
  ];
  const el = document.getElementById('typewriter');
  if (!el) return;

  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = roles[roleIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 55 : 90);
  }
  type();
}

/* ── Scroll Progress ── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = scrolled + '%';
  }, { passive: true });
}

/* ── Scroll Reveal ── */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(t => obs.observe(t));
}

/* ── Scroll-to-Top ── */
function initScrollToTop() {
  const btn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Animated Counters ── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const duration = 1800;
      const step = Math.ceil(duration / target);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + 1, target);
        el.textContent = current + (el.dataset.suffix || '');
        if (current >= target) clearInterval(timer);
      }, step);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

/* ── Skill Bars ── */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width;
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
}

/* ── Profile Photo Upload ── */
function initProfileUpload() {
  const circle = document.querySelector('.profile-circle');
  const input = document.getElementById('profile-upload');
  const img = document.getElementById('profile-img');
  if (!circle || !input) return;

  circle.addEventListener('click', () => input.click());
  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result;
      img.style.display = 'block';
      document.querySelector('.profile-overlay span').textContent = 'Change Photo';
    };
    reader.readAsDataURL(file);
  });
}

/* ── Certificate Uploads ── */
function initCertUploads() {
  document.querySelectorAll('.cert-upload-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.nextElementSibling.click();
    });
  });

  document.querySelectorAll('.cert-upload-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const preview = input.parentElement.querySelector('.cert-preview');
      if (preview) {
        const reader = new FileReader();
        reader.onload = () => {
          preview.innerHTML = `<img src="${reader.result}" alt="Certificate">`;
          preview.style.display = 'block';
          input.previousElementSibling.textContent = '✓ Certificate Added';
        };
        reader.readAsDataURL(file);
      }
    });
  });
}

/* ── Project Screenshot Uploads ── */
function initProjectScreenshots() {
  document.querySelectorAll('.project-screenshot-area').forEach(area => {
    const input = area.querySelector('.upload-screenshot');
    const overlay = area.querySelector('.project-upload-overlay');
    if (!input) return;

    area.addEventListener('click', () => input.click());
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = () => {
        let img = area.querySelector('img.ss-img');
        if (!img) {
          img = document.createElement('img');
          img.className = 'ss-img';
          img.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0';
          area.appendChild(img);
          const placeholder = area.querySelector('.project-screenshot-placeholder');
          if (placeholder) placeholder.style.display = 'none';
        }
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  });
}

/* ── Contact Form (Formspree) ────────────────────────────────────────────
   HOW IT WORKS:
   - Formspree receives the form POST and forwards it to eamburose@gmail.com
   - You can reply directly from Gmail to the sender's email
   SETUP (one-time, FREE at https://formspree.io):
   1. Sign up at formspree.io with eamburose@gmail.com
   2. Create a new form → you'll get: https://formspree.io/f/xxxxxxxx
   3. In index.html, find the <form action="..."> and replace YOUR_FORM_ID
   ─────────────────────────────────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  const btn    = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Client-side validation
    const name    = form.querySelector('#form-name').value.trim();
    const email   = form.querySelector('#form-email').value.trim();
    const subject = form.querySelector('#form-subject').value.trim();
    const message = form.querySelector('#form-message').value.trim();

    if (!name || !email || !subject || !message) {
      showStatus('⚠️ Please fill in all fields before sending.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('⚠️ Please enter a valid email address.', 'error');
      return;
    }

    // Check if Formspree ID is configured
    const formAction = form.action || '';
    const isConfigured = formAction.includes('formspree.io/f/') &&
                         !formAction.includes('YOUR_FORM_ID');

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    if (isConfigured) {
      try {
        const response = await fetch(formAction, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, _replyto: email, subject, message })
        });

        if (response.ok) {
          showStatus(`✅ Message sent successfully! I'll reply to <strong>${email}</strong> soon.`, 'success');
          form.reset();
        } else {
          const data = await response.json().catch(() => ({}));
          const errMsg = (data.errors || []).map(e => e.message).join(', ') || 'Unknown error';
          showStatus(`❌ Failed to send: ${errMsg}. Please email me at <a href="mailto:eamburose@gmail.com">eamburose@gmail.com</a>`, 'error');
        }
      } catch (err) {
        console.error('Form error:', err);
        showStatus('❌ Network error. Please email me at <a href="mailto:eamburose@gmail.com">eamburose@gmail.com</a>', 'error');
      }
    } else {
      // Fallback: open mailto with pre-filled content
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      window.open(
        `mailto:eamburose@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        '_blank'
      );
      showStatus('📧 Your email client has been opened with the message. <br><small>For direct sending, <a href="https://formspree.io" target="_blank" rel="noopener">set up Formspree</a> (free, 2 min).</small>', 'success');
      form.reset();
    }

    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
  });

  function showStatus(msg, type) {
    status.innerHTML = msg;
    status.className = `form-status ${type}`;
    if (type === 'success') {
      setTimeout(() => { status.innerHTML = ''; status.className = 'form-status'; }, 8000);
    }
  }
}

/* ── Parallax on Hero ── */
function initParallax() {
  const hero = document.querySelector('#home');
  window.addEventListener('scroll', () => {
    if (!hero) return;
    const scrolled = window.scrollY;
    hero.style.transform = `translateY(${scrolled * 0.15}px)`;
  }, { passive: true });
}
