import {
  Menu,
  Dropdown,
  Button,
  message,
  Row,
  Col,
  Card,
  Statistic,
  Progress,
  Divider,
} from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CaretDownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.scss";

interface BiikeHomePageProps {}

export const BiikeHomePage = (props: BiikeHomePageProps) => {
  // const month = {
  //   key,
  // };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );

  function handleButtonClick(e: any) {
    message.info("Click on left button.");
    console.log("click left button", e);
  }

  function handleMenuClick(e: any) {
    message.info("Click on menu item.");
    console.log("click", e);
  }

  return (
    <div className="biike-dashboard-page flex flex-col">
      <div>
        {/* <Dropdown overlay={menu}>
          <Button>
            Button <CaretDownOutlined />
          </Button>
        </Dropdown> */}
        <div className="biike-dashboard-tools mb-8">
          <Button
            type="primary"
            className="rounded "
            // onClick={toggleCreateStationModalVisible}
          >
            Tải báo cáo
          </Button>
        </div>
        <div>
          <div className="site-statistic-demo-card">
            <Row gutter={16}>
              <Col span={12}>
                <div className="font-bold mb-4">Người dùng</div>

                <Card>
                  <Statistic
                    title="Tổng người dùng"
                    value={100}
                    precision={0}
                    valueStyle={{ color: "#4885ed" }}
                    // prefix={<ArrowUpOutlined />}
                    // suffix="%"
                  />
                </Card>
                <Card>
                  <Statistic
                    title="Người dùng mới"
                    value={50}
                    precision={0}
                    valueStyle={{ color: "#4885ed" }}
                    // prefix={<ArrowUpOutlined />}
                    // suffix="%"
                  />
                </Card>
                <div className="font-bold mb-4 mt-4">Tỉ lệ đặt theo trạm</div>

                <Card>
                  <span>Đại học FPT TP.HCM</span>
                  <Progress percent={50} />
                  <span>Chung cư SKY 9</span>
                  <Progress percent={25} />
                  <span>Ngã tư Thủ Đức</span>
                  <Progress percent={15} />
                  <span>KTX ĐH QG Khu B</span>
                  <Progress percent={10} />
                </Card>

                <div className="font-bold mb-4 mt-4">
                  Điểm, ưu đãi và quảng cáo
                </div>

                <Card>
                  <Statistic
                    title="Tổng điểm đã được dùng"
                    value={100}
                    precision={0}
                    valueStyle={{ color: "#f4c20d	" }}
                    // prefix={<ArrowUpOutlined />}
                    // suffix="%"
                  />
                </Card>
                <Card>
                  <Statistic
                    title="Lượng voucher đã được đổi"
                    value={50}
                    precision={0}
                    valueStyle={{ color: "#f4c20d	" }}
                    // prefix={<ArrowUpOutlined />}
                    // suffix="%"
                  />
                </Card>
                <Card>
                  <Statistic
                    title="Tổng lượt click quảng cáo"
                    value={250}
                    precision={0}
                    valueStyle={{ color: "#f4c20d	" }}
                    // prefix={<ArrowUpOutlined />}
                    // suffix="%"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <div className="font-bold mb-4">Chuyến</div>

                <Card>
                  <Statistic
                    title="Tổng số chuyến"
                    value={100}
                    precision={0}
                    valueStyle={{ color: "#3cba54" }}
                    // prefix={<ArrowUpOutlined />}
                    // suffix="%"
                  />
                </Card>
                <Card>
                  <Statistic
                    title="Tổng km đã tiết kiệm"
                    value={500}
                    precision={0}
                    valueStyle={{ color: "#3cba54" }}
                    // prefix={<ArrowUpOutlined />}
                    // suffix="%"
                  />
                </Card>
                <Card>
                  <Statistic
                    title="Lượng xăng tiết kiệm (ước tính)"
                    value={50}
                    precision={0}
                    valueStyle={{ color: "#3cba54" }}
                    // prefix={<ArrowUpOutlined />}
                    // suffix="%"
                  />
                </Card>
                <div className="font-bold mb-4 mt-4">
                  Tỉ lệ trạng thái chuyến
                </div>
                <div className="site-card-wrapper">
                  <Row gutter={16}>
                    <Col span={8}>
                      <Card
                        title="Đang tìm"
                        bordered={false}
                        style={{ textAlign: "center" }}
                      >
                        <Progress
                          type="circle"
                          percent={15}
                          strokeColor={{ color: "#f4c20d		" }}
                        />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card
                        title="Đang chờ"
                        bordered={false}
                        style={{ textAlign: "center" }}
                      >
                        <Progress
                          type="circle"
                          percent={25}
                          strokeColor={{ color: "#4885ed	" }}
                        />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card
                        title="Đang diễn ra"
                        bordered={false}
                        style={{ textAlign: "center" }}
                      >
                        <Progress
                          type="circle"
                          percent={10}
                          strokeColor={{ color: "#ec4899" }}
                        />
                      </Card>
                    </Col>
                    <Divider />

                    <Col span={12}>
                      <Card
                        title="Thành công"
                        bordered={false}
                        style={{ textAlign: "center" }}
                      >
                        <Progress
                          type="circle"
                          percent={40}
                          strokeColor={{ color: "#3cba54" }}
                        />
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card
                        title="Đã hủy/Thất bại"
                        bordered={false}
                        style={{ textAlign: "center" }}
                      >
                        <Progress
                          type="circle"
                          percent={10}
                          strokeColor={{ color: "#db3236" }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};
