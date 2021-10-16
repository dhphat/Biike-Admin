import { Select, Button, Input } from "antd";
import "./index.scss";

interface BiikeAdminPageProps {}

export const BiikeAdminPage = (props: BiikeAdminPageProps) => {
  return (
    <div className="biike-admin-page px-4">
      <div className="biike-admin-tools">
        <Button type="primary" className="rounded ">
          Thêm
        </Button>
      </div>
      <div className="biike-admin-content mt-4">
        <div className="admin-item bg-white px-8 py-4 content-center">
          <div className="item-details text-gray-500 mb-1">
            <div className="admin-name text-base font-bold">Đỗ Hữu Phát</div>
            <div className="admin-email text-sm">phatdhse62586@fpt.edu.vn</div>
            <div className="admin-phone text-sm">Admin</div>
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

        <div className="admin-item bg-white px-8 py-4 content-center">
          <div className="item-details text-gray-500 mb-1">
            <div className="admin-name text-base font-bold">Thảo Vân</div>
            <div className="admin-email text-sm">thaovanse62586@fpt.edu.vn</div>
            <div className="admin-phone text-sm">Moderator</div>
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

        <div className="admin-item bg-white px-8 py-4 content-center">
          <div className="item-details text-gray-500 mb-1">
            <div className="admin-name text-base font-bold">Hải Triều</div>
            <div className="admin-email text-sm">haitrieu62586@fpt.edu.vn</div>
            <div className="admin-phone text-sm">Admin</div>
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
