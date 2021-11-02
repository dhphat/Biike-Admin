import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Radio, Select } from "antd";
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
          <Form.Item name="ten_tram">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Tên trạm</span>
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </div>
          </Form.Item>
          <Form.Item name="toa_do">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Tọa độ</span>
              <div className="flex flex-column mt-2">
                <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500 mr-1" />
                <Button type="primary" className="rounded ml-1">
                  Chọn trên bản đồ
                </Button>
              </div>
            </div>
          </Form.Item>
          <Form.Item name="dia_chi">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Địa chỉ</span>
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-4 text-blue-gray-500" />
            </div>
          </Form.Item>
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
