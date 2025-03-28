import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
    id: number;
    username: string;
    email: string;
    role: string;
    joinDate: string;
}

const Profile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/profile', {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        navigate('/auth');
                        return;
                    }
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const data = await response.json();
                setProfile(data);
            } catch (err) {
                setError('Impossible de charger le profil. Veuillez vérifier votre connexion au serveur.');
                console.error('Erreur:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!profile) return <div className="error">Profil non trouvé</div>;

    return (
        <div className="profile-container">
            <h1>Mon Profil</h1>
            <div className="profile-content">
                <section>
                    <h2>Informations personnelles</h2>
                    <div className="info-group">
                        <p><strong>Nom d'utilisateur:</strong> {profile.username}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Rôle:</strong> {profile.role}</p>
                        <p><strong>Membre depuis:</strong> {new Date(profile.joinDate).toLocaleDateString()}</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Profile;