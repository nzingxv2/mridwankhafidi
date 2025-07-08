\/* jshint esversion: 6 */
/* jshint browser: true */
/* jshint devel: true */

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        var targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate scroll position considering navbar height
            var navbarHeight = document.querySelector('.navbar').offsetHeight;
            var targetPosition = targetElement.getBoundingClientRect().top + 
                                window.pageYOffset - 
                                navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without jumping
            history.pushState(null, null, targetId);
        }
    });
});

// Reveal animations on scroll
function revealOnScroll() {
    var elements = document.querySelectorAll('.reveal');
    
    elements.forEach(function(element) {
        var elementTop = element.getBoundingClientRect().top;
        var elementVisible = 150;
        var delay = element.dataset.delay || 0;
        
        if (elementTop < window.innerHeight - elementVisible) {
            setTimeout(function() {
                element.classList.add('active');
            }, delay * 300);
        }
    });
}

// Initialize scroll animations
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initialize on load

// Form validation and email sending
var contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        var isValid = true;
        var nameInput = document.getElementById('name');
        var emailInput = document.getElementById('email');
        var messageInput = document.getElementById('message');
        
        // Reset errors
        document.querySelectorAll('.error-message').forEach(function(el) {
            el.textContent = '';
        });
        
        // Name validation
        if (!nameInput.value.trim()) {
            isValid = false;
            nameInput.nextElementSibling.textContent = 'Name is required';
        }
        
        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            isValid = false;
            emailInput.nextElementSibling.textContent = 'Email is required';
        } else if (!emailRegex.test(emailInput.value)) {
            isValid = false;
            emailInput.nextElementSibling.textContent = 'Please enter a valid email';
        }
        
        // Message validation
        if (!messageInput.value.trim()) {
            isValid = false;
            messageInput.nextElementSibling.textContent = 'Message is required';
        }
        
        // If valid, send email using EmailJS
        if (isValid) {
            var submitBtn = contactForm.querySelector('button[type="submit"]');
            var originalBtnContent = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            emailjs.sendForm('pytctm6', 'template_z25i39a', this)
                .then(function() {
                    // Show success message
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                    
                    // Reset after delay
                    setTimeout(function() {
                        submitBtn.innerHTML = originalBtnContent;
                        submitBtn.disabled = false;
                        contactForm.reset();
                    }, 2000);
                }, function(error) {
                    // Show error message
                    submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed';
                    console.error('Failed to send message:', error);
                    
                    // Reset button after delay
                    setTimeout(function() {
                        submitBtn.innerHTML = originalBtnContent;
                        submitBtn.disabled = false;
                    }, 2000);
                });
        }
    });
}

// Theme toggle functionality
var themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        var icon = themeToggle.querySelector('i');
        
        if (document.body.classList.contains('light-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
}

// Project card hover animation enhancement
document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add transition after page loads to prevent initial flash
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100);
});
