import { Button } from "antd";
import { useToggle } from "src/hooks/useToggle";
import { BiikeRouteModal } from "src/organisms/route-modal";
import "./index.scss";

interface BiikeRoutePageProps {}

export const BiikeRoutePage = (props: BiikeRoutePageProps) => {
  const [isRouteModalVisible, toggleRouteModalVisible] = useToggle(false);

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
          Thêm trạm
        </Button>
      </div>
      <BiikeRouteModal
        visibleManage={[isRouteModalVisible, toggleRouteModalVisible]}
        onOk={handleSubmitModal}
      />
      <div className="biike-route-content">
        <div className="route-item bg-white rounded px-8 py-4 ">
          <div className="item-details text-gray-500 ">
            <div className="route-name text-base font-bold">
              Đại học FPT TP.HCM
            </div>
            <div className="route-address text-sm">
              Lô E2a/7, đường D1, khu Công nghệ cao, P.Long Thạnh Mỹ, Tp.Thủ
              Đức, TP.HCM
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
        <div className="route-item bg-white rounded px-8 py-4 ">
          <div className="item-details text-gray-500 ">
            <div className="route-name text-base font-bold">
              Đại học FPT TP.HCM
            </div>
            <div className="route-address text-sm">
              Lô E2a/7, đường D1, khu Công nghệ cao, P.Long Thạnh Mỹ, Tp.Thủ
              Đức, TP.HCM
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
        <div className="route-item bg-white rounded px-8 py-4 ">
          <div className="item-details text-gray-500 ">
            <div className="route-name text-base font-bold">
              Đại học FPT TP.HCM
            </div>
            <div className="route-address text-sm">
              Lô E2a/7, đường D1, khu Công nghệ cao, P.Long Thạnh Mỹ, Tp.Thủ
              Đức, TP.HCM
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
