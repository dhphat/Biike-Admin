import { CaretDownOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useQuery } from "react-query";
import { useToggle } from "src/hooks/useToggle";
import { userQueryFns } from "src/services/api/user";
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

  // load list user
  const { data } = useQuery(["users"], () =>
    userQueryFns.users({ limit: 100, page: 1 })
  );

  return (
    <Modal
      className="biike-admin-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmitForm}>
        <div className="admin-modal-content">
          <Form.Item
            name="userId"
            label="Email"
            tooltip={{
              title:
                "Khi người dùng trở thành admin, họ sẽ không thể sử dụng chức năng của Biker hay Keer. Khi xóa admin khỏi danh sách, người dùng có thể tiếp tục làm Biker hay Keer mà dữ liệu vẫn không bị mất.",
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn email",
              },
            ]}
          >
            <Select
              suffixIcon={<CaretDownOutlined className="text-gray-500" />}
              options={data?.data
                .filter((user) => user.isDeleted !== true && user.roleId !== 3)
                .map((user) => ({
                  value: user.userId,
                  label: user.email,
                }))}
              className="bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
            />
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
