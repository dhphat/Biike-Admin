import {
  CaretDownOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  message,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Divider,
  Switch,
} from "antd";
import { useToggle } from "src/hooks/useToggle";
import "./index.scss";

interface BiikeAdvertisingModalProps {
  visibleManage: ReturnType<typeof useToggle>;
  onOk?: (data: any, closeModalCallback?: () => void) => void;
}

export const BiikeAdvertisingModal = ({
  visibleManage,
  onOk,
}: BiikeAdvertisingModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  const handleCloseModal = () => {
    toggleVisible(false);
  };

  const handleSubmitForm = (values: any) => {
    onOk?.(values, handleCloseModal);
  };

  //upload banner
  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  //date picker
  const { RangePicker } = DatePicker;

  //display
  function onChange(checked: any) {
    console.log(`switch to ${checked}`);
  }

  return (
    <Modal
      className="biike-advertising-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="advertising-modal-content">
          <Row gutter={16}>
            <Col span={20}>
              <Form.Item name="voucherName">
                <div className=" text-sm font-medium ">
                  <span className="text-gray-500">Tiêu đề</span>

                  <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
                </div>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="voucherCategoryName">
                <div className=" text-sm font-medium ">
                  <p className="text-gray-500 mb-3">Hiển thị</p>

                  <Switch defaultChecked onChange={onChange} />
                </div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="brand">
                <div className=" text-sm font-medium ">
                  <span className="text-gray-500">Thương hiệu</span>

                  <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
                </div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <div className=" text-sm font-medium">
                <p className="text-gray-500">Thời gian áp dụng</p>
                <RangePicker className="mt-2" />
              </div>
            </Col>
          </Row>

          <Divider />
          <Form.Item name="description">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Liên kết</span>

              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </div>
          </Form.Item>

          <div className=" text-sm font-medium ">
            <span className="text-gray-500 mr-4">Địa điểm áp dụng</span>
            <Button type="dashed" icon={<PlusOutlined />}>
              Thêm địa điểm
            </Button>
          </div>

          <Divider />
          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Banner</span>
            <br />

            {/* {voucher?.voucherImages.map((image, index) => (
              <div key={index}>
                <Image
                  className="mt-2 mb-2"
                  width={200}
                  src={image.voucherImageUrl}
                />
              </div>
            ))} */}

            <br />
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </div>

          <div className="advertising-modal-tools mt-4">
            <Button onClick={handleCloseModal}>Hủy</Button>
            <Button type="primary" className="rounded" htmlType="submit">
              Thêm quảng cáo
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
