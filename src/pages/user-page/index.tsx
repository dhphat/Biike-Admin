import { Button, Input, Modal, Tag } from "antd";
import { useMutation, useQuery } from "react-query";
import { User, userQueryFns } from "src/services/api/user";
import { BiikeUserDetailModal } from "src/organisms/user-detail-modal";
import "./index.scss";
import { useState } from "react";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

interface UserDetailModal {
  openId: number;
  data?: User;
}

interface BiikeUserPageProps {}

export const BiikeUserPage = (props: BiikeUserPageProps) => {
  const { data, isFetching, refetch } = useQuery(["users"], () =>
    userQueryFns.users({ page: 1, limit: 20 })
  );

  // delete
  const deleteUserMutation = useMutation(userQueryFns.deleteUser);

  const handleDeleteUser = (user: User) => {
    Modal.confirm({
      type: "confirm",
      title: `Are you sure to change ${user.userFullname}?`,
      onOk: () => {
        deleteUserMutation.mutateAsync(user.userId).then((res) => {
          console.log("delete ok!");
          refetch();
        });
      },
    });
  };

  // view
  const [userDetailModal, setUserDetailModal] = useState<UserDetailModal>({
    openId: -1,
  });

  const toggleUserDetailModalVisible = (openId: number) => {
    setUserDetailModal((prev) => ({
      ...prev,
      openId: prev.openId === openId ? -1 : openId,
    }));
  };

  const openUserDetailModal = (data: User) => {
    setUserDetailModal({ openId: data.userId, data });
  };

  return (
    <div className="biike-user-page px-4">
      <div className="biike-user-tools">
        <Input
          placeholder="Nhập tên, email, số điện thoại"
          className="max-w-sm rounded min-h-10"
        />
        <Button type="primary" value="large" className="rounded px-8 min-h-10">
          Tìm kiếm
        </Button>
      </div>
      <div className="biike-user-content mt-4">
        {data?.data.map((user) => (
          <div className="user-item bg-white px-8 py-4 content-center">
            <div className="item-details text-gray-500 mb-1">
              <div className="user-name text-base font-bold">
                {user.userFullname}{" "}
                {user.isDeleted === true && (
                  <Tag color="error">Tài khoản bị khóa</Tag>
                )}
              </div>
              <div className="user-email text-sm">
                <MailOutlined /> {user.email}
              </div>
              <div className="user-phone text-sm">
                <PhoneOutlined /> {user.userPhoneNumber}
              </div>
            </div>
            <div className="item-tools">
              <Button
                type="primary"
                className="rounded"
                onClick={() => openUserDetailModal(user)}
              >
                Xem
              </Button>
              <BiikeUserDetailModal
                visibleManage={[
                  userDetailModal.openId === user.userId,
                  toggleUserDetailModalVisible,
                ]}
                user={user}
              />

              {user.isDeleted === true ? (
                <Button
                  type="default"
                  className="rounded"
                  onClick={() => handleDeleteUser(user)}
                >
                  Mở khóa
                </Button>
              ) : (
                <Button
                  type="primary"
                  danger
                  className="rounded"
                  onClick={() => handleDeleteUser(user)}
                >
                  Khóa
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
