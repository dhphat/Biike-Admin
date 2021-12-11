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
import { useState } from "react";
import { useToggle } from "src/hooks/useToggle";
import "./index.scss";
import { voucherCategoryQueryFns } from "src/services/api/voucher-category";
import { addressQueryFns } from "src/services/api/address";
import { useMutation, useQuery } from "react-query";
import { BiikeAddressModal } from "src/organisms/address-modal";

interface BiikeVoucherModalProps {
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

export const BiikeVoucherModal = ({
  visibleManage,
  onOk,
  isCreating,
}: BiikeVoucherModalProps) => {
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
    voucherCategoryQueryFns.voucherCategories({ limit: 100, page: 1 })
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
      className="biike-voucher-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmitForm}>
        <div className="voucher-modal-content">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="voucherName"
                label="Tên ưu đãi"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên ưu đãi",
                  },
                ]}
              >
                <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
              </Form.Item>

              <Form.Item
                name="brand"
                label="Thương hiệu"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên thương hiệu",
                  },
                ]}
              >
                <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="VoucherCategoryId"
                label="Danh mục ưu đãi"
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
                      (voucherCategory: { voucherCategoryId: any }) =>
                        voucherCategory.voucherCategoryId
                    )
                    .map(
                      (voucherCategory: {
                        voucherCategoryId: any;
                        categoryName: any;
                      }) => ({
                        value: voucherCategory.voucherCategoryId,
                        label: voucherCategory.categoryName,
                      })
                    )}
                  className="bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
                />
              </Form.Item>

              <Form.Item
                label="Thời gian áp dụng"
                className=""
                name="apply_date"
                {...rangeConfig}
              >
                <RangePicker />
              </Form.Item>

              <Form.Item
                name="amountOfPoint"
                label="Điểm để đổi"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập điểm",
                  },
                ]}
              >
                <InputNumber className="bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Mô tả"
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

          <Form.Item
            name="termsAndConditions"
            label="Điều kiện sử dụng"
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

          <Form.Item
            name="addressIds"
            label="Địa điểm áp dụng"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn địa điểm",
                type: "array",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn địa điểm áp dụng"
              options={addressData?.data
                .filter((address: { addressId: any }) => address.addressId)
                .map((address: { addressId: any; addressDetail: any }) => ({
                  value: address.addressId,
                  label: address.addressDetail,
                }))}
              className="mt-2 bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
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
          />

          <Divider />
          <div className="mb-3">
            <span className="text-red-500">* </span>
            <span>Banner</span>
          </div>

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

          <div className="voucher-modal-tools mt-4">
            <Button onClick={handleCloseModal}>Hủy</Button>
            <Button
              type="primary"
              className="rounded"
              htmlType="submit"
              loading={isCreating}
            >
              Thêm ưu đãi
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
