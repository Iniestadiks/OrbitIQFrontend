import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Assurez-vous d'importer Link
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


function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <Link to="/"> {/* Ici, le logo est rendu cliquable et redirige vers la page d'accueil */}
            <img src="/images/OrbitIQ_transparent_v1-1-240x300.png" alt="Logo" className="app-logo" />
          </Link>
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
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;