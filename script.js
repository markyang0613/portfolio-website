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
