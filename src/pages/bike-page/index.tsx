import { Select, Button } from "antd";
import {
  CaretDownOutlined,
  FieldNumberOutlined,
  IdcardOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { bikeQueryFns } from "src/services/api/bike";
import { useQuery } from "react-query";

import "./index.scss";

interface BiikeBikePageProps {}

export const BiikeBikePage = (props: BiikeBikePageProps) => {
  const { data, isFetching } = useQuery(["bikes"], () =>
    bikeQueryFns.bikes({ page: 1, limit: 10 })
  );

  return (
    <div className="biike-bike-page px-4">
      <div className="biike-bike-tools">
        <Select
          suffixIcon={<CaretDownOutlined className="text-gray-500" />}
          defaultValue="all"
          options={[
            { label: "Tất cả", value: "all" },
            { label: "Chưa xác minh", value: "notApprovedYet" },
            { label: "Đã xác minh hợp lệ", value: "approved" },
            { label: "Đã xác minh không hợp lệ", value: "block" },
          ]}
        />
      </div>
      <div className="biike-bike-content mt-4">
        {data?.data.map((bike) => (
          <div className="bike-item bg-white px-8 py-4 content-center">
            <div className="item-details text-gray-500 mb-1">
              <div className="item-details text-gray-500 ">
                <div className="bike-name text-base font-bold">
                  <FieldNumberOutlined /> {bike.plateNumber}
                </div>
                <div className="bike-address text-sm">
                  <IdcardOutlined /> {bike.bikeOwner}
                </div>
                <div className="bike-address text-sm">
                  <TagOutlined /> {bike.brand}
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
        ))}
      </div>
    </div>
  );
};
