import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListeOffres from '../listeoffres/ListeOffres';
import OffrePosteDetails from '../offrePosteDetails/OffrePosteDetails';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<ListeOffres />} />
          <Route path="offrePosteDetails/:id" element={<OffrePosteDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;