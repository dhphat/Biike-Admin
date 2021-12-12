import { Button, Form, Input, Modal, Row, Col, Divider, List } from "antd";
import { useEffect } from "react";
import { Voucher } from "src/services/api/voucher";
import {
  VoucherCode,
  voucherCodeQueryFns,
} from "src/services/api/voucher-code";
import "./index.scss";
import { useQuery } from "react-query";
import { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useToggle } from "src/hooks/useToggle";

interface VoucherCodeDetailModal {
  openId: number;
  data?: VoucherCode;
}

interface BiikeVoucherCodeModalProps {
  visibleManage: ReturnType<typeof useToggle>;
  voucher?: Voucher;
  voucherCode?: VoucherCode;
  onOk?: (id: number, data: any, closeModalCallback?: () => void) => void;
  isUpdating?: boolean;
}

export const BiikeVoucherCodeModal = ({
  visibleManage,
  voucher,
  onOk,
  isUpdating,
}: BiikeVoucherCodeModalProps) => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 10,
  });

  const { data, isFetching, refetch } = useQuery(
    [
      `/voucherCodes/vouchers/${voucher?.voucherId}`,
      pagination.page,
      pagination.pageSize,
    ],
    () =>
      voucherCodeQueryFns.getVoucherCode(
        {
          page: pagination.page,
          limit: pagination.pageSize,
        },
        voucher?.voucherId
      ),

    {
      onSuccess: (data) => {
        setPagination((prev) => ({ ...prev, total: data._meta.totalRecord }));
      },
    }
  );

  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
      ...(pageSize !== prev.pageSize ? { pageSize, page: 1 } : {}),
    }));
  };

  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  // useEffect(() => {
  //   if (visible && voucher) {
  //     form.setFieldsValue(voucher);
  //   }
  // }, [visible]);

  const handleCloseModal = () => {
    toggleVisible(false);
  };

  const handleSubmitForm = (values: any) => {
    onOk?.(values, handleCloseModal);
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
      <Form layout="vertical" form={form} onFinish={handleSubmitForm}>
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
              <Divider />

              <div className="voucher-email text-sm">Danh sách mã code</div>
              {data?.data.map((voucherCode, index) => (
                <div key={index}>
                  {voucherCode.isRedeem == true ? (
                    <p className="text-green-500">
                      {voucherCode.voucherCodeName}
                    </p>
                  ) : (
                    <p className="text-gray-500">
                      {voucherCode.voucherCodeName}
                    </p>
                  )}
                </div>
              ))}
            </Col>
            <Col span={12}>
              <Form.Item
                name="voucherCodes"
                label="Thêm mã"
                tooltip={{
                  title: "Bạn chỉ được thêm mã.",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <TextArea
                  className="mt-2"
                  autoSize={{ minRows: 20, maxRows: 100 }}
                  placeholder=""
                ></TextArea>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <div className="voucher-code-modal-tools mt-4">
            <Button onClick={handleCloseModal}>Thoát</Button>

            <Button type="primary" className="rounded" htmlType="submit">
              Thêm mã
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
