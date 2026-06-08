/* ============================================================
   dominion.js — Dominion Solutions AI Agency
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Navbar Scroll Effect ─────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ── 2. Mobile Hamburger Menu ────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';

    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('span');
    if (isOpen) {
      bars[0].style.transform = 'translateY(7px) rotate(45deg)';
      bars[1].style.opacity   = '0';
      bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });

  // Close menu on nav link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
      hamburger.querySelectorAll('span').forEach(b => {
        b.style.transform = ''; b.style.opacity = '';
      });
    });
  });

  /* ── 3. Scroll-triggered fade-in animations ──────────── */
  const observeElements = document.querySelectorAll(
    '.service-card, .result-card, .testimonial, .process-step, .acard, .call-point'
  );

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  observeElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
    fadeObserver.observe(el);
  });

  /* ── 4. Discovery Call Form ──────────────────────────── */
  const form          = document.getElementById('discovery-form');
  const successPanel  = document.getElementById('form-success');
  const submitBtn     = document.getElementById('submit-discovery');
  const btnLabel      = submitBtn.querySelector('.btn-label');
  const btnSpinner    = submitBtn.querySelector('.btn-spinner');
  const successName   = document.getElementById('success-name-display');
  const successEmail  = document.getElementById('success-email-display');

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Simple validation highlighting
    let valid = true;
    const required = form.querySelectorAll('[required]');
    required.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ff4d6d';
        field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
        valid = false;
      }
    });
    if (!valid) return;

    // Loading state
    submitBtn.disabled = true;
    btnLabel.style.opacity = '0.4';
    btnSpinner.classList.remove('hidden');

    // Gather values
    const fname    = document.getElementById('dc-fname').value.trim();
    const lname    = document.getElementById('dc-lname').value.trim();
    const email    = document.getElementById('dc-email').value.trim();
    const phone    = document.getElementById('dc-phone').value.trim();
    const business = document.getElementById('dc-business').value.trim();
    const industry = document.getElementById('dc-industry').value;
    const revenue  = document.getElementById('dc-revenue').value;
    const challenge= document.getElementById('dc-challenge').value.trim();
    const goal     = document.getElementById('dc-goal').value;

    // Console logging simulated submission
    console.group('📞 Dominion Solutions — Discovery Call Request');
    console.log('Name:', `${fname} ${lname}`);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Business:', business);
    console.log('Industry:', industry);
    console.log('Monthly Revenue:', revenue);
    console.log('Challenge:', challenge);
    console.log('Goal:', goal);
    console.groupEnd();

    // Simulate API delay
    setTimeout(() => {
      submitBtn.disabled = false;
      btnLabel.style.opacity = '1';
      btnSpinner.classList.add('hidden');

      // Populate success panel
      successName.textContent  = fname;
      successEmail.textContent = email;

      // Animate out form, animate in success
      form.style.transition = 'opacity 0.3s ease';
      form.style.opacity = '0';
      setTimeout(() => {
        form.classList.add('hidden');
        successPanel.classList.remove('hidden');
      }, 300);
    }, 1500);
  });

});
