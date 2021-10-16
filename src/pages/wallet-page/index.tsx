import { Select, Button } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import "./index.scss";

interface BiikeWalletPageProps {}

export const BiikeWalletPage = (props: BiikeWalletPageProps) => {
  return (
    <div className="biike-wallet-page px-4">
      <div className="biike-wallet-tools">
        <Select
          suffixIcon={<CaretDownOutlined className="text-gray-500" />}
          defaultValue="notApprovedYet"
          options={[{ label: "Tháng 9/2021", value: "notApprovedYet" }]}
        />
      </div>
      <div className="biike-wallet-content mt-4">
        <div className="wallet-item bg-white px-8 py-4 content-center">
          <div className="item-details text-gray-500 mb-1">
            <div className="item-details text-gray-500 ">
              <div className="wallet-name text-base font-bold">+ 20.000 đ</div>
              <div className="wallet-address text-sm">Đỗ Hữu Phát</div>
              <div className="wallet-address text-sm">MOMO1826389384762</div>
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
        <div className="wallet-item bg-white px-8 py-4 content-center">
          <div className="item-details text-gray-500 mb-1">
            <div className="item-details text-gray-500 ">
              <div className="wallet-name text-base font-bold">+ 20.000 đ</div>
              <div className="wallet-address text-sm">Đỗ Hữu Phát</div>
              <div className="wallet-address text-sm">MOMO1826389384762</div>
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
        <div className="wallet-item bg-white px-8 py-4 content-center">
          <div className="item-details text-gray-500 mb-1">
            <div className="item-details text-gray-500 ">
              <div className="wallet-name text-base font-bold">+ 20.000 đ</div>
              <div className="wallet-address text-sm">Đỗ Hữu Phát</div>
              <div className="wallet-address text-sm">MOMO1826389384762</div>
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
        <div className="wallet-item bg-white px-8 py-4 content-center">
          <div className="item-details text-gray-500 mb-1">
            <div className="item-details text-gray-500 ">
              <div className="wallet-name text-base font-bold">+ 20.000 đ</div>
              <div className="wallet-address text-sm">Đỗ Hữu Phát</div>
              <div className="wallet-address text-sm">MOMO1826389384762</div>
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
        <div className="wallet-item bg-white px-8 py-4 content-center">
          <div className="item-details text-gray-500 mb-1">
            <div className="item-details text-gray-500 ">
              <div className="wallet-name text-base font-bold">+ 20.000 đ</div>
              <div className="wallet-address text-sm">Đỗ Hữu Phát</div>
              <div className="wallet-address text-sm">MOMO1826389384762</div>
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
