import { CaretDownOutlined, InfoCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { Route } from "src/services/api/route";
import moment from "moment";
import "./index.scss";
import { stationQueryFns } from "src/services/api/station";
import { useQuery } from "react-query";

interface BiikeRouteDetailModalProps {
  visibleManage: [boolean, (openID: number) => void];
  route: Route;
  onOk?: (id: number, data: any, closeModalCallback?: () => void) => void;
  isUpdating?: boolean;
}

export const BiikeRouteDetailModal = ({
  visibleManage,
  route,
  onOk,
  isUpdating,
}: BiikeRouteDetailModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(route);
      setStartStationId(route.departureId);
      setEndStationId(route.destinationId);
    }
  }, [visible]);

  const handleCloseModal = () => {
    toggleVisible(route.routeId);
  };

  const handleSubmitForm = (values: any) => {
    onOk?.(route.routeId, values, handleCloseModal);
  };

  const [startStationId, setStartStationId] = useState(-1);
  const [endStationId, setEndStationId] = useState(-1);

  const { data } = useQuery(["stations"], () =>
    stationQueryFns.stations({ limit: 10, page: 1 })
  );

  const handleChangeStartStation = (stationId: number) => {
    setStartStationId(stationId);
  };

  const handleChangeEndStation = (stationId: number) => {
    setEndStationId(stationId);
  };

  return (
    <Modal
      className="biike-route-detail-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmitForm}>
        <div className="route-detail-modal-content">
          <div className=" text-sm ">
            <span className="text-gray-500">Thời gian tạo</span>
            <br />
            <span className="text-gray-500">
              {moment(route?.createdDate).format("DD/MM/YYYY HH:mm")}
            </span>
            <br />
            <br />
          </div>

          <Form.Item
            name="areaId"
            label="Khu vực"
            tooltip={{
              title: "Các trạm được phép chọn sẽ nằm trong khu vực bạn chọn.",
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn khu vực",
              },
            ]}
          >
            <Select
              suffixIcon={<CaretDownOutlined className="text-gray-500" />}
              // defaultValue="1"
              options={[{ label: "Trường Đại học FPT", value: 1 }]}
              className="bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
            />
          </Form.Item>

          <Form.Item
            name="departureId"
            label="Trạm đầu"
            tooltip={{
              title:
                "Trạm bắt đầu của tuyến. Hãy đảm bảo 1 trong 2 trạm của tuyến phải có 1 trạm chính.",
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn trạm đầu",
              },
            ]}
          >
            <Select
              suffixIcon={<CaretDownOutlined className="text-gray-500" />}
              options={data?.data
                .filter(
                  (station) =>
                    station.stationId !== endStationId &&
                    station.isDeleted !== true
                )
                .map((station) => ({
                  value: station.stationId,
                  label: station.name,
                }))}
              onChange={handleChangeStartStation}
              className="bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
            />
          </Form.Item>

          <Form.Item
            name="destinationId"
            label="Trạm cuối"
            tooltip={{
              title:
                "Trạm kết thúc của tuyến. Hãy đảm bảo 1 trong 2 trạm của tuyến phải có 1 trạm chính.",
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn trạm cuối",
              },
            ]}
          >
            <Select
              suffixIcon={<CaretDownOutlined className="text-gray-500" />}
              options={data?.data
                .filter(
                  (station) =>
                    station.stationId !== startStationId &&
                    station.isDeleted !== true
                )
                .map((station) => ({
                  value: station.stationId,
                  label: station.name,
                }))}
              onChange={handleChangeEndStation}
              className="bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
            />
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <div className=" text-sm ">
                <Tooltip title="Khoảng cách từ trạm đầu đến trạm cuối.">
                  <span>Khoảng cách</span>
                </Tooltip>
                <br />
                <span className="text-gray-500">{route?.distance} km</span>
                <br />
                <br />
              </div>
            </Col>
            <Col span={12}>
              <div className=" text-sm ">
                <Tooltip title="Điểm Biker nhận được khi hoàn thành chuyến với tuyến này. Mỗi km tương đương 2 điểm.">
                  <span>Điểm</span>
                </Tooltip>
                <br />
                <span className="text-gray-500">{route?.defaultPoint}</span>
                <br />
                <br />
              </div>
            </Col>
          </Row>

          <div className="route-detail-modal-tools">
            <Button onClick={handleCloseModal}>Thoát</Button>

            {route.isDeleted === false && (
              <Button
                type="primary"
                className="rounded"
                htmlType="submit"
                loading={isUpdating}
              >
                Cập nhật
              </Button>
            )}
          </div>
        </div>
      </Form>
    </Modal>
  );
};
