import React from 'react';
import { Layout, Avatar, Dropdown, Menu } from 'antd';
import { MenuOutlined, BellOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import './NavBar.css';

const { Header } = Layout;

const NavBar = ({ toggleSidebar }) => {
  const userMenu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Mon profil
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        Paramètres
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" icon={<LogoutOutlined />}>
        Déconnexion
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="navbar">
      <div className="navbar-left">
      </div>
      <div className="navbar-right">
        <BellOutlined className="navbar-icon" />
        <Dropdown overlay={userMenu} trigger={['click']}>
          <Avatar icon={<UserOutlined />} className="user-avatar" />
        </Dropdown>
      </div>
    </Header>
  );
};

export default NavBar;
