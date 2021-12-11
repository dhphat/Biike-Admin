import { CaretDownOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Modal,
  Tag,
  Image,
  Row,
  Col,
  Select,
} from "antd";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { Bike, bikeQueryFns } from "src/services/api/bike";
import { BIKE_STATUS } from "src/utils/constants";
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

  //verify valid
  const handleVerifyBikeIsValid = (values: any) => {
    onOk?.(bike.bikeId, values, handleCloseModal);
  };

  //verify invalid
  const handleVerifyBikeIsInvalid = (values: any) => {
    onOk?.(bike.bikeId, values, handleCloseModal);
  };

  return (
    <Modal
      width={1000}
      className="biike-bike-detail-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form>
        <div className="bike-detail-modal-content">
          <div className="site-card-wrapper">
            <Row gutter={20}>
              <Col span={6}>
                <div className="ml-auto flex pa-10 items-center">
                  <div className="flex-col flex font-sans font-bold">
                    <span>Biển số đăng ký</span>
                    <span className="text-lg font-bold text-3xl">
                      {bike.plateNumber} <br />
                      {bike.bikeStatus == BIKE_STATUS.UN_VERIFIED && (
                        <Tag color="processing">Chưa xác minh</Tag>
                      )}
                      {bike.bikeStatus == BIKE_STATUS.SUCCESS_VERIFIED && (
                        <Tag color="success">Đã xác minh hợp lệ</Tag>
                      )}
                      {bike.bikeStatus == BIKE_STATUS.FAIL_VERIFIED && (
                        <Tag color="error">Đã xác minh không hợp lệ</Tag>
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
                  {bike.bikeType}
                </div>
                <br />

                <div className="user-email text-sm ">
                  <span className="text-gray-1000 font-bold">Dung tích xe</span>
                  <br />
                  {bike.bikeVolume}
                </div>
              </Col>
              <Col span={9}>
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
              <Col span={9}>
                <div className="user-email text-sm font-bold mb-2">
                  <span className="text-gray-1000">
                    Ảnh chụp mặt trước bằng lái xe
                  </span>
                  <br />
                </div>
                <Image src={bike.drivingLicenseFrontPicture} />

                <br />
                <div className="user-email text-sm font-bold mb-2">
                  <span className="text-gray-1000">
                    Ảnh chụp mặt sau bằng lái xe
                  </span>
                  <br />
                </div>

                <Image src={bike.drivingLicenseBackPicture} />
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
          {bike.bikeStatus === BIKE_STATUS.UN_VERIFIED && (
            <div className="bike-detail-modal-tools mb-5 text-red-500">
              Khi đã xác minh, bạn sẽ không thể hoàn tác. Hãy kiểm tra thật kỹ
              trước khi xác minh.
            </div>
          )}

          <div className="bike-detail-modal-tools">
            <Button onClick={handleCloseModal}>Thoát</Button>

            {bike.bikeStatus === BIKE_STATUS.UN_VERIFIED && (
              <div>
                <Button
                  danger
                  className="rounded mr-5"
                  htmlType="submit"
                  onClick={() =>
                    handleVerifyBikeIsValid({
                      verificationResult: false,
                      failedVerificationReason:
                        "Thông tin xe bạn gửi chưa chính xác, vui lòng thêm lại xe.",
                    })
                  }
                >
                  Xác minh không hợp lệ
                </Button>
                <Button
                  type="primary"
                  className="rounded"
                  htmlType="submit"
                  onClick={() =>
                    handleVerifyBikeIsInvalid({ verificationResult: true })
                  }
                >
                  Xác minh hợp lệ
                </Button>
              </div>
            )}
          </div>
        </div>
      </Form>
    </Modal>
  );
};
