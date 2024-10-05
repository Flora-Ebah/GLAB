import React, { useState, useEffect } from 'react';
import { List, Card, Button, Typography, Input, Empty, Tag, Tooltip, Avatar, Select, Popover } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, CalendarOutlined, PlusOutlined, BoldOutlined, ItalicOutlined, UnderlineOutlined, AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './Brouillons.css';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const Brouillons = () => {
  const [brouillons, setBrouillons] = useState([]);
  const [brouillonsFiltres, setBrouillonsFiltres] = useState([]);
  const navigate = useNavigate();
  const [texteSelectionne, setTexteSelectionne] = useState('');
  const [styleTexte, setStyleTexte] = useState({
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    textAlign: 'left',
    fontSize: '14px',
    color: '#000000'
  });

  useEffect(() => {
    // Simulation de l'appel API
    const brouillonsFictifs = [
      { id: 1, titre: "Développeur Full Stack", dateCreation: "2023-04-15", description: "Nous recherchons un développeur Full Stack expérimenté...", tags: ["JavaScript", "React", "Node.js"], couleur: "#f50" },
      { id: 2, titre: "Designer UX/UI", dateCreation: "2023-04-16", description: "Rejoignez notre équipe de design en tant que Designer UX/UI...", tags: ["Figma", "Adobe XD", "Sketch"], couleur: "#2db7f5" },
      { id: 3, titre: "Chef de projet IT", dateCreation: "2023-04-17", description: "Nous cherchons un chef de projet IT pour gérer nos projets...", tags: ["Agile", "Scrum", "JIRA"], couleur: "#87d068" },
    ];
    setBrouillons(brouillonsFictifs);
    setBrouillonsFiltres(brouillonsFictifs);
  }, []);


  

  const supprimerBrouillon = (id) => {
    const nouveauxBrouillons = brouillons.filter(brouillon => brouillon.id !== id);
    setBrouillons(nouveauxBrouillons);
    setBrouillonsFiltres(nouveauxBrouillons);
  };

  const rechercherBrouillons = (valeur) => {
    const resultats = brouillons.filter(brouillon =>
      brouillon.titre.toLowerCase().includes(valeur.toLowerCase()) ||
      brouillon.description.toLowerCase().includes(valeur.toLowerCase()) ||
      brouillon.tags.some(tag => tag.toLowerCase().includes(valeur.toLowerCase()))
    );
    setBrouillonsFiltres(resultats);
  };

  const editerBrouillon = (id) => {
    navigate(`/dashboard/brouillonsDetail/${id}`);
  };

  return (
    <div className="brouillons-container">
      <div className="brouillons-header">
        <Title level={2}>Brouillons d'offres d'emploi</Title>
        <div className="brouillons-actions">
          <Search
            placeholder="Rechercher un brouillon..."
            onSearch={rechercherBrouillons}
            onChange={(e) => rechercherBrouillons(e.target.value)}
            className="brouillons-search"
            enterButton={<SearchOutlined />}
          />

          <Button type="primary" icon={<PlusOutlined />}>Nouveau brouillon</Button>
        </div>
      </div>
      {brouillonsFiltres.length > 0 ? (
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }}
          dataSource={brouillonsFiltres}
          renderItem={(brouillon) => (
            <List.Item>
              <Card
                hoverable
                className="brouillon-card"
                actions={[
                  <Tooltip title="Modifier">
                    <EditOutlined key="edit" className="edit-icon" onClick={() => editerBrouillon(brouillon.id)} />
                  </Tooltip>,
                  <Tooltip title="Supprimer">
                    <DeleteOutlined key="delete" className="delete-icon" onClick={() => supprimerBrouillon(brouillon.id)} />
                  </Tooltip>,
                ]}
              >
                <div className="brouillon-avatar" style={{ backgroundColor: brouillon.couleur }}>
                  {brouillon.titre.charAt(0)}
                </div>
                <Card.Meta
                  title={brouillon.titre}
                  description={
                    <>
                      <Text className="brouillon-description" ellipsis={{ rows: 2 }}>
                        {brouillon.description}
                      </Text>
                      <div className="brouillon-tags">
                        {brouillon.tags.map(tag => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    </>
                  }
                />
                <div className="brouillon-footer">
                  <CalendarOutlined /> <Text type="secondary">{brouillon.dateCreation}</Text>
                </div>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Empty
          description="Aucun brouillon trouvé"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </div>
  );
};

export default Brouillons;
