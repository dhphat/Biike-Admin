import {
  EnvironmentOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Upload,
  Row,
  Col,
  DatePicker,
  Divider,
  UploadProps,
  Switch,
} from "antd";
import { RcFile } from "antd/lib/upload";
import moment from "moment";
import { useEffect, useState } from "react";
import { Advertisement } from "src/services/api/advertisement";
import "./index.scss";

interface BiikeAdvertisementDetailModalProps {
  visibleManage: [boolean, (openID: number) => void];
  advertisement?: Advertisement;
  onOk?: (
    id: number,
    data: any,
    newBanners: RcFile[],
    removedBanners: string[],
    closeModalCallback?: () => void
  ) => void;
  isUpdating?: boolean;
}

export const BiikeAdvertisementDetailModal = ({
  visibleManage,
  advertisement,
  onOk,
  isUpdating,
}: BiikeAdvertisementDetailModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && advertisement) {
      form.setFieldsValue(advertisement);
      setBannerFileList(
        advertisement.advertisementImages.map((image) => ({
          uid: `${image.advertisementImageId}`,
          name: `Banner ${image.advertisementImageId}`,
          url: image.advertisementImageUrl,
        }))
      );
    }
  }, [visible]);

  const handleCloseModal = () => {
    advertisement && toggleVisible(advertisement.advertisementId);
    setRemovedBannerIds([]);
    setNewBannerFileList([]);
  };

  const handleSubmitForm = (values: any) => {
    advertisement &&
      onOk?.(
        advertisement.advertisementId,
        values,
        newBannerFileList,
        removedBannerIds,
        handleCloseModal
      );
  };

  //upload banner UploadProps<any>["fileList"]
  const [bannerFileList, setBannerFileList] = useState<
    UploadProps<any>["fileList"]
  >([]);

  const [newBannerFileList, setNewBannerFileList] = useState<RcFile[]>([]);

  const [removedBannerIds, setRemovedBannerIds] = useState<string[]>([]);

  const handleChangeUploader: UploadProps<any>["onChange"] = ({ fileList }) => {
    setBannerFileList(fileList);

    // const successFiles = fileList.filter((file) => file.status === "done");

    // const removedBannerFiles = bannerList.filter(
    //   (banner) => !successFiles.find((file) => banner.uid === file.uid)
    // );

    // const newBannerFiles = successFiles.filter(
    //   (file) =>
    //     !bannerList.find((banner) => file.uid === banner.uid) &&
    //     !!file.originFileObj
    // );

    // setBannerList((prev) => [
    //   ...prev.filter(
    //     (pfile) => !removedBannerFiles.find((rfile) => pfile.uid === rfile.uid)
    //   ),
    //   ...newBannerFiles.map((nfile) => ({
    //     uid: nfile.uid,
    //     file: nfile.originFileObj!,
    //   })),
    // ]);
  };

  const handleRemoveBanner = (removedBannerId: string) => {
    if (!newBannerFileList.find((banner) => banner.uid === removedBannerId)) {
      setRemovedBannerIds((prev) => [
        ...prev.filter((id) => id !== removedBannerId),
        removedBannerId,
      ]);
    }
    setNewBannerFileList((prev) =>
      prev.filter((banner) => banner.uid !== removedBannerId)
    );
  };

  const handleUploadBanner: UploadProps<any>["customRequest"] = ({
    file,
    onSuccess,
    onError,
  }) => {
    try {
      const newBannerFile = file as RcFile;
      setNewBannerFileList((prev) => [
        ...prev.filter((banner) => banner.uid != newBannerFile.uid),
        newBannerFile,
      ]);
      onSuccess?.(undefined, new XMLHttpRequest());
    } catch (error: any) {
      onError?.(error);
    }
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
      className="biike-advertisement-detail-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="advertisement-detail-modal-content">
          <br />

          <Row gutter={16}>
            <Col span={12}>
              <div className=" text-sm font-medium mb-11">
                <span className="text-gray-500">ID</span>
                <div className="advertisement-email text-sm mb-2">
                  {advertisement?.advertisementId}
                </div>
              </div>

              <div className=" text-sm font-medium ">
                <span className="text-gray-500">Tiêu đề</span>
                <Form.Item
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tiêu đề",
                    },
                  ]}
                >
                  <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
                </Form.Item>
              </div>

              <div className=" text-sm font-medium ">
                <span className="text-gray-500">Thương hiệu</span>
                <Form.Item
                  name="brand"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thương hiệu",
                    },
                  ]}
                >
                  <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
                </Form.Item>
              </div>
            </Col>
            <Col span={12}>
              <div className=" text-sm font-medium ">
                <span className="text-gray-500">Liên kết</span>
                <Form.Item
                  name="advertisementUrl"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập liên kết",
                    },
                  ]}
                >
                  <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
                </Form.Item>
              </div>

              <div className=" text-sm font-medium mb-6">
                <span className="text-gray-500">Thời gian hiển thị</span>
                <RangePicker
                  className="mt-2"
                  defaultValue={[
                    moment(advertisement?.startDate, dateFormat),
                    moment(advertisement?.endDate, dateFormat),
                  ]}
                  format={dateFormat}
                />
              </div>
              <div className=" text-sm font-medium ">
                <span className="text-gray-500">Hiển thị</span>
                <Form.Item name="isActive">
                  <Switch defaultChecked onChange={onChange} />
                </Form.Item>
              </div>
            </Col>
          </Row>

          <Divider />

          <div className=" text-sm font-medium ">
            <span className="text-gray-500 mr-4">Địa điểm áp dụng</span>
            <Button type="dashed" icon={<PlusOutlined />}>
              Thêm địa điểm
            </Button>

            {advertisement?.advertisementAddresses.length ? (
              advertisement.advertisementAddresses.map((address, index) => (
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

              listType="picture-card"
              customRequest={handleUploadBanner}
              fileList={bannerFileList}
              onChange={handleChangeUploader}
              onRemove={({ uid }) => handleRemoveBanner(uid)}
            >
              <div>
                <UploadOutlined />
                <div>Tải ảnh lên</div>
              </div>
              {/* <Button icon={<UploadOutlined />}></Button> */}
            </Upload>
          </div>

          <div className="advertisement-detail-modal-tools mt-4">
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
