document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const formTitle = document.getElementById('form-title');
    const switchFormText = document.getElementById('switchFormText');
    const switchFormLink = document.getElementById('switchFormLink');

    // Function to toggle between Login and Register forms
    function toggleForms() {
        if (loginForm.style.display === 'none') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            formTitle.textContent = 'Login';
            switchFormText.textContent = "Don't have an account?";
            switchFormLink.textContent = "Register here";
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            formTitle.textContent = 'Register';
            switchFormText.textContent = "Already have an account?";
            switchFormLink.textContent = "Login here";
        }
    }

    // Event listener for the switch form link
    switchFormLink.addEventListener('click', function(event) {
        event.preventDefault();
        toggleForms();
    });

    // Event listener for the login form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Fetch request to the backend for login
        fetch('http://localhost:5050/Login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'success.html'; // Redirect to success page
            } else {
                window.location.href = 'error.html'; // Redirect to error page
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = 'error.html'; // Redirect to error page on exception
        });
    });

    // Event listener for the registration form submission
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('register-email').value;
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        // Fetch request to the backend for registration
        fetch('http://localhost:5050/SignUp', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registration successful');
                window.location.href = 'success.html'; // Redirect to success page
            } else {
                alert('Registration failed: ' + data.message);
                window.location.href = 'error.html'; // Redirect to error page
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = 'error.html'; // Redirect to error page on exception
        });
    });
});
