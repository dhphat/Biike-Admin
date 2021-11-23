import { Button, Form, Input, Modal, Row, Col, Divider } from "antd";
import { useEffect } from "react";
import { Voucher } from "src/services/api/voucher";
import { VoucherCode } from "src/services/api/voucher-code";
import "./index.scss";

interface BiikeVoucherCodeModalProps {
  visibleManage: [boolean, (openID: number) => void];
  voucher?: Voucher;
  onOk?: (id: number, data: any, closeModalCallback?: () => void) => void;
  isUpdating?: boolean;
}

export const BiikeVoucherCodeModal = ({
  visibleManage,
  voucher,
  onOk,
  isUpdating,
}: BiikeVoucherCodeModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && voucher) {
      form.setFieldsValue(voucher);
    }
  }, [visible]);

  const handleCloseModal = () => {
    voucher && toggleVisible(voucher.voucherId);
  };

  const handleSubmitForm = (values: any) => {
    voucher && onOk?.(voucher.voucherId, values, handleCloseModal);
  };

  const { TextArea } = Input;

  return (
    <Modal
      className="biike-voucher-code-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="voucher-code-modal-content">
          <br />

          <Row gutter={16}>
            <Col span={12}>
              <div className="voucher-email text-sm">
                ID: {voucher?.voucherId}
              </div>
              <div className="voucher-email text-sm font-bold">
                {voucher?.voucherName}
              </div>
              <Divider />
              <div className="voucher-email text-sm">
                Số lượng: {voucher?.quantity}
              </div>
              <div className="voucher-email text-sm">
                Còn lại: {voucher?.remaining}
              </div>
            </Col>
            <Col span={12}>
              <div className=" text-sm font-medium ">
                <span className="text-gray-500">Danh sách mã</span>
                <Form.Item name="voucherCode">
                  <TextArea
                    className="mt-2"
                    autoSize={{ minRows: 20, maxRows: 100 }}
                    placeholder=""
                  >
                    Các voucher ở đây
                  </TextArea>
                </Form.Item>
              </div>
            </Col>
          </Row>

          <Divider />

          <div className="voucher-code-modal-tools mt-4">
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
