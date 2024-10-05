import React from 'react';
import { Form, Switch, Select, Input, Button, InputNumber, Row, Col, Card, Typography, Slider, TimePicker, Modal, Tabs, Upload, message, Checkbox } from 'antd';
import { MailOutlined, BellOutlined, LockOutlined, UserOutlined, SaveOutlined, RobotOutlined, FileSearchOutlined, TeamOutlined, PhoneOutlined, EditOutlined, UploadOutlined, SettingOutlined, GlobalOutlined, DollarOutlined, IdcardOutlined, FileTextOutlined } from '@ant-design/icons';
import './Parametre.css';

const { Option } = Select;
const { Title } = Typography;
const { RangePicker } = TimePicker;
const { TextArea } = Input;
const { TabPane } = Tabs;

const Parametre = () => {
  const [form] = Form.useForm();
  const [personalInfoForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const onFinish = (values) => {
    console.log('Paramètres sauvegardés:', values);
    message.success('Paramètres sauvegardés avec succès');
  };

  const onFinishPersonalInfo = (values) => {
    console.log('Informations personnelles mises à jour:', values);
    // Ici, vous devriez implémenter la logique pour vérifier l'ancien mot de passe
    // et mettre à jour les informations personnelles dans votre backend
    message.success('Informations personnelles mises à jour avec succès');
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log('Scripts IA sauvegardés:', values.scriptsIA);
      setIsModalVisible(false);
      message.success('Scripts IA sauvegardés avec succès');
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpload = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} fichier téléchargé avec succès`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} échec du téléchargement.`);
    }
  };

  return (
    <div className="parametre-container">
      <Title level={2} className="page-title">Paramètres RH</Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="Informations personnelles" className="parametre-card">
            <Form
              form={personalInfoForm}
              layout="vertical"
              onFinish={onFinishPersonalInfo}
            >
              <Form.Item
                name="nom"
                label="Nom"
                rules={[{ required: true, message: 'Veuillez entrer votre nom' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Veuillez entrer votre email' },
                  { type: 'email', message: 'Veuillez entrer un email valide' }
                ]}
              >
                <Input prefix={<MailOutlined />} />
              </Form.Item>
              <Form.Item
                name="ancienMotDePasse"
                label="Ancien mot de passe"
                rules={[{ required: true, message: 'Veuillez entrer votre ancien mot de passe' }]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item
                name="nouveauMotDePasse"
                label="Nouveau mot de passe"
                rules={[
                  { required: true, message: 'Veuillez entrer un nouveau mot de passe' },
                  { min: 8, message: 'Le mot de passe doit contenir au moins 8 caractères' }
                ]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item
                name="confirmerMotDePasse"
                label="Confirmer le nouveau mot de passe"
                dependencies={['nouveauMotDePasse']}
                rules={[
                  { required: true, message: 'Veuillez confirmer votre nouveau mot de passe' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('nouveauMotDePasse') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Les deux mots de passe ne correspondent pas'));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                  Mettre à jour les informations personnelles
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Notifications" className="parametre-card">
            <Form.Item name="notificationsEmail" valuePropName="checked" label="E-mail">
              <Switch checkedChildren={<MailOutlined />} unCheckedChildren={<MailOutlined />} />
            </Form.Item>
            <Form.Item name="notificationsPush" valuePropName="checked" label="Notifications push">
              <Switch checkedChildren={<BellOutlined />} unCheckedChildren={<BellOutlined />} />
            </Form.Item>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Préférences IA" className="parametre-card">
            <Form.Item name="niveauAssistanceIA" label="Niveau d'assistance IA">
              <Slider
                marks={{
                  0: 'Minimal',
                  50: 'Modéré',
                  100: 'Maximal'
                }}
                step={null}
              />
            </Form.Item>
            <Form.Item name="suggestionsAutomatiques" valuePropName="checked" label="Suggestions automatiques">
              <Switch checkedChildren={<RobotOutlined />} unCheckedChildren={<RobotOutlined />} />
            </Form.Item>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Paramètres de publication" className="parametre-card">
            <Form.Item name="revisionAutomatique" valuePropName="checked" label="Révision automatique des offres">
              <Switch checkedChildren={<FileSearchOutlined />} unCheckedChildren={<FileSearchOutlined />} />
            </Form.Item>
            <Form.Item name="delaiPublicationAuto" label="Délai de publication automatique (heures)">
              <InputNumber min={0} max={72} style={{ width: '100%' }} />
            </Form.Item>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Gestion des candidats" className="parametre-card">
            <Form.Item name="triAutomatiqueCandidats" valuePropName="checked" label="Tri automatique des candidats">
              <Switch checkedChildren={<TeamOutlined />} unCheckedChildren={<TeamOutlined />} />
            </Form.Item>
            <Form.Item name="nombreCandidatsShortlist" label="Nombre de candidats en shortlist">
              <InputNumber min={1} max={50} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="programmationAppelsIA" valuePropName="checked" label="Programmation d'appels par l'IA">
              <Switch checkedChildren={<PhoneOutlined />} unCheckedChildren={<PhoneOutlined />} />
            </Form.Item>
            <Form.Item name="plageHoraireAppels" label="Plage horaire pour les appels">
              <RangePicker format="HH:mm" style={{ width: '100%' }} />
            </Form.Item>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Paramètres IA pour les appels" className="parametre-card">
            <Form.Item name="dureeMaxAppelIA" label="Durée maximale des appels IA (minutes)">
              <InputNumber min={5} max={60} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="nombreMaxAppelsParJour" label="Nombre maximum d'appels par jour">
              <InputNumber min={1} max={20} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="delaiEntreAppels" label="Délai minimum entre les appels (minutes)">
              <InputNumber min={5} max={120} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button icon={<EditOutlined />} onClick={showModal}>
                Éditer les scripts de l'IA
              </Button>
            </Form.Item>
          </Card>
        </Col>
        <Col xs={24}>
          <Card title="Sécurité et confidentialité" className="parametre-card">
            <Form.Item name="authentificationDeuxFacteurs" valuePropName="checked" label="Authentification à deux facteurs">
              <Switch checkedChildren={<LockOutlined />} unCheckedChildren={<LockOutlined />} />
            </Form.Item>
            <Form.Item name="niveauConfidentialiteDonnees" label="Niveau de confidentialité des données">
              <Select>
                <Option value="standard">Standard</Option>
                <Option value="eleve">Élevé</Option>
                <Option value="maximal">Maximal</Option>
              </Select>
            </Form.Item>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Intégration et API" className="parametre-card">
            <Form.Item name="cleAPI" label="Clé API">
              <Input.Password />
            </Form.Item>
            <Form.Item name="webhookURL" label="URL du Webhook">
              <Input />
            </Form.Item>
            <Form.Item name="integrationLinkedIn" valuePropName="checked" label="Intégration LinkedIn">
              <Switch checkedChildren={<GlobalOutlined />} unCheckedChildren={<GlobalOutlined />} />
            </Form.Item>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Personnalisation" className="parametre-card">
            <Form.Item name="logoEntreprise" label="Logo de l'entreprise">
              <Upload
                name="logo"
                action="/upload.do"
                listType="picture"
                onChange={handleUpload}
              >
                <Button icon={<UploadOutlined />}>Cliquez pour télécharger</Button>
              </Upload>
            </Form.Item>
            <Form.Item name="couleurPrincipale" label="Couleur principale">
              <Input type="color" />
            </Form.Item>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Paramètres avancés" className="parametre-card">
            <Form.Item name="modeDebug" valuePropName="checked" label="Mode debug">
              <Switch checkedChildren={<SettingOutlined />} unCheckedChildren={<SettingOutlined />} />
            </Form.Item>
            <Form.Item name="limiteRequetesAPI" label="Limite de requêtes API (par heure)">
              <InputNumber min={1} max={1000} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="delaiExpirationToken" label="Délai d'expiration du token (heures)">
              <InputNumber min={1} max={720} style={{ width: '100%' }} />
            </Form.Item>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Paramètres financiers" className="parametre-card">
            <Form.Item name="devise" label="Devise">
              <Select>
                <Option value="EUR">Euro (EUR)</Option>
                <Option value="USD">Dollar américain (USD)</Option>
                <Option value="GBP">Livre sterling (GBP)</Option>
              </Select>
            </Form.Item>
            <Form.Item name="budgetRecrutementAnnuel" label="Budget de recrutement annuel">
              <InputNumber
                min={0}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item name="coutMoyenRecrutement" label="Coût moyen par recrutement">
              <InputNumber
                min={0}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Gestion des personnes" className="parametre-card">
            <Form.Item name="champsProfil" label="Champs du profil employé">
              <Checkbox.Group options={[
                { label: 'Photo', value: 'photo' },
                { label: 'Biographie', value: 'bio' },
                { label: 'Compétences', value: 'skills' },
                { label: 'Expérience', value: 'experience' },
                { label: 'Formation', value: 'education' },
              ]} />
            </Form.Item>
            <Form.Item name="evaluationPerformance" valuePropName="checked" label="Activer l'évaluation des performances">
              <Switch checkedChildren={<IdcardOutlined />} unCheckedChildren={<IdcardOutlined />} />
            </Form.Item>
            <Form.Item name="frequenceEvaluation" label="Fréquence des évaluations">
              <Select>
                <Option value="mensuel">Mensuelle</Option>
                <Option value="trimestriel">Trimestrielle</Option>
                <Option value="semestriel">Semestrielle</Option>
                <Option value="annuel">Annuelle</Option>
              </Select>
            </Form.Item>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Gestion des documents" className="parametre-card">
            <Form.Item name="documentsObligatoires" label="Documents obligatoires">
              <Checkbox.Group options={[
                { label: 'Contrat de travail', value: 'contrat' },
                { label: 'Fiche de poste', value: 'fichePoste' },
                { label: 'Accord de confidentialité', value: 'confidentialite' },
                { label: 'Attestation de formation', value: 'formation' },
              ]} />
            </Form.Item>
            <Form.Item name="stockageDocuments" label="Stockage des documents">
              <Select>
                <Option value="local">Serveur local</Option>
                <Option value="cloud">Cloud</Option>
                <Option value="hybride">Hybride</Option>
              </Select>
            </Form.Item>
            <Form.Item name="politiqueRetention" label="Politique de rétention des documents (années)">
              <InputNumber min={1} max={10} style={{ width: '100%' }} />
            </Form.Item>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Onboarding et Offboarding" className="parametre-card">
            <Form.Item name="processusOnboarding" valuePropName="checked" label="Activer le processus d'onboarding automatisé">
              <Switch checkedChildren={<UserOutlined />} unCheckedChildren={<UserOutlined />} />
            </Form.Item>
            <Form.Item name="etapesOnboarding" label="Étapes d'onboarding">
              <Checkbox.Group options={[
                { label: "Présentation de l'entreprise", value: 'presentation' },
                { label: "Formation initiale", value: 'formation' },
                { label: "Rencontre avec l'équipe", value: 'rencontre' },
                { label: "Configuration du poste de travail", value: 'configuration' },
              ]} />
            </Form.Item>
            <Form.Item name="processusOffboarding" valuePropName="checked" label="Activer le processus d'offboarding automatisé">
              <Switch checkedChildren={<UserOutlined />} unCheckedChildren={<UserOutlined />} />
            </Form.Item>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Gestion des congés" className="parametre-card">
            <Form.Item name="typeConges" label="Types de congés">
              <Checkbox.Group options={[
                { label: 'Congés payés', value: 'payes' },
                { label: 'RTT', value: 'rtt' },
                { label: 'Congés sans solde', value: 'sansSolde' },
                { label: 'Congés maladie', value: 'maladie' },
              ]} />
            </Form.Item>
            <Form.Item name="validationAutomatique" valuePropName="checked" label="Validation automatique des congés">
              <Switch checkedChildren={<FileTextOutlined />} unCheckedChildren={<FileTextOutlined />} />
            </Form.Item>
            <Form.Item name="delaiValidation" label="Délai de validation des congés (jours)">
              <InputNumber min={1} max={30} style={{ width: '100%' }} />
            </Form.Item>
          </Card>
        </Col>
      </Row>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large" className="btn-sauvegarder">
            Sauvegarder les paramètres
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title={<span className="modal-title">Éditer les scripts de l'IA pour les appels</span>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        className="script-modal"
      >
        <Form.Item
          name="scriptsIA"
          rules={[{ required: true, message: "Veuillez entrer les scripts pour l'IA" }]}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Script principal" key="1">
              <TextArea rows={10} placeholder="Entrez le script principal que l'IA utilisera lors des appels..." />
            </TabPane>
            <TabPane tab="Candidat non disponible" key="2">
              <TextArea rows={10} placeholder="Entrez le script à utiliser si le candidat n'est pas disponible..." />
            </TabPane>
            <TabPane tab="Candidat non intéressé" key="3">
              <TextArea rows={10} placeholder="Entrez le script à utiliser si le candidat n'est plus intéressé..." />
            </TabPane>
          </Tabs>
        </Form.Item>
        <p>Utilisez les variables suivantes dans vos scripts :</p>
        <ul>
          <li><code>{'{nom}'}</code> : Nom du candidat</li>
          <li><code>{'{poste}'}</code> : Intitulé du poste</li>
          <li><code>{'{entreprise}'}</code> : Nom de l'entreprise</li>
        </ul>
        <p>Conseils pour les scripts :</p>
        <ul>
          <li>Script principal : Présentez-vous, expliquez le but de l'appel, et posez des questions sur l'intérêt du candidat.</li>
          <li>Candidat non disponible : Proposez de rappeler à un autre moment ou de laisser un message.</li>
          <li>Candidat non intéressé : Remerciez-le pour son temps et demandez poliment la raison de son désintérêt.</li>
        </ul>
      </Modal>
    </div>
  );
};

export default Parametre;