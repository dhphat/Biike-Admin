import { Menu, Dropdown, Button, message } from "antd";
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";
import "./index.scss";

interface BiikeHomePageProps {}

export const BiikeHomePage = (props: BiikeHomePageProps) => {
  // const month = {
  //   key,
  // };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );

  function handleButtonClick(e: any) {
    message.info("Click on left button.");
    console.log("click left button", e);
  }

  function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
  }

  return (
    <div className="biike-dashboard-page flex flex-col">
      <div>
        <Dropdown overlay={menu}>
          <Button>
            Button <CaretDownOutlined />
          </Button>
        </Dropdown>
        <div className="biike-dashboard-content">
          <div className="dashboard-stats">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="stat-item">
                <div className="stat-key">Tong nguoi dung</div>
                <div className="stat-value">123</div>
              </div>
            ))}
          </div>
          <div className="biike-dashboard-charts">
            <div className="charts-title">Ty le trang thai chuyen</div>
            <div className="charts-content">This is the chart</div>
          </div>
        </div>
        <div className="biike-dashboard-map-stats">
          <div className="dashboard-map-title">Nguoi dung theo khu vuc</div>
          <div className="dashboard-map"></div>
        </div>
      </div>
    </div>
  );
};
