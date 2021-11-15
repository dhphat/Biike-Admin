import { CaretDownOutlined } from "@ant-design/icons";
import { Select, Button, Image, Modal, Divider, Pagination, Tag } from "antd";
import { useToggle } from "src/hooks/useToggle";
import { useMutation, useQuery } from "react-query";
import { Advertising, advertisingQueryFns } from "src/services/api/advertising";
import { BiikeAdvertisingModal } from "src/organisms/advertising-modal";
import { BiikeAdvertisingDetailModal } from "src/organisms/advertising-detail-modal";
import "./index.scss";
import { useState } from "react";

interface AdvertisingDetailModal {
  openId: number;
  data?: Advertising;
}

interface BiikeAdsPageProps {}

export const BiikeAdsPage = (props: BiikeAdsPageProps) => {
  // paging
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    total: 10,
  });

  const { data, isFetching, refetch } = useQuery(
    ["advertisings", pagination.page, pagination.pageSize],
    () =>
      advertisingQueryFns.advertisings({
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
  const [isCreateAdvertisingModalVisible, toggleCreateAdvertisingModalVisible] =
    useToggle(false);

  const createAdvertisingMutation = useMutation(
    advertisingQueryFns.createAdvertising
  );

  const handleCreateAdvertising = (
    values: any,
    closeModalCallback?: () => void
  ) => {
    createAdvertisingMutation.mutateAsync(values).then((res) => {
      if (res.data) {
        closeModalCallback?.();
        refetch();
      }
    });
  };

  // update
  const [advertisingDetailModal, setAdvertisingDetailModal] =
    useState<AdvertisingDetailModal>({
      openId: -1,
    });

  const toggleAdvertisingDetailModalVisible = (openId: number) => {
    setAdvertisingDetailModal((prev) => ({
      ...prev,
      openId: prev.openId === openId ? -1 : openId,
    }));
  };

  const openAdvertisingDetailModal = (data: Advertising) => {
    setAdvertisingDetailModal({ openId: data.advertisingId, data });
  };

  const updateAdvertisingMutation = useMutation(
    advertisingQueryFns.updateAdvertising
  );

  const handleUpdateAdvertising = (
    id: number,
    values: any,
    closeModalCallback?: () => void
  ) => {
    updateAdvertisingMutation.mutateAsync([id, values]).then((res) => {
      closeModalCallback?.();
      refetch();
    });
  };

  // delete
  const deleteAdvertisingMutation = useMutation(
    advertisingQueryFns.deleteAdvertising
  );

  const handleDeleteAdvertising = (advertising: Advertising) => {
    Modal.confirm({
      type: "confirm",
      title: `Are you sure to change ${advertising.title}?`,
      onOk: () => {
        deleteAdvertisingMutation
          .mutateAsync(advertising.advertisingId)
          .then((res) => {
            console.log("delete ok!");
            refetch();
          });
      },
    });
  };

  return (
    <div className="biike-ads-page px-4">
      <div className="biike-ads-tools">
        <Select
          suffixIcon={<CaretDownOutlined className="text-gray-500" />}
          defaultValue="all"
          options={[{ label: "Tất cả", value: "all" }]}
        />
        <Button
          type="primary"
          className="ml-auto rounded"
          onClick={toggleCreateAdvertisingModalVisible}
        >
          Thêm quảng cáo
        </Button>

        <BiikeAdvertisingModal
          visibleManage={[
            isCreateAdvertisingModalVisible,
            toggleCreateAdvertisingModalVisible,
          ]}
          onOk={handleCreateAdvertising}
        />
      </div>
      <div className="biike-ads-content mt-4">
        {data?.data.map((advertising) => (
          <div className="voucher-item bg-white content-center rounded">
            <Image
              preview={false}
              height={140}
              className="voucher-image rounded"
              src="https://cdn2.yame.vn/cimg/images/f7fbd2bf-4fca-0100-4145-00186cf38d33.jpg"
            />
            <div className="item-details text-gray-500 ml-8">
              <div className="voucher-name text-base font-bold">
                Shopee Lễ Hội Sale 11.11
              </div>
              <div className="voucher-email text-sm">
                <Tag color="blue">Shopee</Tag>
                <Tag color="green">Đang hoạt động</Tag>
              </div>
              <div className="voucher-phone text-sm">Lượt click: 1000</div>
            </div>
            <div className="item-tools ml-auto mr-8">
              <Button
                type="primary"
                className="rounded"
                onClick={() => openAdvertisingDetailModal(advertising)}
              >
                Xem
              </Button>

              <Button type="primary" danger className="rounded">
                Xóa
              </Button>
            </div>
          </div>
        ))}

        <div className="voucher-item bg-white content-center rounded">
          <Image
            preview={false}
            height={140}
            className="voucher-image rounded"
            src="https://cdn2.yame.vn/cimg/images/f7fbd2bf-4fca-0100-4145-00186cf38d33.jpg"
          />
          <div className="item-details text-gray-500 ml-8">
            <div className="voucher-name text-base font-bold">
              Shopee Lễ Hội Sale 11.11
            </div>
            <div className="voucher-email text-sm">
              <Tag color="blue">Shopee</Tag>
              <Tag color="red">Đang tắt</Tag>
            </div>
            <div className="voucher-phone text-sm">Lượt click: 1000</div>
          </div>
          <div className="item-tools ml-auto mr-8">
            <Button type="primary" className="rounded">
              Xem
            </Button>

            <Button type="primary" danger className="rounded">
              Xóa
            </Button>
          </div>
        </div>
        <div className="voucher-item bg-white content-center rounded">
          <Image
            preview={false}
            height={140}
            className="voucher-image rounded"
            src="https://cdn2.yame.vn/cimg/images/f7fbd2bf-4fca-0100-4145-00186cf38d33.jpg"
          />
          <div className="item-details text-gray-500 ml-8">
            <div className="voucher-name text-base font-bold">
              Shopee Lễ Hội Sale 11.11
            </div>
            <div className="voucher-email text-sm">
              <Tag color="blue">Shopee</Tag>
              <Tag color="green">Đang hoạt động</Tag>
            </div>
            <div className="voucher-phone text-sm">Lượt click: 1000</div>
          </div>
          <div className="item-tools ml-auto mr-8">
            <Button type="primary" className="rounded">
              Xem
            </Button>

            <Button type="primary" danger className="rounded">
              Xóa
            </Button>
          </div>
        </div>

        <BiikeAdvertisingDetailModal
          visibleManage={[
            advertisingDetailModal.openId ===
              advertisingDetailModal.data?.advertisingId,
            toggleAdvertisingDetailModalVisible,
          ]}
          advertising={advertisingDetailModal.data}
          onOk={handleUpdateAdvertising}
          isUpdating={updateAdvertisingMutation.isLoading}
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
