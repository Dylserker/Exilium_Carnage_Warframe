import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
    setIsLoggedIn: (value: boolean) => void;
    setUsername: (value: string) => void;
}

const Auth = ({ setIsLoggedIn, setUsername }: AuthProps) => {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login
        setIsLoggedIn(true);
        setUsername(loginData.username);
        navigate('/profile');
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Auth;