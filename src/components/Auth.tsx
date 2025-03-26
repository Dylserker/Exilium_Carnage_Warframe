import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

interface FormData {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<FormData>({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLogin && formData.password !== formData.confirmPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        const data = isLogin ?
            { username: formData.username, password: formData.password } :
            {
                username: formData.username,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
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
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Nom d'utilisateur"
                />
                {!isLogin && (
                    <>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Prénom"
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Nom"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                    </>
                )}
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mot de passe"
                />
                {!isLogin && (
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirmer le mot de passe"
                    />
                )}
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