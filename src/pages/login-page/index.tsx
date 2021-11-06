import { Button, Input } from "antd";
import { ChangeEventHandler, useState } from "react";
import { useHistory } from "react-router-dom";
import { routes } from "src/routes";
import { useAuth } from "src/services/AuthProvider";
import "./index.scss";

interface BiikeLoginPageProps {}

export const BiikeLoginPage = (props: BiikeLoginPageProps) => {
  const history = useHistory();
  const { signin } = useAuth();

  const [email, setEmail] = useState("phuonguyen@fpt.edu.vn");
  const [password, setPassword] = useState("092021");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputEmail: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setEmail(target.value);
  };

  const handleInputPassword: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setPassword(target.value);
  };

  function handleLogin() {
    setIsLoading(true);

    signin(email, password)
      .then((ok) => {
        if (ok) {
          const firstPath = routes
            .filter((route) => route.privateOnly && !route.disabled)
            .map((route) =>
              route.type === "SINGLE_ROUTE"
                ? route.path
                : route.nest.map((nest) => route.path + nest.path)
            )
            .flat(2)[0];
          history.replace({
            pathname: firstPath,
          });
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="login-page">
      {/* <Input placeholder="Basic usage" className="test" /> */}
      <div className="main">
        <img
          src={require("../../assets/logo-biike-white.png")}
          className="logo"
        />
        <div className="text-white font-sans text-xs mt-14">Email</div>
        <Input
          className="mt-1 rounded py-2"
          placeholder="Nhập email"
          value={email}
          onChange={handleInputEmail}
        />
        <div className="text-white font-sans text-xs mt-4">Mật khẩu</div>
        <Input.Password
          className="mt-1 rounded py-2"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={handleInputPassword}
        />
        <Button
          className="mx-auto mt-8 px-4 primary-text-color text-xs font-sans font-semibold rounded"
          onClick={handleLogin}
          loading={isLoading}
        >
          Đăng nhập
        </Button>
      </div>
    </div>
  );
};
