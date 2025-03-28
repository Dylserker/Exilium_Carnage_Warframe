import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './MemberList.css';

interface Member {
    id: number;
    username: string;
    role: string;
    joinDate: string;
    game: string;
    discordId: string;
}

const membersList: Member[] = [
    {
        id: 1,
        username: "Dylserker",
        role: "admin",
        joinDate: "2024-01-01",
        game: "Warframe",
        discordId: "Dylserker#9772"
    },
    {
        id: 2,
        username: "Cluz1312",
        role: "admin",
        joinDate: "2024-01-02",
        game: "Warframe",
        discordId: "Cluz1312#2640"
    }
];

const Members = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/auth');
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    return (
        <div className="member-list-container">
            <h1 className="member-list-title">Liste des Membres</h1>

            {user?.role === 'admin' && (
                <button className="add-member-btn">Ajouter un membre</button>
            )}

            <div className="members-grid">
                {membersList.map(member => (
                    <div key={member.id} className="member-card">
                        <h3 className="member-name">{member.username}</h3>
                        <div className="member-info">
                            <p><strong>Rôle:</strong> {member.role}</p>
                            <p><strong>Jeu:</strong> {member.game}</p>
                            <p><strong>Discord:</strong> {member.discordId}</p>
                            <p><strong>Inscrit le:</strong> {new Date(member.joinDate).toLocaleDateString()}</p>
                        </div>
                        {user?.role === 'admin' && (
                            <div className="admin-actions">
                                <button className="delete-btn" onClick={() => window.confirm('Cette fonction est désactivée')}>
                                    Supprimer
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Members;