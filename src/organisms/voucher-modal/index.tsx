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
  UploadProps,
} from "antd";
import { RcFile } from "antd/lib/upload";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useToggle } from "src/hooks/useToggle";
import { voucherQueryFns } from "src/services/api/voucher";
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
    onOk?.(
      { ...values, bannerImages: bannerUrlList.map(({ url }) => url) },
      handleCloseModal
    );
  };

  //upload banner
  const [bannerFileList, setBannerFileList] = useState<
    UploadProps<any>["fileList"]
  >([]);

  const [bannerUrlList, setBannerUrlList] = useState<
    { uid: string; url: string }[]
  >([]);

  const uploadImageMutation = useMutation(voucherQueryFns.uploadVoucherBanner);

  const handleChangeUploader: UploadProps<any>["onChange"] = ({ fileList }) => {
    setBannerFileList(fileList);

    const successFiles = fileList.filter((file) => file.status === "done");

    const removedBannerFiles = bannerUrlList.filter(
      (banner) => !successFiles.find((file) => banner.uid === file.uid)
    );

    const newBannerFiles = successFiles.filter(
      (file) => !bannerUrlList.find((banner) => file.uid === banner.uid)
    );

    setBannerUrlList((prev) => [
      ...prev.filter(
        (pfile) => !removedBannerFiles.find((rfile) => pfile.uid === rfile.uid)
      ),
      ...newBannerFiles.map((nfile) => ({ uid: nfile.uid, url: "" })),
    ]);
  };

  const handleUploadBanner: UploadProps<any>["customRequest"] = ({
    file,
    onSuccess,
    onError,
  }) => {
    const formData = new FormData();
    formData.append("imageType", "3");
    formData.append("imageList", file);
    uploadImageMutation
      .mutateAsync(formData)
      .then((res) => {
        const bannerUrl = { uid: (file as RcFile).uid, url: res.data[0] };
        setBannerUrlList([
          ...bannerUrlList.filter((banner) => banner.uid != bannerUrl.uid),
          bannerUrl,
        ]);
        onSuccess?.(undefined, new XMLHttpRequest());
      })
      .catch((err) => {
        onError?.(err);
      });
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
              <Form.Item name="VoucherCategoryId">
                <div className=" text-sm font-medium ">
                  <span className="text-gray-500">Danh mục ưu đãi</span>

                  <Select
                    suffixIcon={<CaretDownOutlined className="text-gray-500" />}
                    // defaultValue="1"

                    options={[{ label: "Danh mục ưu đãi", value: "1" }]}
                    className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
                  />
                </div>
              </Form.Item>

              <div className=" text-sm font-medium mb-6">
                <span className="text-gray-500">Thời gian áp dụng</span>
                <RangePicker className="mt-2" />
              </div>

              <Form.Item name="amountOfPoint">
                <div className=" text-sm font-medium">
                  <span className="text-gray-500">Điểm để đổi</span>
                  <br />
                  <InputNumber className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500" />
                </div>
              </Form.Item>
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
            <Upload
              listType="picture"
              customRequest={handleUploadBanner}
              fileList={bannerFileList}
              onChange={handleChangeUploader}
            >
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
