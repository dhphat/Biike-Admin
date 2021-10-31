import { CaretDownOutlined } from "@ant-design/icons";
import { Select, Button, Input } from "antd";
import "./index.scss";

interface BiikeNotificationPageProps {}

export const BiikeNotificationPage = (props: BiikeNotificationPageProps) => {
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
        <div className="biike-notification-tools">
          <span className="text-gray-500 font-semibold">Tạo thông báo mới</span>
          <Button type="primary" className="rounded ml-auto">
            Gửi thông báo
          </Button>
        </div>
      </div>
    </div>
  );
};
