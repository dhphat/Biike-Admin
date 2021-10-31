import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routes } from "./routes";
import "./App.scss";
import "antd/dist/antd.less";
// import "./main.less";
import { FunctionComponent } from "react";
import { ServiceProvider } from "./services/ServiceProvider";

function App() {
  return (
    <ServiceProvider>
      <BrowserRouter>
        <Switch>
          {routes.map((route, index) => {
            const Layout = route.layout;
            const renderRoute = (Layout?: FunctionComponent) => {
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
    </ServiceProvider>
  );
}

export default App;
