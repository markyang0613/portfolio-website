document.addEventListener("DOMContentLoaded", () => {
  const introSection = document.getElementById("introduction-section");
  const introText = introSection.querySelectorAll("h2, h1, p");
  const introImage = introSection.querySelector(".intro-image");

  setTimeout(() => {
    introText.forEach((el) => el.classList.add("animate"));
    introImage.classList.add("animate");
  }, 100);
});



document.addEventListener("DOMContentLoaded", () => {
  const headerH1 = document.querySelector("header h1");
  const headerPs = document.querySelectorAll("header p, .contact-info");
  const profileImage = document.querySelector(".profile-image");

  // Add the animation class after a small delay
  setTimeout(() => {
    headerH1.classList.add("animate");
    headerPs.forEach((p) => p.classList.add("animate"));
    profileImage.classList.add("animate");
  }, 100); // Delay to allow styles to initialize
});

// Add an interactive message
document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.getElementById("about");

  // Create a button
  const button = document.createElement("button");
  button.textContent = "Click Me to Learn More";
  button.style.padding = "10px";
  button.style.marginTop = "10px";

  // Append button to the About section
  aboutSection.appendChild(button);

  // Add click event to the button
  button.addEventListener("click", () => {
    alert("Thanks for learning with me!");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-item");

  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate"); // Add animation class
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    },
    { threshold: 0.3 } // Trigger when 30% of the item is visible
  );

  // Observe each timeline item
  timelineItems.forEach((item) => observer.observe(item));
});

// Project Section
document.addEventListener("DOMContentLoaded", () => {
  const learnMoreButtons = document.querySelectorAll(".learn-more-btn");

  learnMoreButtons.forEach(button => {
    button.addEventListener("click", () => {
      const url = button.getAttribute("data-url");
      if (url) {
        window.open(url, "_blank"); // Open the URL in a new tab
      } else {
        alert("More details to be added soon!");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const indexButtons = document.querySelectorAll(".index-btn");

  indexButtons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-target");
      const targetElement = document.querySelector(target);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      } else {
        console.error(`Target element not found for selector: ${target}`);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const userEmail = document.getElementById("user-email").value;
    const userMessage = document.getElementById("user-message").value;

    // EmailJS Configuration
    const serviceID = "service_ata4u23";
    const templateID = "template_qmbh66g";
    const publicKey = "Fxt3IkrP5F2ZhAhnC";

    // Validate inputs (optional, but recommended)
    if (!userEmail || !userMessage) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Send email
      const response = await emailjs.send(serviceID, templateID, {
        from_user: userEmail, // Matches `{{from_user}}` in your template
        message: userMessage, // Matches `{{message}}` in your template
      }, publicKey);

      if (response.status === 200) {
        alert("Message sent successfully!");
        contactForm.reset();
      } else {
        console.error("Unexpected response:", response);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during email send:", error);
      alert("Failed to send the message. Please try again later.");
    }
  });
});

// Timeline Scrolling
document.addEventListener('DOMContentLoaded', function() {
  const timeline = document.querySelector('.timeline-wrapper');
  let isDown = false;
  let startX;
  let scrollLeft;

  // Mouse events for drag scrolling
  timeline.addEventListener('mousedown', (e) => {
    isDown = true;
    timeline.style.cursor = 'grabbing';
    startX = e.pageX - timeline.offsetLeft;
    scrollLeft = timeline.scrollLeft;
  });

  timeline.addEventListener('mouseleave', () => {
    isDown = false;
    timeline.style.cursor = 'grab';
  });

  timeline.addEventListener('mouseup', () => {
    isDown = false;
    timeline.style.cursor = 'grab';
  });

  timeline.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - timeline.offsetLeft;
    const walk = (x - startX) * 2;
    timeline.scrollLeft = scrollLeft - walk;
  });

  // Touch events for mobile scrolling
  timeline.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - timeline.offsetLeft;
    scrollLeft = timeline.scrollLeft;
  });

  timeline.addEventListener('touchmove', (e) => {
    if (e.touches.length !== 1) return;
    const x = e.touches[0].pageX - timeline.offsetLeft;
    const walk = (x - startX) * 2;
    timeline.scrollLeft = scrollLeft - walk;
  });
});

