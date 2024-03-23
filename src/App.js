import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpaceExplorer from './components/SpaceExplorer';
import Articles from './components/Articles';
import ContactForm from './components/ContactForm';
import FAQ from './components/FAQ';
import CGU from './components/CGU';
import Newsletter from './components/Newsletter';
import Socials from './components/Socials';
import About from './components/About';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Register from './components/Register';
import Connexion from './components/Connexion';
import Quiz from './components/Quiz';

function App() {
  const refreshHome = () => {
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <div onClick={refreshHome} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/images/OrbitIQ_transparent_v1-1-240x300.png" alt="Logo" className="app-logo" />
            <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
              <p>OrbitIQ</p>
              <p style={{ fontSize: '16px', marginTop: '4px' }}>Découvrez l'univers à portée de main</p>
            </div>
          </div>
          <Menu />
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<SpaceExplorer />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/socials" element={<Socials />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;