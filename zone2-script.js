// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navbar = document.querySelector(".navbar");
const statNumbers = document.querySelectorAll(".stat-number");
const eventCards = document.querySelectorAll(".event-card");
const programCards = document.querySelectorAll(".program-card");
const planCards = document.querySelectorAll(".plan-card");
const contactForm = document.getElementById("contactForm");

// Mobile Navigation Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");

  // Prevent body scroll when menu is open
  if (navMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = ""; // Restore body scroll
  });
});

// Navbar scroll effect - removed duplicate listener

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const navbarHeight = navbar.offsetHeight;
    const offsetTop = section.offsetTop - navbarHeight - 20; // Account for fixed navbar with extra padding

    // Use requestAnimationFrame for smoother scrolling
    const startPosition = window.pageYOffset;
    const distance = offsetTop - startPosition;
    const duration = 800; // milliseconds
    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
}

// Animate statistics numbers
function animateStats() {
  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-target"));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current).toLocaleString();
    }, 16);
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("loaded");

      // Trigger stats animation when stats section is visible
      if (entry.target.classList.contains("stat-item")) {
        animateStats();
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(
    ".feature-item, .event-card, .program-card, .plan-card, .testimonial-card, .contact-item, .coach-card"
  )
  .forEach((el) => {
    el.classList.add("loading");
    observer.observe(el);
  });

// Event card interactions
eventCards.forEach((card) => {
  const registerBtn = card.querySelector(".btn-event");

  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Add visual feedback
    registerBtn.style.transform = "scale(0.95)";
    registerBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Registering...';

    setTimeout(() => {
      registerBtn.innerHTML = '<i class="fas fa-check"></i> Registered!';
      registerBtn.style.background = "#27ae60";

      setTimeout(() => {
        registerBtn.innerHTML = "Register Now";
        registerBtn.style.background = "#ff6b35";
        registerBtn.style.transform = "scale(1)";

        showNotification("Successfully registered for the event!", "success");
      }, 2000);
    }, 1500);
  });
});

// Program card interactions
programCards.forEach((card) => {
  const startBtn = card.querySelector(".btn-program");

  startBtn.addEventListener("click", (e) => {
    e.preventDefault();

    startBtn.style.transform = "scale(0.95)";
    startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Starting...';

    setTimeout(() => {
      startBtn.innerHTML = '<i class="fas fa-check"></i> Program Started!';
      startBtn.style.background = "#27ae60";

      setTimeout(() => {
        startBtn.innerHTML = "Start Program";
        startBtn.style.background = "#ff6b35";
        startBtn.style.transform = "scale(1)";

        showNotification(
          "Training program started! Check your email for details.",
          "success"
        );
      }, 2000);
    }, 1500);
  });
});

// Plan card interactions
planCards.forEach((card) => {
  const chooseBtn = card.querySelector(".btn-plan");

  chooseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    chooseBtn.style.transform = "scale(0.95)";
    chooseBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Processing...';

    setTimeout(() => {
      chooseBtn.innerHTML = '<i class="fas fa-check"></i> Membership Active!';
      chooseBtn.style.background = "#27ae60";

      setTimeout(() => {
        chooseBtn.innerHTML = "Choose Plan";
        chooseBtn.style.background = "#ff6b35";
        chooseBtn.style.transform = "scale(1)";

        showNotification(
          "Welcome to ZONE 2! Your membership is now active.",
          "success"
        );
      }, 2000);
    }, 1500);
  });
});

// Form validation and submission
function validateForm(form) {
  const inputs = form.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.borderColor = "#e74c3c";
      isValid = false;
    } else {
      input.style.borderColor = "#e0e0e0";
    }
  });

  return isValid;
}

