import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { routes } from "./routes";
import "./App.scss";
import "antd/dist/antd.less";
// import "./main.less";
import { FunctionComponent } from "react";
import { ServiceProvider } from "./services/ServiceProvider";
import { AuthProvider, useAuth } from "./services/AuthProvider";

function App() {
  const auth = useAuth();
  return (
    <ServiceProvider>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            {routes.map((route, index) => {
              const Layout = route.layout;
              const renderRoute = (Layout?: FunctionComponent) => {
                if (route.isPrivate && !auth) {
                  return <Redirect to="/login" />;
                }
                const renderComponent = (
                  Component: FunctionComponent,
                  Layout?: FunctionComponent
                ) => {
                  return Layout ? (
                    <Layout>
                      <Component />
                    </Layout>
                  ) : (
                    <Component />
                  );
                };
                if (route.type === "SINGLE_ROUTE") {
                  return renderComponent(route.component, Layout);
                }
                return (
                  <Switch>
                    {route.nest.map((nest) => {
                      return (
                        <Route
                          path={route.path + nest.path}
                          render={() => renderComponent(nest.component, Layout)}
                        />
                      );
                    })}
                  </Switch>
                );
              };
              return (
                <Route
                  key={index}
                  path={route.path}
                  render={() => renderRoute(Layout)}
                />
              );
            })}
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ServiceProvider>
  );
}

export default App;
