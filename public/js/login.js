const loginHandler = async (e) => {
    e.preventDefault();
    const user = document.querySelector('#log-in-username').value;
    const password = document.querySelector('#log-in-password').value;
    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ user, password }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log in.');
    }
};

document.querySelector('#log-in').addEventListener('submit', loginHandler);