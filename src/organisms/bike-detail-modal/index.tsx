import { Button, Divider, Form, Modal, Tag, Image, Row, Col } from "antd";
import { useEffect } from "react";
import { Bike } from "src/services/api/bike";
import "./index.scss";

interface BiikeBikeDetailModalProps {
  visibleManage: [boolean, (openID: number) => void];
  bike: Bike;
  onOk?: (id: number, data: any, closeModalCallback?: () => void) => void;
  isUpdating?: boolean;
}

export const BiikeBikeDetailModal = ({
  visibleManage,
  bike,
  onOk,
  isUpdating,
}: BiikeBikeDetailModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(bike);
    }
  }, [visible]);

  const handleCloseModal = () => {
    toggleVisible(bike.bikeId);
  };

  const handleSubmitForm = (values: any) => {
    onOk?.(bike.bikeId, values, handleCloseModal);
  };

  return (
    <Modal
      width={600}
      className="biike-bike-detail-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmitForm}>
        <div className="bike-detail-modal-content">
          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={10}>
                <div className="ml-auto flex pa-10 items-center">
                  <div className="flex-col flex font-sans font-bold">
                    <span>Biển số đăng ký</span>
                    <span className="text-lg font-bold text-3xl">
                      {bike?.plateNumber} <br />
                      {true === true && (
                        <Tag color="success">Đã xác minh hợp lệ</Tag>
                      )}
                    </span>
                    <span></span>
                  </div>
                </div>
                <Divider />
                <div className="user-email text-sm ">
                  <span className="text-gray-1000 font-bold">Tên chủ xe</span>
                  <br />
                  {bike.bikeOwner}
                </div>
                <br />

                <div className="user-email text-sm ">
                  <span className="text-gray-1000 font-bold">Hãng xe</span>
                  <br />
                  {bike.brand}
                </div>
                <br />

                <div className="user-email text-sm ">
                  <span className="text-gray-1000 font-bold">Màu sơn</span>
                  <br />
                  {bike.color}
                </div>
                <br />

                <div className="user-email text-sm ">
                  <span className="text-gray-1000 font-bold">Loại xe</span>
                  <br />
                  {bike.bikeOwner}
                </div>
                <br />

                <div className="user-email text-sm ">
                  <span className="text-gray-1000 font-bold">Dung tích xe</span>
                  <br />
                  {bike.bikeOwner}
                </div>
              </Col>
              <Col span={14}>
                <div className="user-email text-sm font-bold mb-2">
                  <span className="text-gray-1000">Ảnh chụp cà vẹt xe</span>
                  <br />
                </div>
                <Image src={bike.bikeLicensePicture} />

                <br />
                <div className="user-email text-sm font-bold mb-2">
                  <span className="text-gray-1000">Ảnh chụp toàn thân xe</span>
                  <br />
                </div>

                <Image src={bike.bikePicture} />

                <br />
                <div className="user-email text-sm font-bold mb-2">
                  <span className="text-gray-1000">Ảnh chụp biển số xe</span>
                  <br />
                </div>
                <Image src={bike.plateNumberPicture} />
              </Col>
            </Row>
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

          <div className="bike-detail-modal-tools">
            <Button onClick={handleCloseModal}>Thoát</Button>

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
            )}
          </div>
        </div>
      </Form>
    </Modal>
  );
};
