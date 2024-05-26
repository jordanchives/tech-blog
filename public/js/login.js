const loginHandler = async (e) => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log in.');
    }
};

document.querySelector('#login-form').addEventListener('submit', loginHandler);