import { Button, Image, Input } from "antd";
import { useHistory } from "react-router-dom";
import { routes } from "src/routes";
import "./index.scss";

interface BiikeLoginPageProps {}

export const BiikeLoginPage = (props: BiikeLoginPageProps) => {
  const history = useHistory();

  function handleLogin() {
    console.log("Login");
    history.replace({
      pathname: routes.find((route) => route.isPrivate && !route.disabled)
        ?.path,
    });
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
        <Input className="mt-1 rounded py-2" placeholder="Nhập email" />
        <div className="text-white font-sans text-xs mt-4">Mật khẩu</div>
        <Input.Password
          className="mt-1 rounded py-2"
          placeholder="Nhập mật khẩu"
        />
        <Button
          className="mx-auto mt-8 px-4 primary-text-color text-xs font-sans font-semibold rounded"
          onClick={() => handleLogin()}
        >
          Đăng nhập
        </Button>
      </div>
    </div>
  );
};
