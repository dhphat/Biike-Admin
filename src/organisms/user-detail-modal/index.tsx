import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  StarFilled,
  TeamOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Form, Modal, Tag } from "antd";
import { useEffect } from "react";
import { User } from "src/services/api/user";
import { GENDER } from "src/utils/constants";
import "./index.scss";

interface BiikeUserDetailModalProps {
  visibleManage: [boolean, (openID: number) => void];
  user: User;
  onOk?: (id: number, data: any, closeModalCallback?: () => void) => void;
  isUpdating?: boolean;
}

export const BiikeUserDetailModal = ({
  visibleManage,
  user,
  onOk,
}: BiikeUserDetailModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(user);
    }
  }, [visible]);

  const handleCloseModal = () => {
    toggleVisible(user.userId);
  };

  const handleSubmitForm = (values: any) => {
    onOk?.(user.userId, values, handleCloseModal);
  };

  return (
    <Modal
      className="biike-user-detail-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="user-detail-modal-content">
          <div className="ml-auto flex pa-10 items-center">
            <Avatar
              size={100}
              src={user?.avatar}
              className="flex-col flex items-end mr-2"
            />
            <div className="flex-col flex mr-2 font-sans ">
              <span className="text-lg font-bold">
                {user?.userFullname}{" "}
                {user.isDeleted === true && (
                  <Tag color="error">Tài khoản bị khóa</Tag>
                )}
              </span>
              <span className="text-lg font-bold">
                <StarFilled style={{ color: "#f4c20d	" }} /> {user.userStar}
              </span>
            </div>
          </div>

          <br />
          <div className="user-email text-sm font-bold">
            <span className="text-gray-1000">Thông tin cơ bản</span>
          </div>

          <div className="user-email text-sm">
            <span className="text-gray-500">
              <MailOutlined /> {user.email}
            </span>
          </div>

          <div className="user-email text-sm">
            <span className="text-gray-500">
              <PhoneOutlined /> {user.userPhoneNumber}
            </span>
          </div>

          <div className="user-email text-sm">
            <span className="text-gray-500">
              <TeamOutlined /> {GENDER[user.gender]}
            </span>
          </div>

          <br />
          <div className="user-email text-sm font-bold">
            <span className="text-gray-1000">Số địa chỉ</span>
          </div>

          {user.userAddresses.length ? (
            user.userAddresses.map((address) => (
              <div className="user-email text-sm">
                <span className="text-gray-500">
                  <EnvironmentOutlined /> {address.addressDetail}{" "}
                  {address.isDefault === true && (
                    <Tag color="blue">Mặc định</Tag>
                  )}
                </span>
              </div>
            ))
          ) : (
            <div className="text-gray-400">Chưa cung cấp</div>
          )}

          <br />
          <div className="user-email text-sm font-bold">
            <span className="text-gray-1000">Thông tin xe</span>
          </div>

          <div className="user-email text-sm">
            <span className="text-gray-500">
              {user.isBikeVerified === true ? (
                <Tag color="default">Chưa có xe được xác minh</Tag>
              ) : (
                <Tag color="green">Đã có xe được xác minh</Tag>
              )}
            </span>
          </div>

          <br />
          <div className="user-email text-sm ">
            <span className="text-gray-1000 font-bold">Điểm hiện tại: </span>
            {user.totalPoint}
          </div>
          <div className="user-email text-sm ">
            <span className="text-gray-1000 font-bold">
              Điểm nhận tháng này:{" "}
            </span>
            {user.maxTotalPoint}
          </div>
          <br />

          <div className="user-email text-sm text-gray-400">
            <span>Thời gian tạo: </span>
            {user.createdDate}
          </div>
          <br />
          {/* createdDate
          
          gender */}

          <div className="user-detail-modal-tools">
            <Button onClick={handleCloseModal}>Thoát</Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};