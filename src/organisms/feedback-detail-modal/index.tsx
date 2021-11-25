import { Button, Divider, Form, Modal, Tag, Image, Row, Col, Rate } from "antd";
import { useEffect } from "react";
import { Feedback } from "src/services/api/feedback";
import "./index.scss";

interface BiikeFeedbackDetailModalProps {
  visibleManage: [boolean, (openID: number) => void];
  feedback: Feedback;
  onOk?: (id: number, data: any, closeModalCallback?: () => void) => void;
  isUpdating?: boolean;
}

export const BiikeFeedbackDetailModal = ({
  visibleManage,
  feedback,
  onOk,
  isUpdating,
}: BiikeFeedbackDetailModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(feedback);
    }
  }, [visible]);

  const handleCloseModal = () => {
    toggleVisible(feedback.feedbackId);
  };

  const handleSubmitForm = (values: any) => {
    onOk?.(feedback.feedbackId, values, handleCloseModal);
  };

  return (
    <Modal
      className="biike-feedback-detail-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="feedback-detail-modal-content">
          <div className="ml-auto flex pa-10 items-center">
            <div className="flex-col flex font-sans font-bold">
              <span>{feedback.userFullname} đánh giá</span>
              <div className="mb-2">
                <Rate
                  className="text-3xl"
                  disabled
                  defaultValue={feedback.tripStar}
                />
              </div>
            </div>
          </div>
          {true === true && <Tag color="processing">{feedback.criteria}</Tag>}
          <Divider />

          <div className="user-email text-sm ">
            <span className="text-gray-1000 font-bold">ID chuyến</span>
            <br />
            {feedback.tripId}
          </div>

          <br />

          <div className="user-email text-sm ">
            <span className="text-gray-1000 font-bold">Nội dung đánh giá</span>
            <br />
            {feedback.feedbackContent}
          </div>
          <br />

          <div className="user-email text-sm ">
            <span className="text-gray-1000 font-bold">Điểm tip</span>
            <br />
            {feedback.tripTip == null ? (
              <span className="text-gray-1000">Không có</span>
            ) : (
              <span className="text-gray-1000">{feedback.tripTip}</span>
            )}
          </div>

          <Divider />

          {/* <div className="user-email text-sm">
            <span className="text-gray-500">
              {user.isBikeVerified === true ? (
                <Tag color="default">Chưa có xe được xác minh</Tag>
              ) : (
                <Tag color="green">Đã có xe được xác minh</Tag>
              )}
            </span>
          </div> */}

          {/* <div className="user-email text-sm ">
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
          </div> */}

          {/* createdDate
          
          gender */}

          <div className="feedback-detail-modal-tools">
            <Button onClick={handleCloseModal}>Thoát</Button>
            {/* 
            {false === false && (
              <Button
                type="text"
                className="rounded"
                htmlType="submit"
                loading={isUpdating}
              >
                Xác minh không hợp lệ
              </Button>
            )}
            {false === false && (
              <Button
                type="primary"
                className="rounded"
                htmlType="submit"
                loading={isUpdating}
              >
                Xác minh hợp lệ
              </Button>
            )} */}
          </div>
        </div>
      </Form>
    </Modal>
  );
};
