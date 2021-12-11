import { CaretDownOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select } from "antd";
import { useToggle } from "src/hooks/useToggle";
import "./index.scss";

interface BiikeStationModalProps {
  visibleManage: ReturnType<typeof useToggle>;
  onOk?: (data: any, closeModalCallback?: () => void) => void;
}

export const BiikeStationModal = ({
  visibleManage,
  onOk,
}: BiikeStationModalProps) => {
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
      className="biike-station-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmitForm}>
        <div className="station-modal-content">
          <Form.Item
            name="name"
            label="Tên trạm"
            tooltip={{
              title:
                "Tên trạm là tên sẽ được hiển thị trên ứng dụng. Hãy viết tên trạm rõ ràng, dễ nhận biết.",
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên trạm",
              },
            ]}
          >
            <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
          </Form.Item>
          <Form.Item
            name="coordinate"
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
          <Form.Item
            name="address"
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
            name="areaId"
            label="Khu vực"
            tooltip={{
              title: "Hãy đảm bảo trạm của bạn nằm trong khu vực bạn chọn.",
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn khu vực",
              },
            ]}
          >
            <Select
              placeholder="Chọn khu vực"
              suffixIcon={<CaretDownOutlined className="text-gray-500" />}
              options={[{ label: "Trường Đại học FPT", value: "1" }]}
              className="bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
            />
          </Form.Item>

          <div className="station-modal-tools">
            <Button onClick={handleCloseModal}>Hủy</Button>
            <Button type="primary" className="rounded" htmlType="submit">
              Thêm trạm
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
