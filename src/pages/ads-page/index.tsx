import { Button, Image, Modal, Divider, Pagination, Tag } from "antd";
import { useToggle } from "src/hooks/useToggle";
import { useMutation, useQuery } from "react-query";
import {
  Advertisement,
  advertisementQueryFns,
} from "src/services/api/advertisement";
import { BiikeAdvertisementModal } from "src/organisms/advertisement-modal";
import { BiikeAdvertisementDetailModal } from "src/organisms/advertisement-detail-modal";
import "./index.scss";
import { useState } from "react";
import { RcFile } from "antd/lib/upload";

interface AdvertisementDetailModal {
  openId: number;
  data?: Advertisement;
}

interface BiikeAdvertisementPageProps {}

export const BiikeAdvertisementPage = (props: BiikeAdvertisementPageProps) => {
  // paging
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 10,
  });

  const { data, isFetching, refetch } = useQuery(
    ["advertisements", pagination.page, pagination.pageSize],
    () =>
      advertisementQueryFns.advertisements({
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
  // const [
  //   isCreateAdvertisementModalVisible,
  //   toggleCreateAdvertisementModalVisible,
  // ] = useToggle(false);

  // const createAdvertisementMutation = useMutation(
  //   advertisementQueryFns.createAdvertisement
  // );

  // const handleCreateAdvertisement = (
  //   values: any,
  //   closeModalCallback?: () => void
  // ) => {
  //   createAdvertisementMutation.mutateAsync(values).then((res) => {
  //     if (res.data) {
  //       closeModalCallback?.();
  //       refetch();
  //     }
  //   });
  // };

  const [
    isCreateAdvertisementModalVisible,
    toggleCreateAdvertisementModalVisible,
  ] = useToggle(false);

  const createAdvertisementMutation = useMutation(
    advertisementQueryFns.createAdvertisement
  );

  const handleCreateAdvertisement = (
    values: any,
    newBanners: RcFile[],
    closeModalCallback?: () => void
  ) => {
    const formData = new FormData();
    formData.append("imageType", "4");
    newBanners.forEach((banner) => {
      formData.append("imageList", banner);
    });
    if (newBanners.length) {
      uploadImageMutation.mutateAsync(formData).then((uploadRes) => {
        const advertisementImages: string[] = uploadRes.data;
        createAdvertisementMutation
          .mutateAsync({ ...values, advertisementImages })
          .then((createRes) => {
            closeModalCallback?.();
            refetch();
          });
      });
    }
  };

  // update advertisement
  const [advertisementDetailModal, setAdvertisementDetailModal] =
    useState<AdvertisementDetailModal>({
      openId: -1,
    });

  const toggleAdvertisementDetailModalVisible = (openId: number) => {
    setAdvertisementDetailModal((prev) => ({
      ...prev,
      openId: prev.openId === openId ? -1 : openId,
    }));
  };

  const openAdvertisementDetailModal = (data: Advertisement) => {
    setAdvertisementDetailModal({ openId: data.advertisementId, data });
  };

  const updateAdvertisementBannersMutation = useMutation(
    advertisementQueryFns.updateAdvertisementBanners
  );

  const updateAdvertisementMutation = useMutation(
    advertisementQueryFns.updateAdvertisement
  );

  const uploadImageMutation = useMutation(
    advertisementQueryFns.uploadAdvertisementBanner
  );

  const removeAdvertisementBannersMutation = useMutation(
    advertisementQueryFns.removeAdvertisementBanners
  );

  const handleUpdateAdvertisement = (
    id: number,
    values: any,
    newBanners: RcFile[],
    removedBannerIds: string[],
    closeModalCallback?: () => void
  ) => {
    const formData = new FormData();
    formData.append("imageType", "4");
    newBanners.forEach((banner) => {
      formData.append("imageList", banner);
    });
    if (newBanners.length) {
      uploadImageMutation.mutateAsync(formData).then((res) => {
        const bannerUrls: string[] = res.data;
        updateAdvertisementBannersMutation
          .mutateAsync([id, bannerUrls])
          .then((res) => {
            refetch();
          });
      });
    }
    if (removedBannerIds.length) {
      removeAdvertisementBannersMutation
        .mutateAsync([id, removedBannerIds])
        .then((res) => {
          refetch();
        });
    }
    updateAdvertisementMutation
      .mutateAsync([id, { ...values, addressIds: [1] }])
      .then((res) => {
        closeModalCallback?.();
        refetch();
      });
  };

  // delete
  const deleteAdvertisementMutation = useMutation(
    advertisementQueryFns.deleteAdvertisement
  );

  const handleDeleteAdvertisement = (advertisement: Advertisement) => {
    Modal.confirm({
      type: "confirm",
      title: `Are you sure to change ${advertisement.title}?`,
      onOk: () => {
        deleteAdvertisementMutation
          .mutateAsync(advertisement.advertisementId)
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
        {/* <Select
          suffixIcon={<CaretDownOutlined className="text-gray-500" />}
          defaultValue="all"
          options={[{ label: "T???t c???", value: "all" }]}
        /> */}
        <Button
          type="primary"
          className="ml-auto rounded"
          onClick={toggleCreateAdvertisementModalVisible}
        >
          Th??m qu???ng c??o
        </Button>

        <BiikeAdvertisementModal
          visibleManage={[
            isCreateAdvertisementModalVisible,
            toggleCreateAdvertisementModalVisible,
          ]}
          onOk={handleCreateAdvertisement}
        />
      </div>
      <div className="biike-ads-content mt-4">
        {data?.data.map((advertisement, index) => (
          <div
            key={index}
            className="advertisement-item bg-white content-center rounded"
          >
            <Image
              preview={false}
              height={140}
              width={200}
              className="advertisement-image rounded"
              src={
                advertisement.advertisementImages[0]?.advertisementImageUrl ||
                "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              }
            />
            <div className="item-details text-gray-500 ml-8">
              <div className="voucher-email text-sm">
                ID: {advertisement.advertisementId}
              </div>
              <div className="advertisement-name text-base font-bold">
                {advertisement.title}
              </div>
              <div className="advertisement-email text-sm">
                <Tag color="#108ee9">{advertisement.brand}</Tag>
                {advertisement.isActive === true ? (
                  <Tag color="blue">??ang ho???t ?????ng</Tag>
                ) : (
                  <Tag color="red">??ang t???t</Tag>
                )}
              </div>
              <div className="advertisement-phone text-sm">
                L?????t click: {advertisement.totalClickCount}
              </div>
            </div>
            <div className="item-tools ml-auto mr-8">
              <Button
                type="primary"
                className="rounded"
                onClick={() => openAdvertisementDetailModal(advertisement)}
              >
                Xem
              </Button>

              <Button type="primary" danger className="rounded">
                X??a
              </Button>
            </div>
          </div>
        ))}

        <BiikeAdvertisementDetailModal
          visibleManage={[
            advertisementDetailModal.openId ===
              advertisementDetailModal.data?.advertisementId,
            toggleAdvertisementDetailModalVisible,
          ]}
          advertisement={advertisementDetailModal.data}
          onOk={handleUpdateAdvertisement}
          isUpdating={updateAdvertisementMutation.isLoading}
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
