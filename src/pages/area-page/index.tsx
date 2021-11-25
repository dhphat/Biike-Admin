import { Select, Button } from "antd";
import "./index.scss";

interface BiikeAreaPageProps {}

export const BiikeAreaPage = (props: BiikeAreaPageProps) => {
  return (
    <div className="biike-area-page">
      <div className="biike-area-tools mb-8">
        {/* <Button type="primary" className="rounded ">
          Thêm khu vực
        </Button> */}
      </div>
      <div className="biike-area-content">
        <div className="area-item bg-white rounded px-8 py-4 ">
          <div className="item-details text-gray-500 text-base font-bold">
            Đại học FPT TP.HCM
          </div>
          {/* <div className="item-tools">
            <Button type="primary" className="rounded">
              Xem
            </Button>
            <Button type="primary" danger className="rounded">
              Tạm dừng
            </Button>
          </div> */}
        </div>
        <div className="area-item bg-white rounded px-8 py-4 ">
          <span className="text-gray-500">
            Biiké hiện tại đang triển khai thử nghiệm tại khu vực Trường Đại học
            FPT TP.HCM. Việc mở rộng triển khai tại khu vực khác sẽ được lên kế
            hoạch thực hiện sau khi hoàn thiện thử nghiệm.
          </span>
        </div>
      </div>
    </div>
  );
};
