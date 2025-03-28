import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Member {
    id: number;
    username: string;
    role: string;
    joinDate: string;
}

const MemberList = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchMembers = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/members', {
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Erreur de chargement');
            const data = await response.json();
            setMembers(data);
        } catch (err) {
            setError('Erreur de chargement des membres');
        } finally {
            setLoading(false);
        }
    };

    const deleteMember = async (memberId: number) => {
        if (!window.confirm('Voulez-vous vraiment supprimer ce membre ?')) return;

        try {
            const response = await fetch(`http://localhost:3001/api/members/${memberId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                setMembers(members.filter(member => member.id !== memberId));
            }
        } catch (err) {
            setError('Erreur lors de la suppression');
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/auth');
            return;
        }
        fetchMembers();
    }, [user, navigate]);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="member-list">
            <h1>Liste des Membres</h1>

            {user?.role === 'admin' && (
                <button className="add-member-btn">Ajouter un membre</button>
            )}

            <div className="members-grid">
                {members.map(member => (
                    <div key={member.id} className="member-card">
                        <h3>{member.username}</h3>
                        <p>Rôle: {member.role}</p>
                        <p>Inscrit le: {new Date(member.joinDate).toLocaleDateString()}</p>

                        {user?.role === 'admin' && (
                            <div className="admin-actions">
                                <button onClick={() => deleteMember(member.id)}>
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

export default MemberList;