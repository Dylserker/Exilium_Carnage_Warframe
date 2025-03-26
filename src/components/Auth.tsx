import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                if (isLogin) {
                    navigate('/dashboard');
                } else {
                    setIsLogin(true);
                }
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nom d'utilisateur"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                />
                <button type="submit">
                    {isLogin ? 'Se connecter' : 'S\'inscrire'}
                </button>
                <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
                    {isLogin ?
                        'Pas de compte ? S\'inscrire' :
                        'Déjà un compte ? Se connecter'}
                </p>
            </form>
        </div>
    );
};

export default Auth;