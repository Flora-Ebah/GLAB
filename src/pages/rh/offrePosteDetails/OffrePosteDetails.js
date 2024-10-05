import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Tag, List, Typography, Row, Col, Statistic, Modal, Button, Alert } from 'antd';
import { UserOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import './OffrePosteDetails.css';

const { Title, Paragraph } = Typography;

const OffrePosteDetails = () => {
  const { id } = useParams();
  const [offre, setOffre] = useState(null);
  const [statistiques, setStatistiques] = useState(null);
  const [candidats, setCandidats] = useState(null);
  const [selectedCandidat, setSelectedCandidat] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Simuler un appel API pour récupérer les données
    const offreSimulee = {
      id: id,
      titre: 'Développeur Full Stack',
      departement: 'IT',
      datePublication: '2023-04-01',
      statut: 'Active',
      description: 'Nous recherchons un développeur Full Stack expérimenté...',
      competences: ['React', 'Node.js', 'MongoDB'],
      salaire: '45000 - 60000 €',
      typeContrat: 'CDI',
    };
    setOffre(offreSimulee);

    const statistiquesSimulees = {
      totalCandidats: 50,
      candidatsRecommandes: 10,
      candidatsEnAttente: 25,
      candidatsRejetes: 15,
    };
    setStatistiques(statistiquesSimulees);

    // Ajoutez des informations détaillées pour chaque candidat, y compris les raisons de l'IA
    const candidatsDetaillesSimules = {
      recommandes: [
        { 
          nom: 'Alice Dupont', 
          email: 'alice.dupont@email.com', 
          telephone: '0123456789', 
          cv: 'URL_du_CV_Alice', 
          lettreMotivation: 'Contenu de la lettre de motivation d\'Alice...', 
          raisonIA: 'Excellente correspondance des compétences techniques. Expérience pertinente dans des projets similaires.'
        },
        // ... (autres candidats recommandés)
      ],
      enAttente: [
        { 
          nom: 'David Lefebvre', 
          email: 'david.lefebvre@email.com', 
          telephone: '0345678912', 
          cv: 'URL_du_CV_David', 
          lettreMotivation: 'Contenu de la lettre de motivation de David...', 
          raisonIA: 'Compétences techniques correspondantes, mais manque d\'expérience dans certains domaines clés. Potentiel d\'évolution.'
        },
        // ... (autres candidats en attente)
      ],
      rejetes: [
        { 
          nom: 'Gabriel Petit', 
          email: 'gabriel.petit@email.com', 
          telephone: '0678912345', 
          cv: 'URL_du_CV_Gabriel', 
          lettreMotivation: 'Contenu de la lettre de motivation de Gabriel...', 
          raisonIA: 'Manque de compétences techniques essentielles requises pour le poste. Expérience non alignée avec les besoins du projet.'
        },
        // ... (autres candidats rejetés)
      ],
    };
    setCandidats(candidatsDetaillesSimules);
  }, [id]);

  const showModal = (candidat) => {
    setSelectedCandidat(candidat);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (!offre || !statistiques || !candidats) {
    return <div>Chargement...</div>;
  }

  const renderCandidatsList = (candidats, titre, className) => (
    <Col span={8}>
      <Card type="inner" title={titre} className={`candidats-card ${className}`}>
        <List
          dataSource={candidats}
          renderItem={item => (
            <List.Item>
              <Button type="link" onClick={() => showModal(item)}>{item.nom}</Button>
            </List.Item>
          )}
        />
      </Card>
    </Col>
  );

  return (
    <div className="offre-poste-details">
      <Card 
        title={<Title level={2}>{offre.titre}</Title>} 
        extra={<Tag color={offre.statut === 'Active' ? 'green' : 'red'} className="statut-tag">{offre.statut}</Tag>}
        className="main-card"
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card type="inner" title="Détails de l'offre" className="details-card">
              <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                <Descriptions.Item label="Département">{offre.departement}</Descriptions.Item>
                <Descriptions.Item label="Date de publication">{offre.datePublication}</Descriptions.Item>
                <Descriptions.Item label="Type de contrat">{offre.typeContrat}</Descriptions.Item>
                <Descriptions.Item label="Salaire">{offre.salaire}</Descriptions.Item>
                <Descriptions.Item label="Description" span={3}>
                  {offre.description}
                </Descriptions.Item>
                <Descriptions.Item label="Compétences requises" span={3}>
                  {offre.competences.map(comp => <Tag key={comp} className="competence-tag">{comp}</Tag>)}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          
          <Col span={24}>
            <Title level={4}>Statistiques des candidatures</Title>
            <Row gutter={16}>
              <Col span={6}>
                <Statistic title="Total candidats" value={statistiques.totalCandidats} prefix={<UserOutlined />} />
              </Col>
              <Col span={6}>
                <Statistic title="Recommandés" value={statistiques.candidatsRecommandes} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#3f8600' }} />
              </Col>
              <Col span={6}>
                <Statistic title="En attente" value={statistiques.candidatsEnAttente} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#faad14' }} />
              </Col>
              <Col span={6}>
                <Statistic title="Rejetés" value={statistiques.candidatsRejetes} prefix={<CloseCircleOutlined />} valueStyle={{ color: '#cf1322' }} />
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <Title level={4}>Listes des candidats</Title>
            <Row gutter={16}>
              {renderCandidatsList(candidats.recommandes, "Recommandés par l'IA", "recommandes")}
              {renderCandidatsList(candidats.enAttente, "En attente", "en-attente")}
              {renderCandidatsList(candidats.rejetes, "Rejetés par l'IA", "rejetes")}
            </Row>
          </Col>
        </Row>
      </Card>

      <Modal
        title={selectedCandidat ? `Détails du candidat : ${selectedCandidat.nom}` : 'Détails du candidat'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
      >
        {selectedCandidat && (
          <div>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Nom">{selectedCandidat.nom}</Descriptions.Item>
              <Descriptions.Item label="Email"><MailOutlined /> {selectedCandidat.email}</Descriptions.Item>
              <Descriptions.Item label="Téléphone"><PhoneOutlined /> {selectedCandidat.telephone}</Descriptions.Item>
              <Descriptions.Item label="CV">
                <a href={selectedCandidat.cv} target="_blank" rel="noopener noreferrer">Voir le CV</a>
              </Descriptions.Item>
            </Descriptions>
            <Title level={5} style={{ marginTop: '20px' }}>Lettre de motivation</Title>
            <Paragraph>{selectedCandidat.lettreMotivation}</Paragraph>
            <Title level={5} style={{ marginTop: '20px' }}>Analyse de l'IA</Title>
            <Alert
              message={
                candidats.recommandes.includes(selectedCandidat) ? "Recommandé" :
                candidats.enAttente.includes(selectedCandidat) ? "En attente" :
                "Rejeté"
              }
              description={selectedCandidat.raisonIA}
              type={
                candidats.recommandes.includes(selectedCandidat) ? "success" :
                candidats.enAttente.includes(selectedCandidat) ? "warning" :
                "error"
              }
              showIcon
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OffrePosteDetails;