import React, { useState } from 'react';

interface EventItem {
    id: number;
    title: string;
    date: string;
    description: string;
    type: string;
    completed: boolean;
}

const Event = () => {
    const [events, setEvents] = useState<EventItem[]>([
        {
            id: 1,
            title: "Raid hebdomadaire",
            date: "Chaque Samedi - 21h00",
            description: "Rejoignez-nous pour notre raid hebdomadaire.",
            type: "Récurrent",
            completed: false
        }
    ]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        description: '',
        type: 'Récurrent'
    });

    const addEvent = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEvent.title.trim()) return;

        setEvents([
            ...events,
            {
                id: Date.now(),
                ...newEvent,
                completed: false
            }
        ]);
        setNewEvent({ title: '', date: '', description: '', type: 'Récurrent' });
    };

    const toggleComplete = (id: number) => {
        setEvents(events.map(event =>
            event.id === id ? { ...event, completed: !event.completed } : event
        ));
    };

    const deleteEvent = (id: number) => {
        setEvents(events.filter(event => event.id !== id));
    };

    return (
        <div className="event-page">
            <h1>Événements du clan</h1>

            <form className="event-form" onSubmit={addEvent}>
                <input
                    type="text"
                    value={newEvent.title}
                    onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Titre de l'événement"
                />
                <input
                    type="text"
                    value={newEvent.date}
                    onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                    placeholder="Date et heure"
                />
                <input
                    type="text"
                    value={newEvent.description}
                    onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Description"
                />
                <select
                    value={newEvent.type}
                    onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}
                >
                    <option value="Récurrent">Récurrent</option>
                    <option value="Sur demande">Sur demande</option>
                    <option value="Unique">Unique</option>
                </select>
                <button type="submit">Ajouter</button>
            </form>

            <div className="event-list">
                {events.map(event => (
                    <div key={event.id} className={`event-item ${event.completed ? 'completed' : ''}`}>
                        <input
                            type="checkbox"
                            checked={event.completed}
                            onChange={() => toggleComplete(event.id)}
                        />
                        <div className="event-content">
                            <h3>{event.title}</h3>
                            <p className="event-date">{event.date}</p>
                            <p className="event-description">{event.description}</p>
                            <span className="event-type">{event.type}</span>
                        </div>
                        <button onClick={() => deleteEvent(event.id)} className="delete-btn">
                            Supprimer
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Event;