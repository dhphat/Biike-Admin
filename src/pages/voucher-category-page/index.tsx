import { Select, Button, Modal, Pagination, Divider } from "antd";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import { useToggle } from "src/hooks/useToggle";
import {
  VoucherCategory,
  voucherCategoryQueryFns,
} from "src/services/api/voucher-category";
import { BiikeVoucherCategoryModal } from "src/organisms/voucher-category-modal";
import { BiikeVoucherCategoryDetailModal } from "src/organisms/voucher-category-detail-modal";
import "./index.scss";

interface VoucherCategoryDetailModal {
  openId: number;
  data?: VoucherCategory;
}

interface BiikeVoucherCategoryPageProps {}

export const BiikeVoucherCategoryPage = (
  props: BiikeVoucherCategoryPageProps
) => {
  // paging
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    total: 10,
  });

  const { data, isFetching, refetch } = useQuery(
    ["voucherCategories", pagination.page, pagination.pageSize],
    () =>
      voucherCategoryQueryFns.voucherCategories({
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
  const [
    isCreateVoucherCategoryModalVisible,
    toggleCreateVoucherCategoryModalVisible,
  ] = useToggle(false);

  const createVoucherCategoryMutation = useMutation(
    voucherCategoryQueryFns.createVoucherCategory
  );

  const handleCreateVoucherCategory = (
    values: any,
    closeModalCallback?: () => void
  ) => {
    createVoucherCategoryMutation.mutateAsync(values).then((res) => {
      if (res.data) {
        closeModalCallback?.();
        refetch();
      }
    });
  };

  // update
  const [voucherCategoryDetailModal, setVoucherCategoryDetailModal] =
    useState<VoucherCategoryDetailModal>({
      openId: -1,
    });

  const toggleVoucherCategoryDetailModalVisible = (openId: number) => {
    setVoucherCategoryDetailModal((prev) => ({
      ...prev,
      openId: prev.openId === openId ? -1 : openId,
    }));
  };

  const openVoucherCategoryDetailModal = (data: VoucherCategory) => {
    setVoucherCategoryDetailModal({ openId: data.voucherCategoryId, data });
  };

  const updateVoucherCategoryMutation = useMutation(
    voucherCategoryQueryFns.updateVoucherCategory
  );

  const handleUpdateVoucherCategory = (
    id: number,
    values: any,
    closeModalCallback?: () => void
  ) => {
    updateVoucherCategoryMutation.mutateAsync([id, values]).then((res) => {
      closeModalCallback?.();
      refetch();
    });
  };

  // delete
  const deleteVoucherCategoryMutation = useMutation(
    voucherCategoryQueryFns.deleteVoucherCategory
  );

  const handleDeleteVoucherCategory = (voucherCategory: VoucherCategory) => {
    Modal.confirm({
      type: "confirm",
      title: `Are you sure to change ${voucherCategory.categoryName}?`,
      onOk: () => {
        deleteVoucherCategoryMutation
          .mutateAsync(voucherCategory.voucherCategoryId)
          .then((res) => {
            console.log("delete ok!");
            refetch();
          });
      },
    });
  };

  return (
    <div className="biike-voucher-category-page">
      <div className="biike-voucher-category-tools mb-8">
        <Button
          type="primary"
          className="rounded"
          onClick={toggleCreateVoucherCategoryModalVisible}
        >
          Thêm loại ưu đãi
        </Button>
      </div>
      <BiikeVoucherCategoryModal
        visibleManage={[
          isCreateVoucherCategoryModalVisible,
          toggleCreateVoucherCategoryModalVisible,
        ]}
        onOk={handleCreateVoucherCategory}
      />
      <div className="biike-voucher-category-content">
        {data?.data.map((voucherCategory, index) => (
          <div className="voucher-category-item bg-white rounded px-8 py-4 ">
            <div className="item-details text-gray-500 text-base font-bold">
              {voucherCategory.categoryName}
            </div>
            <div className="item-tools">
              <Button
                type="primary"
                className="rounded"
                onClick={() => openVoucherCategoryDetailModal(voucherCategory)}
              >
                Xem
              </Button>

              <BiikeVoucherCategoryDetailModal
                visibleManage={[
                  voucherCategoryDetailModal.openId ===
                    voucherCategory.voucherCategoryId,
                  toggleVoucherCategoryDetailModalVisible,
                ]}
                voucherCategory={voucherCategory}
                onOk={handleUpdateVoucherCategory}
                isUpdating={updateVoucherCategoryMutation.isLoading}
              />

              <Button
                type="primary"
                danger
                className="rounded"
                onClick={() => handleDeleteVoucherCategory(voucherCategory)}
              >
                Xóa
              </Button>
            </div>
          </div>
        ))}
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
