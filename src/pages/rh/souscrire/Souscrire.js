import React from 'react';
import { Card, Button, Typography, Space, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './Souscrire.css';

const { Title, Paragraph, Text } = Typography;

const Souscrire = () => {
  const abonnements = [
    { 
      nom: "Basique", 
      prix: "29,99€/mois",
      description: "Idéal pour les petites entreprises ou les startups",
      fonctionnalites: [
        { nom: "Accès à l'IA pour la rédaction d'offres", limite: "10 offres/mois" },
        { nom: "Nombre d'utilisateurs", limite: "1" },
        { nom: "Support par email", limite: "Sous 48h" },
        { nom: "Tableau de bord basique", limite: "Inclus" },
        { nom: "Analyses des candidatures", limite: "Basique" },
        { nom: "Intégration calendrier", limite: "Non inclus" },
        { nom: "API access", limite: "Non inclus" }
      ],
      couleur: "#1890ff"
    },
    { 
      nom: "Pro", 
      prix: "59,99€/mois",
      description: "Pour les entreprises en croissance avec des besoins plus importants",
      fonctionnalites: [
        { nom: "Accès à l'IA pour la rédaction d'offres", limite: "Illimité" },
        { nom: "Nombre d'utilisateurs", limite: "5" },
        { nom: "Support prioritaire", limite: "Sous 24h" },
        { nom: "Tableau de bord avancé", limite: "Inclus" },
        { nom: "Analyses des candidatures", limite: "Avancé" },
        { nom: "Intégration calendrier", limite: "Inclus" },
        { nom: "API access", limite: "Basique" }
      ],
      couleur: "#52c41a"
    },
    { 
      nom: "Entreprise", 
      prix: "Sur devis",
      description: "Solution sur mesure pour les grandes entreprises",
      fonctionnalites: [
        { nom: "Accès à l'IA pour la rédaction d'offres", limite: "Illimité" },
        { nom: "Nombre d'utilisateurs", limite: "Illimité" },
        { nom: "Gestionnaire de compte dédié", limite: "Inclus" },
        { nom: "Tableau de bord personnalisé", limite: "Inclus" },
        { nom: "Analyses des candidatures", limite: "Personnalisé" },
        { nom: "Intégration calendrier", limite: "Inclus" },
        { nom: "API access", limite: "Complet" }
      ],
      couleur: "#722ed1"
    }
  ];

  return (
    <div className="souscrire-container">
      <Title level={2}>Choisissez votre abonnement</Title>
      <Paragraph>
        Découvrez nos offres pour utiliser notre plateforme de publication d'offres d'emploi gérée par l'IA
      </Paragraph>
      
      <Space size={[16, 16]} wrap className="abonnements-grid">
        {abonnements.map((abo, index) => (
          <Card 
            key={index} 
            className="abonnement-card" 
            hoverable 
            headStyle={{ backgroundColor: abo.couleur, color: 'white' }}
            title={<Title level={3} style={{ color: 'white', margin: 0 }}>{abo.nom}</Title>}
          >
            <Text className="prix" strong>{abo.prix}</Text>
            <Paragraph type="secondary">{abo.description}</Paragraph>
            <ul>
              {abo.fonctionnalites.map((fonc, idx) => (
                <li key={idx}>
                  {fonc.limite !== "Non inclus" ? (
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: '#f5222d', marginRight: '8px' }} />
                  )}
                  {fonc.nom}
                  <Tag color={fonc.limite === "Non inclus" ? "red" : "green"} style={{ marginLeft: '8px' }}>
                    {fonc.limite}
                  </Tag>
                </li>
              ))}
            </ul>
            <Button type="primary" size="large" className="souscrire-btn" style={{ backgroundColor: abo.couleur, borderColor: abo.couleur }}>
              Souscrire
            </Button>
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default Souscrire;
