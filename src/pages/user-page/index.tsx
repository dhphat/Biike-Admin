import { Select, Button, Input } from "antd";
import "./index.scss";

interface BiikeUserPageProps {}

export const BiikeUserPage = (props: BiikeUserPageProps) => {
  return (
    <div className="biike-user-page px-4">
      <div className="biike-user-tools">
        <Input
          placeholder="Nhập tên, email, số điện thoại"
          className="max-w-sm rounded min-h-10"
        />
        <Button type="primary" value="large" className="rounded px-8 min-h-10">
          Tìm kiếm
        </Button>
      </div>
      <div className="biike-user-content mt-4">
        <div className="user-item bg-white px-8 py-4 content-center">
          <div className="item-details text-gray-500 mb-1">
            <div className="user-name text-base font-bold">Đỗ Hữu Phát</div>
            <div className="user-email text-sm">phatdhse62586@fpt.edu.vn</div>
            <div className="user-phone text-sm">0348669124</div>
          </div>
          <div className="item-tools">
            <Button type="primary" className="rounded">
              Xem
            </Button>
          </div>
        </div>
      </div>
      <div className="biike-user-content mt-4">
        <div className="user-item bg-white px-8 py-4 content-center">
          <div className="item-details text-gray-500 mb-1">
            <div className="user-name text-base font-bold">Đỗ Hữu Phát</div>
            <div className="user-email text-sm">phatdhse62586@fpt.edu.vn</div>
            <div className="user-phone text-sm">0348669124</div>
          </div>
          <div className="item-tools">
            <Button type="primary" className="rounded">
              Xem
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
