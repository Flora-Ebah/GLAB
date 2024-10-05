import React from 'react';
import './Footer.css';
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-title">À propos</h3>
            <ul className="footer-list">
              <li><a href="/" className="footer-link">Notre histoire</a></li>
              <li><a href="/" className="footer-link">Équipe</a></li>
              <li><a href="/" className="footer-link">Carrières</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Solutions RH</h3>
            <ul className="footer-list">
              <li><a href="/" className="footer-link">Pour les entreprises</a></li>
              <li><a href="/" className="footer-link">Pour les candidats</a></li>
              <li><a href="/" className="footer-link">Intégration IA</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Ressources</h3>
            <ul className="footer-list">
              <li><a href="/" className="footer-link">Blog</a></li>
              <li><a href="/" className="footer-link">FAQ</a></li>
              <li><a href="/" className="footer-link">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Suivez-nous</h3>
            <div className="footer-socials">
              <a href="/" aria-label="Facebook"><FacebookOutlined /></a>
              <a href="/" aria-label="Twitter"><TwitterOutlined /></a>
              <a href="/" aria-label="LinkedIn"><LinkedinOutlined /></a>
              <a href="/" aria-label="Instagram"><InstagramOutlined /></a>
            </div>
          </div>
        </div>

        <div className="footer-subscribe">
          <form className="footer-form">
            <h3 className="footer-title">Abonnez-vous à notre newsletter</h3>
            <div className="footer-input-group">
              <input type="email" placeholder="Votre adresse e-mail" className="footer-input" />
              <button type="submit" className="footer-button">S'abonner</button>
            </div>
          </form>
        </div>

        <div className="footer-bottom">
          <p>© 2024 Ivoire Job. Tous droits réservés.</p>
          <div className="footer-bottom-links">
            <a href="/" className="footer-link">Politique de confidentialité</a>
            {' | '}
            <a href="/" className="footer-link">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
