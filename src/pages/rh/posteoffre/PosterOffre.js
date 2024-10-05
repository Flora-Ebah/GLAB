import React, { useState } from 'react';
import { Form, Input, Select, Button, Typography, Steps } from 'antd';
import { SendOutlined, UserOutlined, FileTextOutlined, EnvironmentOutlined } from '@ant-design/icons';
import './PosterOffre.css';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;

const PosterOffre = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const handleSubmit = (values) => {
    console.log('Offre soumise :', values);
    // Ici, vous ajouteriez la logique pour envoyer l'offre à votre backend
    form.resetFields();
    setCurrentStep(0);
  };

  const steps = [
    {
      title: 'Informations de base',
      icon: <UserOutlined />,
      content: (
        <>
          <Form.Item
            name="titre"
            label="Titre du poste"
            rules={[{ required: true, message: 'Veuillez saisir le titre du poste' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="typeContrat"
            label="Type de contrat"
            rules={[{ required: true, message: 'Veuillez sélectionner un type de contrat' }]}
          >
            <Select placeholder="Sélectionnez un type de contrat">
              <Option value="CDI">CDI</Option>
              <Option value="CDD">CDD</Option>
              <Option value="Intérim">Intérim</Option>
              <Option value="Stage">Stage</Option>
              <Option value="Alternance">Alternance</Option>
            </Select>
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Description du poste',
      icon: <FileTextOutlined />,
      content: (
        <>
          <Form.Item
            name="description"
            label="Description du poste"
            rules={[{ required: true, message: 'Veuillez saisir la description du poste' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="competences"
            label="Compétences requises"
            rules={[{ required: true, message: 'Veuillez saisir les compétences requises' }]}
          >
            <Input />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Détails supplémentaires',
      icon: <EnvironmentOutlined />,
      content: (
        <>
          <Form.Item
            name="salaire"
            label="Salaire proposé"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="localisation"
            label="Localisation"
            rules={[{ required: true, message: 'Veuillez saisir la localisation' }]}
          >
            <Input />
          </Form.Item>
        </>
      ),
    },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="poster-offre">
      <Title level={2}>Poster une nouvelle offre d'emploi</Title>
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} icon={item.icon} />
        ))}
      </Steps>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <div className="steps-content">{steps[currentStep].content}</div>
        <div className="steps-action">
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Suivant
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
              Publier l'offre
            </Button>
          )}
          {currentStep > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Précédent
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default PosterOffre;
