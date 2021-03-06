import { CaretDownOutlined, UploadOutlined } from "@ant-design/icons";
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
import { useMutation, useQuery } from "react-query";
import { useToggle } from "src/hooks/useToggle";
import { addressQueryFns } from "src/services/api/address";
import { Voucher } from "src/services/api/voucher";
import { voucherCategoryQueryFns } from "src/services/api/voucher-category";
import { BiikeAddressModal } from "../address-modal";
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
        message: "Vui l??ng ch???n th???i gian ??p d???ng",
      },
    ],
  };

  // load list voucher category
  const { data } = useQuery(["voucherCategories"], () =>
    voucherCategoryQueryFns.voucherCategories({ limit: 10, page: 1 })
  );

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
      className="biike-voucher-detail-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmitForm}>
        <div className="voucher-detail-modal-content">
          <br />

          <Row gutter={16}>
            <Col span={12}>
              <div className=" text-sm mb-12">
                <span className="text-gray-500">ID</span>
                <div className="voucher-email text-sm mb-2">
                  {voucher?.voucherId}
                </div>
              </div>

              <Form.Item
                name="voucherName"
                label="T??n ??u ????i"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p t??n ??u ????i",
                  },
                ]}
              >
                <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
              </Form.Item>

              <Form.Item
                name="brand"
                label="Th????ng hi???u"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p th????ng hi???u",
                  },
                ]}
              >
                <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="voucherCategoryId"
                label="Danh m???c ??u ????i"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng ch???n danh m???c",
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
                  className="bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
                />
              </Form.Item>

              <Form.Item
                label="Th???i gian ??p d???ng"
                className=""
                name="apply_date"
                {...rangeConfig}
              >
                <RangePicker />
              </Form.Item>

              <Form.Item
                name="amountOfPoint"
                label="??i???m ????? ?????i"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p ??i???m",
                  },
                ]}
              >
                <InputNumber className="bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Form.Item
            name="description"
            label="M?? t???"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p m?? t???",
              },
            ]}
          >
            <TextArea
              className="mt-2"
              autoSize={{ minRows: 7, maxRows: 7 }}
              placeholder="Nh???p m?? t???"
            />
          </Form.Item>

          <Form.Item
            name="termsAndConditions"
            label="??i???u ki???n s??? d???ng"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p ??i???u ki???n",
              },
            ]}
          >
            <TextArea
              className="mt-2"
              autoSize={{ minRows: 7, maxRows: 7 }}
              placeholder="Nh???p ??i???u ki???n s??? d???ng"
            />
          </Form.Item>

          <Form.Item
            name="addressIds"
            label="?????a ??i???m ??p d???ng"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n ?????a ??i???m",
                type: "array",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Ch???n ?????a ??i???m ??p d???ng"
              defaultValue={voucher?.voucherAddresses.map(
                (voucherAddress) => voucherAddress.addressId
              )}
              options={addressData?.data
                .filter((address: { addressId: any }) => address.addressId)
                .map((address: { addressId: any; addressDetail: any }) => ({
                  value: address.addressId,
                  label: address.addressDetail,
                }))}
              className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
            />
          </Form.Item>
          <span className="font-normal">Kh??ng t??m th???y ?????a ??i???m?</span>
          <Button
            type="link"
            size={"small"}
            onClick={toggleCreateAddressModalVisible}
          >
            Th??m ?????a ??i???m
          </Button>

          <BiikeAddressModal
            visibleManage={[
              isCreateAddressModalVisible,
              toggleCreateAddressModalVisible,
            ]}
            onOk={handleCreateAddress}
          />

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
                <div>T???i ???nh l??n</div>
              </div>
            </Upload>
          </div>

          <div className="voucher-detail-modal-tools mt-4">
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
