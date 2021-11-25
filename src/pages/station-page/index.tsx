import { Button, Modal, Tag, Pagination, Divider } from "antd";
import { useMutation, useQuery } from "react-query";
import { useToggle } from "src/hooks/useToggle";
import { Station, stationQueryFns } from "src/services/api/station";
import { BiikeStationModal } from "src/organisms/station-modal";
import { BiikeStationDetailModal } from "src/organisms/station-detail-modal";
import "./index.scss";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useState } from "react";

interface StationDetailModal {
  openId: number;
  data?: Station;
}

interface BiikeStationPageProps {}

export const BiikeStationPage = (props: BiikeStationPageProps) => {
  // paging
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 10,
  });

  const { data, isFetching, refetch } = useQuery(
    ["stations", pagination.page, pagination.pageSize],
    () =>
      stationQueryFns.stations({
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

  // create
  const [isCreateStationModalVisible, toggleCreateStationModalVisible] =
    useToggle(false);

  const createStationMutation = useMutation(stationQueryFns.createStation);

  const handleCreateStation = (
    values: any,
    closeModalCallback?: () => void
  ) => {
    createStationMutation.mutateAsync(values).then((res) => {
      if (res.data) {
        closeModalCallback?.();
        refetch();
      }
    });
  };

  // update
  const [stationDetailModal, setStationDetailModal] =
    useState<StationDetailModal>({
      openId: -1,
    });

  const toggleStationDetailModalVisible = (openId: number) => {
    setStationDetailModal((prev) => ({
      ...prev,
      openId: prev.openId === openId ? -1 : openId,
    }));
  };

  const openStationDetailModal = (data: Station) => {
    setStationDetailModal({ openId: data.stationId, data });
  };

  const updateStationMutation = useMutation(stationQueryFns.updateStation);

  const handleUpdateStation = (
    id: number,
    values: any,
    closeModalCallback?: () => void
  ) => {
    updateStationMutation.mutateAsync([id, values]).then((res) => {
      closeModalCallback?.();
      refetch();
    });
  };

  // delete
  const deleteStationMutation = useMutation(stationQueryFns.deleteStation);

  const handleDeleteStation = (station: Station) => {
    Modal.confirm({
      type: "confirm",
      title: `Are you sure to change ${station.name}?`,
      onOk: () => {
        deleteStationMutation.mutateAsync(station.stationId).then((res) => {
          console.log("delete ok!");
          refetch();
        });
      },
    });
  };

  return (
    <div className="biike-station-page">
      <div className="biike-station-tools mb-8">
        <Button
          type="primary"
          className="rounded "
          onClick={toggleCreateStationModalVisible}
        >
          Thêm trạm
        </Button>
      </div>

      <BiikeStationModal
        visibleManage={[
          isCreateStationModalVisible,
          toggleCreateStationModalVisible,
        ]}
        onOk={handleCreateStation}
      />

      <div className="biike-station-content">
        {data?.data.map((station, index) => (
          <div key={index} className="station-item bg-white rounded px-8 py-4 ">
            <div className="item-details text-gray-500 ">
              <div className="station-name text-base font-bold">
                {station.name}{" "}
                {station.isDeleted === false ? (
                  <Tag color="success">Đang hoạt động</Tag>
                ) : (
                  <Tag color="error">Tạm dừng</Tag>
                )}
              </div>

              <div className="station-address text-sm">
                <EnvironmentOutlined /> {station.address}
              </div>
            </div>
            <div className="item-tools">
              <Button
                type="primary"
                className="rounded"
                onClick={() => openStationDetailModal(station)}
              >
                Xem
              </Button>

              {station.isDeleted === true ? (
                <Button
                  type="default"
                  className="rounded"
                  onClick={() => handleDeleteStation(station)}
                >
                  Kích hoạt
                </Button>
              ) : (
                <Button
                  type="primary"
                  danger
                  className="rounded"
                  onClick={() => handleDeleteStation(station)}
                >
                  Tạm dừng
                </Button>
              )}
            </div>
          </div>
        ))}
        <BiikeStationDetailModal
          visibleManage={[
            stationDetailModal.openId === stationDetailModal.data?.stationId,
            toggleStationDetailModalVisible,
          ]}
          station={stationDetailModal.data}
          onOk={handleUpdateStation}
          isUpdating={updateStationMutation.isLoading}
        />
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
