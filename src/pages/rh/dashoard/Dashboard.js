import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Card, Button, Statistic, Menu, Input, Table, Progress } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import {
  FileAddOutlined,
  TeamOutlined,
  MailOutlined,
  RobotOutlined,
  PlusOutlined,
  EyeOutlined,
  InboxOutlined,
  BarChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  FileSearchOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  EditOutlined,
  CalendarOutlined,
  CreditCardOutlined
} from '@ant-design/icons';
import NavBar from '../components/navBar/NavBar';
import Footer from '../components/footer/Footer';
import './Dashboard.css';

// Importez tous les composants nécessaires
import PosterOffre from '../posteoffre/PosterOffre';
import ListeOffres from '../listeoffres/ListeOffres';
import Brouillons from '../brouillons/Brouillons';
import Calendrier from '../calendrier/Calendrier';
import Souscrire from '../souscrire/Souscrire';
import Parametre from '../parametre/Parametre';
import OffrePosteDetails from '../offrePosteDetails/OffrePosteDetails';
import BrouillonsDetails from '../brouillonsDetails/BrouillonsDetails';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const { TextArea } = Input;

const AIAssistant = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAskAI = () => {
    // Ici, vous intégrerez la logique pour envoyer la question à l'IA et recevoir la réponse
    // Pour l'instant, nous simulerons une réponse
    setResponse("Voici une réponse simulée de l'assistant IA. Dans une version réelle, cette réponse proviendrait d'un appel API à un service d'IA.");
  };

  return (
    <Card title="Assistant IA" extra={<RobotOutlined />} className="ai-assistant-card">
      <Input.TextArea
        rows={4}
        value={question}
        onChange={handleQuestionChange}
        placeholder="Posez votre question à l'assistant IA..."
        style={{ marginBottom: '16px' }}
      />
      <Button 
        type="primary" 
        icon={<RobotOutlined />} 
        onClick={handleAskAI}
        style={{ marginBottom: '16px' }}
      >
        Demander à l'IA
      </Button>
      {response && (
        <Card type="inner" title="Réponse de l'IA" className="ai-response-card">
          <Typography.Paragraph>{response}</Typography.Paragraph>
        </Card>
      )}
    </Card>
  );
};

const DashboardContent = () => {
  const recentApplications = [
    { key: '1', name: 'John Doe', position: 'Développeur Frontend', date: '2023-04-15' },
    { key: '2', name: 'Jane Smith', position: 'Designer UX', date: '2023-04-14' },
    { key: '3', name: 'Bob Johnson', position: 'Chef de Projet', date: '2023-04-13' },
  ];

  const columns = [
    { title: 'Nom', dataIndex: 'name', key: 'name' },
    { title: 'Poste', dataIndex: 'position', key: 'position' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
  ];

  return (
    <>
      <Title level={2}>Tableau de bord RH</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic title="Offres actives" value={5} prefix={<FileSearchOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Candidatures reçues" value={42} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Entretiens planifiés" value={8} prefix={<CalendarOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Taux de conversion" value={15.4} suffix="%" prefix={<BarChartOutlined />} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={12}>
          <Card title="Activité de recrutement">
            <p>Graphique d'activité de recrutement à implémenter</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Progression du recrutement">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic title="Postes à pourvoir" value={10} />
                <Progress percent={30} size="small" />
              </Col>
              <Col span={12}>
                <Statistic title="Candidats en cours" value={25} />
                <Progress percent={60} size="small" />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="Candidatures récentes">
            <Table columns={columns} dataSource={recentApplications} pagination={false} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <AIAssistant />
        </Col>
      </Row>
    </>
  );
};

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="logo" />
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Tableau de bord</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileAddOutlined />}>
            <Link to="/dashboard/poster-offre">Poster une offre</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UnorderedListOutlined />}>
            <Link to="/dashboard/liste-offres">Liste des offres</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<EditOutlined />}>
            <Link to="/dashboard/brouillons">Brouillons</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<CalendarOutlined />}>
            <Link to="/dashboard/calendrier">Calendrier</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<CreditCardOutlined />}>
            <Link to="/dashboard/souscrire">Souscrire</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<SettingOutlined />}>
            <Link to="/dashboard/parametres">Paramètres</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ marginLeft: 'auto' }}>
            <NavBar />
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="/poster-offre" element={<PosterOffre />} />
            <Route path="/liste-offres" element={<ListeOffres />} />
            <Route path="/brouillons" element={<Brouillons />} />
            <Route path="/brouillonsDetail/:id" element={<BrouillonsDetails />} />
            <Route path="/calendrier" element={<Calendrier />} />
            <Route path="/souscrire" element={<Souscrire />} />
            <Route path="/parametres" element={<Parametre />} />
            <Route path="/offrePosteDetails/:id" element={<OffrePosteDetails />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Dashboard;