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
import moment from "moment";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Voucher, voucherQueryFns } from "src/services/api/voucher";
import { VoucherCategory } from "src/services/api/voucher-category";
import "./index.scss";

interface BiikeVoucherDetailModalProps {
  visibleManage: [boolean, (openID: number) => void];
  voucher?: Voucher;
  voucherCategory?: VoucherCategory;
  onOk?: (id: number, data: any, closeModalCallback?: () => void) => void;
  isUpdating?: boolean;
}

export const BiikeVoucherDetailModal = ({
  visibleManage,
  voucher,
  voucherCategory,
  onOk,
  isUpdating,
}: BiikeVoucherDetailModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && voucher) {
      form.setFieldsValue(voucher);
      setBannerFileList(
        voucher.voucherImages.map((image, index) => ({
          uid: index,
          status: "done",
          url: image,
        }))
      );
      //   {
      //     uid: -1,
      //     name: "image.png",
      //     status: "done",
      //     url: "https://firebasestorage.googleapis.com/v0/b/biike-c6a70.appspot.com/o/voucher%2Fimage_20211121_210217_049156.png?alt=media&token=c9a636c6-d7cd-433f-8d2e-1879417fba7e",
    }
  }, [visible]);

  const handleCloseModal = () => {
    voucher && toggleVisible(voucher.voucherId);
  };

  const handleSubmitForm = (values: any) => {
    voucher && onOk?.(voucher.voucherId, values, handleCloseModal);
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
  const dateFormat = "YYYY/MM/DD";

  const { TextArea } = Input;

  return (
    <Modal
      className="biike-voucher-detail-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="voucher-detail-modal-content">
          <br />

          <Row gutter={16}>
            <Col span={12}>
              <div className=" text-sm font-medium mb-11">
                <span className="text-gray-500">ID</span>
                <div className="voucher-email text-sm mb-2">
                  {voucher?.voucherId}
                </div>
              </div>

              <div className=" text-sm font-medium ">
                <span className="text-gray-500">Tên ưu đãi</span>
                <Form.Item name="voucherName">
                  <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
                </Form.Item>
              </div>

              <div className=" text-sm font-medium ">
                <span className="text-gray-500">Thương hiệu</span>
                <Form.Item name="brand">
                  <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
                </Form.Item>
              </div>
            </Col>
            <Col span={12}>
              <div className=" text-sm font-medium ">
                <span className="text-gray-500">Danh mục ưu đãi</span>
                <Form.Item name="voucherCategoryId">
                  <Select
                    suffixIcon={<CaretDownOutlined className="text-gray-500" />}
                    // defaultValue="1"

                    options={[{ label: "Danh mục ưu đãi", value: "1" }]}
                    className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
                  />
                </Form.Item>
              </div>

              <div className=" text-sm font-medium mb-6">
                <span className="text-gray-500">Thời gian áp dụng</span>
                <RangePicker
                  className="mt-2"
                  defaultValue={[
                    moment(voucher?.startDate, dateFormat),
                    moment(voucher?.endDate, dateFormat),
                  ]}
                  format={dateFormat}
                />
              </div>
              <div className=" text-sm font-medium ">
                <span className="text-gray-500">Điểm để đổi</span>
                <Form.Item name="amountOfPoint">
                  <InputNumber className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500" />
                </Form.Item>
              </div>
            </Col>
          </Row>

          <Divider />
          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Mô tả</span>
            <Form.Item name="description">
              <TextArea
                className="mt-2"
                autoSize={{ minRows: 7, maxRows: 7 }}
                placeholder="Nhập mô tả"
              />
            </Form.Item>
          </div>

          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Điều kiện sử dụng</span>
            <Form.Item name="termsAndConditions">
              <TextArea
                className="mt-2"
                autoSize={{ minRows: 7, maxRows: 7 }}
                placeholder="Nhập điều kiện sử dụng"
              />
            </Form.Item>
          </div>

          <div className=" text-sm font-medium ">
            <span className="text-gray-500 mr-4">Địa điểm áp dụng</span>
            <Button type="dashed" icon={<PlusOutlined />}>
              Thêm địa điểm
            </Button>

            {voucher?.voucherAddresses.length ? (
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
            )}
          </div>

          <Divider />
          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Banner</span>
            <br />

            {voucher?.voucherImages.map((image, index) => (
              <div key={index}>
                <Image
                  className="mt-2 mb-2"
                  width={200}
                  src={image.voucherImageUrl}
                />
              </div>
            ))}

            <br />
            <Upload
              // {...props}
              // listType="picture"
              // fileList={[
              //   {
              //     uid: -1,
              //     name: "image.png",
              //     status: "done",
              //     url: "https://firebasestorage.googleapis.com/v0/b/biike-c6a70.appspot.com/o/voucher%2Fimage_20211121_210217_049156.png?alt=media&token=c9a636c6-d7cd-433f-8d2e-1879417fba7e",
              //   },
              // ]}

              listType="picture"
              customRequest={handleUploadBanner}
              fileList={bannerFileList}
              onChange={handleChangeUploader}
            >
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </div>

          <div className="voucher-detail-modal-tools mt-4">
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
