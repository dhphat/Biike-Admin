import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useToggle } from "src/hooks/useToggle";
import "./index.scss";

interface BiikeVoucherCategoryModalProps {
  visibleManage: ReturnType<typeof useToggle>;
  onOk?: (data: any, closeModalCallback?: () => void) => void;
}

export const BiikeVoucherCategoryModal = ({
  visibleManage,
  onOk,
}: BiikeVoucherCategoryModalProps) => {
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
      className="biike-voucher-category-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="voucher-category-modal-content">
          <Form.Item name="categoryName">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Tên loại ưu đãi</span>
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </div>
          </Form.Item>
          <div className="voucher-category-modal-tools">
            <Button onClick={handleCloseModal}>Hủy</Button>
            <Button type="primary" className="rounded" htmlType="submit">
              Thêm loại ưu đãi
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
