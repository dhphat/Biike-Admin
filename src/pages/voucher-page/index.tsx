import { Button, Image, Modal, Divider, Pagination, Tag } from "antd";
import { useToggle } from "src/hooks/useToggle";
import { useMutation, useQuery } from "react-query";
import { Voucher, voucherQueryFns } from "src/services/api/voucher";
import { BiikeVoucherModal } from "src/organisms/voucher-modal";
import { BiikeVoucherDetailModal } from "src/organisms/voucher-detail-modal";
import { BiikeVoucherCodeModal } from "src/organisms/voucher-code-modal";
import "./index.scss";
import { useState } from "react";
import { RcFile } from "antd/lib/upload";
import { voucherCodeQueryFns } from "src/services/api/voucher-code";

interface VoucherDetailModal {
  openId: number;
  data?: Voucher;
}

interface VoucherCodeModal {
  openId: number;
  data?: Voucher;
}

interface BiikeVoucherPageProps {}

export const BiikeVoucherPage = (props: BiikeVoucherPageProps) => {
  // paging
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 10,
  });

  const { data, isFetching, refetch } = useQuery(
    ["vouchers", pagination.page, pagination.pageSize],
    () =>
      voucherQueryFns.vouchers({
        page: pagination.page,
        limit: pagination.pageSize,
      }),
    {
      onSuccess: (data) => {
        setPagination((prev) => ({ ...prev, total: data._meta.totalRecord }));
      },
    }
  );

  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
      ...(pageSize !== prev.pageSize ? { pageSize, page: 1 } : {}),
    }));
  };

  // create
  const [isCreateVoucherModalVisible, toggleCreateVoucherModalVisible] =
    useToggle(false);

  const createVoucherMutation = useMutation(voucherQueryFns.createVoucher);

  const handleCreateVoucher = (
    values: any,
    newBanners: RcFile[],
    closeModalCallback?: () => void
  ) => {
    const formData = new FormData();
    formData.append("imageType", "3");
    newBanners.forEach((banner) => {
      formData.append("imageList", banner);
    });
    if (newBanners.length) {
      uploadImageMutation.mutateAsync(formData).then((uploadRes) => {
        const voucherImages: string[] = uploadRes.data;
        createVoucherMutation
          .mutateAsync({ ...values, voucherImages })
          .then((createRes) => {
            closeModalCallback?.();
            refetch();
          });
      });
    }
  };

  // update voucher
  const [voucherDetailModal, setVoucherDetailModal] =
    useState<VoucherDetailModal>({
      openId: -1,
    });

  const toggleVoucherDetailModalVisible = (openId: number) => {
    setVoucherDetailModal((prev) => ({
      ...prev,
      openId: prev.openId === openId ? -1 : openId,
    }));
  };

  const openVoucherDetailModal = (data: Voucher) => {
    setVoucherDetailModal({ openId: data.voucherId, data });
  };

  const updateVoucherBannersMutation = useMutation(
    voucherQueryFns.updateVoucherBanners
  );

  const updateVoucherMutation = useMutation(voucherQueryFns.updateVoucher);

  const uploadImageMutation = useMutation(voucherQueryFns.uploadVoucherBanner);

  const removeVoucherBannersMutation = useMutation(
    voucherQueryFns.removeVoucherBanners
  );

  const handleUpdateVoucher = (
    id: number,
    values: any,
    newBanners: RcFile[],
    removedBannerIds: string[],
    closeModalCallback?: () => void
  ) => {
    const formData = new FormData();
    formData.append("imageType", "3");
    newBanners.forEach((banner) => {
      formData.append("imageList", banner);
    });
    if (newBanners.length) {
      uploadImageMutation.mutateAsync(formData).then((res) => {
        const bannerUrls: string[] = res.data;
        updateVoucherBannersMutation
          .mutateAsync([id, bannerUrls])
          .then((res) => {
            refetch();
          });
      });
    }
    if (removedBannerIds.length) {
      removeVoucherBannersMutation
        .mutateAsync([id, removedBannerIds])
        .then((res) => {
          refetch();
        });
    }
    // take a look
    updateVoucherMutation
      .mutateAsync([id, { ...values, addressIds: [1] }])
      .then((res) => {
        closeModalCallback?.();
        refetch();
      });
  };

  // update voucher code
  const [voucherCodeModal, setVoucherCodeModal] = useState<VoucherCodeModal>({
    openId: -1,
  });

  const toggleVoucherCodeModalVisible = (openId: number) => {
    setVoucherCodeModal((prev) => ({
      ...prev,
      openId: prev.openId === openId ? -1 : openId,
    }));
  };

  const openVoucherCodeModal = (data: Voucher) => {
    setVoucherCodeModal({ openId: data.voucherId, data });
  };

  // const updateVoucherCodeMutation = useMutation(
  //   voucherCodeQueryFns.createVoucherCode
  // );

  // const handleUpdateVoucherCode = (
  //   id: number,
  //   values: any,
  //   closeModalCallback?: () => void
  // ) => {
  //   updateVoucherCodeMutation.mutateAsync([id, values]).then((res) => {
  //     closeModalCallback?.();
  //     refetch();
  //   });
  // };

  //create voucher code
  const [isCreateVoucherCodeModalVisible, toggleCreateVoucherCodeModalVisible] =
    useToggle(false);

  const createVoucherCodeMutation = useMutation(
    voucherCodeQueryFns.createVoucherCode
  );

  const handleCreateVoucherCode = (
    values: any,
    closeModalCallback?: () => void
  ) => {
    createVoucherCodeMutation.mutateAsync(values).then((res) => {
      if (res.data) {
        closeModalCallback?.();
        refetch();
      }
    });
  };

  // delete
  const deleteVoucherMutation = useMutation(voucherQueryFns.deleteVoucher);

  const handleDeleteVoucher = (voucher: Voucher) => {
    Modal.confirm({
      type: "confirm",
      title: `Are you sure to change ${voucher.voucherName}?`,
      onOk: () => {
        deleteVoucherMutation.mutateAsync(voucher.voucherId).then((res) => {
          console.log("delete ok!");
          refetch();
        });
      },
    });
  };

  return (
    <div className="biike-voucher-page px-4">
      <div className="biike-voucher-tools">
        {/* <div className="biike-feedback-tools">
        <Select
          suffixIcon={<CaretDownOutlined className="text-gray-500" />}
          defaultValue={-1}
          options={[
            { label: "T???t c???", value: -1 },
            { label: "5 sao", value: 5 },
            { label: "4 sao", value: 4 },
            { label: "3 sao", value: 3 },
            { label: "2 sao", value: 2 },
            { label: "1 sao", value: 1 },
          ]}
          onChange={handleTripStarChange}
        />
      </div> */}
        <Button
          type="primary"
          className="ml-auto rounded"
          onClick={toggleCreateVoucherModalVisible}
        >
          Th??m voucher
        </Button>
      </div>

      <BiikeVoucherModal
        visibleManage={[
          isCreateVoucherModalVisible,
          toggleCreateVoucherModalVisible,
        ]}
        onOk={handleCreateVoucher}
        isCreating={createVoucherMutation.isLoading}
      />

      <div className="biike-voucher-content mt-4">
        {data?.data.map((voucher, index) => (
          <div
            key={index}
            className="voucher-item bg-white content-center rounded"
          >
            <Image
              preview={false}
              height={140}
              width={200}
              className="voucher-image rounded"
              src={
                voucher.voucherImages[0]?.voucherImageUrl ||
                "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              }
            />
            <div className="item-details text-gray-500 ml-8">
              <div className="voucher-email text-sm">
                ID: {voucher.voucherId}
              </div>
              <div className="voucher-name text-base font-bold">
                {voucher.voucherName}
              </div>
              <div className="voucher-email text-sm">
                <Tag color="#87d068">{voucher.brand}</Tag>
                <Tag color="green">{voucher.voucherCategoryName}</Tag>
              </div>
              <div className="voucher-phone text-sm">
                ??i???m ?????i: {voucher.amountOfPoint}
              </div>
              <div className="voucher-phone text-sm">
                C??n l???i: {voucher.remaining}
              </div>
            </div>
            <div className="item-tools ml-auto mr-8">
              {/* <Button
                type="primary"
                className="rounded"
                onClick={() => openVoucherCodeModal(voucher)}
              >
                Code
              </Button> */}
              <Button
                type="primary"
                className="rounded"
                onClick={() => openVoucherDetailModal(voucher)}
              >
                Xem
              </Button>
              <Button
                type="primary"
                danger
                className="rounded"
                onClick={() => handleDeleteVoucher(voucher)}
              >
                X??a
              </Button>
            </div>
          </div>
        ))}
        <BiikeVoucherDetailModal
          visibleManage={[
            voucherDetailModal.openId === voucherDetailModal.data?.voucherId,
            toggleVoucherDetailModalVisible,
          ]}
          voucher={voucherDetailModal.data}
          onOk={handleUpdateVoucher}
          isUpdating={updateVoucherMutation.isLoading}
        />

        <BiikeVoucherCodeModal
          visibleManage={[
            voucherCodeModal.openId === voucherCodeModal.data?.voucherId,
            toggleCreateVoucherCodeModalVisible,
          ]}
          voucher={voucherCodeModal.data}
          onOk={handleCreateVoucherCode}
          isUpdating={updateVoucherMutation.isLoading}
        />

        <Divider />
        <Pagination
          current={pagination.page}
          pageSize={pagination.pageSize}
          onChange={handlePageChange}
          total={pagination.total}
        />
      </div>
    </div>
  );
};
