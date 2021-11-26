import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
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
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="station-modal-content">
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên trạm",
              },
            ]}
          >
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Tên trạm</span>
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </div>
          </Form.Item>
          <Form.Item
            name="coordinate"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tọa độ",
              },
            ]}
          >
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Tọa độ</span>
              <div className="flex flex-column mt-2">
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
            </div>
          </Form.Item>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ",
              },
            ]}
          >
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Địa chỉ</span>
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-4 text-blue-gray-500" />
            </div>
          </Form.Item>
          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Khu vực</span>
            <Form.Item
              name="areaId"
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
                className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
              />
            </Form.Item>
          </div>
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
