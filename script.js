// Filter menu items based on the data-filter attribute
function filterView(filter) {
    const allElements = document.querySelectorAll("[data-filter]");

    allElements.forEach(element => {
        if (element.getAttribute("data-filter") === filter || filter === "all") {
            // Remove the 'hidden' class to show matching items (fade in)
            element.classList.remove('hidden');
        } else {
            // Add the 'hidden' class to hide non-matching items (fade out)
            element.classList.add('hidden');
        }
    });
  }

const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

// Update cursor position based on mouse movements
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX; // Get mouse X coordinate relative to the viewport
  const mouseY = e.clientY; // Get mouse Y coordinate relative to the viewport

// Set cursor position based on mouse movement
  cursor.style.left = `${mouseX - 25}px`; // Subtract half the width to center it
  cursor.style.top = `${mouseY - 25}px`;  // Subtract half the height to center it
});

// Detect hover over <object> elements
const objects = document.querySelectorAll('object');
objects.forEach((object) => {
  object.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-over-object');
  });
  object.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-over-object');
  });
});

// Change cursor shape on hover over links
const links = document.querySelectorAll('a');
links.forEach((link) => {
  link.addEventListener('mouseenter', () => {
    cursor.style.width = '60px';  // Make the cursor bigger
    cursor.style.height = '60px'; // Make the cursor bigger (circle)
  });

  link.addEventListener('mouseleave', () => {
    cursor.style.width = '30px';  // Restore the cursor to a circle
    cursor.style.height = '30px'; // Restore the cursor to a circle
  });
});

// GSAP Animation

document.addEventListener("DOMContentLoaded", function () {
  // Check if the screen is a desktop (example: screen width greater than 768px)
  const isDesktop = window.innerWidth > 768;

  if (isDesktop) {
    // Register GSAP's ScrollToPlugin for smooth scrolling
    gsap.registerPlugin(ScrollTrigger);

    // Create a new GSAP timeline for smooth sequencing of all animations
    const tl = gsap.timeline({
      // This scrollTrigger is not necessary for the timeline but for each individual element
      // We will remove the scrollTrigger from the timeline to avoid applying it globally to all elements
    });

    // Add animations to the timeline for each element
    gsap.utils.toArray(".project img, .flex-item img, .flex-item, .frame-item, .tube").forEach(function (element) {
      gsap.from(element, {
        opacity: 0,
        y: 50,  // Translate the element using the transform property (50px downward)
        duration: 1, // Duration for each element's animation
        ease: "power2.out", // Easing for a smooth transition
        scrollTrigger: {
          trigger: element,  // Use each element as its own scrollTrigger
          start: "top 90%",  // Start the animation when the element reaches 90% of the viewport height
          end: "top 70%",  // End when the element hits the bottom of the viewport
          scrub: 0.3,  // Smooth scrubbing to match scroll position
          markers: false,  // Disable markers for cleaner experience
          toggleActions: "play none none none", // Prevent triggers from resetting
        }
      });
    });

    // Add animations to the timeline for each element
    gsap.utils.toArray(".bio").forEach(function (element) {
      gsap.from(element, {
        opacity: 0,
        y: 50,  // Translate the element using the transform property (50px downward)
        duration: 1, // Duration for each element's animation
        ease: "power2.out", // Easing for a smooth transition
        scrollTrigger: {
          trigger: element,  // Use each element as its own scrollTrigger
          start: "top 50%",  // Start the animation when the element reaches 90% of the viewport height
          end: "top 10%",  // End when the element hits the bottom of the viewport
          scrub: 0.3,  // Smooth scrubbing to match scroll position
          markers: false,  // Disable markers for cleaner experience
          toggleActions: "play none none none", // Prevent triggers from resetting
        }
      });
    });

    // Add animations to the timeline for each element
    gsap.utils.toArray(".resume").forEach(function (element) {
      gsap.from(element, {
        opacity: 0,
        y: 50,  // Translate the element using the transform property (50px downward)
        duration: 1, // Duration for each element's animation
        ease: "power2.out", // Easing for a smooth transition
        scrollTrigger: {
          trigger: element,  // Use each element as its own scrollTrigger
          start: "top 80%",  // Start the animation when the element reaches 90% of the viewport height
          end: "top 10%",  // End when the element hits the bottom of the viewport
          scrub: 0.3,  // Smooth scrubbing to match scroll position
          markers: false,  // Disable markers for cleaner experience
          toggleActions: "play none none none", // Prevent triggers from resetting
        }
      });
    });

    // Add animations to the timeline for each element
    gsap.utils.toArray("hr").forEach(function (element) {
      gsap.from(element, {
        opacity: 0,
        x: -350,  // Translate the element using the transform property (50px downward)
        duration: 1, // Duration for each element's animation
        ease: "power2.out", // Easing for a smooth transition
        scrollTrigger: {
          trigger: element,  // Use each element as its own scrollTrigger
          start: "top 70%",  // Start the animation when the element reaches 90% of the viewport height
          end: "top 50%",  // End when the element hits the bottom of the viewport
          scrub: 0.3,  // Smooth scrubbing to match scroll position
          markers: false,  // Disable markers for cleaner experience
          toggleActions: "play none none none", // Prevent triggers from resetting
        }
      });
    });

    // GSAP animation with both ScrollTrigger and click trigger
    gsap.utils.toArray('.menu').forEach(element => {
      // Scroll-triggered animation
      gsap.from(element, {
        opacity: 0,
        x: 100, // Start 100 pixels to the right of the final position
        duration: isDesktop ? 1 : 0.5, // Use different durations based on device
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "top 0%",
          scrub: 1,
        }
      });
    });
  }

  // Handle the fade-out transition for the menu items
  const menuItems = document.querySelectorAll('#menu .item');
  menuItems.forEach(item => {
      const link = item.querySelector('a');
      const img = item.querySelector('img');
      const url = link.href || link.dataset.url; // Get the URL from the image's associated link or data attribute

      link.addEventListener('click', function (e) {
          e.preventDefault(); // Prevent default link action
          
          // Fade out the current content
          const contentContainer = document.getElementById('content');
          gsap.to(contentContainer, {
              opacity: 0,
              duration: 0.5,
              onComplete: function () {
                  setTimeout(function () {
                      window.location.href = url; // Navigate to the clicked page
                  }, 500); // Match this delay with the fade duration
              }
          });
      });
  });

  // Example filter function for demonstration
  function filterView(filterType) {
      const items = document.querySelectorAll('.item');
      items.forEach(item => {
          if (item.getAttribute('data-filter') === filterType || filterType === 'all') {
              item.style.display = 'block'; // Show the item
          } else {
              item.style.display = 'none'; // Hide the item
          }
      });
  }

  // Call filterView('ux-design') or any category to show/hide items
});
