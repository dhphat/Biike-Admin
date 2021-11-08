import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { VoucherCategory } from "src/services/api/voucher-category";
import "./index.scss";

interface BiikeVoucherCategoryDetailModalProps {
  visibleManage: [boolean, (openID: number) => void];
  voucherCategory: VoucherCategory;
  onOk?: (id: number, data: any, closeModalCallback?: () => void) => void;
  isUpdating?: boolean;
}

export const BiikeVoucherCategoryDetailModal = ({
  visibleManage,
  voucherCategory,
  onOk,
  isUpdating,
}: BiikeVoucherCategoryDetailModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(voucherCategory);
    }
  }, [visible]);

  const handleCloseModal = () => {
    toggleVisible(voucherCategory.voucherCategoryId);
  };

  const handleSubmitForm = (values: any) => {
    onOk?.(voucherCategory.voucherCategoryId, values, handleCloseModal);
  };

  return (
    <Modal
      className="biike-voucher-category-detail-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="voucher-category-detail-modal-content">
          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Tên loại ưu đãi</span>
            <Form.Item name="categoryName">
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </Form.Item>
          </div>

          <div className="voucher-category-detail-modal-tools">
            <Button onClick={handleCloseModal}>Thoát</Button>
            <Button
              type="primary"
              className="rounded"
              htmlType="submit"
              loading={isUpdating}
            >
              Cập nhật
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
