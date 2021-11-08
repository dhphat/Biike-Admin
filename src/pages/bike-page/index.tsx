import { Select, Button, Tag, Pagination, Divider } from "antd";
import {
  CaretDownOutlined,
  FieldNumberOutlined,
  IdcardOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Bike, bikeQueryFns } from "src/services/api/bike";
import { useQuery } from "react-query";
import { useState } from "react";
import { BiikeBikeDetailModal } from "src/organisms/bike-detail-modal";

import "./index.scss";

interface BikeDetailModal {
  openId: number;
  data?: Bike;
}
interface BiikeBikePageProps {}

export const BiikeBikePage = (props: BiikeBikePageProps) => {
  // paging
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    total: 10,
  });

  const { data, isFetching, refetch } = useQuery(
    ["bikes", pagination.page, pagination.pageSize],
    () =>
      bikeQueryFns.bikes({
        page: pagination.page,
        limit: pagination.pageSize,
      }),
    {
      onSuccess: (data) => {
        setPagination((prev) => ({ ...prev, total: data._meta.totalRecord }));
      },
    }
  );

  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
      ...(pageSize !== prev.pageSize ? { pageSize, page: 1 } : {}),
    }));
  };

  // view
  const [bikeDetailModal, setBikeDetailModal] = useState<BikeDetailModal>({
    openId: -1,
  });

  const toggleBikeDetailModalVisible = (openId: number) => {
    setBikeDetailModal((prev) => ({
      ...prev,
      openId: prev.openId === openId ? -1 : openId,
    }));
  };

  const openBikeDetailModal = (data: Bike) => {
    setBikeDetailModal({ openId: data.bikeId, data });
  };

  return (
    <div className="biike-bike-page px-4">
      <div className="biike-bike-tools">
        <Select
          suffixIcon={<CaretDownOutlined className="text-gray-500" />}
          defaultValue="all"
          options={[
            { label: "Tất cả", value: "all" },
            { label: "Chưa xác minh", value: "notApprovedYet" },
            { label: "Đã xác minh hợp lệ", value: "approved" },
            { label: "Đã xác minh không hợp lệ", value: "block" },
          ]}
        />
      </div>
      <div className="biike-bike-content mt-4">
        {data?.data.map((bike) => (
          <div className="bike-item bg-white px-8 py-4 content-center">
            <div className="item-details text-gray-500 mb-1">
              <div className="item-details text-gray-500 ">
                <div className="bike-name text-base font-bold">
                  <FieldNumberOutlined /> {bike.plateNumber}{" "}
                  {true === true && (
                    <Tag color="success">Đã xác minh hợp lệ</Tag>
                  )}
                </div>
                <div className="bike-address text-sm">
                  <IdcardOutlined /> {bike.bikeOwner}
                </div>
                <div className="bike-address text-sm">
                  <TagOutlined /> {bike.brand}
                </div>
              </div>
            </div>
            <div className="item-tools">
              <Button
                type="primary"
                className="rounded"
                onClick={() => openBikeDetailModal(bike)}
              >
                Xem
              </Button>
              <BiikeBikeDetailModal
                visibleManage={[
                  bikeDetailModal.openId === bike.bikeId,
                  toggleBikeDetailModalVisible,
                ]}
                bike={bike}
              />
              {/* <Button type="primary" danger className="rounded">
                Xóa
              </Button> */}
            </div>
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
