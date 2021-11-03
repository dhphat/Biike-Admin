import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";
import { Route } from "src/services/api/route";
import "./index.scss";

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
    }
  }, [visible]);

  const handleCloseModal = () => {
    toggleVisible(route.routeId);
  };

  const handleSubmitForm = (values: any) => {
    onOk?.(route.routeId, values, handleCloseModal);
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
            <span className="text-gray-500">Khu vực</span>
            <Form.Item name="areaId">
              <Select
                suffixIcon={<CaretDownOutlined className="text-gray-500" />}
                defaultValue="1"
                options={[{ label: "Trường Đại học FPT", value: "1" }]}
                className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
              />
            </Form.Item>
          </div>

          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Trạm đầu</span>
            <Form.Item name="departureName">
              <Select
                suffixIcon={<CaretDownOutlined className="text-gray-500" />}
                defaultValue="1"
                options={[{ label: "Trường Đại học FPT", value: "1" }]}
                className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
              />
            </Form.Item>
          </div>

          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Trạm cuối</span>
            <Form.Item name="destinationName">
              <Select
                suffixIcon={<CaretDownOutlined className="text-gray-500" />}
                defaultValue="1"
                options={[{ label: "Chung cư SKY 9", value: "1" }]}
                className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
              />
            </Form.Item>
          </div>

          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Điểm mặc định</span>
            <br />
            <Form.Item name="defaultPoint">
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
