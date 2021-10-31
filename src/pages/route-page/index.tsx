import {
  AimOutlined,
  EnvironmentOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useQuery } from "react-query";
import { routeQueryFns } from "src/services/api/route";
import "./index.scss";

interface BiikeRoutePageProps {}

export const BiikeRoutePage = (props: BiikeRoutePageProps) => {
  const { data, isFetching } = useQuery(["routes"], () =>
    routeQueryFns.routes({ page: 1, limit: 10 })
  );

  return (
    <div className="biike-route-page">
      <div className="biike-route-tools mb-8">
        <Button type="primary" className="rounded ">
          Thêm tuyến
        </Button>
      </div>

      <div className="biike-route-content">
        {data?.data.map((route) => (
          <div className="route-item bg-white rounded px-8 py-4 ">
            <div className="item-details text-gray-500 ">
              <div className="route-name text-base font-bold">
                <AimOutlined /> {route.departureName}
              </div>
              <MoreOutlined />
              <div className="route-name text-base font-bold">
                <EnvironmentOutlined /> {route.destinationName}
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
