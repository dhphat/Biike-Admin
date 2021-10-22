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
              if (route.type === "SINGLE_ROUTE") {
                console.log("route", route.name);
                return Layout ? (
                  <Layout>
                    <route.component />
                  </Layout>
                ) : (
                  <route.component />
                );
              }
              return () => (
                <Switch>
                  {route.nest.map((nest) => (
                    <Route
                      path={route.path}
                      render={() =>
                        Layout ? (
                          <Layout>
                            <nest.component />
                          </Layout>
                        ) : (
                          nest.component
                        )
                      }
                    />
                  ))}
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
