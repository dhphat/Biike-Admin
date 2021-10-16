import { Select, Button } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import "./index.scss";

interface BiikeBikePageProps {}

export const BiikeBikePage = (props: BiikeBikePageProps) => {
  return (
    <div className="biike-bike-page px-4">
      <div className="biike-bike-tools">
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
      <div className="biike-bike-content mt-4">
        <div className="bike-item bg-white px-8 py-4 content-center">
          <div className="item-details text-gray-500 mb-1">
            <div className="item-details text-gray-500 ">
              <div className="bike-name text-base font-bold">75B-13 137.76</div>
              <div className="bike-address text-sm">Yamaha</div>
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
        <div className="bike-item bg-white px-8 py-4 content-center">
          <div className="item-details text-gray-500 mb-1">
            <div className="item-details text-gray-500 ">
              <div className="bike-name text-base ">
                <div className="bike-name text-base font-bold">
                  74G-18 123.78
                </div>
                <div className="bike-address text-sm">Yamaha</div>
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
