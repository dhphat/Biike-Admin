import { Avatar, Breadcrumb, Layout, Menu } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import "./index.scss";
import { Link, useHistory, useLocation } from "react-router-dom";
import { routes } from "src/routes";

interface BiikeDefaultLayoutProps {}

export const BiikeDefaultLayout: FunctionComponent<BiikeDefaultLayoutProps> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    const paths = location.pathname.split("/").filter((path) => !!path);
    setPaths(paths);
  }, [location]);

  const handleClickBreadcrumb = (index: number) => {
    history.push({ pathname: `/${paths.splice(0, index + 1).join("/")}` });
  };

  const defaultOpenKey = routes.find(
    (route) => location.pathname.indexOf(route.path) === 0
  )?.path;

  const defaultSelectedKey = routes
    .map((route) =>
      route.type === "NEST_ROUTE"
        ? route.nest.map((nest) => route.path + nest.path)
        : route.path
    )
    .flat(1)
    .find((path) => location.pathname.indexOf(path) === 0);

  return (
    <Layout className="biike-default-layout">
      <Layout.Sider>
        <img
          src={require("../../assets/logo-biike-white.png")}
          className="logo mx-auto mt-8"
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={
            defaultSelectedKey ? [defaultSelectedKey] : undefined
          }
          defaultOpenKeys={defaultOpenKey ? [defaultOpenKey] : undefined}
          mode="inline"
        >
          {routes
            .filter((route) => route.isPrivate)
            .map((route) => {
              if (route.type === "SINGLE_ROUTE") {
                return (
                  <Menu.Item key={route.path}>
                    {route.disabled ? (
                      route.name
                    ) : (
                      <Link to={{ pathname: route.path }}>{route.name}</Link>
                    )}
                  </Menu.Item>
                );
              }
              return (
                <Menu.SubMenu key={route.path} title={route.name}>
                  {route.nest.map((nest) => (
                    <Menu.Item key={route.path + nest.path}>
                      {route.disabled ? (
                        nest.name
                      ) : (
                        <Link to={{ pathname: route.path + nest.path }}>
                          {nest.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              );
            })}
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header className="biike-layout-header content-center items-center">
          <span className="capitalize text-lg text-gray-500 tracking-tight font-medium">
            {paths[paths.length - 1]}
          </span>
          <div className="ml-auto flex pa-0 items-center">
            <div className="flex-col flex items-end mr-2 font-sans ">
              <span className="font-semibold text-blue-500 text-sm tracking-tighter">
                Admin
              </span>
              <span className="text-lg text-gray-500 tracking-tighter">
                Do Huu Phat
              </span>
            </div>
            <Avatar size="large" src={require("../../assets/avatar.png")} />
            {/* <Avatar
              style={{ backgroundColor: "orange", verticalAlign: "middle" }}
              size="large"
            >
              U
            </Avatar> */}
          </div>
        </Layout.Header>
        <Layout className="site-layout">
          <Layout.Content className="biike-layout-content">
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {children}
            </div>
          </Layout.Content>
          <Layout.Footer className="biike-layout-footer">
            Biiké ©2021 Created by Biiké Team
          </Layout.Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
