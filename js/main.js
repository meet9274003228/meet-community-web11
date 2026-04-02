// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add('active');
    observer.unobserve(entry.target);
  });
}, revealOptions);

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Typing Effect
const typingTextElement = document.getElementById('typing-text');
if (typingTextElement) {
  const phrases = ["> Initiating hackathon sequence...", "> Build. Break. Iterate.", "> Code the future.", "> System ready for hacking."];
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
      typingTextElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
      currentCharIndex--;
    } else {
      typingTextElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
      currentCharIndex++;
    }

    let typingSpeed = isDeleting ? 30 : 100;

    if (!isDeleting && currentCharIndex === currentPhrase.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }
    setTimeout(typeEffect, typingSpeed);
  }
  setTimeout(typeEffect, 1000);
}



// Countdown Timer
const cdDays = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMins = document.getElementById('cd-mins');
const cdSecs = document.getElementById('cd-secs');

if (cdDays && cdHours && cdMins && cdSecs) {
  // Set a target date 5 days from now for the demo
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 5);
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) return;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    cdDays.textContent = days.toString().padStart(2, '0');
    cdHours.textContent = hours.toString().padStart(2, '0');
    cdMins.textContent = minutes.toString().padStart(2, '0');
    cdSecs.textContent = seconds.toString().padStart(2, '0');
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    // Show mock success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    submitBtn.innerHTML = '<i class="ph ph-spinner-gap" style="animation: spin 2s linear infinite;"></i> Sending...';

    // Simulate API call
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="ph ph-check-circle"></i> Message Sent!';
      submitBtn.classList.remove('btn-primary');
      submitBtn.style.background = '#10b981';
      submitBtn.style.opacity = '1';
      
      contactForm.reset();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        submitBtn.classList.add('btn-primary');
        submitBtn.style.background = '';
      }, 3000);
    }, 1500);
  });
}

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.documentElement;
const themeIcon = themeToggle?.querySelector('i');

const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
  body.setAttribute('data-theme', 'light');
  if (themeIcon) {
    themeIcon.classList.replace('ph-moon', 'ph-sun');
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') !== 'light';
    if (isDark) {
      body.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeIcon.classList.replace('ph-moon', 'ph-sun');
    } else {
      body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      themeIcon.classList.replace('ph-sun', 'ph-moon');
    }
  });
}

// Notifications Dropdown Logic
const notifBtn = document.getElementById('notif-btn');
const notifDropdown = document.getElementById('notif-dropdown');

if (notifBtn && notifDropdown) {
  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
      notifDropdown.classList.remove('active');
    }
  });
}

// Search Logic (Mock)
const searchInput = document.querySelector('.search-input');
if (searchInput) {
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim() !== '') {
      alert(`Searching for: ${searchInput.value}\n(Search functionality will be fully implemented soon!)`);
      searchInput.value = '';
    }
  });
}

// Event Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const eventCards = document.querySelectorAll('.event-card');

if (filterButtons.length > 0 && eventCards.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      
      // Update buttons
      filterButtons.forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline');
      });
      btn.classList.remove('btn-outline');
      btn.classList.add('btn-primary');
      
      // Filter cards
      eventCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Registration Modal Logic
const regModal = document.getElementById('registration-modal');
const closeRegBtn = document.getElementById('close-modal');
const openRegBtns = document.querySelectorAll('.open-registration');
const modalEventName = document.getElementById('modal-event-name');
const regForm = document.getElementById('registration-form');

if (regModal && openRegBtns.length > 0) {
  openRegBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const eventName = btn.getAttribute('data-event');
      modalEventName.textContent = `Registering for: ${eventName}`;
      
      // Reset view to form
      document.getElementById('registration-form-view').style.display = 'block';
      document.getElementById('registration-success-view').style.display = 'none';
      
      regModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    regModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeRegBtn?.addEventListener('click', closeModal);
  regModal.addEventListener('click', (e) => {
    if (e.target === regModal) closeModal();
  });

  // Registration Form Submission
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = regForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      const eventName = modalEventName.textContent.replace('Registering for: ', '');
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="ph ph-spinner-gap" style="animation: spin 1.5s linear infinite;"></i> Processing...';
      
      // Mock API Call
      setTimeout(() => {
        // Generate random ID
        const regId = 'HF-' + Math.floor(10000 + Math.random() * 90000);
        const idDisplay = document.getElementById('display-reg-id');
        if (idDisplay) idDisplay.textContent = `#${regId}`;

        // Show Success View
        document.getElementById('registration-form-view').style.display = 'none';
        document.getElementById('registration-success-view').style.display = 'block';
        
        // Trigger Confetti
        createConfetti();
        
        // Update the original trigger button to "Registered"
        openRegBtns.forEach(btn => {
          if (btn.getAttribute('data-event') === eventName) {
            btn.innerHTML = '<i class="ph ph-check"></i> Registered';
            btn.disabled = true;
            btn.style.background = '#10b981';
            btn.style.borderColor = '#10b981';
          }
        });

        // Reset button for next time (though it's hidden now)
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1500);
    });
  }

  // Done button in success view
  document.getElementById('success-done-btn')?.addEventListener('click', closeModal);
}

// Simple Confetti Function
function createConfetti() {
  const colors = ['#8b5cf6', '#ec4891', '#0ea5e9', '#10b981', '#f59e0b'];
  const container = document.getElementById('modal-container');
  
  if (!container) return;

  for (let i = 0; i < 35; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = '50%';
    confetti.style.top = '40%';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    container.appendChild(confetti);
    
    // Animate outwards from center
    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 8;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    let x = 50;
    let y = 40;
    let opacity = 1;
    
    const animation = setInterval(() => {
      x += vx * 0.5;
      y += vy * 0.5;
      opacity -= 0.015;
      
      confetti.style.left = x + '%';
      confetti.style.top = y + '%';
      confetti.style.opacity = opacity;
      
      if (opacity <= 0) {
        clearInterval(animation);
        confetti.remove();
      }
    }, 20);
  }
}

// Spin animation for loading state
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .event-card {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
`;
document.head.appendChild(style);
