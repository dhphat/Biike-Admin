import "./App.scss";
import "antd/dist/antd.less";
// import "./main.less";
import { useEffect } from "react";
import { ServiceProvider } from "./services/ServiceProvider";
import { AuthProvider, useAuth } from "./services/AuthProvider";
import { BiikeRoutes } from "./routes/BiikeRoutes";

function App() {
  const aaaa = useAuth();

  useEffect(() => {
    console.log("okkkkk", aaaa);
  }, [aaaa]);

  useEffect(() => {
    console.log("okkkkk", aaaa);
  });

  return (
    <ServiceProvider>
      <AuthProvider>
        <BiikeRoutes />
      </AuthProvider>
    </ServiceProvider>
  );
}

export default App;
