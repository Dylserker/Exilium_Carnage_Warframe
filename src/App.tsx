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
          <footer>
            <p>&copy; 2024 Exilium Carnage. All rights reserved.</p>
          </footer>
        </main>
      </div>
  );
}

export default App;