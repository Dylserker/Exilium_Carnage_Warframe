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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
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
        setError(null);
    };

    const validateForm = () => {
        if (!formData.username || !formData.password) {
            setError('Veuillez remplir tous les champs obligatoires');
            return false;
        }

        if (!isLogin) {
            if (!formData.email || !formData.firstName || !formData.lastName) {
                setError('Veuillez remplir tous les champs obligatoires');
                return false;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Les mots de passe ne correspondent pas');
                return false;
            }
            if (formData.password.length < 6) {
                setError('Le mot de passe doit contenir au moins 6 caractères');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) return;

        setIsLoading(true);
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
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (isLogin) {
                localStorage.setItem('user', JSON.stringify({ username: formData.username }));
                navigate('/dashboard');
            } else {
                setIsLogin(true);
                alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
            }
        } catch (error) {
            setError('Une erreur est survenue lors de la connexion');
            console.error('Erreur:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>

                {error && <div className="error-message">{error}</div>}

                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Nom d'utilisateur"
                    required
                />

                {!isLogin && (
                    <>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Prénom"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Nom"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                    </>
                )}

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mot de passe"
                    required
                />

                {!isLogin && (
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirmer le mot de passe"
                        required
                    />
                )}

                <button type="submit" disabled={isLoading}>
                    {isLoading
                        ? 'Chargement...'
                        : (isLogin ? 'Se connecter' : 'S\'inscrire')
                    }
                </button>

                <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
                    {isLogin
                        ? 'Pas de compte ? S\'inscrire'
                        : 'Déjà un compte ? Se connecter'
                    }
                </p>
            </form>
        </div>
    );
};

export default Auth;