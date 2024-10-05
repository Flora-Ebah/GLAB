import React, { useState } from 'react';
import { Form, Input, Select, Button, Typography, Steps, List, Checkbox, Spin, DatePicker } from 'antd';
import { SendOutlined, UserOutlined, FileTextOutlined, EnvironmentOutlined, RobotOutlined } from '@ant-design/icons';
import './PosterOffre.css';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;

const PosterOffre = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [iaCriteres, setIaCriteres] = useState([]);
  const [customCriteres, setCustomCriteres] = useState([]);
  const [newCritere, setNewCritere] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values) => {
    console.log('Offre soumise :', values);
    // Ici, vous ajouteriez la logique pour envoyer l'offre à votre backend
    form.resetFields();
    setCurrentStep(0);
  };

  const genererCriteresIA = () => {
    setIsLoading(true);
    // Simuler un appel API avec un délai
    setTimeout(() => {
      const criteresGeneres = [
        "Expérience en développement web",
        "Maîtrise de React",
        "Connaissance en bases de données SQL",
        "Capacité à travailler en équipe"
      ];
      setIaCriteres(criteresGeneres);
      setIsLoading(false);
    }, 2000); // Délai de 2 secondes pour simuler le chargement
  };

  const ajouterCritere = () => {
    if (newCritere.trim() !== '') {
      setCustomCriteres([...customCriteres, newCritere.trim()]);
      setNewCritere('');
    }
  };

  const steps = [
    {
      title: 'Informations de base',
      icon: <UserOutlined />,
      content: (
        <>
          <Title level={4}>Informations de base</Title>
          <hr className="step-divider" />
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

          <Form.Item
            name="dateCloture"
            label="Date de clôture des candidatures"
            rules={[{ required: true, message: 'Veuillez sélectionner une date de clôture' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Description du poste',
      icon: <FileTextOutlined />,
      content: (
        <>
          <Title level={4}>Description du poste</Title>
          <hr className="step-divider" />
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
          <Title level={4}>Détails supplémentaires</Title>
          <hr className="step-divider" />
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
    {
      title: 'Critères de sélection',
      icon: <RobotOutlined />,
      content: (
        <>
          <Title level={4}>Critères de sélection</Title>
          <hr className="step-divider" />
          <Button onClick={genererCriteresIA} style={{ marginBottom: 16 }} disabled={isLoading}>
            {isLoading ? 'Génération en cours...' : 'Générer les critères avec l\'IA'}
          </Button>
          {isLoading ? (
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <Spin size="large" />
              <p>Génération des critères en cours...</p>
            </div>
          ) : (
            <List
              header={<div>Critères générés par l'IA</div>}
              bordered
              dataSource={iaCriteres}
              renderItem={(item) => (
                <List.Item>
                  <Checkbox>{item}</Checkbox>
                </List.Item>
              )}
            />
          )}
          <div style={{ marginTop: 16 }}>
            <Input
              value={newCritere}
              onChange={(e) => setNewCritere(e.target.value)}
              placeholder="Ajouter un critère personnalisé"
              style={{ width: 'calc(100% - 100px)' }}
            />
            <Button onClick={ajouterCritere} style={{ marginLeft: 8 }}>
              Ajouter
            </Button>
          </div>
          <List
            header={<div>Critères personnalisés</div>}
            bordered
            dataSource={customCriteres}
            renderItem={(item) => (
              <List.Item>
                <Checkbox>{item}</Checkbox>
              </List.Item>
            )}
            style={{ marginTop: 16 }}
          />
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
    <div className="poster-offre-container">
      <Title level={2} className="poster-offre-title">Poster une nouvelle offre d'emploi</Title>
      <div className="poster-offre-content">
        <Steps current={currentStep} direction="vertical">
          {steps.map(item => (
            <Step key={item.title} title={item.title} icon={item.icon} />
          ))}
        </Steps>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div className="steps-content">
            {steps[currentStep].content}
          </div>
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
    </div>
  );
};

export default PosterOffre;