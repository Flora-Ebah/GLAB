import React, { useState } from 'react';
import './Contact.css';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données du formulaire:', formData);
    setFormData({ nom: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="contact-title">Contactez-nous</h1>
        <p className="contact-subtitle">Nous sommes là pour vous aider. N'hésitez pas à nous contacter !</p>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              placeholder="Votre nom"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre@email.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Votre message ici..."
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">Envoyer</button>
        </form>
      </div>
      <div className="contact-info">
        <h2>Informations de contact</h2>
        <p><EnvironmentOutlined /> 123 Rue de l'Innovation, 75000 Paris</p>
        <p><PhoneOutlined /> +33 1 23 45 67 89</p>
        <p><MailOutlined /> info@votreentreprise.com</p>
      </div>
    </div>
  );
};

export default Contact;
