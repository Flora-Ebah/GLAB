import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Tarif.css';

const Tarif = () => {
  const navigate = useNavigate();
  
  const tarifs = [
    {
      type: 'Basic',
      prix: '19.99€',
      periode: 'par mois',
      description: 'Idéal pour les freelances et les petites équipes',
      caracteristiques: [
        '1 utilisateur',
        '10 projets',
        '5 Go de stockage',
        'Support par email',
        'Mises à jour gratuites',
        'Accès à l\'application mobile',
      ],
      populaire: false,
    },
    {
      type: 'Pro',
      prix: '49.99€',
      periode: 'par mois',
      description: 'Parfait pour les équipes en croissance',
      caracteristiques: [
        '5 utilisateurs',
        'Projets illimités',
        '50 Go de stockage',
        'Support prioritaire',
        'Fonctionnalités avancées',
        'Intégrations premium',
        'Rapports personnalisés',
        'Collaboration en temps réel',
      ],
      populaire: true,
    },
    {
      type: 'Entreprise',
      prix: 'Sur devis',
      periode: '',
      description: 'Solution sur mesure pour les grandes entreprises',
      caracteristiques: [
        'Utilisateurs illimités',
        'Projets illimités',
        'Stockage illimité',
        'Support dédié 24/7',
        'Personnalisation complète',
        'Formation sur site',
        'API avancée',
        'Conformité et sécurité renforcées',
        'Gestion des accès granulaire',
      ],
      populaire: false,
    },
  ];

  return (
    <div className="tarif-page">
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="tarif-hero">
        <h1>Débloquez votre potentiel</h1>
        <p>Choisissez le plan parfait et propulsez votre succès vers de nouveaux sommets</p>
      </div>
      <div className="tarif-container">
        <p className="tarif-description">Choisissez le plan qui convient le mieux à vos besoins</p>
        <div className="tarif-grid">
          {tarifs.map((tarif, index) => (
            <div key={index} className={`tarif-card ${tarif.populaire ? 'populaire' : ''}`}>
              {tarif.populaire && <span className="badge-populaire">Plus populaire</span>}
              <h2>{tarif.type}</h2>
              <p className="prix">
                {tarif.prix}
                {tarif.periode && <span className="periode">{tarif.periode}</span>}
              </p>
              <p className="description">{tarif.description}</p>
              <ul>
                {tarif.caracteristiques.map((carac, idx) => (
                  <li key={idx}>{carac}</li>
                ))}
              </ul>
              <button className="btn-choisir" onClick={() => navigate(`/subscribe/${tarif.type}`)}>
                Choisir ce plan
              </button>
            </div>
          ))}
        </div>
        <div className="tarif-info">
          <h3>Tous nos plans incluent :</h3>
          <ul>
            <li>Essai gratuit de 14 jours</li>
            <li>Annulation à tout moment</li>
            <li>Assistance à la migration</li>
            <li>Mises à jour de sécurité régulières</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tarif;
