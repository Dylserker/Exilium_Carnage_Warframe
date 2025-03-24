import React from 'react';
import Navbar from './components/Navbar';
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

          <section className="features">
            <h2>Our Services</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <h3>Service 1</h3>
                <p>Description of service 1</p>
              </div>
              <div className="feature-card">
                <h3>Service 2</h3>
                <p>Description of service 2</p>
              </div>
              <div className="feature-card">
                <h3>Service 3</h3>
                <p>Description of service 3</p>
              </div>
            </div>
          </section>

          <footer>
            <p>&copy; 2024 Exilium Carnage. All rights reserved.</p>
          </footer>
        </main>
      </div>
  );
}

export default App;