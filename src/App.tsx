import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Card from './components/Card';
import Footer from './components/Footer';
import Event from './components/Event';
import Auth from './components/Auth';
import Members from './components/Members';
import Profile from './components/Profile';
import { AuthProvider } from './context/AuthContext';
import operatorImage from './assets/Operator.jpg';
import './App.css';

const Home = () => (
    <>
        <section className="hero">
            <h1>Bienvenue sur Exilium Carnage</h1>
            <p>Si vous avez un esprit de famille et de coopération <br />
                avec un soupçon de d'humours on vous accueil à bras ouvert</p>
        </section>
        <section className="cards-container">
            <Card
                title="Dylserker"
                description="Meneur du clan"
                imageUrl={operatorImage}
            />
            <Card
                title="Cluz13"
                description="Bras droit du clan"
                imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23808080'/%3E%3C/svg%3E"
            />
        </section>
    </>
);

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Navbar />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/event" element={<Event />} />
                            <Route path="/member" element={<Members />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;