// Floating Navigation Menu
document.addEventListener('DOMContentLoaded', function() {
  const floatingNav = document.querySelector('.floating-nav');
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.floating-nav a');
  
  // Show/hide floating nav based on scroll position
  let lastScrollTop = 0;
  const scrollThreshold = 300; // Show nav after scrolling this many pixels

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show/hide floating nav
    if (scrollTop > scrollThreshold) {
      floatingNav.classList.add('visible');
    } else {
      floatingNav.classList.remove('visible');
    }
    
    // Update active section
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollTop >= (sectionTop - sectionHeight/3)) {
        currentSection = section.id || 'top';
      }
    });

    // Update active nav link
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === currentSection) {
        link.classList.add('active');
      }
    });

    lastScrollTop = scrollTop;
  });

  // Handle navigation clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Check if it's an external link (contains http or https)
      if (href.includes('http')) {
        // Allow default behavior for external links
        return;
      }
      
      // Handle internal navigation
      e.preventDefault();
      if (href === '#top') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});

// Project Navigation and Filtering
document.addEventListener('DOMContentLoaded', function() {
  const projectNavLinks = document.querySelectorAll('.project-nav-link');
  const projectCards = document.querySelectorAll('.project-card');
  const indicator = document.querySelector('.project-nav-indicator');
  const projectNav = document.querySelector('.project-nav');

  // Initialize indicator position
  function setIndicator(element) {
    if (indicator && element) {
      indicator.style.width = `${element.offsetWidth}px`;
      indicator.style.left = `${element.offsetLeft}px`;
    }
  }

  // Update project counts
  function updateProjectCounts() {
    const categories = ['all', 'web', 'ai', 'data', 'software'];
    categories.forEach(category => {
      const count = category === 'all' 
        ? projectCards.length 
        : document.querySelectorAll(`.project-card[data-category="${category}"]`).length;
      const countElement = document.querySelector(`.project-nav-link[data-category="${category}"] .project-count`);
      if (countElement) {
        countElement.textContent = count;
      }
    });
  }

  // Filter projects
  function filterProjects(category) {
    projectCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        }, 300);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }

  // Handle navigation clicks
  projectNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = link.getAttribute('data-category');
      
      // Remove active class from all links
      projectNavLinks.forEach(navLink => {
        navLink.classList.remove('active');
      });
      
      // Add active class to clicked link
      link.classList.add('active');
      
      // Update indicator position
      setIndicator(link);
      
      // Filter projects
      filterProjects(category);
    });

    // Handle hover effects
    link.addEventListener('mouseenter', () => {
      setIndicator(link);
    });
  });

  // Reset indicator on mouse leave
  projectNav.addEventListener('mouseleave', () => {
    const activeLink = document.querySelector('.project-nav-link.active');
    if (activeLink) {
      setIndicator(activeLink);
    }
  });

  // Initialize
  updateProjectCounts();
  
  // Set initial active state and indicator position
  const allProjectsLink = document.querySelector('.project-nav-link[data-category="all"]');
  if (allProjectsLink) {
    allProjectsLink.classList.add('active');
    setIndicator(allProjectsLink);
  }
});

// Index Navigation Active State
const sections = document.querySelectorAll('section');
const navButtons = document.querySelectorAll('.index-btn:not(.social-btn)');

function setActiveButton() {
  const scrollPosition = window.scrollY + 100; // Offset for better activation

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionBottom = sectionTop + sectionHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navButtons.forEach(button => button.classList.remove('active'));
      navButtons[index]?.classList.add('active');
    }
  });
}

// Smooth scroll to section when clicking nav buttons
navButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = button.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll event listener
window.addEventListener('scroll', setActiveButton);
window.addEventListener('load', setActiveButton);

