import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
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
import { useState } from "react";
import { useToggle } from "src/hooks/useToggle";
import { useMutation, useQuery } from "react-query";
import { addressQueryFns } from "src/services/api/address";
import { BiikeAddressModal } from "../address-modal";
import "./index.scss";

interface BiikeAdvertisementModalProps {
  visibleManage: [boolean, (action?: any) => void];
  onOk?: (
    data: any,
    newBanners: RcFile[],
    // no need to add removed id to list -->
    // removedBanners: string[],
    closeModalCallback?: () => void
  ) => void;
  isCreating?: boolean;
}

export const BiikeAdvertisementModal = ({
  visibleManage,
  onOk,
  isCreating,
}: BiikeAdvertisementModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  const handleCloseModal = () => {
    // no need to add removed id to list --> no need to reset this list
    // setRemovedBannerIds([]);
    form.resetFields();
    setBannerFileList([]);
    setNewBannerFileList([]);
    toggleVisible(false);
  };

  const handleSubmitForm = (values: any) => {
    const applyDate: [moment.Moment, moment.Moment] = values.apply_date;
    const startDate = applyDate[0].toISOString();
    const endDate = applyDate[1].toISOString();
    const formatedValues = values;
    delete formatedValues.apply_date;

    onOk?.(
      {
        ...formatedValues,
        startDate,
        endDate,
      },
      newBannerFileList /* removedBannerIds, */,
      handleCloseModal
    );
  };

  //upload banner
  const [bannerFileList, setBannerFileList] = useState<
    UploadProps<any>["fileList"]
  >([]);

  const [newBannerFileList, setNewBannerFileList] = useState<RcFile[]>([]);

  // const [removedBannerIds, setRemovedBannerIds] = useState<string[]>([]);

  const handleChangeUploader: UploadProps<any>["onChange"] = ({ fileList }) => {
    setBannerFileList(fileList);
  };

  const handleRemoveBanner = (removedBannerId: string) => {
    // no need to add removed id to list
    // if (!newBannerFileList.find((banner) => banner.uid === removedBannerId)) {
    //   setRemovedBannerIds((prev) => [
    //     ...prev.filter((id) => id !== removedBannerId),
    //     removedBannerId,
    //   ]);
    // }
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

  // //upload banner
  // const [bannerFileList, setBannerFileList] = useState<
  //   UploadProps<any>["fileList"]
  // >([]);

  // const [bannerUrlList, setBannerUrlList] = useState<
  //   { uid: string; url: string }[]
  // >([]);

  // const [newBannerFileList, setNewBannerFileList] = useState<RcFile[]>([]);

  // const uploadImageMutation = useMutation(
  //   advertisementQueryFns.uploadAdvertisementBanner
  // );

  // const handleChangeUploader: UploadProps<any>["onChange"] = ({ fileList }) => {
  //   setBannerFileList(fileList);

  //   const successFiles = fileList.filter((file) => file.status === "done");

  //   const removedBannerFiles = bannerUrlList.filter(
  //     (banner) => !successFiles.find((file) => banner.uid === file.uid)
  //   );

  //   const newBannerFiles = successFiles.filter(
  //     (file) => !bannerUrlList.find((banner) => file.uid === banner.uid)
  //   );

  //   setBannerUrlList((prev) => [
  //     ...prev.filter(
  //       (pfile) => !removedBannerFiles.find((rfile) => pfile.uid === rfile.uid)
  //     ),
  //     ...newBannerFiles.map((nfile) => ({ uid: nfile.uid, url: "" })),
  //   ]);
  // };

  // const handleUploadBanner: UploadProps<any>["customRequest"] = ({
  //   file,
  //   onSuccess,
  //   onError,
  // }) => {
  //   const formData = new FormData();
  //   formData.append("imageType", "3");
  //   formData.append("imageList", file);
  //   uploadImageMutation
  //     .mutateAsync(formData)
  //     .then((res) => {
  //       const bannerUrl = { uid: (file as RcFile).uid, url: res.data[0] };
  //       setBannerUrlList([
  //         ...bannerUrlList.filter((banner) => banner.uid != bannerUrl.uid),
  //         bannerUrl,
  //       ]);
  //       onSuccess?.(undefined, new XMLHttpRequest());
  //     })
  //     .catch((err) => {
  //       onError?.(err);
  //     });
  // };

  //date picker
  const { RangePicker } = DatePicker;

  const rangeConfig = {
    rules: [
      {
        type: "array" as const,
        required: true,
        message: "Vui lòng chọn thời gian hiển thị",
      },
    ],
  };

  // load list address
  const { data: addressData, refetch } = useQuery(["addresses"], () =>
    addressQueryFns.addresses({ limit: 100, page: 1 })
  );

  // add address
  const [isCreateAddressModalVisible, toggleCreateAddressModalVisible] =
    useToggle(false);

  const createAddressMutation = useMutation(addressQueryFns.createAddress);

  const handleCreateAddress = (
    values: any,
    closeModalCallback?: () => void
  ) => {
    createAddressMutation.mutateAsync(values).then((res) => {
      if (res.data) {
        closeModalCallback?.();
        refetch();
      }
    });
  };

  return (
    <Modal
      className="biike-advertisement-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmitForm}>
        <div className="advertisement-modal-content">
          <Row gutter={16}>
            <Col span={20}>
              <Form.Item
                name="title"
                label="Tiêu đề"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tiêu đề",
                  },
                ]}
                tooltip={{
                  title:
                    "Tên tiêu đề sẽ được hiển thị ngay bên dưới ảnh quảng cáo.",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
              </Form.Item>
            </Col>
            <Col span={4}>
              {/* <Form.Item name="isActive">
                <div className=" text-sm font-medium ">
                  <p className="text-gray-500 mb-3">Hiển thị</p>

                  <Switch defaultChecked onChange={onChange} />
                </div>
              </Form.Item> */}
              <Form.Item
                name="isActive"
                label="Hiển thị"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="brand"
                label="Thương hiệu"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thương hiệu",
                  },
                ]}
                tooltip={{
                  title:
                    "Tên thương hiệu hoặc nhãn hàng tài trợ sẽ hiển thị ngay dưới tiêu đề quảng cáo.",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Thời gian hiển thị"
                className=""
                name="apply_date"
                {...rangeConfig}
                tooltip={{
                  title: "Thời gian quảng cáo được chạy khi đã bật hiển thị.",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <RangePicker />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="advertisementUrl"
            label="Liên kết"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập liên kết",
              },
              { type: "url", message: "Liên kết không đúng định dạng url" },
            ]}
            tooltip={{
              title:
                "Người dùng khi click vào quảng cáo sẽ được dẫn tới liên kết này. Biiké sẽ ghi lại lượng click và hiển thị ở trang danh sách quảng cáo.",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
          </Form.Item>

          {/* <Form.Item name="addressIds" label="Địa điểm"
          tooltip={{
            title:
              "Biiké hiển thị quảng cáo cho những người ở gần khu vực của người dùng.",
            icon: <InfoCircleOutlined />,
          }}>
            <Select
              mode="multiple"
              placeholder="Chọn địa điểm áp dụng"
              options={addressData?.data
                .filter((address: { addressId: any }) => address.addressId)
                .map((address: { addressId: any; addressDetail: any }) => ({
                  value: address.addressId,
                  label: address.addressDetail,
                }))}
              className="bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
            />
          </Form.Item>

          <span className="font-normal">Không tìm thấy địa điểm?</span>
          <Button
            type="link"
            size={"small"}
            onClick={toggleCreateAddressModalVisible}
          >
            Thêm địa điểm
          </Button>

          <BiikeAddressModal
            visibleManage={[
              isCreateAddressModalVisible,
              toggleCreateAddressModalVisible,
            ]}
            onOk={handleCreateAddress}
          /> */}

          <Divider />

          <div className="mb-3">
            <span className="text-red-500">* </span>
            <span>Banner </span>
            <Tooltip title="Kích thước đề nghị: 1000x380">
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
          </Upload>

          <div className="advertisement-modal-tools mt-4">
            <Button onClick={handleCloseModal}>Hủy</Button>
            <Button
              type="primary"
              className="rounded"
              htmlType="submit"
              loading={isCreating}
            >
              Thêm quảng cáo
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
