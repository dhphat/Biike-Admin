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
      okText: "T???m d???ng tr???m",
      cancelText: "Tho??t",
      type: "confirm",
      title: `B???n c?? ch???c ch???n mu???n t???m d???ng tr???m ${station.name}?`,
      onOk: () => {
        deleteStationMutation.mutateAsync(station.stationId).then((res) => {
          console.log("delete ok!");
          refetch();
        });
      },
    });
  };

  const handleUnlockStation = (station: Station) => {
    Modal.confirm({
      okText: "K??ch ho???t tr???m",
      cancelText: "Tho??t",
      type: "confirm",
      title: `B???n c?? ch???c ch???n mu???n k??ch hoat tr???m ${station.name}?`,
      onOk: () => {
        deleteStationMutation.mutateAsync(station.stationId).then((res) => {
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
          Th??m tr???m
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
              <div className="user-email text-sm">ID: {station.stationId}</div>
              <div className="station-name text-base font-bold">
                {station.name}{" "}
                {station.isDeleted === false ? (
                  <Tag color="success">??ang ho???t ?????ng</Tag>
                ) : (
                  <Tag color="error">T???m d???ng</Tag>
                )}{" "}
                {station.isCentralPoint === true && (
                  <Tag color="blue">Tr???m ch??nh</Tag>
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
              {station.isCentralPoint === false && (
                <div>
                  {station.isDeleted === true ? (
                    <Button
                      type="default"
                      className="rounded"
                      onClick={() => handleUnlockStation(station)}
                    >
                      K??ch ho???t
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      danger
                      className="rounded"
                      onClick={() => handleDeleteStation(station)}
                    >
                      T???m d???ng
                    </Button>
                  )}
                </div>
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
