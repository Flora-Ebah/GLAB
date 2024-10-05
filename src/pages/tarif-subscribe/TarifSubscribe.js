import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TarifSubscribe.css';
import { CreditCardOutlined, AppleOutlined, GoogleOutlined, CheckCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const TarifSubscribe = () => {
  const { planType } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isLoading, setIsLoading] = useState(false);

  const planDetails = {
    Basic: { 
      price: '19.99€', 
      period: 'par mois',
      features: [
        '1 utilisateur',
        '10 projets',
        '5 Go de stockage',
        'Support par email',
        'Mises à jour gratuites',
      ]
    },
    Pro: { 
      price: '49.99€', 
      period: 'par mois',
      features: [
        '5 utilisateurs',
        'Projets illimités',
        '50 Go de stockage',
        'Support prioritaire',
        'Fonctionnalités avancées',
        'Intégrations premium',
      ]
    },
    Entreprise: { 
      price: 'Sur devis', 
      period: '',
      features: [
        'Utilisateurs illimités',
        'Projets illimités',
        'Stockage illimité',
        'Support dédié 24/7',
        'Personnalisation complète',
        'Formation sur site',
      ]
    },
  };

  useEffect(() => {
    document.body.classList.add('subscribe-page');
    return () => {
      document.body.classList.remove('subscribe-page');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Paiement traité avec succès !');
      navigate('/');
    }, 2000);
  };

  return (
    <div className="tarif-subscribe-page">
      <div className="tarif-subscribe-container">
        <div className="tarif-subscribe-plan-info">
          <button className="tarif-subscribe-back-button" onClick={() => navigate('/tarifs')}><ArrowLeftOutlined /> Retour aux tarifs</button>
          <h1>Plan {planType}</h1>
          <p className="tarif-subscribe-price">{planDetails[planType].price} <span>{planDetails[planType].period}</span></p>
          <ul className="tarif-subscribe-feature-list">
            {planDetails[planType].features.map((feature, index) => (
              <li key={index}><CheckCircleOutlined /> {feature}</li>
            ))}
          </ul>
          <div className="tarif-subscribe-plan-benefits">
            <h3>Pourquoi choisir ce plan ?</h3>
            <p>Optimisez votre productivité et atteignez vos objectifs plus rapidement avec notre plan {planType}. Profitez d'un essai gratuit de 14 jours et d'une garantie de remboursement de 30 jours.</p>
          </div>
        </div>
        <div className="tarif-subscribe-payment-form">
          <h2>Finaliser votre abonnement</h2>
          <form onSubmit={handleSubmit}>
            <div className="tarif-subscribe-form-section">
              <h3>Informations personnelles</h3>
              <input type="text" placeholder="Nom complet" required />
              <input type="email" placeholder="Adresse e-mail" required />
            </div>
            <div className="tarif-subscribe-form-section">
              <h3>Méthode de paiement</h3>
              <div className="tarif-subscribe-payment-options">
                <button type="button" className={paymentMethod === 'credit-card' ? 'active' : ''} onClick={() => setPaymentMethod('credit-card')}><CreditCardOutlined /> Carte de crédit</button>
                <button type="button" className={paymentMethod === 'paypal' ? 'active' : ''} onClick={() => setPaymentMethod('paypal')}>PayPal</button>
                <button type="button" className={paymentMethod === 'apple-pay' ? 'active' : ''} onClick={() => setPaymentMethod('apple-pay')}><AppleOutlined /> Apple Pay</button>
                <button type="button" className={paymentMethod === 'google-pay' ? 'active' : ''} onClick={() => setPaymentMethod('google-pay')}><GoogleOutlined /> Google Pay</button>
              </div>
            </div>
            {paymentMethod === 'credit-card' && (
              <div className="tarif-subscribe-form-section tarif-subscribe-card-form">
                <h3>Détails de la carte</h3>
                <input type="text" placeholder="Nom sur la carte" required />
                <input type="text" placeholder="Numéro de carte" required />
                <div className="tarif-subscribe-card-details">
                  <input type="text" placeholder="MM/AA" required />
                  <input type="text" placeholder="CVC" required />
                </div>
              </div>
            )}
            <div className="tarif-subscribe-form-section">
              <h3>Adresse de facturation</h3>
              <input type="text" placeholder="Adresse" required />
              <input type="text" placeholder="Ville" required />
              <input type="text" placeholder="Code postal" required />
              <input type="text" placeholder="Pays" required />
            </div>
            <button type="submit" className={`tarif-subscribe-submit-payment ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
              {isLoading ? 'Traitement...' : 'Payer maintenant'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TarifSubscribe;