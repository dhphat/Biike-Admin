import { Select, Button } from "antd";
import "./index.scss";

interface BiikeAreaPageProps {}

export const BiikeAreaPage = (props: BiikeAreaPageProps) => {
  return (
    <div className="biike-area-page">
      <div className="biike-area-tools mb-8">
        <Button type="primary" className="rounded ">
          Thêm khu vực
        </Button>
      </div>
      <div className="biike-area-content">
        <div className="area-item bg-white rounded px-8 py-4 ">
          <div className="item-details text-gray-500 text-base font-bold">
            Đại học FPT TP.HCM
          </div>
          <div className="item-tools">
            <Button type="primary" className="rounded">
              Xem
            </Button>
            <Button type="primary" danger className="rounded">
              Tạm dừng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
