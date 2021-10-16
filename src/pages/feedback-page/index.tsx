import { Select, Button } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import "./index.scss";

interface BiikeFeedBackPageProps {}

export const BiikeFeedbackPage = (props: BiikeFeedBackPageProps) => {
  return (
    <div className="biike-feedback-page px-4">
      <div className="biike-feedback-tools">
        <Select
          suffixIcon={<CaretDownOutlined className="text-gray-500" />}
          defaultValue="notApprovedYet"
          options={[
            { label: "Chưa duyệt", value: "notApprovedYet" },
            { label: "Đã duyệt", value: "approved" },
            { label: "Đã duyệt", value: "block" },
          ]}
        />
      </div>
      <div className="biike-feedback-content mt-4">
        <div className="feedback-item bg-white px-8 py-4 content-center">
          <div className="item-details text-gray-500 mb-1">
            <div className="item-details text-gray-500 ">
              <div className="feedback-name text-base ">
                <span className="font-bold">Đỗ Hữu Phát</span> tới{" "}
                <span className="font-bold">Lê Nguyễn Thảo Vân</span>
              </div>
              <div className="feedback-address text-sm">Bạn *** **** *** </div>
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
        <div className="feedback-item bg-white px-8 py-4 content-center">
          <div className="item-details text-gray-500 mb-1">
            <div className="item-details text-gray-500 ">
              <div className="feedback-name text-base ">
                <span className="font-bold">Thanh Tâm</span> tới{" "}
                <span className="font-bold">Hải Triều</span>
              </div>
              <div className="feedback-address text-sm">Rất *** **** *** </div>
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
