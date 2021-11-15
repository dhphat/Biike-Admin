import { CaretDownOutlined } from "@ant-design/icons";
import { Select, Button, Image, Modal, Divider, Pagination, Tag } from "antd";
import { useToggle } from "src/hooks/useToggle";
import { useMutation, useQuery } from "react-query";
import { Voucher, voucherQueryFns } from "src/services/api/voucher";
import { BiikeVoucherModal } from "src/organisms/voucher-modal";
import { BiikeVoucherDetailModal } from "src/organisms/voucher-detail-modal";
import "./index.scss";
import { useState } from "react";

interface VoucherDetailModal {
  openId: number;
  data?: Voucher;
}

interface BiikeVoucherPageProps {}

export const BiikeVoucherPage = (props: BiikeVoucherPageProps) => {
  // paging
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
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
    closeModalCallback?: () => void
  ) => {
    createVoucherMutation.mutateAsync(values).then((res) => {
      if (res.data) {
        closeModalCallback?.();
        refetch();
      }
    });
  };

  // update
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

  const updateVoucherMutation = useMutation(voucherQueryFns.updateVoucher);

  const handleUpdateVoucher = (
    id: number,
    values: any,
    closeModalCallback?: () => void
  ) => {
    updateVoucherMutation.mutateAsync([id, values]).then((res) => {
      closeModalCallback?.();
      refetch();
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
        <Select
          suffixIcon={<CaretDownOutlined className="text-gray-500" />}
          defaultValue="all"
          options={[{ label: "Tất cả", value: "all" }]}
        />
        <Button
          type="primary"
          className="ml-auto rounded"
          onClick={toggleCreateVoucherModalVisible}
        >
          Thêm voucher
        </Button>
      </div>

      <BiikeVoucherModal
        visibleManage={[
          isCreateVoucherModalVisible,
          toggleCreateVoucherModalVisible,
        ]}
        onOk={handleCreateVoucher}
      />

      <div className="biike-voucher-content mt-4">
        {data?.data.map((voucher) => (
          <div className="voucher-item bg-white content-center rounded">
            <Image
              preview={false}
              height={140}
              className="voucher-image rounded"
              src="https://cdn2.yame.vn/cimg/images/f7fbd2bf-4fca-0100-4145-00186cf38d33.jpg"
            />
            <div className="item-details text-gray-500 ml-8">
              <div className="voucher-email text-sm">
                ID: {voucher.voucherId}
              </div>
              <div className="voucher-name text-base font-bold">
                {voucher.voucherName}
              </div>
              <div className="voucher-email text-sm">
                <Tag color="blue">{voucher.brand}</Tag>
                <Tag color="green">{voucher.voucherCategoryName}</Tag>
              </div>
              <div className="voucher-phone text-sm">
                Điểm đổi: {voucher.amountOfPoint}
              </div>
              <div className="voucher-phone text-sm">
                Còn lại: {voucher.remaining}
              </div>
            </div>
            <div className="item-tools ml-auto mr-8">
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
                Xóa
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
