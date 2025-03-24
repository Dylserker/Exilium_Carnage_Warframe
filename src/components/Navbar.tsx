import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">Exilium Carnage</div>
            <div className="nav-links">
                <a href="#home">Accueil</a>
                <a href="#event">Évènement</a>
                <a href="#member">Liste des membres</a>
                <a href="#contact">Contact</a>
            </div>
        </nav>
    );
};

export default Navbar;