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
  List,
  Avatar,
  Upload,
  message,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Image,
  Divider,
} from "antd";
import { useToggle } from "src/hooks/useToggle";
import "./index.scss";

interface BiikeVoucherModalProps {
  visibleManage: ReturnType<typeof useToggle>;
  onOk?: (data: any, closeModalCallback?: () => void) => void;
}

export const BiikeVoucherModal = ({
  visibleManage,
  onOk,
}: BiikeVoucherModalProps) => {
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

  const { TextArea } = Input;

  return (
    <Modal
      className="biike-voucher-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      {/* <Form form={form} onFinish={handleSubmitForm}>
        <div className="voucher-modal-content">
          <Form.Item name="name">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Tên trạm</span>
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
            </div>
          </Form.Item>
          <Form.Item name="coordinate">
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
          <Form.Item name="address">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Địa chỉ</span>
              <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-4 text-blue-gray-500" />
            </div>
          </Form.Item>
          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Khu vực</span>
            <Form.Item name="areaId">
              <Select
                placeholder="Chọn khu vực"
                suffixIcon={<CaretDownOutlined className="text-gray-500" />}
                options={[{ label: "Trường Đại học FPT", value: "1" }]}
                className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
              />
            </Form.Item>
          </div>
          <div className="voucher-modal-tools">
            <Button onClick={handleCloseModal}>Hủy</Button>
            <Button type="primary" className="rounded" htmlType="submit">
              Thêm trạm
            </Button>
          </div>
        </div>
      </Form> */}

      <Form form={form} onFinish={handleSubmitForm}>
        <div className="voucher-modal-content">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="voucherName">
                <div className=" text-sm font-medium ">
                  <span className="text-gray-500">Tên ưu đãi</span>

                  <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
                </div>
              </Form.Item>
              <Form.Item name="brand">
                <div className=" text-sm font-medium ">
                  <span className="text-gray-500">Thương hiệu</span>

                  <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
                </div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="voucherCategoryName">
                <div className=" text-sm font-medium ">
                  <span className="text-gray-500">Danh mục ưu đãi</span>

                  <Select
                    suffixIcon={<CaretDownOutlined className="text-gray-500" />}
                    // defaultValue="1"

                    options={[{ label: "Danh mục ưu đãi", value: "all" }]}
                    className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
                  />
                </div>
              </Form.Item>

              <div className=" text-sm font-medium ">
                <span className="text-gray-500">Thời gian áp dụng</span>
                <RangePicker className="mt-2" />
              </div>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="quantity">
                <div className=" text-sm font-medium ">
                  <span className="text-gray-500">Số lượng</span>

                  <InputNumber
                    className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500"
                    disabled
                  />
                </div>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="remaining">
                <div className=" text-sm font-medium ">
                  <span className="text-gray-500">Còn lại</span>

                  <InputNumber
                    className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500"
                    disabled
                  />
                </div>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="amountOfPoint">
                <div className=" text-sm font-medium ">
                  <span className="text-gray-500">Điểm để đổi</span>

                  <InputNumber className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
                </div>
              </Form.Item>
            </Col>
            <Col span={6}>
              <div className=" text-sm font-medium ">
                <span className="text-gray-500">Danh sách mã</span>
                <Button type="primary" className="rounded ml-1 mt-3">
                  Xem
                </Button>
              </div>
            </Col>
          </Row>
          <Divider />
          <Form.Item name="description">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Mô tả</span>

              <TextArea
                className="mt-2"
                autoSize={{ minRows: 7, maxRows: 7 }}
                placeholder="Nhập mô tả"
              />
            </div>
          </Form.Item>
          <Form.Item name="termsAndConditions">
            <div className=" text-sm font-medium ">
              <span className="text-gray-500">Điều kiện sử dụng</span>

              <TextArea
                className="mt-2"
                autoSize={{ minRows: 7, maxRows: 7 }}
                placeholder="Nhập điều kiện sử dụng"
              />
            </div>
          </Form.Item>

          <div className=" text-sm font-medium ">
            <span className="text-gray-500 mr-4">Địa điểm áp dụng</span>
            <Button type="dashed" icon={<PlusOutlined />}>
              Thêm địa điểm
            </Button>

            {/* {voucher?.voucherAddresses.length ? (
              voucher.voucherAddresses.map((address, index) => (
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
            )} */}
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

          <div className="voucher-modal-tools mt-4">
            <Button onClick={handleCloseModal}>Hủy</Button>
            <Button type="primary" className="rounded" htmlType="submit">
              Thêm ưu đãi
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
