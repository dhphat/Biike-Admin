import { Table, Button } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { tripQueryFns } from "src/services/api/trip";
import "./index.scss";

interface BiikeTripPageProps {}

export const BiikeTripPage = (props: BiikeTripPageProps) => {
  const { data, isFetching } = useQuery(
    ["trips"],
    () => tripQueryFns.trips({ page: 1, limit: 10 }),
    {
      onSuccess: (data) => console.log(data),
    }
  );

  const columns = [
    {
      title: "Keer",
      dataIndex: "keer",
    },
    {
      title: "Biker",
      dataIndex: "biker",
    },
    {
      title: "Từ",
      dataIndex: "from",
    },
    {
      title: "Đến",
      dataIndex: "to",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "create-time",
    },
    {
      title: "Lịch chuyến",
      dataIndex: "trip-time",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Loại",
      dataIndex: "type",
    },
  ];

  // for (let i = 0; i < 10; i++) {
  //   data.push({
  //     key: i,
  //     name: `Edward King ${i}`,
  //     age: 32,
  //     address: `London, Park Lane no. ${i}`,
  //   });
  // }

  class App extends React.Component {
    state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    };

    start = () => {
      this.setState({ loading: true });
      // ajax request after empty completing
      setTimeout(() => {
        this.setState({
          selectedRowKeys: [],
          loading: false,
        });
      }, 1000);
    };

    onSelectChange = (selectedRowKeys: any) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.setState({ selectedRowKeys });
    };

    render() {
      const { loading, selectedRowKeys } = this.state;
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
      };
      const hasSelected = selectedRowKeys.length > 0;
      return (
        <div>
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={this.start}
              disabled={!hasSelected}
              loading={loading}
            >
              Reload
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            // dataSource={data}
          />
        </div>
      );
    }
  }

  // ReactDOM.render(<App />, mountNode);

  // return (
  //   <div className="biike-trip-page">
  //     <div className="biike-trip-content">
  //       {data?.data.map((route) => (
  //         <div className="route-item bg-white rounded px-8 py-4 ">
  //           <div className="item-details text-gray-500 ">
  //             <div className="route-name text-base font-bold">
  //               Đại học FPT TP.HCM
  //             </div>
  //             <div className="route-address text-sm">
  //               Lô E2a/7, đường D1, khu Công nghệ cao, P.Long Thạnh Mỹ, Tp.Thủ
  //               Đức, TP.HCM
  //             </div>
  //           </div>
  //           <div className="item-tools">
  //             <Button type="primary" className="rounded">
  //               Xem
  //             </Button>
  //             <Button type="primary" className="rounded">
  //               Sửa
  //             </Button>
  //             <Button type="primary" danger className="rounded">
  //               Xóa
  //             </Button>
  //           </div>
  //         </div>
  //       ))}

  //       <div className="route-item bg-white rounded px-8 py-4 ">
  //         <div className="item-details text-gray-500 ">
  //           <div className="route-name text-base font-bold">
  //             Đại học FPT TP.HCM
  //           </div>
  //           <div className="route-address text-sm">
  //             Lô E2a/7, đường D1, khu Công nghệ cao, P.Long Thạnh Mỹ, Tp.Thủ
  //             Đức, TP.HCM
  //           </div>
  //         </div>
  //         <div className="item-tools">
  //           <Button type="primary" className="rounded">
  //             Xem
  //           </Button>
  //           <Button type="primary" className="rounded">
  //             Sửa
  //           </Button>
  //           <Button type="primary" danger className="rounded">
  //             Xóa
  //           </Button>
  //         </div>
  //       </div>
  //       <div className="route-item bg-white rounded px-8 py-4 ">
  //         <div className="item-details text-gray-500 ">
  //           <div className="route-name text-base font-bold">
  //             Đại học FPT TP.HCM
  //           </div>
  //           <div className="route-address text-sm">
  //             Lô E2a/7, đường D1, khu Công nghệ cao, P.Long Thạnh Mỹ, Tp.Thủ
  //             Đức, TP.HCM
  //           </div>
  //         </div>
  //         <div className="item-tools">
  //           <Button type="primary" className="rounded">
  //             Xem
  //           </Button>
  //           <Button type="primary" className="rounded">
  //             Sửa
  //           </Button>
  //           <Button type="primary" danger className="rounded">
  //             Xóa
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};
