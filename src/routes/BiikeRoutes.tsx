import { FunctionComponent, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { BiikeAuthenticatingPage } from "src/pages/authenticating-page";
import { useAuth } from "src/services/AuthProvider";
import { routes } from ".";

interface Props {}

export const BiikeRoutes = (props: Props) => {
  const { user, isAuthenticating } = useAuth();

  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, index) => {
          const Layout = route.layout;
          const renderRoute = (Layout?: FunctionComponent) => {
            if (isAuthenticating) {
              return <BiikeAuthenticatingPage />;
            }
            if (route.privateOnly && !user) {
              return <Redirect to="/login" />;
            }
            if (route.publicOnly && !!user) {
              const firstPath = routes
                .filter((route) => route.privateOnly && !route.disabled)
                .map((route) =>
                  route.type === "SINGLE_ROUTE"
                    ? route.path
                    : route.nest.map((nest) => route.path + nest.path)
                )
                .flat(2)[0];
              return <Redirect to={firstPath} />;
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
                {route.nest.map((nest, index) => {
                  return (
                    <Route
                      key={index}
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
              exact={route.exact}
              render={() => renderRoute(Layout)}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
};
