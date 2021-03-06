import { Select, Button, Tag, Pagination, Divider } from "antd";
import {
  CaretDownOutlined,
  FieldNumberOutlined,
  IdcardOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Bike, bikeQueryFns } from "src/services/api/bike";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import { BiikeBikeDetailModal } from "src/organisms/bike-detail-modal";
import { BIKE_STATUS } from "src/utils/constants";
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
    pageSize: 10,
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

  const updateBikeMutation = useMutation(bikeQueryFns.updateBike);

  const handleUpdateBike = (
    id: number,
    values: any,
    closeModalCallback?: () => void
  ) => {
    updateBikeMutation.mutateAsync([id, values]).then((res) => {
      closeModalCallback?.();
      refetch();
    });
  };

  return (
    <div className="biike-bike-page px-4">
      {/* <div className="biike-bike-tools">
        <Select
          suffixIcon={<CaretDownOutlined className="text-gray-500" />}
          defaultValue="all"
          options={[
            { label: "T???t c???", value: "all" },
            { label: "Ch??a x??c minh", value: "notApprovedYet" },
            { label: "???? x??c minh h???p l???", value: "approved" },
            { label: "???? x??c minh kh??ng h???p l???", value: "block" },
          ]}
        />
      </div> */}
      <div className="biike-bike-content mt-4">
        {data?.data.map((bike) => (
          <div className="bike-item bg-white px-8 py-4 content-center">
            <div className="item-details text-gray-500 mb-1">
              <div className="item-details text-gray-500 ">
                <div className="bike-name text-base font-bold">
                  <FieldNumberOutlined /> {bike.plateNumber}{" "}
                  {bike.bikeStatus == BIKE_STATUS.UN_VERIFIED && (
                    <Tag color="processing">Ch??a x??c minh</Tag>
                  )}
                  {bike.bikeStatus == BIKE_STATUS.SUCCESS_VERIFIED && (
                    <Tag color="success">???? x??c minh h???p l???</Tag>
                  )}
                  {bike.bikeStatus == BIKE_STATUS.FAIL_VERIFIED && (
                    <Tag color="error">???? x??c minh kh??ng h???p l???</Tag>
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
                onOk={handleUpdateBike}
              />
              {/* <Button type="primary" danger className="rounded">
                X??a
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
