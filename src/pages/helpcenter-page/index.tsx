import { Menu, Button, Select, message } from "antd";
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";
import "./index.scss";

interface BiikeHelpCenterPageProps {}

export const BiikeHelpCenterPage = (props: BiikeHelpCenterPageProps) => {
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
    <div className="biike-center-page px-4">
      <div className="biike-center-tools">
        <Select
          suffixIcon={<CaretDownOutlined className="text-gray-500" />}
          defaultValue="notApprovedYet"
          options={[{ label: "Bệnh viện", value: "notApprovedYet" }]}
        />
        <Button type="primary" value="large" className="rounded px-8  ml-auto">
          Thêm trợ giúp
        </Button>
      </div>
      <div className="biike-center-content mt-4">
        <div className="center-item bg-white px-8 py-4 content-center">
          <div className="item-details text-gray-500 mb-1">
            <div className="item-details text-gray-500 ">
              <div className="center-name text-base font-bold">
                Bệnh viện quận 9
              </div>
              <div className="center-address text-sm">
                387 Đ. Lê Văn Việt, Tăng Nhơn Phú A, TP. Thủ Đức, TPHCM
              </div>
            </div>
          </div>
          <div className="item-tools">
            <Button type="primary" className="rounded">
              Xem
            </Button>
            <Button type="primary" className="rounded">
              Sửa
            </Button>
            <Button type="primary" danger className="rounded">
              Xóa
            </Button>
          </div>
        </div>
        <div className="center-item bg-white px-8 py-4 content-center">
          <div className="item-details text-gray-500 mb-1">
            <div className="item-details text-gray-500 ">
              <div className="center-name text-base font-bold">
                Bệnh viện Thành Phố Thủ Đức
              </div>
              <div className="center-address text-sm">
                Số 29 Phú Châu, Tam Phú, TP. Thủ Đức, TPHCM
              </div>
            </div>
          </div>
          <div className="item-tools">
            <Button type="primary" className="rounded">
              Xem
            </Button>
            <Button type="primary" className="rounded">
              Sửa
            </Button>
            <Button type="primary" danger className="rounded">
              Xóa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
