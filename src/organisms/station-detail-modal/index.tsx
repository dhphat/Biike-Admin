import { CaretDownOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Tooltip, Typography } from "antd";
import { useEffect } from "react";
import { Station } from "src/services/api/station";
import moment from "moment";
import "./index.scss";

interface BiikeStationDetailModalProps {
  visibleManage: [boolean, (openID: number) => void];
  station?: Station;
  onOk?: (id: number, data: any, closeModalCallback?: () => void) => void;
  isUpdating?: boolean;
}

export const BiikeStationDetailModal = ({
  visibleManage,
  station,
  onOk,
  isUpdating,
}: BiikeStationDetailModalProps) => {
  const [visible, toggleVisible] = visibleManage;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(station);
    }
  }, [visible]);

  const handleCloseModal = () => {
    station && toggleVisible(station.stationId);
  };

  const handleSubmitForm = (values: any) => {
    station && onOk?.(station.stationId, values, handleCloseModal);
  };

  var stringMap = new String("");

  return (
    <Modal
      className="biike-station-detail-modal rounded"
      visible={visible}
      onCancel={handleCloseModal}
      closable={false}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmitForm}>
        <div className="station-detail-modal-content">
          <div>
            <span className="text-gray-500">Thời gian tạo</span>
            <br />
            <span className="text-gray-500">
              {moment(station?.createdDate).format("DD/MM/YYYY HH:mm")}
            </span>
            <br />
            <br />
          </div>

          <Form.Item
            name="name"
            label="Tên trạm"
            tooltip={{
              title:
                "Tên trạm là tên sẽ được hiển thị trên ứng dụng. Hãy viết tên trạm rõ ràng, dễ nhận biết.",
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên trạm",
              },
            ]}
          >
            <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500" />
          </Form.Item>
          <div className="flex flex-column">
            <Form.Item
              name="coordinate"
              label="Tọa độ"
              tooltip={{
                title:
                  "Lấy tọa độ chính xác bằng cách mở bản đồ, nhấp chuột phải vào điểm và bấm vào tọa độ để copy.",
                icon: <InfoCircleOutlined />,
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tọa độ",
                },
              ]}
            >
              <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-1 text-blue-gray-500 mr-1" />
            </Form.Item>
            <Button
              type="primary"
              className="rounded ml-1 mt-8"
              href="https://www.google.com/maps/"
              target="_blank"
            >
              Bản đồ
            </Button>
          </div>
          <iframe
            src={stringMap.concat(
              "https://maps.google.com/maps?q=",
              station?.coordinate,
              "&t=&ie=UTF8&iwloc=&output=embed"
            )}
            width="100%"
            height="250"
            loading="lazy"
          />

          <Form.Item
            name="address"
            label="Địa chỉ"
            tooltip={{
              title:
                "Từ trang bản đồ, hãy bấm vào dòng địa chỉ ở thanh trái để copy địa chỉ.",
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ",
              },
            ]}
          >
            <Input className="bg-blue-gray-100 rounded border-blue-gray-100 py-4 text-blue-gray-500" />
          </Form.Item>

          <Form.Item
            name="areaId"
            label="Khu vực"
            tooltip={{
              title: "Hãy đảm bảo trạm của bạn nằm trong khu vực bạn chọn.",
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn khu vực",
              },
            ]}
          >
            <Select
              suffixIcon={<CaretDownOutlined className="text-gray-500" />}
              // defaultValue="1"
              options={[{ label: "Trường Đại học FPT", value: 1 }]}
              className="bg-blue-gray-100 rounded border-blue-gray-100 text-blue-gray-500"
            />
          </Form.Item>

          <div className="station-detail-modal-tools">
            <Button onClick={handleCloseModal}>Thoát</Button>
            {station?.isDeleted === false && station?.isCentralPoint === false && (
              <Button
                type="primary"
                className="rounded"
                htmlType="submit"
                loading={isUpdating}
              >
                Cập nhật
              </Button>
            )}
          </div>
        </div>
      </Form>
    </Modal>
  );
};
