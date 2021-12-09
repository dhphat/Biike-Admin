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
  Row,
  Col,
  DatePicker,
  InputNumber,
  Divider,
  UploadProps,
} from "antd";
import { RcFile } from "antd/lib/upload";
import moment from "moment";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Voucher } from "src/services/api/voucher";
import {
  VoucherCategory,
  voucherCategoryQueryFns,
} from "src/services/api/voucher-category";
import "./index.scss";

interface BiikeVoucherDetailModalProps {
  visibleManage: [boolean, (openID: number) => void];
  voucher?: Voucher;
  onOk?: (
    id: number,
    data: any,
    newBanners: RcFile[],
    removedBanners: string[],
    closeModalCallback?: () => void
  ) => void;
  isUpdating?: boolean;
}

export const BiikeVoucherDetailModal = ({
  visibleManage,
  voucher,
  onOk,
  isUpdating,
}: BiikeVoucherDetailModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && voucher) {
      const { startDate, endDate } = voucher;
      const apply_date = [moment(startDate), moment(endDate)];
      form.setFieldsValue({ ...voucher, apply_date });
      setBannerFileList(
        voucher.voucherImages.map((image) => ({
          uid: `${image.voucherImageId}`,
          name: `Banner ${image.voucherImageId}`,
          url: image.voucherImageUrl,
        }))
      );
    }
  }, [visible]);

  const handleCloseModal = () => {
    form.resetFields();
    setBannerFileList([]);
    setRemovedBannerIds([]);
    setNewBannerFileList([]);
    voucher && toggleVisible(voucher.voucherId);
  };

  const handleSubmitForm = (values: any) => {
    voucher &&
      onOk?.(
        voucher.voucherId,
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
  const { TextArea } = Input;

  const rangeConfig = {
    rules: [
      {
        type: "array" as const,
        required: true,
        message: "Vui lòng chọn thời gian áp dụng",
      },
    ],
  };

  // load list voucher category
  const { data } = useQuery(["voucherCategories"], () =>
    voucherCategoryQueryFns.voucherCategories({ limit: 10, page: 1 })
  );

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
                <Form.Item
                  name="voucherName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên ưu đãi",
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
                <span className="text-gray-500">Danh mục ưu đãi</span>
                <Form.Item
                  name="voucherCategoryId"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn danh mục",
                    },
                  ]}
                >
                  <Select
                    suffixIcon={<CaretDownOutlined className="text-gray-500" />}
                    options={data?.data
                      .filter(
                        (voucherCategory) => voucherCategory.voucherCategoryId
                      )
                      .map((voucherCategory) => ({
                        value: voucherCategory.voucherCategoryId,
                        label: voucherCategory.categoryName,
                      }))}
                    className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
                  />
                </Form.Item>
              </div>

              <div className=" text-sm font-medium mb-6">
                <span className="text-gray-500">Thời gian áp dụng</span>

                <Form.Item className="mt-2" name="apply_date" {...rangeConfig}>
                  <RangePicker />
                </Form.Item>
              </div>
              <div className=" text-sm font-medium ">
                <span className="text-gray-500">Điểm để đổi</span>
                <Form.Item
                  name="amountOfPoint"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập điểm",
                    },
                  ]}
                >
                  <InputNumber className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500" />
                </Form.Item>
              </div>
            </Col>
          </Row>

          <Divider />
          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Mô tả</span>
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô tả",
                },
              ]}
            >
              <TextArea
                className="mt-2"
                autoSize={{ minRows: 7, maxRows: 7 }}
                placeholder="Nhập mô tả"
              />
            </Form.Item>
          </div>

          <div className=" text-sm font-medium ">
            <span className="text-gray-500">Điều kiện sử dụng</span>
            <Form.Item
              name="termsAndConditions"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập điều kiện",
                },
              ]}
            >
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
