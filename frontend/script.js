document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const deleteAccountForm = document.getElementById('deleteAccountForm');

    function showForm(formToShow) {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        forgotPasswordForm.style.display = 'none';
        deleteAccountForm.style.display = 'none';

        formToShow.style.display = 'block';
    }

    // Show login form on page load
    showForm(loginForm);

    document.getElementById('toRegister').addEventListener('click', function(event) {
        event.preventDefault();
        showForm(registerForm);
    });

    document.getElementById('toLogin').addEventListener('click', function(event) {
        event.preventDefault();
        showForm(loginForm);
    });

    document.getElementById('toForgotPassword').addEventListener('click', function(event) {
        event.preventDefault();
        showForm(forgotPasswordForm);
    });

    document.getElementById('backToLogin').addEventListener('click', function(event) {
        event.preventDefault();
        showForm(loginForm);
    });

    document.getElementById('toDeleteAccount').addEventListener('click', function(event) {
        event.preventDefault();
        showForm(deleteAccountForm);
    });

    document.getElementById('backToLoginFromDelete').addEventListener('click', function(event) {
        event.preventDefault();
        showForm(loginForm);
    });

    // Handle login form submission
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        fetch('http://localhost:5050/Login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Login successful');
                // Redirect or handle successful login here
            } else {
                alert('Login failed: ' + data.message);
            }
        })
        .catch(() => {
            alert('Login failed. Please try again.');
        });
    });

    // Handle registration form submission
    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        fetch('http://localhost:5050/SignUp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registration successful');
                showForm(loginForm);
            } else {
                alert('Registration failed: ' + data.message);
            }
        })
        .catch(() => {
            alert('Registration failed. Please try again.');
        });
    });

    // Handle forgot password form submission
    document.getElementById('forgot-password-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('forgot-username').value;
        const email = document.getElementById('forgot-email').value;

        fetch('http://localhost:5050/ForgotPassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Password reset email sent');
                showForm(loginForm);
            } else {
                alert('Password reset failed: ' + data.message);
            }
        })
        .catch(() => {
            alert('Password reset failed. Please try again.');
        });
    });

    // Handle delete account form submission
    document.getElementById('delete-account-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('delete-username').value;
        const password = document.getElementById('delete-password').value;

        fetch('http://localhost:5050/DeleteAccount', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Account deleted successfully');
                showForm(loginForm);
            } else {
                alert('Account deletion failed: ' + data.message);
            }
        })
        .catch(() => {
            alert('Account deletion failed. Please try again.');
        });
    });
});
