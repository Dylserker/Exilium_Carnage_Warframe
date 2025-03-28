import React, { useEffect, useState } from 'react';

interface Member {
    id: number;
    username: string;
    role: string;
    joinDate: string;
}

const Members = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/members', {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch members');
                }

                const data = await response.json();
                setMembers(data);
            } catch (err) {
                setError('Une erreur est survenue lors du chargement des membres');
                console.error('Error fetching members:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="members-container">
            <h1>Liste des Membres</h1>
            <div className="members-grid">
                {members.map((member) => (
                    <div key={member.id} className="member-card">
                        <h2>{member.username}</h2>
                        <p>Rôle: {member.role}</p>
                        <p>Membre depuis: {new Date(member.joinDate).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Members;