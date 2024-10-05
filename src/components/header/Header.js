import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { MenuOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Header.css';

const { Header: AntHeader } = Layout;

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const menuItems = [
    { key: 'jobs', label: 'Offres d\'emplois', link: '/offres' },
    { key: 'solutions', label: 'Solution RH', link: '/solutions' },
    { key: 'pricing', label: 'Tarifs', link: '/tarifs' },
    { key: 'contact', label: 'Contact', link: '/contact' },
  ];

  return (
    <AntHeader className="header">
      <div className="header-content">
        <div className="left-section">
          <Link to="/" className="logo">Logo</Link>
        </div>
        <div className="center-section">
          <Menu mode="horizontal" className="desktop-menu">
            {menuItems.map(item => (
              <Menu.Item key={item.key}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
        <div className="right-section">
          <Button icon={<UserOutlined />} className="user-button">
            Connexion
          </Button>
          <Button
            className="menu-toggle-button"
            icon={<MenuOutlined />}
            onClick={toggleMenu}
          />
        </div>
      </div>
      <Drawer
        title="Menu"
        placement="right"
        onClose={toggleMenu}
        visible={menuVisible}
        closeIcon={<CloseOutlined />}
        className="mobile-menu-drawer"
      >
        <Menu mode="vertical">
          {menuItems.map(item => (
            <Menu.Item key={item.key}>
              <Link to={item.link} onClick={toggleMenu}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </AntHeader>
  );
};

export default Header;
