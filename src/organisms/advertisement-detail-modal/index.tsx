import {
  EnvironmentOutlined,
  InfoCircleOutlined,
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
  Tooltip,
} from "antd";
import { RcFile } from "antd/lib/upload";
import moment from "moment";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
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
      const { startDate, endDate } = advertisement;
      const apply_date = [moment(startDate), moment(endDate)];
      form.setFieldsValue({ ...advertisement, apply_date });
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
    form.resetFields();
    setBannerFileList([]);
    setRemovedBannerIds([]);
    setNewBannerFileList([]);
    advertisement && toggleVisible(advertisement.advertisementId);
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

  const rangeConfig = {
    rules: [
      {
        type: "array" as const,
        required: true,
        message: "Vui l??ng ch???n th???i gian ch???y",
      },
    ],
  };

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
      <Form layout="vertical" form={form} onFinish={handleSubmitForm}>
        <div className="advertisement-detail-modal-content">
          <span className="text-gray-500">
            ID: {advertisement?.advertisementId}
          </span>
          <br />
          <br />

          <Row gutter={24}>
            <Col span={20}>
              <Form.Item
                name="title"
                label="Ti??u ?????"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p ti??u ?????",
                  },
                ]}
                tooltip={{
                  title:
                    "T??n ti??u ????? s??? ???????c hi???n th??? ngay b??n d?????i ???nh qu???ng c??o.",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
              </Form.Item>
            </Col>

            <Col span={4}>
              {/* <Form.Item name="isActive">
                <div className=" text-sm font-medium ">
                  <p className="text-gray-500 mb-3">Hi???n th???</p>

                  <Switch defaultChecked onChange={onChange} />
                </div>
              </Form.Item> */}
              <Form.Item
                name="isActive"
                label="Hi???n th???"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="brand"
                label="Th????ng hi???u"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p th????ng hi???u",
                  },
                ]}
                tooltip={{
                  title:
                    "T??n th????ng hi???u ho???c nh??n h??ng t??i tr??? s??? hi???n th??? ngay d?????i ti??u ????? qu???ng c??o.",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Th???i gian hi???n th???"
                className=""
                name="apply_date"
                {...rangeConfig}
                tooltip={{
                  title: "Th???i gian qu???ng c??o ???????c ch???y khi ???? b???t hi???n th???.",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <RangePicker />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="advertisementUrl"
            label="Li??n k???t"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p li??n k???t",
              },
              { type: "url", message: "Li??n k???t kh??ng ????ng ?????nh d???ng url" },
            ]}
            tooltip={{
              title:
                "Ng?????i d??ng khi click v??o qu???ng c??o s??? ???????c d???n t???i li??n k???t n??y. Biik?? s??? ghi l???i l?????ng click v?? hi???n th??? ??? trang danh s??ch qu???ng c??o.",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
          </Form.Item>

          {/* <Col span={12}>
              <div className=" text-sm font-medium ">
                <span className="text-gray-500">Li??n k???t</span>
                <Form.Item
                  name="advertisementUrl"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p li??n k???t",
                    },
                    { type: "url", message: "Li??n k???t kh??ng h???p l???" },
                  ]}
                >
                  <Input className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
                </Form.Item>
              </div>

              <div className=" text-sm font-medium mb-6">
                <span className="text-gray-500">Th???i gian hi???n th???</span>
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
                <span className="text-gray-500">Hi???n th???</span>
                <Form.Item name="isActive">
                  <Switch defaultChecked onChange={onChange} />
                </Form.Item>
              </div>
            </Col> */}

          {/* <div className=" text-sm font-medium ">
            <span className="text-gray-500 mr-4">?????a ??i???m ??p d???ng</span>
            <Button type="dashed" icon={<PlusOutlined />}>
              Th??m ?????a ??i???m
            </Button>

            {advertisement?.advertisementAddresses.length ? (
              advertisement.advertisementAddresses.map((address, index) => (
                <div key={index} className="user-email text-sm">
                  <p className="text-gray-600 font-medium">
                    <EnvironmentOutlined /> {address.addressName}{" "}
                    <Button type="text" danger>
                      X??a
                    </Button>
                  </p>
                  <p className="text-gray-400 font-light">
                    {address.addressDetail}{" "}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-gray-400">Ch??a cung c???p</div>
            )}
          </div> */}

          <Divider />
          <div className="mb-3">
            <span className="text-red-500">* </span>
            <span>Banner </span>
            <Tooltip title="K??ch th?????c ????? ngh???: 1000x380">
              <span className="text-gray-500">
                <InfoCircleOutlined />
              </span>
            </Tooltip>
          </div>

          {/* {voucher?.voucherImages.map((image, index) => (
              <div key={index}>
                <Image
                  className="mt-2 mb-2"
                  width={200}
                  src={image.voucherImageUrl}
                />
              </div>
            ))} */}

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
              <div>T???i ???nh l??n</div>
            </div>
            {/* <Button icon={<UploadOutlined />}></Button> */}
          </Upload>

          <div className="advertisement-detail-modal-tools mt-4">
            <Button onClick={handleCloseModal}>Tho??t</Button>

            <Button
              type="primary"
              className="rounded"
              htmlType="submit"
              loading={isUpdating}
            >
              C???p nh???t
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
