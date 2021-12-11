import { CaretDownOutlined, InfoCircleOutlined } from "@ant-design/icons";
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
      <Form layout="vertical" form={form} onFinish={handleSubmitForm}>
        <div className="route-modal-content">
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
              // defaultValue=1
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

          <div className=" text-sm mb-5">
            <span className="text-gray-500">
              Khoảng cách giữa 2 trạm và điểm của trạm sẽ hiển thị sau khi tuyến
              tạo thành công.
            </span>
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
