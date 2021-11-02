import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Radio, Select } from "antd";
import { useToggle } from "src/hooks/useToggle";
import "./index.scss";

interface BiikeRouteModalProps {
  visibleManage: ReturnType<typeof useToggle>;
  onOk?: (data: any, closeModalCallback?: () => void) => void;
}

export const BiikeRouteModal = ({
  visibleManage,
  onOk,
}: BiikeRouteModalProps) => {
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
      className="biike-route-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="route-modal-content">
          <Form.Item name="khu_vuc">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Khu vực</span>
              <Select
                suffixIcon={<CaretDownOutlined className="text-gray-500" />}
                defaultValue="1"
                options={[{ label: "Trường Đại học FPT", value: "1" }]}
                className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
              />
            </div>
          </Form.Item>

          <Form.Item name="tram_dau">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Trạm đầu</span>
              <Select
                suffixIcon={<CaretDownOutlined className="text-gray-500" />}
                defaultValue="1"
                options={[{ label: "Trường Đại học FPT", value: "1" }]}
                className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
              />
            </div>
          </Form.Item>

          <Form.Item name="tram_cuoi">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Trạm cuối</span>
              <Select
                suffixIcon={<CaretDownOutlined className="text-gray-500" />}
                defaultValue="1"
                options={[{ label: "Chung cư SKY 9", value: "1" }]}
                className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
              />
            </div>
          </Form.Item>

          <Form.Item name="diem_mac_dinh">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Điểm mặc định</span>
              <br />
              <InputNumber
                className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500"
                min="1"
                max="100"
                defaultValue="0"
              />
            </div>
          </Form.Item>

          <Form.Item name="hien_thi">
            <div className="biike-modal-display text-sm font-medium ">
              <span className="text-gray-500">Hiển thị</span>
              <Radio.Group
                options={[
                  { label: "Bật", value: "on" },
                  { label: "Tắt", value: "off" },
                ]}
                size="small"
                className="mt-1 text-red-500"
              />
            </div>
          </Form.Item>
          <div className="route-modal-tools">
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
