import { Button, Modal, Table, Tag } from "antd";
import { useMutation, useQuery } from "react-query";
import { useToggle } from "src/hooks/useToggle";
import { Trip, tripQueryFns } from "src/services/api/trip";
import { BiikeTripDetailModal } from "src/organisms/trip-detail-modal";
import "./index.scss";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useState } from "react";

interface TripDetailModal {
  openId: number;
  data?: Trip;
}

interface BiikeTripPageProps {}

export const BiikeTripPage = (props: BiikeTripPageProps) => {
  const { data, isFetching, refetch } = useQuery(["trips"], () =>
    tripQueryFns.trips({ page: 1, limit: 10 })
  );

  let dataSource: readonly any[] | undefined = [];
  data?.data.map(
    (trip, index) =>
      (dataSource = [
        {
          keerId: trip.keerId,
          bikerId: trip.bikerId,
          routeId: trip.routeId,

          createdDate: trip.createdDate,
          bookTime: trip.bookTime,
          status: trip.status,
          isScheduled: trip.isScheduled,
        },
      ])
  );

  const columns = [
    {
      title: "Keer",
      dataIndex: "keerId",
    },
    {
      title: "Biker",
      dataIndex: "bikerId",
    },
    {
      title: "Từ",
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
    },
    {
      title: "Loại",
      dataIndex: "isScheduled",
    },
  ];

  return (
    <div className="biike-trip-page">
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};