// Project Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.querySelector('.project-modal');
  const modalContent = modal.querySelector('.modal-content');
  const modalBody = modal.querySelector('.modal-body');
  const closeButton = modal.querySelector('.modal-close');

  // Function to open modal with project details
  function openModal(projectCard) {
    const title = projectCard.querySelector('.project-info h3').textContent;
    const category = projectCard.querySelector('.category-tag').textContent;
    const description = projectCard.querySelector('.project-info p').textContent;
    const techStack = projectCard.querySelector('.tech-stack').innerHTML;
    const githubLink = projectCard.querySelector('.preview-content .github-btn')?.href;
    const imageUrl = projectCard.querySelector('.project-thumbnail img').src;

    modalBody.innerHTML = `
      <div class="modal-project-details">
        <div class="modal-image">
          <img src="${imageUrl}" alt="${title} Preview" loading="lazy">
        </div>
        <div class="modal-text">
          <span class="modal-category">${category}</span>
          <h3>${title}</h3>
          <p class="modal-description">${description}</p>
          <div class="modal-tech-stack">
            <h4>Technologies Used:</h4>
            <div class="tech-tags">
              ${techStack}
            </div>
          </div>
          ${githubLink ? `
            <div class="modal-actions">
              <a href="${githubLink}" target="_blank" class="modal-github-link">
                <i class="fab fa-github"></i> View on GitHub
              </a>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add animation class
    setTimeout(() => {
      modalContent.classList.add('modal-show');
    }, 10);
  }

  // Function to close modal
  function closeModal() {
    modalContent.classList.remove('modal-show');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }

  // Add click event to all view details buttons
  document.querySelectorAll('.preview-btn.details-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const projectCard = button.closest('.project-card');
      openModal(projectCard);
    });
  });

  // Close modal when clicking close button
  closeButton.addEventListener('click', closeModal);

  // Close modal when clicking outside the modal content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
});

// Intersection Observer for animations
const animateOnScroll = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all elements that should animate
  document.querySelectorAll('.intro-container, .timeline-item, .project-card').forEach(element => {
    observer.observe(element);
  });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  // ... existing initialization code ...
});

// Interactive Navigation
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const nav = document.querySelector('.interactive-nav');
  const indicator = document.querySelector('.nav-indicator');

  // Update active link based on scroll position
  function updateActiveLink() {
    const currentScroll = window.scrollY;
    let currentSection = null;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
        currentSection = section;
      }
    });

    // Remove active class from all links first
    navLinks.forEach(link => link.classList.remove('active'));

    if (currentSection) {
      const targetLink = document.querySelector(`.nav-link[href="#${currentSection.id}"]`);
      if (targetLink) {
        targetLink.classList.add('active');
        
        // Update indicator position
        indicator.style.width = `${targetLink.offsetWidth}px`;
        indicator.style.left = `${targetLink.offsetLeft}px`;
      }
    }
  }

  // Smooth scroll to section
  navLinks.forEach(link => {
    if (!link.classList.contains('social-link')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          // Remove active class from all links
          navLinks.forEach(navLink => navLink.classList.remove('active'));
          // Add active class to clicked link
          link.classList.add('active');
          // Update indicator
          indicator.style.width = `${link.offsetWidth}px`;
          indicator.style.left = `${link.offsetLeft}px`;
          
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });

      // Initialize indicator position on hover
      link.addEventListener('mouseenter', () => {
        indicator.style.width = `${link.offsetWidth}px`;
        indicator.style.left = `${link.offsetLeft}px`;
      });
    }
  });

  // Reset indicator to active link when mouse leaves nav
  nav.addEventListener('mouseleave', () => {
    updateActiveLink();
  });

  // Update active link on scroll with throttling
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        updateActiveLink();
        scrollTimeout = null;
      }, 100);
    }
  });
  
  // Initialize active link
  updateActiveLink();
});

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
  }
  
  // Toggle theme
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Toggle icon
    themeIcon.classList.toggle('fa-moon');
    themeIcon.classList.toggle('fa-sun');
    
    // Add transition effect to all elements
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  });
});

// Loading and Page Transitions
document.addEventListener('DOMContentLoaded', function() {
  // Hide loading overlay when page is loaded
  const loadingOverlay = document.getElementById('loading-overlay');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingOverlay.classList.add('hidden');
    }, 500);
  });

  // Add fade-in class to sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('fade-in');
  });

  // Intersection Observer for fade-in animations
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe all fade-in elements
  document.querySelectorAll('.fade-in').forEach(element => {
    fadeObserver.observe(element);
  });
});

// Enhanced Project Card Interactions
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // 3D Tilt Effect
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(10px)
      `;
    });
    
    // Reset Transform on Mouse Leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
    
    // Click Effect
    card.addEventListener('click', () => {
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        card.style.transform = 'scale(1)';
      }, 100);
    });
  });
});
