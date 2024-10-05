import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import LandingPage from './pages/landingPage/LandingPage';
import Offres from './pages/offre/Offres';
import OffreDetails from './pages/offreDetails/OffreDetails';
import Tarif from './pages/tarif/Tarif';
import TarifSubscribe from './pages/tarif-subscribe/TarifSubscribe';
import Contact from './pages/contact/Contact';
import Connexion from './pages/connexion/Connexion';
import Dashboard from './pages/rh/dashoard/Dashboard';
import ListeOffres from './pages/rh/listeoffres/ListeOffres';
import OffrePosteDetails from './pages/rh/offrePosteDetails/OffrePosteDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route
          path="*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/offres" element={<Offres />} />
                <Route path="/offre-details/:id" element={<OffreDetails />} />
                <Route path="/tarifs" element={<Tarif />} />
                <Route path="/subscribe/:planType" element={<TarifSubscribe />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/rh/listeoffres" element={<ListeOffres />} />
                <Route path="/rh/offrePosteDetails/:id" element={<OffrePosteDetails />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
