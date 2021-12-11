import { Button, Col, Divider, Form, Modal, Row, Tag, Timeline } from "antd";
import { useEffect } from "react";
import { Trip } from "src/services/api/trip";
import moment from "moment";
import "./index.scss";
import {
  CaretRightOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

interface BiikeTripDetailModalProps {
  visibleManage: [boolean, (openID: number) => void];
  trip?: Trip;
  onOk?: (id: number, data: any, closeModalCallback?: () => void) => void;
  isUpdating?: boolean;
}

export const BiikeTripDetailModal = ({
  visibleManage,
  trip,
  onOk,
}: BiikeTripDetailModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();
  // const [tripData, settripData] = useState(initialState)

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(trip);
    }
  }, [visible]);

  const handleCloseModal = () => {
    trip && toggleVisible(trip.tripId);
  };

  const handleSubmitForm = (values: any) => {
    trip && onOk?.(trip.tripId, values, handleCloseModal);
  };

  return (
    <Modal
      className="biike-user-detail-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="user-detail-modal-content">
          <Row gutter={16}>
            <Col span={12}>
              <div className=" text-sm">
                <span className="text-gray-500">ID: {trip?.tripId}</span>
              </div>

              {trip?.isScheduled == true && <Tag color="#f50">Đặt lịch</Tag>}
              {trip?.isScheduled == false && <Tag color="#108ee9">Ké now</Tag>}

              {trip?.status == 1 && (
                <Tag icon={<SyncOutlined spin />} color="processing">
                  Đang tìm
                </Tag>
              )}
              {trip?.status == 2 && (
                <Tag icon={<ExclamationCircleOutlined />} color="warning">
                  Đã ghép
                </Tag>
              )}
              {trip?.status == 3 && (
                <Tag icon={<ClockCircleOutlined />} color="default">
                  Đang chờ
                </Tag>
              )}
              {trip?.status == 4 && (
                <Tag icon={<CaretRightOutlined />} color="purple">
                  Đã bắt đầu
                </Tag>
              )}
              {trip?.status == 5 && (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Hoàn thành
                </Tag>
              )}
              {trip?.status == 6 && (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  Đã hủy
                </Tag>
              )}
            </Col>
            <Col span={12}>
              <div className=" text-sm">
                <span className="text-gray-500">
                  Thời gian tạo
                  <br />
                  {moment(trip?.createdDate).format("DD/MM/YYYY HH:mm")}
                </span>
              </div>
            </Col>
          </Row>

          <Divider />

          <Row gutter={16}>
            <Col span={12}>
              <div className="ml-auto flex pa-10 items-center">
                <div className="flex-col flex mr-2 font-sans ">
                  <span className="text-gray-500 ">Keer</span>
                  <span className="text-base font-bold">
                    {trip?.keerFullname}
                  </span>
                </div>
              </div>
            </Col>

            <Col span={12}>
              {trip?.status != 5 && (
                <div className="ml-auto flex pa-10 items-center">
                  {trip?.bikerId == null ? (
                    <div className="flex-col flex mr-2 font-sans ">
                      <span className="text-gray-500 ">Biker </span>
                      <span className="text-base">Chưa có người chở</span>
                    </div>
                  ) : (
                    <div className="flex-col flex mr-2 font-sans ">
                      <span className="text-gray-500 ">
                        Biker{" "}
                        <Tag color="green">Biển số xe: {trip?.plateNumber}</Tag>
                      </span>
                      <span className="text-base font-bold">
                        {trip?.bikerFullname}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <div className="ml-auto flex pa-10 items-center">
                <div className="flex-col flex mr-2 font-sans ">
                  <span className="text-gray-500 ">Từ</span>
                  <span className="text-base font-bold">
                    {trip?.departureStationName}
                  </span>
                </div>
              </div>
            </Col>

            <Col span={12}>
              <div className="ml-auto flex pa-10 items-center">
                <div className="flex-col flex mr-2 font-sans ">
                  <span className="text-gray-500 ">Đến</span>
                  <span className="text-base font-bold">
                    {trip?.destinationStationName}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Divider />

          <Timeline>
            <Timeline.Item color="green">
              Thời gian đặt: {moment(trip?.bookTime).format("DD/MM/YYYY HH:mm")}
            </Timeline.Item>
            {trip?.pickupTime == null ? (
              <Timeline.Item color="gray">Chưa bắt đầu</Timeline.Item>
            ) : (
              <Timeline.Item color="green">
                Thời gian bắt đầu:{" "}
                {moment(trip?.pickupTime).format("DD/MM/YYYY HH:mm")}
              </Timeline.Item>
            )}

            {trip?.finishedTime == null ? (
              <Timeline.Item color="gray">Chưa hoàn thành</Timeline.Item>
            ) : (
              <Timeline.Item color="green">
                Thời gian hoàn thành:{" "}
                {moment(trip?.finishedTime).format("DD/MM/YYYY HH:mm")}
              </Timeline.Item>
            )}

            {trip?.cancelTime != null && (
              <Timeline.Item color="red">
                <p>
                  Thời gian hủy:{" "}
                  {moment(trip?.cancelTime).format("DD/MM/YYYY HH:mm")}
                </p>
                <p>Người hủy: {trip?.cancelPersonFullname}</p>
                <p>Lí do hủy: {trip?.cancelReason}</p>
              </Timeline.Item>
            )}
          </Timeline>

          <div className="user-detail-modal-tools">
            <Button onClick={handleCloseModal}>Thoát</Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
