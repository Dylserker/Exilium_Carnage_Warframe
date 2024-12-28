document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-btn');

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => modal.classList.add('hidden'));
        });
    });

    document.querySelector('.auth-buttons .signup').addEventListener('click', () => {
        document.getElementById('signup-modal').classList.remove('hidden');
    });

    document.querySelector('.auth-buttons .login').addEventListener('click', () => {
        document.getElementById('login-modal').classList.remove('hidden');
    });

    document.querySelector('.nav-links a[href="#members"]').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('members-list').classList.toggle('hidden');
    });
});