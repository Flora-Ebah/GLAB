import React from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Input, Button, Upload, Typography, Card, Tag, Row, Col } from 'antd';
import { UploadOutlined, BankOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './OffreDetails.css';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const OffreDetails = () => {
  const location = useLocation();
  const { offre } = location.state;

  const onFinish = (values) => {
    console.log('Formulaire soumis:', values);
  };

  return (
    <div className="offre-details">
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={12}>
          <Card className="offre-details__info">
            <Title level={2}>{offre.titre}</Title>
            <Paragraph>
              <BankOutlined /> {offre.entreprise}
            </Paragraph>
            <Paragraph>
              <EnvironmentOutlined /> {offre.localisation}
            </Paragraph>
            <Paragraph>
              <ClockCircleOutlined /> {offre.typeContrat}
            </Paragraph>
            <Paragraph>{offre.description}</Paragraph>
            <Title level={4}>Compétences requises :</Title>
            <div>
              {offre.competences.map((competence, index) => (
                <Tag key={index} color="blue" style={{ marginBottom: '8px' }}>{competence}</Tag>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card className="offre-details__form">
            <Title level={3}>Postuler</Title>
            <Form name="postuler" onFinish={onFinish} layout="vertical">
              <Form.Item name="nom" label="Nom" rules={[{ required: true, message: 'Veuillez entrer votre nom' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="prenom" label="Prénom" rules={[{ required: true, message: 'Veuillez entrer votre prénom' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Veuillez entrer un email valide' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="telephone" label="Téléphone" rules={[{ required: true, message: 'Veuillez entrer votre numéro de téléphone' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="cv" label="CV (PDF)" rules={[{ required: true, message: 'Veuillez télécharger votre CV' }]}>
                <Upload accept=".pdf" maxCount={1}>
                  <Button icon={<UploadOutlined />}>Télécharger CV</Button>
                </Upload>
              </Form.Item>
              <Form.Item name="lettreMotivation" label="Lettre de motivation" rules={[{ required: true, message: 'Veuillez entrer votre lettre de motivation' }]}>
                <TextArea rows={6} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="offre-details__submit-button">
                  Envoyer ma candidature
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OffreDetails;
