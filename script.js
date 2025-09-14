document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const header = document.getElementById('siteHeader');
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const navLinksAnchors = navLinks.querySelectorAll('a');

  // --- Mobile Navigation ---
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile nav on link click
  navLinksAnchors.forEach(link => {
      link.addEventListener('click', () => {
          navLinks.classList.remove('active');
      });
  });

  // --- Header Shadow on Scroll ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // --- Update Year in Footer ---
  document.getElementById('year').textContent = new Date().getFullYear();

  // --- Contact Form Submission ---
  document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const status = document.getElementById("formStatus");

    status.textContent = "⏳ Sending...";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        status.textContent = "✅ Thanks! Your message has been sent.";
        form.reset();
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, "errors")) {
          status.textContent = data.errors.map(err => err.message).join(", ");
        } else {
          status.textContent = "❌ Oops! There was a problem submitting your form.";
        }
      }
    } catch (error) {
      status.textContent = "❌ Network error. Please try again later.";
    }
  }

  form.addEventListener("submit", handleSubmit);
});

    
    // Simulate form submission
    setTimeout(() => {
      formStatus.textContent = 'Thank you! Your message has been sent successfully.';
      formStatus.classList.add('success');
      form.reset();
      
      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.classList.remove('success');
      }, 5000);
    }, 1500);
  });

  const dropdown = document.querySelector('.dropdown');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (dropdown) {
    // 1. Listen for a click on the "Services" link
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault(); // Stop the link from trying to scroll to #services
      // Toggle the .active class on the link and the menu
      dropdownToggle.classList.toggle('active');
      dropdownMenu.classList.toggle('active');
    });

    // 2. Listen for a click anywhere on the page
    window.addEventListener('click', (e) => {
      // If the click was *outside* of the dropdown container...
      if (!dropdown.contains(e.target)) {
        // ...remove the active classes to close the menu.
        dropdownToggle.classList.remove('active');
        dropdownMenu.classList.remove('active');
      }
    });
  }



  // --- Fade-in Animations on Scroll ---
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('visible');
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('main section');
  const observerOptions = {
      root: null,
      rootMargin: `-${header.offsetHeight}px 0px -60% 0px`,
      threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              navLinksAnchors.forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href') === `#${id}`) {
                      link.classList.add('active');
                  }
              });
          }
      });
  }, observerOptions);

  sections.forEach(section => {
      sectionObserver.observe(section);
  });
