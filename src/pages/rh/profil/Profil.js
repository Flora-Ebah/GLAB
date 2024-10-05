import React, { useState, useEffect } from 'react';
import { Card, Avatar, Typography, Button, Skeleton, Row, Col, Spin } from 'antd';
import { UserOutlined, MailOutlined, BriefcaseOutlined, TeamOutlined, EditOutlined } from '@ant-design/icons';
import './Profil.css';

const { Title, Text } = Typography;

const Profil = () => {
  const [utilisateur, setUtilisateur] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler une requête API pour obtenir les données de l'utilisateur
    setTimeout(() => {
      setUtilisateur({
        nom: 'Dupont',
        prenom: 'Marie',
        email: 'marie.dupont@entreprise.com',
        poste: 'Responsable RH',
        departement: 'Ressources Humaines'
      });
      setLoading(false);
    }, 2000); // Augmenté à 2 secondes pour mieux voir l'animation
  }, []);

  return (
    <div className="profil-container">
      <Spin spinning={loading} tip="Chargement du profil..." size="large">
        <Card
          actions={[
            <Button type="primary" icon={<EditOutlined />} className="edit-button">
              Modifier le profil
            </Button>
          ]}
        >
          <Skeleton loading={loading} avatar active paragraph={{ rows: 4 }}>
            {utilisateur && (
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} sm={8}>
                  <Avatar size={128} icon={<UserOutlined />} className="profile-avatar" />
                </Col>
                <Col xs={24} sm={16}>
                  <Title level={2} className="fade-in">{`${utilisateur.prenom} ${utilisateur.nom}`}</Title>
                  <div className="profil-info">
                    <p className="fade-in-delay-1">
                      <MailOutlined /> <Text strong>Email :</Text> {utilisateur.email}
                    </p>
                    <p className="fade-in-delay-2">
                      <BriefcaseOutlined /> <Text strong>Poste :</Text> {utilisateur.poste}
                    </p>
                    <p className="fade-in-delay-3">
                      <TeamOutlined /> <Text strong>Département :</Text> {utilisateur.departement}
                    </p>
                  </div>
                </Col>
              </Row>
            )}
          </Skeleton>
        </Card>
      </Spin>
    </div>
  );
};

export default Profil;
