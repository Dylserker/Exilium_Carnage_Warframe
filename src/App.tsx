import React from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import './App.css';

function App() {
  return (
      <div className="App">
        <Navbar />
        <main>
          <section className="hero">
            <h1>Bienvenue sur Exilium Carnage</h1>
            <p>Si vous avez un esprit de famille et de coopération <br />
              avec un soupçon de d'humours on vous accueil à bras ouvert</p>
          </section>
          <section className="cards-container">
                <Card
                    title="Dylserker"
                    description="Meneur du clan"
                    imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23808080'/%3E%3C/svg%3E"
                />
                <Card
                    title="Cluz13"
                    description="Bras droit"
                    imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23808080'/%3E%3C/svg%3E"
                />
          </section>
          <footer>
            <p>&copy; 2024 Exilium Carnage. All rights reserved.</p>
          </footer>
        </main>
      </div>
  );
}

export default App;