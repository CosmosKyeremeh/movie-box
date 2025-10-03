// Combined Auth Page JavaScript

// Random hero background images for auth page - ADD THIS AT THE TOP
const authHeroBackgrounds = [
  "https://images.unsplash.com/photo-1489599809925-8c26cb13d6bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2050&q=80",
  "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2079&q=80",
  "https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80",
  "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
];

// Function to set random hero background - ADD THIS FUNCTION
function setRandomAuthHeroBackground() {
  const authHeroSection = document.querySelector(".auth-hero");
  if (authHeroSection) {
    const randomIndex = Math.floor(Math.random() * authHeroBackgrounds.length);
    authHeroSection.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
             url('${authHeroBackgrounds[randomIndex]}') no-repeat center center/cover`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Set random hero background - ADD THIS LINE
  setRandomAuthHeroBackground();

  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const authForms = document.querySelectorAll(".auth-form");
  const switchLinks = document.querySelectorAll(".switch-link");
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const passwordInput = document.getElementById("signup-password");
  const strengthBar = document.querySelector(".strength-bar");
  const strengthText = document.querySelector(".strength-text");

  // Form Toggle Functionality
  function switchForm(formType) {
    // Update toggle buttons
    toggleBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.form === formType);
    });

    // Update forms
    authForms.forEach((form) => {
      form.classList.toggle("active", form.id === `${formType}-form`);
    });
  }

  // Toggle button clicks
  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      switchForm(this.dataset.form);
    });
  });

  // Switch links (like "Don't have an account?")
  switchLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      switchForm(this.dataset.form);
    });
  });

  // Password strength indicator
  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      const password = this.value;
      let strength = 0;
      let text = "Password strength";
      let color = "#4a5568";

      if (password.length >= 8) strength++;
      if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
      if (password.match(/\d/)) strength++;
      if (password.match(/[^a-zA-Z\d]/)) strength++;

      switch (strength) {
        case 1:
          text = "Weak";
          color = "#e53e3e";
          break;
        case 2:
          text = "Fair";
          color = "#ed8936";
          break;
        case 3:
          text = "Good";
          color = "#38a169";
          break;
        case 4:
          text = "Strong";
          color = "#68d391";
          break;
      }

      strengthBar.style.background = color;
      strengthBar.style.width = strength * 25 + "%";
      strengthText.textContent = text;
      strengthText.style.color = color;
    });
  }

  // Sign Up Form Submission
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const password = document.getElementById("signup-password").value;
      const confirmPassword = document.getElementById("signup-confirm").value;
      const termsChecked = document.getElementById("terms").checked;

      // Validation
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      if (!termsChecked) {
        alert("Please accept the Terms of Service and Privacy Policy");
        return;
      }

      if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
      }

      // Simulate signup
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.textContent = "Creating Account...";
      submitButton.disabled = true;

      setTimeout(() => {
        alert("Account created successfully! Welcome to MovieBox!");
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        window.location.href = "main.html";
      }, 2000);
    });
  }

  // Login Form Submission
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulate login
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.textContent = "Signing In...";
      submitButton.disabled = true;

      setTimeout(() => {
        alert("Successfully signed in!");
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        window.location.href = "main.html";
      }, 1500);
    });
  }

  // Password match indicator
  const confirmInput = document.getElementById("signup-confirm");
  if (confirmInput && passwordInput) {
    confirmInput.addEventListener("input", function () {
      if (this.value && passwordInput.value) {
        if (this.value === passwordInput.value) {
          this.style.borderColor = "#38a169";
        } else {
          this.style.borderColor = "#e53e3e";
        }
      } else {
        this.style.borderColor = "#4a5568";
      }
    });
  }
});
