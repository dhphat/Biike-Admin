import { StarFilled } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import { useEffect } from "react";
import { Trip } from "src/services/api/trip";
import "./index.scss";

interface BiikeTripDetailModalProps {
  visibleManage: [boolean, (openID: number) => void];
  trip?: Trip;
  onOk?: (id: number, data: any, closeModalCallback?: () => void) => void;
  isUpdating?: boolean;
}

export const BiikeTripDetailModal = ({
  visibleManage,
  trip,
  onOk,
}: BiikeTripDetailModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();
  // const [tripData, settripData] = useState(initialState)

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(trip);
    }
  }, [visible]);

  const handleCloseModal = () => {
    trip && toggleVisible(trip.tripId);
  };

  const handleSubmitForm = (values: any) => {
    trip && onOk?.(trip.tripId, values, handleCloseModal);
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
            <div className="flex-col flex mr-2 font-sans ">
              <span className="text-lg font-bold">{trip?.bikerFullname}</span>
              <span className="text-lg font-bold">
                <StarFilled style={{ color: "#f4c20d	" }} /> test
              </span>
            </div>
          </div>

          <br />
          <div className="user-email text-sm font-bold">
            <span className="text-gray-1000">Thông tin cơ bản</span>
          </div>

          <br />
          <div className="user-email text-sm font-bold">
            <span className="text-gray-1000">Số địa chỉ</span>
          </div>

          <br />
          <div className="user-email text-sm font-bold">
            <span className="text-gray-1000">Thông tin xe</span>
          </div>

          <br />

          <br />

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
