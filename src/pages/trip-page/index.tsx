import {
  Table,
  TableColumnsType,
  Space,
  Tag,
  Button,
  Pagination,
  Divider,
} from "antd";
import { useQuery } from "react-query";
import { Trip, tripQueryFns } from "src/services/api/trip";
import { BiikeTripDetailModal } from "src/organisms/trip-detail-modal";
import "./index.scss";
import { useState } from "react";
import { TRIP_STATUS } from "src/utils/constants";
import moment from "moment";
import {
  CaretRightOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const initColumns: TableColumnsType<Trip> = [
  {
    title: "ID",
    dataIndex: "tripId",
  },
  {
    title: "Keer",
    dataIndex: "keerFullname",
  },
  {
    title: "Biker",
    dataIndex: "bikerFullname",
  },
  {
    title: "Điểm đi",
    dataIndex: "departureStationName",
  },
  {
    title: "Điểm đến",
    dataIndex: "destinationStationName",
  },
  {
    title: "Thời gian tạo",
    dataIndex: "createdDate",
    render: (bookTime: string) => moment(bookTime).format("DD/MM/YYYY HH:mm"),
  },
  {
    title: "Lịch chuyến",
    dataIndex: "bookTime",
    render: (bookTime: string) => moment(bookTime).format("DD/MM/YYYY HH:mm"),
  },
  {
    title: "Loại",
    dataIndex: "isScheduled",
    render: (isScheduled: Trip["isScheduled"]) => (
      <div className="bike-name text-base">
        {isScheduled == true && <Tag color="#f50">Đặt lịch</Tag>}
        {isScheduled == false && <Tag color="#108ee9">Ké now</Tag>}
      </div>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    render: (status: Trip["status"]) => (
      // <Tag color="blue" key={status}>
      //   {TRIP_STATUS[status] || status}
      // </Tag>
      <div className="bike-name text-base">
        {TRIP_STATUS[status] == "FINDING" && (
          <Tag icon={<SyncOutlined spin />} color="processing">
            Đang tìm
          </Tag>
        )}
        {TRIP_STATUS[status] == "MATCHED" && (
          <Tag icon={<ExclamationCircleOutlined />} color="warning">
            Đã ghép
          </Tag>
        )}
        {TRIP_STATUS[status] == "WAITING" && (
          <Tag icon={<ClockCircleOutlined />} color="default">
            Đang chờ
          </Tag>
        )}
        {TRIP_STATUS[status] == "STARTED" && (
          <Tag icon={<CaretRightOutlined />} color="purple">
            Đã bắt đầu
          </Tag>
        )}
        {TRIP_STATUS[status] == "FINISHED" && (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Hoàn thành
          </Tag>
        )}
        {TRIP_STATUS[status] == "CANCELED" && (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Đã hủy
          </Tag>
        )}
      </div>
    ),
  },
];

interface TripDetailModal {
  openId: number;
  data?: Trip;
}

interface BiikeTripPageProps {}

export const BiikeTripPage = (props: BiikeTripPageProps) => {
  // paging
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 10,
  });

  const { data, isFetching, refetch } = useQuery(
    ["trips", pagination.page, pagination.pageSize],
    () =>
      tripQueryFns.trips({
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

  const columns: TableColumnsType<Trip> = [
    ...initColumns,
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => openTripDetailModal(record)}>
          Xem
        </Button>
      ),
    },
  ];

  return (
    <div className="biike-trip-page">
      <Table
        dataSource={data?.data}
        rowKey={({ tripId }) => tripId}
        columns={columns}
        pagination={false}
      />
      <BiikeTripDetailModal
        visibleManage={[
          tripDetailModal.openId === tripDetailModal.data?.tripId,
          toggleTripDetailModalVisible,
        ]}
        trip={tripDetailModal.data}
      />
      <Divider />
      <Pagination
        current={pagination.page}
        pageSize={pagination.pageSize}
        onChange={handlePageChange}
        total={pagination.total}
      />
    </div>
  );
};
