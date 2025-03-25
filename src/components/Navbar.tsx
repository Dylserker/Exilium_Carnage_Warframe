import React from 'react';
import { Link } from 'react-router-dom';
import emblemeEc from '../assets/Embleme_ec.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={emblemeEc} alt="Exilium Carnage" className="logo-image" />
            </div>
            <div className="nav-links">
                <Link to="/">Accueil</Link>
                <Link to="/event">Évènement</Link>
                <Link to="/member">Liste des membres</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/auth">Connexion</Link>
            </div>
        </nav>
    );
};

export default Navbar;