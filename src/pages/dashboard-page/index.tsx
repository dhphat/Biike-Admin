import { Button, message, Row, Col, Card, Statistic, Progress } from "antd";
import "./index.scss";
import { useQuery } from "react-query";
import { dashboardQueryFns } from "src/services/api/dashboard";
import { useState } from "react";
import { TRIP_STATUS } from "src/utils/constants";
import { Pie } from "@ant-design/charts";

interface BiikeHomePageProps {}

export const BiikeHomePage = (props: BiikeHomePageProps) => {
  function handleButtonClick(e: any) {
    message.info("Click on left button.");
    console.log("click left button", e);
  }

  function handleMenuClick(e: any) {
    message.info("Click on menu item.");
    console.log("click", e);
  }

  // paging
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 10,
  });

  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
      ...(pageSize !== prev.pageSize ? { pageSize, page: 1 } : {}),
    }));
  };

  const [pieData, setPieData] = useState<
    Array<{ type: string; value: number }>
  >([]);

  const { data, isFetching, refetch } = useQuery(
    ["dashboard"],
    () => dashboardQueryFns.dashboard(),
    {
      onSuccess: (data) => {
        setPieData(
          data.data.tripStatusPercentage.map((item) => ({
            type:
              item.tripStatus === TRIP_STATUS.FINDING
                ? "Đang tìm"
                : item.tripStatus === TRIP_STATUS.MATCHED
                ? "Đã ghép"
                : item.tripStatus === TRIP_STATUS.WAITING
                ? "Đang chờ"
                : item.tripStatus === TRIP_STATUS.STARTED
                ? "Đã bắt đầu"
                : item.tripStatus === TRIP_STATUS.FINISHED
                ? "Hoàn thành"
                : "Đã hủy",
            value: item.percentage,
          }))
        );
      },
    }
  );

  const config = {
    appendPadding: 10,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    interactions: [
      {
        type: "element-active",
      },
    ],
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ value }: any) => (value > 10 ? `${value.toFixed(2)}%` : " "),
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
  };

  return (
    <div className="biike-dashboard-page flex flex-col">
      <div>
        <div className="biike-dashboard-tools mb-8">
          <Button type="primary" className="rounded ">
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
                    value={data?.data.totalUser}
                    precision={0}
                    valueStyle={{ color: "#4885ed" }}
                    // prefix={<ArrowUpOutlined />}
                    // suffix="%"
                  />
                </Card>
                <Card>
                  <Statistic
                    title="Người dùng mới"
                    value={data?.data.totalNewUser}
                    precision={0}
                    valueStyle={{ color: "#4885ed" }}
                    // prefix={<ArrowUpOutlined />}
                    // suffix="%"
                  />
                </Card>
                <div className="font-bold mb-4 mt-4">Tỉ lệ đặt theo trạm</div>

                <Card className="pr-4">
                  {data?.data.stationPercentage.map((station, index) => (
                    <div key={index}>
                      <span>{station.stationName}</span>
                      <Progress percent={station.percentage} status="active" />
                    </div>
                  ))}
                </Card>

                <div className="font-bold mb-4 mt-4">
                  Điểm, ưu đãi và quảng cáo
                </div>

                <Card>
                  <Statistic
                    title="Tổng điểm đã được dùng"
                    value={data?.data.totalPointUsedForVoucher}
                    precision={0}
                    valueStyle={{ color: "#f4c20d	" }}
                    // prefix={<ArrowUpOutlined />}
                    // suffix="%"
                  />
                </Card>
                <Card>
                  <Statistic
                    title="Lượng voucher đã được đổi"
                    value={data?.data.totalRedemption}
                    precision={0}
                    valueStyle={{ color: "#f4c20d	" }}
                    // prefix={<ArrowUpOutlined />}
                    // suffix="%"
                  />
                </Card>
                <Card>
                  <Statistic
                    title="Tổng lượt click quảng cáo"
                    value={data?.data.totalAdsClickCount}
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
                    value={data?.data.totalTrip}
                    precision={0}
                    valueStyle={{ color: "#3cba54" }}
                    // prefix={<ArrowUpOutlined />}
                    // suffix="%"
                  />
                </Card>
                <Card>
                  <Statistic
                    title="Tổng km đã tiết kiệm"
                    value={data?.data.totalKmSaved}
                    precision={1}
                    valueStyle={{ color: "#3cba54" }}
                    // prefix={<ArrowUpOutlined />}
                    // suffix="%"
                  />
                </Card>
                <Card>
                  <Statistic
                    title="Lượng lít xăng tiết kiệm (ước tính)"
                    value={data?.data.totalFuelSaved}
                    precision={1}
                    valueStyle={{ color: "#3cba54" }}
                    // prefix={<ArrowUpOutlined />}
                    // suffix="%"
                  />
                </Card>
                <div className="font-bold mt-4 mb-4">
                  Tỉ lệ trạng thái chuyến
                </div>
                <Card className="pt-7 pb-7">
                  <Pie {...config} data={pieData} />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};
