import "./App.scss";
import "antd/dist/antd.less";
// import "./main.less";
import { ServiceProvider } from "./services/ServiceProvider";
import { AuthProvider } from "./services/AuthProvider";
import { BiikeRoutes } from "./routes/BiikeRoutes";

function App() {
  return (
    <ServiceProvider>
      <AuthProvider>
        <BiikeRoutes />
      </AuthProvider>
    </ServiceProvider>
  );
}

export default App;
