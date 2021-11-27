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
  Switch,
} from "antd";
import { RcFile } from "antd/lib/upload";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useToggle } from "src/hooks/useToggle";
import { advertisementQueryFns } from "src/services/api/advertisement";
import "./index.scss";

interface BiikeAdvertisementModalProps {
  visibleManage: ReturnType<typeof useToggle>;
  onOk?: (data: any, closeModalCallback?: () => void) => void;
}

export const BiikeAdvertisementModal = ({
  visibleManage,
  onOk,
}: BiikeAdvertisementModalProps) => {
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

  const uploadImageMutation = useMutation(
    advertisementQueryFns.uploadAdvertisementBanner
  );

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

  //display
  function onChange(checked: any) {
    console.log(`switch to ${checked}`);
  }

  return (
    <Modal
      className="biike-advertisement-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="advertisement-modal-content">
          <Row gutter={16}>
            <Col span={20}>
              <Form.Item name="title">
                <div className=" text-sm font-medium ">
                  <span className="text-gray-500">Tiêu đề</span>

                  <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
                </div>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="isActive">
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
            <Upload
              listType="picture"
              customRequest={handleUploadBanner}
              fileList={bannerFileList}
              onChange={handleChangeUploader}
            >
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </div>

          <div className="advertisement-modal-tools mt-4">
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
