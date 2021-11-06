import { Button, Modal, Table, Tag, TableColumnsType, Space } from "antd";
import { useMutation, useQuery } from "react-query";
import { useToggle } from "src/hooks/useToggle";
import { Trip, tripQueryFns } from "src/services/api/trip";
import { BiikeTripDetailModal } from "src/organisms/trip-detail-modal";
import "./index.scss";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useState } from "react";
import { TRIP_STATUS } from "src/utils/constants";

const columns: TableColumnsType<Trip> = [
  {
    title: "Keer",
    dataIndex: "keerId",
  },
  {
    title: "Biker",
    dataIndex: "bikerId",
  },
  {
    title: "Tuyến",
    dataIndex: "routeId",
  },
  {
    title: "Thời gian tạo",
    dataIndex: "createdDate",
  },
  {
    title: "Lịch chuyến",
    dataIndex: "bookTime",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    render: (status: Trip["status"]) => TRIP_STATUS[status] || status,
  },
  {
    title: "Loại",
    dataIndex: "isScheduled",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>Xem</a>
      </Space>
    ),
  },
];

interface TripDetailModal {
  openId: number;
  data?: Trip;
}

interface BiikeTripPageProps {}

export const BiikeTripPage = (props: BiikeTripPageProps) => {
  const { data, isFetching, refetch } = useQuery(["trips"], () =>
    tripQueryFns.trips({ page: 1, limit: 10 })
  );

  const [tripDetailModal, setTripDetailModal] = useState<TripDetailModal>({
    openId: -1,
  });

  const toggleTripDetailModalVisible = (openId: number) => {
    setTripDetailModal((prev) => ({
      ...prev,
      openId: prev.openId === openId ? -1 : openId,
    }));
  };

  const openTripDetailModal = (data: Trip) => {
    setTripDetailModal({ openId: data.tripId, data });
  };

  return (
    <div className="biike-trip-page">
      <Table
        dataSource={data?.data.map((trip, index) => ({
          key: index,
          keerId: trip.keerId,
          bikerId: trip.bikerId,
          routeId: trip.routeId,
          createdDate: trip.createdDate,
          bookTime: trip.bookTime,
          status: trip.status,
          isScheduled: trip.isScheduled,
        }))}
        columns={columns}
      />
      ;
    </div>
  );
};
