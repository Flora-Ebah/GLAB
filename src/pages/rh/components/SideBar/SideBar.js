import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  FileAddOutlined,
  UnorderedListOutlined,
  EditOutlined,
  CreditCardOutlined,
  CalendarOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './SideBar.css';

const { Sider } = Layout;

const SideBar = ({ isOpen }) => {
  return (
    <Sider
      collapsible
      collapsed={!isOpen}
      className="sidebar"
    >
      <div className="logo">
        {/* Ajoutez votre logo ici */}
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/recruteur/dashboard">Tableau de bord</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FileAddOutlined />}>
          <Link to="/recruteur/poster-offre">Poster une offre</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UnorderedListOutlined />}>
          <Link to="/recruteur/liste-offres">Liste des offres</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<EditOutlined />}>
          <Link to="/recruteur/brouillons">Brouillons</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<CalendarOutlined />}>
          <Link to="/recruteur/calendrier">Calendrier</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<CreditCardOutlined />}>
          <Link to="/recruteur/souscrire">Souscrire</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<SettingOutlined />}>
          <Link to="/recruteur/parametres">Paramètres</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
