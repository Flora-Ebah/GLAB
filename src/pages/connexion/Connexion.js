import React, { useState } from 'react';
import { Tabs, Form, Input, Button, Checkbox, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, BankOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Connexion.css';

const { TabPane } = Tabs;

const Connexion = () => {
  const [form] = Form.useForm();
  const [acceptePolitique, setAcceptePolitique] = useState(false);
  const navigate = useNavigate();

  const gererSoumissionConnexion = (values) => {
    console.log('Tentative de connexion avec:', values);
    message.success('Connexion réussie !');
    // Redirection vers le tableau de bord après une connexion réussie
    navigate('/dashboard');
  };

  const gererSoumissionInscription = (values) => {
    if (!acceptePolitique) {
      message.error("Veuillez accepter les politiques de confidentialité et de cookies.");
      return;
    }
    console.log("Tentative d'inscription avec:", values);
    message.success('Inscription réussie !');
  };

  return (
    <div className="connexion-page">
      <div className="connexion-container">
        <div className="connexion-form-container">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Connexion" key="1">
              <Form
                name="connexion"
                onFinish={gererSoumissionConnexion}
                initialValues={{ remember: true }}
              >
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Veuillez saisir votre email!' }]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Veuillez saisir votre mot de passe!' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Mot de passe" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Se connecter
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Inscription" key="2">
              <Form
                form={form}
                name="inscription"
                onFinish={gererSoumissionInscription}
              >
                <Form.Item
                  name="nom"
                  rules={[{ required: true, message: 'Veuillez saisir votre nom!' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Nom" />
                </Form.Item>
                <Form.Item
                  name="prenom"
                  rules={[{ required: true, message: 'Veuillez saisir votre prénom!' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Prénom" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Veuillez saisir votre email!' },
                    { type: 'email', message: 'Email invalide!' }
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Veuillez saisir votre mot de passe!' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Mot de passe" />
                </Form.Item>
                <Form.Item
                  name="entreprise"
                  rules={[{ required: true, message: 'Veuillez saisir le nom de votre entreprise!' }]}
                >
                  <Input prefix={<BankOutlined />} placeholder="Entreprise" />
                </Form.Item>
                <Form.Item>
                  <Checkbox checked={acceptePolitique} onChange={(e) => setAcceptePolitique(e.target.checked)}>
                    J'accepte les politiques de confidentialité et de cookies
                  </Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" disabled={!acceptePolitique}>
                    S'inscrire
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </div>
        <div className="connexion-image">
          <img src="/ia4.jpg" alt="Illustration de connexion" />
        </div>
      </div>
    </div>
  );
};

export default Connexion;
