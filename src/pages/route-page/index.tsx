import {
  AimOutlined,
  EnvironmentOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Divider, Modal, Pagination, Tag } from "antd";
import { useMutation, useQuery } from "react-query";
import { BiikeRouteModal } from "src/organisms/route-modal";
import { BiikeRouteDetailModal } from "src/organisms/route-detail-modal";
import { useState } from "react";
import "./index.scss";
import { useToggle } from "src/hooks/useToggle";
import { Route, routeQueryFns } from "src/services/api/route";

interface RouteDetailModal {
  openId: number;
  data?: Route;
}

interface BiikeRoutePageProps {}

export const BiikeRoutePage = (props: BiikeRoutePageProps) => {
  // paging
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 10,
  });

  const { data, isFetching, refetch } = useQuery(
    ["routes", pagination.page, pagination.pageSize],
    () =>
      routeQueryFns.routes({
        page: pagination.page,
        limit: pagination.pageSize,
      }),
    {
      onSuccess: (data) => {
        setPagination((prev) => ({ ...prev, total: data._meta.totalRecord }));
      },
    }
  );

  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
      ...(pageSize !== prev.pageSize ? { pageSize, page: 1 } : {}),
    }));
  };

  // create
  const [isCreateRouteModalVisible, toggleCreateRouteModalVisible] =
    useToggle(false);

  const createRouteMutation = useMutation(routeQueryFns.createRoute);

  const handleCreateRoute = (values: any, closeModalCallback?: () => void) => {
    createRouteMutation.mutateAsync(values).then((res) => {
      if (res.data) {
        closeModalCallback?.();
        refetch();
      }
    });
  };

  // update
  const [routeDetailModal, setRouteDetailModal] = useState<RouteDetailModal>({
    openId: -1,
  });

  const toggleRouteDetailModalVisible = (openId: number) => {
    setRouteDetailModal((prev) => ({
      ...prev,
      openId: prev.openId === openId ? -1 : openId,
    }));
  };

  const openRouteDetailModal = (data: Route) => {
    setRouteDetailModal({ openId: data.routeId, data });
  };

  const updateRouteMutation = useMutation(routeQueryFns.updateRoute);

  const handleUpdateRoute = (
    id: number,
    values: any,
    closeModalCallback?: () => void
  ) => {
    updateRouteMutation.mutateAsync([id, values]).then((res) => {
      closeModalCallback?.();
      refetch();
    });
  };

  // delete
  const deleteRouteMutation = useMutation(routeQueryFns.deleteRoute);

  const handleDeleteRoute = (route: Route) => {
    Modal.confirm({
      okText: "T???m d???ng tuy???n",
      cancelText: "Tho??t",
      type: "confirm",
      title: `B???n c?? ch???c ch???n mu???n t???m d???ng tuy???n t??? ${route.departureName} ?????n ${route.destinationName}?`,
      onOk: () => {
        deleteRouteMutation.mutateAsync(route.routeId).then((res) => {
          console.log("delete ok!");
          refetch();
        });
      },
    });
  };

  const handleUnlockRoute = (route: Route) => {
    Modal.confirm({
      okText: "K??ch ho???t tuy???n",
      cancelText: "Tho??t",
      type: "confirm",
      title: `B???n c?? ch???c ch???n mu???n k??ch ho???t tuy???n t??? ${route.departureName} ?????n ${route.destinationName}?`,
      onOk: () => {
        deleteRouteMutation.mutateAsync(route.routeId).then((res) => {
          refetch();
        });
      },
    });
  };

  // const [isRouteModalVisible, toggleRouteModalVisible] = useToggle(false);
  // const [isRouteDetailModalVisible, toggleRouteDetailModalVisible] =
  //   useToggle(false);

  // const handleSubmitModal = (values: any, closeModalCallback?: () => void) => {
  //   console.log(values);
  //   closeModalCallback?.();
  // };

  return (
    <div className="biike-route-page">
      <div className="biike-route-tools mb-8">
        <Button
          type="primary"
          className="rounded "
          onClick={toggleCreateRouteModalVisible}
        >
          Th??m tuy???n
        </Button>
      </div>

      <BiikeRouteModal
        visibleManage={[
          isCreateRouteModalVisible,
          toggleCreateRouteModalVisible,
        ]}
        onOk={handleCreateRoute}
      />

      <div className="biike-route-content">
        {data?.data.map((route) => (
          <div className="route-item bg-white rounded px-8 py-4 ">
            <div className="item-details text-gray-500 ">
              <div className="user-email text-sm">
                ID: {route.routeId}{" "}
                {route.isDeleted === false ? (
                  <Tag color="success">??ang ho???t ?????ng</Tag>
                ) : (
                  <Tag color="error">T???m d???ng</Tag>
                )}
              </div>
              <div className="route-name text-base font-bold">
                <AimOutlined /> {route.departureName}
              </div>
              <MoreOutlined />
              <div className="route-name text-base font-bold">
                <EnvironmentOutlined /> {route.destinationName}
              </div>
            </div>
            <div className="item-tools">
              <Button
                type="primary"
                className="rounded"
                onClick={() => openRouteDetailModal(route)}
              >
                Xem
              </Button>

              <BiikeRouteDetailModal
                visibleManage={[
                  routeDetailModal.openId === route.routeId,
                  toggleRouteDetailModalVisible,
                ]}
                route={route}
                onOk={handleUpdateRoute}
                isUpdating={updateRouteMutation.isLoading}
              />

              {route.isDeleted === true ? (
                <Button
                  type="default"
                  className="rounded"
                  onClick={() => handleUnlockRoute(route)}
                >
                  K??ch ho???t
                </Button>
              ) : (
                <Button
                  type="primary"
                  danger
                  className="rounded"
                  onClick={() => handleDeleteRoute(route)}
                >
                  T???m d???ng
                </Button>
              )}
            </div>
          </div>
        ))}
        <Divider />
        <Pagination
          current={pagination.page}
          pageSize={pagination.pageSize}
          onChange={handlePageChange}
          total={pagination.total}
        />
      </div>
    </div>
  );
};
