import React from 'react';

interface ProfileProps {
    username: string | null;
}

const Profile = ({ username }: ProfileProps) => {
    return (
        <div className="profile-container">
            <h2>Mon Profil</h2>
            <div className="profile-content">
                <section className="user-info">
                    <h3>Informations personnelles</h3>
                    <div className="info-group">
                        <p><strong>Nom d'utilisateur:</strong> {username}</p>
                        <p><strong>Rôle:</strong> Membre</p>
                        <p><strong>Email:</strong> {/* email will be added later */}</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Profile;