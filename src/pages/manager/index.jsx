import React, { useEffect, useState } from "react";
import {
  ProfileOutlined,
  PlusOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Popconfirm, Breadcrumb, message } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';

const { Header, Content, Sider, Footer } = Layout;

const Manager = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [items, setItems] = useState([]);
  const [key, setKey] = useState();
  const location = useLocation();
  const currentURI = location.pathname.split("/").pop();
  const role = "manager"; // Assume admin role for now
  const user = useSelector(selectUser);

  const dataOpen = JSON.parse(localStorage.getItem("keys")) ?? [];
  const [openKeys, setOpenKeys] = useState(dataOpen);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "manager") {
      setItems([
        { key: "room", label: "Room", icon: <PlusOutlined /> },
        { key: "manager-dentist", label: "Manage Dentist", icon: <PlusOutlined />},
        { key: "manager-service", label: "Manager Service", icon: <PlusOutlined/>},
        { key: "managerappointment", label: "View Appointment", icon: <ProfileOutlined /> },
        { key: "manager-patient", label: "Manage Patient", icon: <ProfileOutlined /> },
        // { key: "manager-service", label: "Manager Service", icon: <ProfileOutlined/>},
        { key: "manager-chart", label: "Manager Chart", icon: <ProfileOutlined/>},
      ]);
    }
  }, [role]);

  useEffect(() => {
    const currentURI = location.pathname.split("/").pop();
    if (currentURI === "manager") {
      navigate("/manager/managerappointment");
    }
    setOpenKeys((prevKeys) => [...prevKeys, currentURI]);
  }, [location.pathname, navigate]);

  const handleSubMenuOpen = (keyMenuItem) => {
    setOpenKeys(keyMenuItem);
  };

  const handleSelectKey = (keyPath) => {
    setKey(keyPath);
  };

  useEffect(() => {
    localStorage.setItem("keys", JSON.stringify(openKeys));
  }, [openKeys]);

  useEffect(() => {
    handleSubMenuOpen([...openKeys, key]);
  }, [currentURI]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    message.success("Logged out successfully");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["information"]}
          mode="inline"
          selectedKeys={[currentURI]}
          openKeys={openKeys}
          onOpenChange={handleSubMenuOpen}
        >
          {items.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((subItem) => (
                  <Menu.Item
                    key={subItem.key}
                    onClick={(e) => handleSelectKey(e.keyPath[1])}
                  >
                    <Link to={`/manager/${subItem.key}`}>
                      {subItem.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={`/manager/${item.key}`}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 24px",
            }}
          >
            <Breadcrumb style={{ margin: "16px 0" }}>
              {location.pathname.split("/").map((path, index) => (
                <Breadcrumb.Item key={index}>
                  <Link to={`/${path}`}>{path}</Link>
                </Breadcrumb.Item>
              ))}
              <h3 style ={{color : "white", marginLeft: "-140px"}}>Manager:{user.fullName} - {user.dentalClinic.clinicName}</h3>
            </Breadcrumb>
            <Popconfirm
              title="Are you sure you want to logout?"
              onConfirm={handleLogout}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" icon={<LogoutOutlined />}>
                Logout
              </Button>
            </Popconfirm>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          MANAGER FANPAGE ©{new Date().getFullYear()} DENTCARE CLINIC
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Manager;
