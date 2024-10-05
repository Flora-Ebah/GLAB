import React, { useState } from 'react';
import { Table, Tag, Space, Button, Input, Row, Col, Dropdown, Menu } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useNavigate, Routes, Route } from 'react-router-dom';
import './ListeOffres.css';

const ListeOffres = () => {
  const [offres, setOffres] = useState([
    {
      id: 1,
      titre: 'Développeur Full Stack',
      departement: 'IT',
      datePublication: '2023-04-01',
      statut: 'Active',
    },
    {
      id: 2,
      titre: 'Chef de Projet',
      departement: 'Management',
      datePublication: '2023-03-28',
      statut: 'Fermée',
    },
    // Ajoutez d'autres offres ici
  ]);

  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tous');

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const filteredOffres = offres.filter((offre) =>
    (offre.titre.toLowerCase().includes(searchText.toLowerCase()) ||
    offre.departement.toLowerCase().includes(searchText.toLowerCase())) &&
    (filterStatus === 'Tous' || offre.statut === filterStatus)
  );

  const filterMenu = (
    <Menu onClick={({ key }) => handleFilter(key)}>
      <Menu.Item key="Tous">Tous</Menu.Item>
      <Menu.Item key="Active">Active</Menu.Item>
      <Menu.Item key="Fermée">Fermée</Menu.Item>
    </Menu>
  );

  const navigate = useNavigate();

  const columns = [
    {
      title: 'Titre',
      dataIndex: 'titre',
      key: 'titre',
    },
    {
      title: 'Département',
      dataIndex: 'departement',
      key: 'departement',
    },
    {
      title: 'Date de publication',
      dataIndex: 'datePublication',
      key: 'datePublication',
    },
    {
      title: 'Statut',
      key: 'statut',
      dataIndex: 'statut',
      render: (statut) => (
        <Tag color={statut === 'Active' ? 'green' : 'red'}>
          {statut.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => navigate(`/dashboard/offrePosteDetails/${record.id}`)}
          />
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  return (
    <div className="liste-offres-container">
      <Row align="middle" justify="space-between" style={{ marginBottom: 16 }}>
        <Col>
          <h1 style={{ margin: 0 }}>Liste des offres d'emploi</h1>
        </Col>
        <Col>
          <Space>
            <Input
              placeholder="Rechercher par titre ou département"
              prefix={<SearchOutlined />}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 300 }}
            />
            <Dropdown overlay={filterMenu} trigger={['click']}>
              <Button icon={<FilterOutlined />}>
                Filtrer par statut: {filterStatus}
              </Button>
            </Dropdown>
          </Space>
        </Col>
      </Row>
      <Table columns={columns} dataSource={filteredOffres} rowKey="id" />
    </div>
  );
};

export default ListeOffres;
