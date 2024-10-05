import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Offres.css';
import { BankOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';

const Offres = () => {
  const navigate = useNavigate();
  const [poste, setPoste] = useState('');
  const [lieu, setLieu] = useState('');
  const [offresFiltered, setOffresFiltered] = useState([]);

  const offresEmploi = [
    {
      id: 1,
      titre: "Développeur Full Stack",
      entreprise: "TechCorp",
      localisation: "Paris, France",
      typeContrat: "CDI",
      description: "Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe dynamique.",
      competences: [
        "React",
        "Node.js",
        "MongoDB",
        "AWS"
      ]
    },
    {
      id: 2,
      titre: "Designer UX/UI",
      entreprise: "DesignStudio",
      localisation: "Lyon, France",
      typeContrat: "CDD - 6 mois",
      description: "Rejoignez notre studio de design pour créer des expériences utilisateur exceptionnelles.",
      competences: [
        "Figma",
        "Adobe XD",
        "Sketch",
        "Prototypage"
      ]
    },
    {
      id: 3,
      titre: "Data Scientist",
      entreprise: "DataInsights",
      localisation: "Bordeaux, France",
      typeContrat: "CDI",
      description: "Nous cherchons un Data Scientist passionné pour analyser et interpréter des données complexes.",
      competences: [
        "Python",
        "Machine Learning",
        "SQL",
        "Visualisation de données"
      ]
    },
    {
      id: 4,
      titre: "Ingénieur DevOps",
      entreprise: "CloudTech",
      localisation: "Nantes, France",
      typeContrat: "CDI",
      description: "Nous recherchons un ingénieur DevOps expérimenté pour optimiser nos processus de développement et de déploiement.",
      competences: [
        "Docker",
        "Kubernetes",
        "Jenkins",
        "AWS/Azure"
      ]
    },
    {
      id: 5,
      titre: "Développeur Mobile",
      entreprise: "AppInnovate",
      localisation: "Toulouse, France",
      typeContrat: "CDI",
      description: "Rejoignez notre équipe pour développer des applications mobiles innovantes sur iOS et Android.",
      competences: [
        "Swift",
        "Kotlin",
        "React Native",
        "Flutter"
      ]
    },
    {
      id: 6,
      titre: "Architecte Cloud",
      entreprise: "SkyScale",
      localisation: "Lille, France",
      typeContrat: "CDI",
      description: "Nous cherchons un architecte cloud pour concevoir et mettre en œuvre des solutions évolutives et sécurisées.",
      competences: [
        "AWS",
        "Azure",
        "Google Cloud",
        "Terraform"
      ]
    },
    {
      id: 7,
      titre: "Analyste en Cybersécurité",
      entreprise: "SecureNet",
      localisation: "Marseille, France",
      typeContrat: "CDI",
      description: "Protégez nos systèmes contre les menaces en rejoignant notre équipe de cybersécurité en tant qu'analyste.",
      competences: [
        "Analyse de malware",
        "Forensics",
        "SIEM",
        "Pentesting"
      ]
    }
  ];

  useEffect(() => {
    setOffresFiltered(offresEmploi);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredOffres = offresEmploi.filter(offre => {
      const matchPoste = offre.titre.toLowerCase().includes(poste.toLowerCase()) ||
                         offre.description.toLowerCase().includes(poste.toLowerCase()) ||
                         offre.competences.some(comp => comp.toLowerCase().includes(poste.toLowerCase()));
      const matchLieu = offre.localisation.toLowerCase().includes(lieu.toLowerCase());
      
      return (poste === '' || matchPoste) && (lieu === '' || matchLieu);
    });
    setOffresFiltered(filteredOffres);
  };

  const handlePostuler = (offre) => {
    navigate(`/offre-details/${offre.id}`, { state: { offre } });
  };

  return (
    <div className="offres">
      <section className="offres__hero">
        <div className="offres__hero-content">
          <h1 className="offres__title">Trouvez votre prochain emploi</h1>
          <p className="offres__subtitle">Découvrez des opportunités passionnantes dans le domaine de la technologie</p>
          <form onSubmit={handleSearch} className="offres__search-bar">
            <input
              type="text"
              placeholder="Poste recherché"
              value={poste}
              onChange={(e) => setPoste(e.target.value)}
              className="offres__input"
            />
            <input
              type="text"
              placeholder="Lieu"
              value={lieu}
              onChange={(e) => setLieu(e.target.value)}
              className="offres__input"
            />
            <button type="submit" className="offres__button">Rechercher</button>
          </form>
        </div>
        <div className="offres__hero-background">
          <div className="offres__hero-circle offres__hero-circle--1"></div>
          <div className="offres__hero-circle offres__hero-circle--2"></div>
          <div className="offres__hero-circle offres__hero-circle--3"></div>
          {/* Ajout des bulles */}
          <div className="bubble bubble--1"></div>
          <div className="bubble bubble--2"></div>
          <div className="bubble bubble--3"></div>
          <div className="bubble bubble--4"></div>
          <div className="bubble bubble--5"></div>
        </div>
      </section>

      <div className="offres__container">
        <h2 className="offres__section-title">Offres d'emploi disponibles</h2>
        <div className="offres__grid">
          {offresFiltered.map((offre) => (
            <div key={offre.id} className="offres__card">
              <h2 className="offres__card-title">{offre.titre}</h2>
              <p className="offres__card-entreprise">
                <BankOutlined /> {offre.entreprise}
              </p>
              <p className="offres__card-localisation">
                <EnvironmentOutlined /> {offre.localisation}
              </p>
              <p className="offres__card-type-contrat">
                <ClockCircleOutlined /> {offre.typeContrat}
              </p>
              <p className="offres__card-description">{offre.description}</p>
              <h3 className="offres__card-competences-title">Compétences requises :</h3>
              <ul className="offres__card-competences-list">
                {offre.competences.map((competence, index) => (
                  <li key={index} className="offres__card-competence">{competence}</li>
                ))}
              </ul>
              <button className="offres__card-button" onClick={() => handlePostuler(offre)}>Postuler</button>
            </div>
          ))}
        </div>
        {offresFiltered.length === 0 && (
          <p className="offres__no-results">Aucune offre ne correspond à votre recherche.</p>
        )}
      </div>
    </div>
  );
};

export default Offres;
