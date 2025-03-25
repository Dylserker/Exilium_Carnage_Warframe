import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    username: string;
    password: string;
    email: string;
}

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (isLogin) {
            const user = users.find((u: User) =>
                u.username === formData.username && u.password === formData.password
            );
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                navigate('/');
            } else {
                alert('Identifiants incorrects');
            }
        } else {
            if (users.some((u: User) => u.username === formData.username)) {
                alert('Nom d\'utilisateur déjà pris');
                return;
            }
            users.push(formData);
            localStorage.setItem('users', JSON.stringify(users));
            setIsLogin(true);
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                {!isLogin && (
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                )}
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button type="submit">
                    {isLogin ? 'Se connecter' : 'S\'inscrire'}
                </button>
            </form>
            <button
                className="switch-auth"
                onClick={() => setIsLogin(!isLogin)}
            >
                {isLogin ? 'Créer un compte' : 'Déjà inscrit ?'}
            </button>
        </div>
    );
};

export default Auth;