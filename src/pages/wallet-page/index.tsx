import { Select, Button, Divider, Pagination, Typography, Tag } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "react-query";
import { Transaction, transactionQueryFns } from "src/services/api/transaction";
import { useState } from "react";
import "./index.scss";

interface BiikeWalletPageProps {}

export const BiikeWalletPage = (props: BiikeWalletPageProps) => {
  // paging
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 10,
  });

  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
      ...(pageSize !== prev.pageSize ? { pageSize, page: 1 } : {}),
    }));
  };

  const { data, isFetching, refetch } = useQuery(
    ["users", pagination.page, pagination.pageSize],
    () =>
      transactionQueryFns.transactions({
        page: pagination.page,
        limit: pagination.pageSize,
      }),
    {
      onSuccess: (data) => {
        setPagination((prev) => ({ ...prev, total: data._meta.totalRecord }));
      },
    }
  );

  const { Text } = Typography;
  total: Number;

  return (
    <div className="biike-wallet-page px-4">
      {/* <div className="biike-wallet-tools">
        <Select
          suffixIcon={<CaretDownOutlined className="text-gray-500" />}
          defaultValue="notApprovedYet"
          options={[{ label: "Tháng 9/2021", value: "notApprovedYet" }]}
        />
      </div> */}
      <div className="biike-wallet-content mt-4">
        {data?.data.map((transaction, index) => (
          <div
            key={index}
            className="wallet-item bg-white px-8 py-4 content-center"
          >
            <div className="item-details text-gray-500 mb-1">
              <div className="item-details text-gray-500 ">
                <div className="wallet-name text-base font-bold ">
                  <Text type="success">+ {transaction.amount}đ </Text>
                  <Tag color="magenta">MOMO</Tag>
                </div>
                <div className="wallet-address text-sm">
                  User ID: {transaction.userId}
                </div>
                <div className="wallet-address text-sm">
                  Mã giao dịch: {transaction.transactionId}
                </div>
                <div className="wallet-address text-sm">
                  Mã đơn hàng: {transaction.orderId}
                </div>
              </div>
            </div>
            {/* <div className="item-tools">
            <Button type="primary" className="rounded">
              Xem
            </Button>
            <Button type="primary" className="rounded">
              Sửa
            </Button>
            <Button type="primary" danger className="rounded">
              Xóa
            </Button>
          </div> */}
          </div>
        ))}
        <Divider />
        <Pagination
          current={pagination.page}
          pageSize={pagination.pageSize}
          onChange={handlePageChange}
          total={pagination.total}
        />
      </div>
    </div>
  );
};
