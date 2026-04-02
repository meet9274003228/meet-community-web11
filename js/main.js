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

// Custom Cursor
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

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
