import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useToggle } from "src/hooks/useToggle";
import "./index.scss";

interface BiikeAdminModalProps {
  visibleManage: ReturnType<typeof useToggle>;
  onOk?: (data: any, closeModalCallback?: () => void) => void;
}

export const BiikeAdminModal = ({
  visibleManage,
  onOk,
}: BiikeAdminModalProps) => {
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
      className="biike-admin-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="admin-modal-content">
          <Form.Item name="fullname">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Họ và tên</span>
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </div>
          </Form.Item>

          <Form.Item name="phoneNumber">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Số điện thoại</span>
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </div>
          </Form.Item>

          <Form.Item name="email">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Email</span>
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </div>
          </Form.Item>

          <Form.Item name="password">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Mật khẩu</span>
              <Input.Password className="mt-2 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </div>
          </Form.Item>

          <div className="admin-modal-tools">
            <Button onClick={handleCloseModal}>Hủy</Button>
            <Button type="primary" className="rounded" htmlType="submit">
              Thêm quản trị viên
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
