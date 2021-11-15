import {
  CaretDownOutlined,
  EnvironmentOutlined,
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
  Image,
  Divider,
  Switch,
} from "antd";
import moment from "moment";
import { useEffect } from "react";
import { Advertising } from "src/services/api/advertising";
import "./index.scss";

interface BiikeAdvertisingDetailModalProps {
  visibleManage: [boolean, (openID: number) => void];
  advertising?: Advertising;
  onOk?: (id: number, data: any, closeModalCallback?: () => void) => void;
  isUpdating?: boolean;
}

export const BiikeAdvertisingDetailModal = ({
  visibleManage,
  advertising,
  onOk,
  isUpdating,
}: BiikeAdvertisingDetailModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(advertising);
    }
  }, [visible]);

  const handleCloseModal = () => {
    advertising && toggleVisible(advertising.advertisingId);
  };

  const handleSubmitForm = (values: any) => {
    advertising && onOk?.(advertising.advertisingId, values, handleCloseModal);
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
  const dateFormat = "YYYY/MM/DD";

  //display
  function onChange(checked: any) {
    console.log(`switch to ${checked}`);
  }

  return (
    <Modal
      className="biike-advertising-detail-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="advertising-detail-modal-content">
          <div className="advertising-email text-sm">
            ID: {advertising?.advertisingId}
          </div>
          <br />

          <Row gutter={16}>
            <Col span={20}>
              <div className=" text-sm font-medium ">
                <span className="text-gray-500">Tiêu đề</span>
                <Form.Item name="title">
                  <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
                </Form.Item>
              </div>
            </Col>
            <Col span={4}>
              <div className=" text-sm font-medium ">
                <span className="text-gray-500 mb-3">Hiển thị</span>
                <Form.Item name="voucherCategoryName">
                  <Switch defaultChecked onChange={onChange} />
                </Form.Item>
              </div>
            </Col>
            <Col span={12}>
              <div className=" text-sm font-medium ">
                <span className="text-gray-500">Thương hiệu</span>
                <Form.Item name="brand">
                  <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
                </Form.Item>
              </div>
            </Col>
            <Col span={12}>
              <div className=" text-sm font-medium ">
                <span className="text-gray-500">Thời gian áp dụng</span>
                <RangePicker
                  className="mt-2"
                  defaultValue={[
                    moment(advertising?.startDate, dateFormat),
                    moment(advertising?.endDate, dateFormat),
                  ]}
                  format={dateFormat}
                />
              </div>
            </Col>
          </Row>
          <Divider />

          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Liên kết</span>
            <Form.Item name="brand">
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </Form.Item>
          </div>

          <div className=" text-sm font-medium ">
            <span className="text-gray-500 mr-4">Địa điểm áp dụng</span>
            <Button type="dashed" icon={<PlusOutlined />}>
              Thêm địa điểm
            </Button>

            {advertising?.advertisingAddresses.length ? (
              advertising.advertisingAddresses.map((address, index) => (
                <div key={index} className="user-email text-sm">
                  <p className="text-gray-600 font-medium">
                    <EnvironmentOutlined /> {address.addressName}{" "}
                    <Button type="text" danger>
                      Xóa
                    </Button>
                  </p>
                  <p className="text-gray-400 font-light">
                    {address.addressDetail}{" "}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-gray-400">Chưa cung cấp</div>
            )}
          </div>

          <Divider />
          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Banner</span>
            <br />

            {advertising?.advertisingImages.map((image, index) => (
              <div key={index}>
                <Image
                  className="mt-2 mb-2"
                  width={200}
                  src={image.advertisingImageUrl}
                />
              </div>
            ))}

            <br />
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </div>

          <div className="advertising-detail-modal-tools mt-4">
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
