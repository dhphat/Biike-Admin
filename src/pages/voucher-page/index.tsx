import { CaretDownOutlined } from "@ant-design/icons";
import { Select, Button, Input, Image } from "antd";
import { useQuery } from "react-query";
import { voucherQueryFns } from "src/services/api/voucher";
import "./index.scss";

interface BiikeVoucherPageProps {}

export const BiikeVoucherPage = (props: BiikeVoucherPageProps) => {
  const { data, isFetching } = useQuery(["vouchers"], () =>
    voucherQueryFns.vouchers({ page: 1, limit: 10 })
  );

  return (
    <div className="biike-voucher-page px-4">
      <div className="biike-voucher-tools">
        <Select
          suffixIcon={<CaretDownOutlined className="text-gray-500" />}
          defaultValue="all"
          options={[{ label: "Tất cả", value: "all" }]}
        />
        <Button type="primary" className="ml-auto rounded">
          Thêm voucher
        </Button>
      </div>
      <div className="biike-voucher-content mt-4">
        {data?.data.map((voucher) => (
          <div className="voucher-item bg-white content-center rounded">
            <Image
              preview={false}
              height={140}
              className="voucher-image rounded"
              src="https://cdn2.yame.vn/cimg/images/f7fbd2bf-4fca-0100-4145-00186cf38d33.jpg"
            />
            <div className="item-details text-gray-500 ml-8">
              <div className="voucher-name text-base font-bold">
                {voucher.voucherName}
              </div>
              <div className="voucher-email text-sm">{voucher.brand}</div>
              <div className="voucher-phone text-sm">
                Điểm đổi: {voucher.amountOfPoint}
              </div>
              <div className="voucher-phone text-sm">
                Còn lại: {voucher.remaining}
              </div>
            </div>
            <div className="item-tools ml-auto mr-8">
              <Button type="primary" className="rounded">
                Code list
              </Button>
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
