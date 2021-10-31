import { Button } from "antd";
import { useQuery } from "react-query";
import { useToggle } from "src/hooks/useToggle";
import { stationQueryFns } from "src/services/api/station";
import { BiikeRouteModal } from "src/organisms/route-modal";
import "./index.scss";
import { EnvironmentOutlined } from "@ant-design/icons";

interface BiikeStationPageProps {}

export const BiikeStationPage = (props: BiikeStationPageProps) => {
  const { data, isFetching } = useQuery(["stations"], () =>
    stationQueryFns.stations({ page: 1, limit: 10 })
  );

  const [isRouteModalVisible, toggleRouteModalVisible] = useToggle(false);

  const handleSubmitModal = (values: any, closeModalCallback?: () => void) => {
    console.log(values);
    closeModalCallback?.();
  };

  return (
    <div className="biike-station-page">
      <div className="biike-station-tools mb-8">
        <Button
          type="primary"
          className="rounded "
          onClick={toggleRouteModalVisible}
        >
          Thêm trạm
        </Button>
      </div>

      <BiikeRouteModal
        visibleManage={[isRouteModalVisible, toggleRouteModalVisible]}
        onOk={handleSubmitModal}
      />

      <div className="biike-station-content">
        {data?.data.map((station) => (
          <div className="station-item bg-white rounded px-8 py-4 ">
            <div className="item-details text-gray-500 ">
              <div className="route-name text-base font-bold">
                {station.name}
              </div>

              <div className="route-address text-sm">
                <EnvironmentOutlined /> {station.address}
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