// Contact form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateForm(contactForm)) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.background = "#27ae60";

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = "#ff6b35";
        contactForm.reset();

        showNotification(
          "Thank you for your message! We will get back to you soon.",
          "success"
        );
      }, 2000);
    }, 1500);
  } else {
    showNotification("Please fill in all required fields.", "error");
  }
});

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${
              type === "success"
                ? "check-circle"
                : type === "error"
                ? "exclamation-circle"
                : "info-circle"
            }"></i>
            <span>${message}</span>
        </div>
    `;

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${
          type === "success"
            ? "#27ae60"
            : type === "error"
            ? "#e74c3c"
            : "#3498db"
        };
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Add notification content styles
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;

document.head.appendChild(notificationStyles);

// Running pace calculator
function createPaceCalculator() {
  const calculator = document.createElement("div");
  calculator.className = "pace-calculator";
  calculator.innerHTML = `
        <div class="calculator-content">
            <h3>Running Pace Calculator</h3>
            <div class="calculator-inputs">
                <div class="input-group">
                    <label>Distance (miles)</label>
                    <input type="number" id="distance" placeholder="5.0" step="0.1">
                </div>
                <div class="input-group">
                    <label>Time (minutes)</label>
                    <input type="number" id="time" placeholder="30" step="0.1">
                </div>
                <button onclick="calculatePace()">Calculate Pace</button>
            </div>
            <div class="calculator-result" id="paceResult"></div>
        </div>
    `;

  calculator.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        max-width: 300px;
        transform: translateX(350px);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(calculator);

  // Add calculator styles
  const calculatorStyles = document.createElement("style");
  calculatorStyles.textContent = `
        .calculator-content h3 {
            color: #333;
            margin-bottom: 15px;
            font-size: 1.2rem;
        }
        
        .calculator-inputs {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .input-group {
            display: flex;
            flex-direction: column;
        }
        
        .input-group label {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 5px;
        }
        
        .input-group input {
            padding: 8px 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
        }
        
        .input-group input:focus {
            outline: none;
            border-color: #ff6b35;
        }
        
        .calculator-inputs button {
            padding: 10px;
            background: #ff6b35;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .calculator-inputs button:hover {
            background: #e55a2b;
        }
        
        .calculator-result {
            padding: 10px;
            background: #f8f9fa;
            border-radius: 8px;
            font-weight: 600;
            color: #333;
            text-align: center;
        }
    `;

  document.head.appendChild(calculatorStyles);

  // Show calculator on hover
  let showTimer;
  document.addEventListener("mousemove", (e) => {
    if (e.clientX > window.innerWidth - 50) {
      clearTimeout(showTimer);
      showTimer = setTimeout(() => {
        calculator.style.transform = "translateX(0)";
      }, 1000);
    } else {
      clearTimeout(showTimer);
      showTimer = setTimeout(() => {
        calculator.style.transform = "translateX(350px)";
      }, 2000);
    }
  });
}

// Pace calculation function
function calculatePace() {
  const distance = parseFloat(document.getElementById("distance").value);
  const time = parseFloat(document.getElementById("time").value);
  const resultDiv = document.getElementById("paceResult");

  if (distance && time) {
    const pacePerMile = time / distance;
    const minutes = Math.floor(pacePerMile);
    const seconds = Math.round((pacePerMile - minutes) * 60);

    resultDiv.innerHTML = `
            <div>Pace: ${minutes}:${seconds
      .toString()
      .padStart(2, "0")} per mile</div>
            <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">
                ${(pacePerMile * 1.609).toFixed(2)} min/km
            </div>
        `;
  } else {
    resultDiv.innerHTML = "Please enter both distance and time";
  }
}

// Initialize pace calculator
createPaceCalculator();

// Training plan generator
function createTrainingPlanGenerator() {
  const generator = document.createElement("div");
  generator.className = "training-generator";
  generator.innerHTML = `
        <div class="generator-content">
            <h3>Quick Training Plan</h3>
            <div class="generator-inputs">
                <div class="input-group">
                    <label>Current Level</label>
                    <select id="currentLevel">
                        <option value="">Select Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>Goal Distance</label>
                    <select id="goalDistance">
                        <option value="">Select Distance</option>
                        <option value="5k">5K</option>
                        <option value="10k">10K</option>
                        <option value="half">Half Marathon</option>
                        <option value="marathon">Marathon</option>
                    </select>
                </div>
                <button onclick="generatePlan()">Generate Plan</button>
            </div>
            <div class="generator-result" id="planResult"></div>
        </div>
    `;

  generator.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: white;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        max-width: 300px;
        transform: translateX(-350px);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(generator);

  // Add generator styles
  const generatorStyles = document.createElement("style");
  generatorStyles.textContent = `
        .generator-content h3 {
            color: #333;
            margin-bottom: 15px;
            font-size: 1.2rem;
        }
        
        .generator-inputs {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .generator-inputs select {
            padding: 8px 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
        }
        
        .generator-inputs select:focus {
            outline: none;
            border-color: #ff6b35;
        }
        
        .generator-inputs button {
            padding: 10px;
            background: #ff6b35;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .generator-inputs button:hover {
            background: #e55a2b;
        }
        
        .generator-result {
            padding: 10px;
            background: #f8f9fa;
            border-radius: 8px;
            font-size: 0.9rem;
            color: #333;
        }
    `;

  document.head.appendChild(generatorStyles);

  // Show generator on hover
  let showTimer;
  document.addEventListener("mousemove", (e) => {
    if (e.clientX < 50) {
      clearTimeout(showTimer);
      showTimer = setTimeout(() => {
        generator.style.transform = "translateX(0)";
      }, 1000);
    } else {
      clearTimeout(showTimer);
      showTimer = setTimeout(() => {
        generator.style.transform = "translateX(-350px)";
      }, 2000);
    }
  });
}

// Training plan generation function
function generatePlan() {
  const level = document.getElementById("currentLevel").value;
  const distance = document.getElementById("goalDistance").value;
  const resultDiv = document.getElementById("planResult");

  if (level && distance) {
    const plans = {
      "beginner-5k":
        "Week 1-2: Walk 2 min, run 1 min (repeat 10x)<br>Week 3-4: Walk 1 min, run 2 min (repeat 10x)<br>Week 5-6: Run 5 min, walk 1 min (repeat 4x)<br>Week 7-8: Run continuously for 5K",
      "intermediate-10k":
        "Week 1-2: 3 runs/week (3-4 miles each)<br>Week 3-4: Add speed work (1 day/week)<br>Week 5-6: Long run up to 8 miles<br>Week 7-8: Taper and race preparation",
      "advanced-half":
        "Week 1-4: Base building (40-50 miles/week)<br>Week 5-8: Speed work + tempo runs<br>Week 9-12: Peak training (60+ miles/week)<br>Week 13-14: Taper for race",
      "advanced-marathon":
        "Week 1-8: Base building (50-70 miles/week)<br>Week 9-16: Marathon-specific training<br>Week 17-20: Peak training (80+ miles/week)<br>Week 21-24: Taper for race",
    };

    const planKey = `${level}-${distance}`;
    const plan =
      plans[planKey] || "Please select compatible level and distance options.";

    resultDiv.innerHTML = plan;
  } else {
    resultDiv.innerHTML = "Please select both current level and goal distance";
  }
}

// Initialize training plan generator
createTrainingPlanGenerator();

// Parallax effect for hero section - moved to debounced handler

// Loading animation for page
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Animate hero content
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    // Ensure hero content is visible by default
    heroContent.style.opacity = "1";
    heroContent.style.transform = "translateY(0)";
    heroContent.style.transition = "all 1s ease";
  }
});

// Search functionality
function addSearchFunctionality() {
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search events, programs, training...";
  searchInput.className = "search-input";
  searchInput.style.cssText = `
        padding: 10px 15px;
        border: 2px solid #e0e0e0;
        border-radius: 25px;
        font-size: 1rem;
        width: 300px;
        margin: 20px auto;
        display: block;
        transition: border-color 0.3s ease;
    `;

  searchInput.addEventListener("focus", () => {
    searchInput.style.borderColor = "#ff6b35";
  });

  searchInput.addEventListener("blur", () => {
    searchInput.style.borderColor = "#e0e0e0";
  });

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();

    // Search through event cards
    eventCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const description = card
        .querySelector(".event-description")
        .textContent.toLowerCase();

      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.display = "block";
        card.style.opacity = "1";
      } else {
        card.style.opacity = "0.3";
      }
    });

    // Search through program cards
    programCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const features = card
        .querySelector(".program-features")
        .textContent.toLowerCase();

      if (title.includes(searchTerm) || features.includes(searchTerm)) {
        card.style.display = "block";
        card.style.opacity = "1";
      } else {
        card.style.opacity = "0.3";
      }
    });
  });

  // Add search to events section
  const eventsSection = document.querySelector(".events .container");
  if (eventsSection) {
    eventsSection.insertBefore(
      searchInput,
      eventsSection.querySelector(".events-grid")
    );
  }
}

// Initialize search functionality
addSearchFunctionality();

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close mobile menu
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// Add click-to-call functionality for phone numbers
document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const phoneNumber = link.getAttribute("href").replace("tel:", "");
    showNotification(`Calling ${phoneNumber}...`, "info");
  });
});

// Add email click functionality
document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const email = link.getAttribute("href").replace("mailto:", "");
    showNotification(`Opening email client for ${email}...`, "info");
  });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  // Navbar scroll effect
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  }

  // Parallax effect
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector(".hero-image");
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
}, 16); // Reduced debounce time for smoother scrolling

window.addEventListener("scroll", debouncedScrollHandler, { passive: true });

// Add smooth reveal animation for sections
function addRevealAnimation() {
  const revealElements = document.querySelectorAll(
    ".section-header, .about-text, .contact-info"
  );

  revealElements.forEach((el) => {
    el.classList.add("loading");
    observer.observe(el);
  });
}

// Initialize reveal animations
addRevealAnimation();

// Running motivation quotes
const motivationQuotes = [
  "Every mile begins with a single step.",
  "The miracle isn't that I finished. The miracle is that I had the courage to start.",
  "Running is the greatest metaphor for life, because you get out of it what you put into it.",
  "The only bad workout is the one that didn't happen.",
  "Run when you can, walk if you have to, crawl if you must; just never give up.",
];

function showMotivationQuote() {
  const randomQuote =
    motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)];
  showNotification(randomQuote, "info");
}

// Show motivation quote every 30 seconds
setInterval(showMotivationQuote, 30000);

console.log("ZONE 2 Run Club website loaded successfully! 🏃‍♂️");
