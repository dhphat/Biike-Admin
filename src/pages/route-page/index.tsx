import {
  AimOutlined,
  EnvironmentOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useQuery } from "react-query";
import { routeQueryFns } from "src/services/api/route";
import { BiikeRouteModal } from "src/organisms/route-modal";
import { BiikeRouteDetailModal } from "src/organisms/route-detail-modal";

import "./index.scss";
import { useToggle } from "src/hooks/useToggle";

interface BiikeRoutePageProps {}

export const BiikeRoutePage = (props: BiikeRoutePageProps) => {
  const { data, isFetching } = useQuery(["routes"], () =>
    routeQueryFns.routes({ page: 1, limit: 10 })
  );

  const [isRouteModalVisible, toggleRouteModalVisible] = useToggle(false);
  const [isRouteDetailModalVisible, toggleRouteDetailModalVisible] =
    useToggle(false);

  const handleSubmitModal = (values: any, closeModalCallback?: () => void) => {
    console.log(values);
    closeModalCallback?.();
  };

  return (
    <div className="biike-route-page">
      <div className="biike-route-tools mb-8">
        <Button
          type="primary"
          className="rounded "
          onClick={toggleRouteModalVisible}
        >
          Thêm tuyến
        </Button>
      </div>

      <BiikeRouteModal
        visibleManage={[isRouteModalVisible, toggleRouteModalVisible]}
        onOk={handleSubmitModal}
      />

      <BiikeRouteDetailModal
        visibleManage={[
          isRouteDetailModalVisible,
          toggleRouteDetailModalVisible,
        ]}
        onOk={handleSubmitModal}
      />

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
              <Button
                type="primary"
                className="rounded"
                onClick={toggleRouteDetailModalVisible}
              >
                Xem
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
