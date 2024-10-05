import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// Supprimez l'import de Carousel d'antd car nous n'en avons plus besoin
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = useMemo(() => [
    "avec l'IA et l'innovation",
    "pour plus d'efficacité",
    "et des résultats optimaux",
    "en toute simplicité"
  ], []);

  const typeText = useCallback(() => {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      setTypedText(currentPhrase.substring(0, charIndex - 1));
      setCharIndex(prevCharIndex => prevCharIndex - 1);
    } else {
      setTypedText(currentPhrase.substring(0, charIndex + 1));
      setCharIndex(prevCharIndex => prevCharIndex + 1);
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((prevPhraseIndex) => (prevPhraseIndex + 1) % phrases.length);
    }
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  useEffect(() => {
    const timer = setTimeout(typeText, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [typeText, isDeleting]);

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const [testimonialPosition, setTestimonialPosition] = useState(0);
  const testimonials = [
    {
      name: "Marie Dupont",
      company: "Tech Innovate",
      text: "L'IA d'Ivoire Job a révolutionné notre processus de recrutement. Nous avons trouvé des talents exceptionnels en un temps record !",
    },
    {
      name: "Jean Martin",
      company: "Finance Plus",
      text: "La précision de l'analyse des CV nous a permis d'identifier les meilleurs candidats dès le début. Un gain de temps incroyable !",
    },
    {
      name: "Sophie Lefebvre",
      company: "Green Solutions",
      text: "L'interface intuitive et les fonctionnalités avancées ont rendu notre recrutement beaucoup plus efficace. Merci Ivoire Job !",
    },
    {
      name: "Pierre Durand",
      company: "Marketing Pro",
      text: "Ivoire Job nous a permis de trouver des profils parfaitement adaptés à nos besoins spécifiques. Un outil indispensable !",
    },
    {
      name: "Amélie Rousseau",
      company: "StartUp Innovante",
      text: "L'utilisation de l'IA dans le processus de recrutement a considérablement amélioré notre efficacité. Merci Ivoire Job !",
    },
  ];

  // Ajoutez cette fonction pour faire défiler automatiquement les témoignages
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialPosition((prevPosition) => 
        (prevPosition - 100) % (Math.ceil(testimonials.length / 2) * -100)
      );
    }, 5000); // Change de témoignage toutes les 5 secondes

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const [activeFaq, setActiveFaq] = useState(0);

  const faqData = [
    {
      question: "Comment l'IA améliore-t-elle le processus de recrutement ?",
      answer: "L'IA optimise le recrutement en analysant rapidement de grands volumes de CV, en identifiant les meilleurs candidats selon des critères précis, et en éliminant les biais inconscients. Cela permet aux recruteurs de gagner du temps et d'améliorer la qualité des embauches."
    },
    {
      question: "Quels sont les avantages d'utiliser Ivoire Job pour le recrutement ?",
      answer: "Ivoire Job offre une plateforme intuitive alimentée par l'IA, permettant un tri rapide des candidatures, une analyse approfondie des compétences, et un suivi efficace du processus de recrutement. Cela se traduit par un gain de temps, une réduction des coûts et une amélioration de la qualité des embauches."
    },
    {
      question: "Est-ce que l'utilisation de l'IA dans le recrutement est éthique ?",
      answer: "Oui, l'utilisation de l'IA chez Ivoire Job est conçue pour être éthique. Nous veillons à ce que nos algorithmes soient transparents, équitables et respectueux de la diversité. Notre IA est un outil d'aide à la décision qui complète, mais ne remplace pas, le jugement humain dans le processus de recrutement."
    },
    {
      question: "Comment puis-je commencer à utiliser Ivoire Job pour mon entreprise ?",
      answer: "Commencer avec Ivoire Job est simple. Inscrivez-vous sur notre plateforme, choisissez le plan qui convient à vos besoins, et notre équipe vous guidera à travers le processus d'intégration. Vous pourrez rapidement commencer à publier des offres d'emploi et à utiliser nos outils d'IA pour optimiser votre recrutement."
    }
  ];

  const [currentFaqImage, setCurrentFaqImage] = useState(0);
  const faqImages = [
    "/faq-image1.jpeg",
    "/faq-image2.jpeg",
    "/faq-image3.jpeg",
    "/faq-image4.png"
  ];

  // Ajoutez cet effet pour faire défiler automatiquement les images FAQ
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFaqImage((prevImage) => (prevImage + 1) % faqImages.length);
    }, 5000); // Change d'image toutes les 5 secondes

    return () => clearInterval(interval);
  }, [faqImages.length]);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
    // Supprimez cette ligne car nous n'avons plus besoin de changer l'image lors du clic
    // setCurrentFaqImage(index);
  };

  const handleRedirectToLogin = () => {
    navigate('/connexion');
  };

  return (
    <div className="landing-page">
      <section className="hero">
          <div className="text-content">
            <h2>
              <span className="static-text">Optimisez votre recrutement</span>
              <span className="highlight-text">
                {typedText}
                <span className="cursor"></span>
              </span>
            </h2>
            <p>Accédez à une plateforme intelligente qui vous aide à trouver les meilleurs talents en un temps record et éfficacité</p>
            <button className="cta-button" onClick={handleRedirectToLogin}>Démarrer maintenant</button>
          </div>
          <div className="landing-bubbles-container">
            <div className="landing-bubble landing-bubble-1"><span>IA</span></div>
            <div className="landing-bubble landing-bubble-2"><span>Efficacité</span></div>
            <div className="landing-bubble landing-bubble-3"><span>Innovation</span></div>
            <div className="landing-bubble landing-bubble-4"><span>Talents</span></div>
          </div>
      </section>

      <section className="video-text-section">
        <div className="video-container">
          <video 
            ref={videoRef} 
            onClick={toggleVideo}
            onEnded={() => setIsPlaying(false)}
          >
            <source src="/video1.mp4" type="video/mp4" />
            Votre navigateur ne prend pas en charge la lecture de vidéos.
          </video>
          {!isPlaying && (
            <div className="video-play-button" onClick={toggleVideo}></div>
          )}
        </div>
        <div className="text-content">
          <h2>
            Fonctionnalités innovantes 
            <span className="highlight-text">qui transforment tout</span>
          </h2>
          <p>Analysez rapidement les candidatures avec notre IA avancée, identifiez les meilleurs profils en quelques secondes et choisissez le plan adapté à vos besoins.</p>
          <ul>
            <li>Filtrage des candidatures basé sur l'IA</li>
            <li>Analyse automatique des CV</li>
            <li>Suivi des candidatures en temps réel</li>
            <li>Options d'abonnement flexibles</li>
          </ul>
          <button className="learn-more-button">En savoir plus</button>
        </div>
      </section>

      {/* Nouvelle section "Pourquoi choisir l'IA pour votre recrutement ?" */}
      <section className="why-ai-section">
        <h2>Pourquoi choisir l'IA pour votre recrutement ?</h2>
        <div className="card-container">
          <div className="card">
            <div className="card-header">
              <span className="card-icon large-icon">⏱️</span>
              <h3><span>Gain</span> de temps inestimable</h3>
            </div>
            <p>Réduisez considérablement le temps passé à trier les CV et à gérer les candidatures.</p>
          </div>
          <div className="card">
            <div className="card-header">
              <span className="card-icon large-icon">🎯</span>
              <h3><span>Précision</span> et objectivité</h3>
            </div>
            <p>Éliminez les biais inconscients dans le processus de sélection pour une évaluation plus juste.</p>
          </div>
          <div className="card">
            <div className="card-header">
              <span className="card-icon large-icon">💰</span>
              <h3><span>Réduction</span> des coûts</h3>
            </div>
            <p>Optimisez vos ressources et améliorez votre ROI grâce à un processus de recrutement plus efficace.</p>
          </div>
        </div>
      </section>

      {/* Nouvelle section de témoignages */}
      <section className="testimonials-section">
        <h2>Ce que disent nos clients</h2>
        <div className="testimonial-carousel-container">
          <div 
            className="testimonial-carousel" 
            style={{ transform: `translateX(${testimonialPosition}%)` }}
          >
            {Array(Math.ceil(testimonials.length / 2)).fill().map((_, i) => (
              <div 
                key={i} 
                className={`testimonial-pair ${i === Math.abs(testimonialPosition / 100) % Math.ceil(testimonials.length / 2) ? 'active' : ''}`}
              >
                {testimonials.slice(i * 2, i * 2 + 2).map((testimonial, index) => (
                  <div key={index} className="testimonial">
                    <p className="testimonial-text">"{testimonial.text}"</p>
                    <p className="testimonial-author">{testimonial.name}</p>
                    <p className="testimonial-company">{testimonial.company}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-indicators">
          {Array(Math.ceil(testimonials.length / 2)).fill().map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === Math.abs(testimonialPosition / 100) % Math.ceil(testimonials.length / 2) ? 'active' : ''}`}
              onClick={() => setTestimonialPosition(-index * 100)}
            ></span>
          ))}
        </div>
      </section>

      {/* Nouvelle section pour les offres d'emploi */}
      <section className="job-offers-section">
        <div className="job-offers-content">
          <div className="job-offers-text">
            <h2>Trouvez l'emploi de vos rêves</h2>
            <p>Explorez des milliers d'opportunités professionnelles adaptées à vos compétences et à vos aspirations.</p>
            <button className="explore-jobs-button">Explorer les offres</button>
          </div>
          <div className="job-categories">
            <div className="job-category">
              <h3>Technologie</h3>
              <ul>
                <li>Développeur Full Stack</li>
                <li>Ingénieur en IA</li>
                <li>Analyste en cybersécurité</li>
              </ul>
            </div>
            <div className="job-category">
              <h3>Marketing</h3>
              <ul>
                <li>Responsable marketing digital</li>
                <li>Spécialiste SEO</li>
                <li>Chef de produit</li>
              </ul>
            </div>
            <div className="job-category">
              <h3>Finance</h3>
              <ul>
                <li>Analyste financier</li>
                <li>Comptable senior</li>
                <li>Gestionnaire de portefeuille</li>
              </ul>
            </div>
            <div className="job-category">
              <h3>Ressources Humaines</h3>
              <ul>
                <li>Responsable RH</li>
                <li>Chargé de recrutement</li>
                <li>Gestionnaire de paie</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nouvelle section FAQ */}
      <section className="faq-section">
        <div className="faq-content">
          <h2>Foire aux questions</h2>
          <div className="faq-container">
            {faqData.map((faq, index) => (
              <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  {faq.question}
                  <span className="faq-toggle">{activeFaq === index ? '-' : '+'}</span>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="faq-image-slider">
          {faqImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`FAQ illustration ${index + 1}`}
              className={`faq-image ${index === currentFaqImage ? 'active' : ''}`}
            />
          ))}
        </div>
      </section>

      {/* Nouvelle section d'abonnement */}
      <section className="subscription-section">
        <div className="subscription-content">
          <h2>Abonnez-vous aujourd'hui et <span>commencez à créer</span></h2>
          <p>Arrêtez de perdre du temps sur les processus manuels, adoptez une solution automatisée</p>
          <button className="start-now-button" onClick={handleRedirectToLogin}>Commencer maintenant</button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;