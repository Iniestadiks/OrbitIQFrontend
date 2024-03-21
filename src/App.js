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

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <div className="content"></div>
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;