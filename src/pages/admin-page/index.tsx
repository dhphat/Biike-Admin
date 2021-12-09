import { Button, Modal, Pagination, Divider } from "antd";
import { useMutation, useQuery } from "react-query";
import { useToggle } from "src/hooks/useToggle";
import { User, userQueryFns } from "src/services/api/user";
import { BiikeAdminModal } from "src/organisms/admin-modal";
import { BiikeAdminDetailModal } from "src/organisms/admin-detail-modal";
import "./index.scss";
import { useState } from "react";

interface AdminDetailModal {
  openId: number;
  data?: User;
}

interface BiikeAdminPageProps {}

export const BiikeAdminPage = (props: BiikeAdminPageProps) => {
  // paging
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 50,
    total: 10,
  });

  const { data, isFetching, refetch } = useQuery(
    ["users", pagination.page, pagination.pageSize],
    () =>
      userQueryFns.users({
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
  const [isCreateAdminModalVisible, toggleCreateAdminModalVisible] =
    useToggle(false);

  const createAdminMutation = useMutation(userQueryFns.createUser);

  const handleCreateAdmin = (values: any, closeModalCallback?: () => void) => {
    createAdminMutation.mutateAsync(values).then((res) => {
      if (res.data) {
        closeModalCallback?.();
        refetch();
      }
    });
  };

  // edit profile
  const [adminDetailModal, setAdminDetailModal] = useState<AdminDetailModal>({
    openId: -1,
  });

  const toggleAdminDetailModalVisible = (openId: number) => {
    setAdminDetailModal((prev) => ({
      ...prev,
      openId: prev.openId === openId ? -1 : openId,
    }));
  };

  const openAdminDetailModal = (data: User) => {
    setAdminDetailModal({ openId: data.userId, data });
  };

  const updateAdminMutation = useMutation(userQueryFns.editProfile);

  const handleUpdateAdmin = (
    id: number,
    values: any,
    closeModalCallback?: () => void
  ) => {
    updateAdminMutation.mutateAsync([id, values]).then((res) => {
      closeModalCallback?.();
      refetch();
    });
  };

  // delete
  const deleteAdminMutation = useMutation(userQueryFns.deleteUser);

  const handleDeleteUser = (admin: User) => {
    Modal.confirm({
      type: "confirm",
      title: `Are you sure to change ${admin.userFullname}?`,
      onOk: () => {
        deleteAdminMutation.mutateAsync(admin.userId).then((res) => {
          console.log("delete ok!");
          refetch();
        });
      },
    });
  };

  return (
    <div className="biike-admin-page px-4">
      <div className="biike-admin-tools">
        <Button
          type="primary"
          className="rounded "
          onClick={toggleCreateAdminModalVisible}
        >
          Thêm
        </Button>
      </div>

      <BiikeAdminModal
        visibleManage={[
          isCreateAdminModalVisible,
          toggleCreateAdminModalVisible,
        ]}
        onOk={handleCreateAdmin}
      />
      <div className="biike-admin-content mt-4">
        {data?.data.map(
          (admin, index) =>
            admin.roleId != 1 &&
            admin.roleId != 2 && (
              <div
                key={index}
                className="admin-item bg-white px-8 py-4 content-center"
              >
                <div className="item-details text-gray-500 mb-1">
                  <div className="admin-name text-base font-bold">
                    {admin.userFullname}
                  </div>
                  <div className="admin-email text-sm">{admin.email}</div>
                </div>
                <div className="item-tools">
                  <Button
                    type="primary"
                    className="rounded"
                    onClick={() => openAdminDetailModal(admin)}
                  >
                    Xem
                  </Button>
                  <BiikeAdminDetailModal
                    visibleManage={[
                      adminDetailModal.openId === admin.userId,
                      toggleAdminDetailModalVisible,
                    ]}
                    admin={admin}
                  />
                  {admin.isDeleted === true ? (
                    <Button
                      type="default"
                      className="rounded"
                      onClick={() => handleDeleteUser(admin)}
                    >
                      Mở khóa
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      danger
                      className="rounded"
                      onClick={() => handleDeleteUser(admin)}
                    >
                      Khóa
                    </Button>
                  )}
                </div>
              </div>
            )
        )}

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
