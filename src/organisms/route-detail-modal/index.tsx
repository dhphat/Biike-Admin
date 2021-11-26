import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
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
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="route-detail-modal-content">
          <div className=" text-sm ">
            <span className="text-gray-500 font-medium">Thời gian tạo</span>
            <br />
            <span className="text-gray-500">
              {moment(route?.createdDate).format("DD/MM/YYYY HH:mm")}
            </span>
            <br />
            <br />
          </div>
          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Khu vực</span>
            <Form.Item
              name="areaId"
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
                className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
              />
            </Form.Item>
          </div>

          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Trạm đầu</span>
            <Form.Item
              name="departureId"
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
                  .filter((station) => station.stationId !== endStationId)
                  .map((station) => ({
                    value: station.stationId,
                    label: station.name,
                  }))}
                onChange={handleChangeStartStation}
                className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
              />
            </Form.Item>
          </div>

          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Trạm cuối</span>
            <Form.Item
              name="destinationId"
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
                  .filter((station) => station.stationId !== startStationId)
                  .map((station) => ({
                    value: station.stationId,
                    label: station.name,
                  }))}
                onChange={handleChangeEndStation}
                className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
              />
            </Form.Item>
          </div>

          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Điểm mặc định</span>
            <br />
            <Form.Item
              name="defaultPoint"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập điểm mặc định",
                },
              ]}
            >
              <InputNumber
                className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500"
                min="1"
                max="100"
                defaultValue="0"
              />
            </Form.Item>
          </div>

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
