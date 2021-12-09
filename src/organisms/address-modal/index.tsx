import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useToggle } from "src/hooks/useToggle";
import "./index.scss";

interface BiikeAddressModalProps {
  visibleManage: ReturnType<typeof useToggle>;
  onOk?: (data: any, closeModalCallback?: () => void) => void;
}

export const BiikeAddressModal = ({
  visibleManage,
  onOk,
}: BiikeAddressModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  const handleCloseModal = () => {
    toggleVisible(false);
  };

  const handleSubmitForm = (values: any) => {
    onOk?.(values, handleCloseModal);
  };

  return (
    <Modal
      className="biike-address-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="address-modal-content">
          <Form.Item name="addressName">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Tên địa chỉ</span>
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </div>
          </Form.Item>
          <Form.Item name="addressDetail">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Địa chỉ</span>
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </div>
          </Form.Item>
          <Form.Item name="addressCoordinate">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Tọa độ</span>
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </div>
          </Form.Item>
          <div className="address-modal-tools">
            <Button onClick={handleCloseModal}>Hủy</Button>
            <Button type="primary" className="rounded" htmlType="submit">
              Thêm địa chỉ
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
