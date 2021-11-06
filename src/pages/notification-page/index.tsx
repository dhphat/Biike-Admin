import {
  CaretDownOutlined,
  DownOutlined,
  SendOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Select,
  Button,
  Input,
  Divider,
  Menu,
  message,
  Tooltip,
  Dropdown,
  Upload,
} from "antd";
import "./index.scss";

interface BiikeNotificationPageProps {}

export const BiikeNotificationPage = (props: BiikeNotificationPageProps) => {
  const { TextArea } = Input;
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

  const img = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  function handleMenuClick(e: any) {
    message.info("Click on menu item.");
    console.log("click", e);
  }

  return (
    <div className="biike-notification-page px-4 flex h-prose">
      <div className="w-1/3 biike-notification-list">
        <div className="biike-notification-tools">
          <Select
            className="rounded tool-item text-gray-500"
            suffixIcon={<CaretDownOutlined className="text-gray-500" />}
            defaultValue="all"
            options={[{ label: "Tất cả", value: "all" }]}
          />
        </div>
        <div className="biike-notification-content mt-4">
          <div className="bg-white px-8 py-4">
            <div className="item-details">
              <span className="text-blue-500 font-semibold">Offer</span>
              <span className="text-gray-500">
                Đầu tháng tràn ngập voucher mới
              </span>
            </div>
          </div>
          <div className="bg-white px-8 py-4">
            <div className="item-details">
              <span className="text-blue-500 font-semibold">Offer</span>
              <span className="text-gray-500">
                Đầu tháng tràn ngập voucher mới
              </span>
            </div>
          </div>
          <div className="bg-white px-8 py-4">
            <div className="item-details">
              <span className="text-blue-500 font-semibold">Offer</span>
              <span className="text-gray-500">
                Đầu tháng tràn ngập voucher mới
              </span>
            </div>
          </div>
          <div className="bg-white px-8 py-4">
            <div className="item-details">
              <span className="text-blue-500 font-semibold">Offer</span>
              <span className="text-gray-500">
                Đầu tháng tràn ngập voucher mới
              </span>
            </div>
          </div>
          <div className="bg-white px-8 py-4">
            <div className="item-details">
              <span className="text-blue-500 font-semibold">Offer</span>
              <span className="text-gray-500">
                Đầu tháng tràn ngập voucher mới
              </span>
            </div>
          </div>
          <div className="bg-white px-8 py-4">
            <div className="item-details">
              <span className="text-blue-500 font-semibold">Offer</span>
              <span className="text-gray-500">
                Đầu tháng tràn ngập voucher mới
              </span>
            </div>
          </div>
          <div className="bg-white px-8 py-4">
            <div className="item-details">
              <span className="text-blue-500 font-semibold">Offer</span>
              <span className="text-gray-500">
                Đầu tháng tràn ngập voucher mới
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 biike-notification-create pl-12">
        <div className="biike-notification-tools items-center self-center">
          <span className="text-gray-500 font-bold text-xl">
            Tạo thông báo mới
          </span>
        </div>
        <Divider />
        <span className="text-gray-500 font-semibold mb-2">Tiêu đề</span>
        <Input placeholder="Nhập tiêu đề" />
        <span className="text-gray-500 font-semibold mt-2 mb-2">
          Mô tả ngắn
        </span>
        <TextArea
          placeholder="Nhập mô tả ngắn"
          autoSize={{ minRows: 3, maxRows: 3 }}
        />
        <span className="text-gray-500 font-semibold mt-2 mb-2">Loại</span>
        <span>
          <Dropdown overlay={menu}>
            <Button>
              Chọn loại
              <DownOutlined />
            </Button>
          </Dropdown>
        </span>
        <span className="text-gray-500 font-semibold mt-2 mb-2">Ảnh bìa</span>

        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>

        <span className="text-gray-500 font-semibold mt-2 mb-2">Nội dung</span>
        <TextArea
          autoSize={{ minRows: 7, maxRows: 7 }}
          placeholder="Nhập nội dung"
        />
        <span className="text-gray-500 font-semibold mt-2 mb-2">
          Đối tượng nhận
        </span>
        <span>
          <Dropdown overlay={menu} className="mr-2">
            <Button>
              Chọn loại user
              <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown overlay={menu}>
            <Button>
              Chọn khu vực
              <DownOutlined />
            </Button>
          </Dropdown>
        </span>
        <span></span>
        <Divider />
        <div className="button-item self-center ">
          <Button type="primary" className="rounded" icon={<SendOutlined />}>
            Gửi thông báo
          </Button>
        </div>
      </div>
    </div>
  );
};
