import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Modal, Select } from "antd";
import { useToggle } from "src/hooks/useToggle";
import { useEffect, useState } from "react";
import { Station, stationQueryFns } from "src/services/api/station";
import { useQuery } from "react-query";
import "./index.scss";

interface BiikeRouteModalProps {
  visibleManage: ReturnType<typeof useToggle>;
  onOk?: (data: any, closeModalCallback?: () => void) => void;
}

export const BiikeRouteModal = ({
  visibleManage,
  onOk,
}: BiikeRouteModalProps) => {
  // const { data, isFetching, refetch } = useQuery(["stations"], () =>
  //   stationQueryFns.stations({ page: 1, limit: 10 })
  // );

  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  const handleCloseModal = () => {
    toggleVisible(false);
  };

  const handleSubmitForm = (values: any) => {
    onOk?.(values, handleCloseModal);
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
      className="biike-route-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="route-modal-content">
          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Khu vực</span>
            <Form.Item name="areaId">
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
            <Form.Item name="departureId">
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
            <Form.Item name="destinationId">
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
            <Form.Item name="defaultPoint">
              <InputNumber
                className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500"
                min="1"
                max="100"
                defaultValue="0"
              />
            </Form.Item>
          </div>

          <div className="route-modal-tools">
            <Button onClick={handleCloseModal}>Hủy</Button>
            <Button type="primary" className="rounded" htmlType="submit">
              Thêm tuyến
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
