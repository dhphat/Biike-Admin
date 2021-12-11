import { CaretDownOutlined, InfoCircleOutlined } from "@ant-design/icons";
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
      <Form layout="vertical" form={form} onFinish={handleSubmitForm}>
        <div className="address-modal-content">
          <Form.Item
            name="addressName"
            label="Tên địa chỉ"
            tooltip={{
              title:
                "Tên địa chỉ là tên cửa hàng hoặc nơi triển khai khuyến mãi/quảng cáo.",
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên địa chỉ",
              },
            ]}
          >
            <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
          </Form.Item>
          <Form.Item
            name="addressDetail"
            label="Địa chỉ"
            tooltip={{
              title:
                "Từ trang bản đồ, hãy bấm vào dòng địa chỉ ở thanh trái để copy địa chỉ.",
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ",
              },
            ]}
          >
            <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-4 text-blue-gray-500" />
          </Form.Item>
          <Form.Item
            name="addressCoordinate"
            label="Tọa độ"
            tooltip={{
              title:
                "Lấy tọa độ chính xác bằng cách mở bản đồ, nhấp chuột phải vào điểm và bấm vào tọa độ để copy.",
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tọa độ",
              },
            ]}
          >
            <div className="flex flex-column">
              <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500 mr-1" />
              <Button
                type="primary"
                className="rounded ml-1"
                href="https://www.google.com/maps/"
                target="_blank"
              >
                Bản đồ
              </Button>
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
