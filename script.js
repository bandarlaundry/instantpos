// script.js

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get input values
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('error-message');
  const loginForm = document.getElementById('loginForm');
  const content = document.getElementById('content');

  // Simple validation (replace with actual backend logic)
  if (username === 'admin' && password === 'password123') {
    // Successful login
    errorMessage.style.display = 'none'; // Hide error message
    loginForm.style.display = 'none'; // Hide login form
    content.style.display = 'block'; // Show content
  } else {
    // Show error message
    errorMessage.textContent = 'Invalid username or password';
    errorMessage.style.display = 'block';
  }
});

// Logout button functionality
document.getElementById('logoutBtn').addEventListener('click', function () {
  const loginForm = document.getElementById('loginForm');
  const content = document.getElementById('content');
  const errorMessage = document.getElementById('error-message');

  // Reset the form and UI
  loginForm.reset();
  loginForm.style.display = 'block'; // Show login form
  content.style.display = 'none'; // Hide content
  errorMessage.style.display = 'none'; // Hide error message
});
