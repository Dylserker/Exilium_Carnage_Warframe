import React from 'react';

const Profile = () => {
    return (
        <div className="profile-container">
            <h2>Mon Profil</h2>
            <div className="profile-content">
                <section className="user-info">
                    <h3>Informations personnelles</h3>
                    <div className="info-group">
                        <p><strong>Nom d'utilisateur:</strong> {/* Add username from auth state */}</p>
                        <p><strong>Rôle:</strong> {/* Add user role */}</p>
                        <p><strong>Email:</strong> {/* Add user email */}</p>
                    </div>
                </section>

                <section className="user-files">
                    <h3>Mes fichiers importés</h3>
                    <div className="files-list">
                        <table>
                            <thead>
                            <tr>
                                <th>Nom du fichier</th>
                                <th>Date d'import</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* Add mapping of user's files */}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Profile;