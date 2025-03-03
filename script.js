// script.js

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get input values
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('error-message');

  // Simple validation (replace with actual backend logic)
  if (username === 'admin' && password === 'password123') {
    // Successful login
    errorMessage.style.display = 'none';
    window.location.href = 'dashboard.html'; // Redirect to another page
  } else {
    // Show error message
    errorMessage.textContent = 'Invalid username or password';
    errorMessage.style.display = 'block';
  }
});
