import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { Station } from "src/services/api/station";
import "./index.scss";

interface BiikeStationDetailModalProps {
  visibleManage: [boolean, (openID: number) => void];
  station: Station;
  onOk?: (id: number, data: any, closeModalCallback?: () => void) => void;
  isUpdating?: boolean;
}

export const BiikeStationDetailModal = ({
  visibleManage,
  station,
  onOk,
  isUpdating,
}: BiikeStationDetailModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(station);
    }
  }, [visible]);

  const handleCloseModal = () => {
    toggleVisible(station.stationId);
  };

  const handleSubmitForm = (values: any) => {
    onOk?.(station.stationId, values, handleCloseModal);
  };

  return (
    <Modal
      className="biike-station-detail-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="station-detail-modal-content">
          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Thời gian tạo</span>
            <Form.Item name="createdDate">
              <Input
                className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500"
                disabled
              />
            </Form.Item>
          </div>
          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Tên trạm</span>
            <Form.Item name="name">
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </Form.Item>
          </div>
          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Tọa độ</span>
            <div className="flex flex-column mt-2">
              <Form.Item name="coordinate">
                <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500 mr-1 w-full" />
              </Form.Item>
              <Button
                type="primary"
                className="rounded ml-1"
                href="https://www.google.com/maps/"
                target="_blank"
              >
                Bản đồ
              </Button>
            </div>
          </div>
          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Địa chỉ</span>
            <Form.Item name="address">
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-4 text-blue-gray-500" />
            </Form.Item>
          </div>
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

          <div className="station-detail-modal-tools">
            <Button onClick={handleCloseModal}>Thoát</Button>

            {station.isDeleted === false && (
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
