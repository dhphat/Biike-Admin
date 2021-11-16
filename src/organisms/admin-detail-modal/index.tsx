import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { User } from "src/services/api/user";
import "./index.scss";

interface BiikeAdminDetailModalProps {
  visibleManage: [boolean, (openID: number) => void];
  admin?: User;
  onOk?: (id: number, data: any, closeModalCallback?: () => void) => void;
  isUpdating?: boolean;
}

export const BiikeAdminDetailModal = ({
  visibleManage,
  admin,
  onOk,
  isUpdating,
}: BiikeAdminDetailModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(admin);
    }
  }, [visible]);

  const handleCloseModal = () => {
    admin && toggleVisible(admin.userId);
  };

  const handleSubmitForm = (values: any) => {
    admin && onOk?.(admin.userId, values, handleCloseModal);
  };

  return (
    <Modal
      className="biike-admin-detail-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="admin-detail-modal-content">
          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Họ và tên</span>
            <Form.Item name="userFullname">
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </Form.Item>
          </div>

          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Số điện thoại</span>
            <Form.Item name="userPhoneNumber">
              <Input
                className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500"
                disabled
              />
            </Form.Item>
          </div>

          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Email</span>
            <Form.Item name="email">
              <Input
                className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500"
                disabled
              />
            </Form.Item>
          </div>

          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Mật khẩu hiện tại</span>
            <Form.Item name="password">
              <Input.Password className="mt-2 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </Form.Item>
          </div>
          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Mật khẩu mới</span>
            <Form.Item name="rePassword">
              <Input.Password className="mt-2 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </Form.Item>
          </div>

          <div className="admin-detail-modal-tools">
            <Button onClick={handleCloseModal}>Thoát</Button>
            {admin?.isDeleted === false && (
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
