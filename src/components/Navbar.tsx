import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import emblemeEc from '../assets/Embleme_ec.png';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user } = useContext(AuthContext);

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
                {user ? (
                    <Link to="/profile">{user.username}</Link>
                ) : (
                    <Link to="/auth">Connexion / Inscription</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;