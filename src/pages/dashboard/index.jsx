import { useEffect, useState } from "react";
import {
  ProfileOutlined,
  PlusOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  Popconfirm,
  message,
  Breadcrumb,
  theme,
} from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Sider, Footer } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [items, setItems] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const role = "admin";

  useEffect(() => {
    if (role === "admin") {
      setItems([
        getItem("Chart", "manager-chart", <ProfileOutlined />),
        getItem("New clinic", "product", <PlusOutlined />),
        getItem("Account", "category", <ProfileOutlined />),
        getItem("Service", "admin-service", <ProfileOutlined />),
      ]);
    }
  }, [role]);

  useEffect(() => {
    const currentURI = location.pathname.split("/").pop();
    if (currentURI === "dashboard") {
      navigate("/dashboard/manager-chart");
    }
    setOpenKeys((prevKeys) => [...prevKeys, currentURI]);
  }, [location.pathname, navigate]);

  useEffect(() => {
    localStorage.setItem("keys", JSON.stringify(openKeys));
  }, [openKeys]);

  const handleSubMenuOpen = (keyMenuItem) => {
    setOpenKeys(keyMenuItem);
  };

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
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname.split("/").pop()]}
          openKeys={openKeys}
          onOpenChange={handleSubMenuOpen}
        >
          {items.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((subItem) => (
                  <Menu.Item key={subItem.key}>
                    <Link to={`/dashboard/${subItem.key}`}>
                      {subItem.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={`/dashboard/${item.key}`}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 24,
            }}
          >
            <h1 style = {{marginLeft: 20}}>ADMIN DASHBOARD</h1>
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
        <Content
          style={{ margin: "0 16px", display: "flex", flexDirection: "column" }}
        >
          <Breadcrumb>
            {location.pathname
              .split("/")
              .map((path, index, array) => (
                <Breadcrumb.Item key={path}>
                  {index === 0 ? path : <Link to={`/${path}`}>{path}</Link>}
                </Breadcrumb.Item>
              ))}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Outlet style={{ flexGrow: 1 }} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center", backgroundColor: "#E3F2EE" }}>
          ADMIN FANPAGE ©{new Date().getFullYear()} DENTCARE CLINIC
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
