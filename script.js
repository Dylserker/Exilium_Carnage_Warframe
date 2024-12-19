const signupBtn = document.querySelector('.signup');
const modal = document.getElementById('signup-modal');
const closeBtn = document.querySelector('.close-btn');

// Ouvrir la modale
signupBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du lien
    modal.classList.add('show');
});

// Fermer la modale
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Fermer la modale en cliquant à l'extérieur
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});