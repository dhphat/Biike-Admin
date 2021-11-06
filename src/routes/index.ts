import { FunctionComponent } from "react";
import { BiikeDefaultLayout } from "src/layouts/default";
import { BiikeAreaPage } from "src/pages/area-page";
import { BiikeHomePage } from "src/pages/dashboard-page";
import { BiikeLoginPage } from "src/pages/login-page";
import { BiikeRoutePage } from "src/pages/route-page";
import { BiikeUserPage } from "src/pages/user-page";
// import { BiikeHelpCenterPage } from "src/pages/helpcenter-page";
import { BiikeFeedbackPage } from "src/pages/feedback-page";
import { BiikeBikePage } from "src/pages/bike-page";
import { BiikeWalletPage } from "src/pages/wallet-page";
import { BiikeVoucherPage } from "src/pages/voucher-page";
import { BiikeAdminPage } from "src/pages/admin-page";
import { BiikeNotificationPage } from "src/pages/notification-page";
import { BiikeStationPage } from "src/pages/station-page";
import { BiikeTripPage } from "src/pages/trip-page";
import { BiikeAdsPage } from "src/pages/ads-page";

interface BiikeRoute {
  name?: string;
  path: string;
  privateOnly?: boolean;
  publicOnly?: boolean;
  disabled?: boolean;
  exact?: boolean;
}

interface BiikeSingleRoute extends BiikeRoute {
  layout?: FunctionComponent;
  component: FunctionComponent;
}

interface BiikeNestRoute extends BiikeRoute {
  layout?: FunctionComponent;
  nest: Array<BiikeSingleRoute>;
}

interface BiikeActionPayload {
  SINGLE_ROUTE: BiikeSingleRoute;
  NEST_ROUTE: BiikeNestRoute;
}

type BiikeRouteAction<T> = {
  [K in keyof T]: { type: K } & T[K];
};

type BiikeMapRoute =
  BiikeRouteAction<BiikeActionPayload>[keyof BiikeRouteAction<BiikeActionPayload>];

export const routes: BiikeMapRoute[] = [
  {
    type: "SINGLE_ROUTE",
    name: "Login",
    path: "/",
    publicOnly: true,
    exact: true,
    component: BiikeLoginPage,
  },
  {
    type: "SINGLE_ROUTE",
    name: "Login",
    path: "/login",
    publicOnly: true,
    component: BiikeLoginPage,
  },
  {
    type: "SINGLE_ROUTE",
    name: "Dashboard",
    path: "/dashboard",
    privateOnly: true,
    layout: BiikeDefaultLayout,
    component: BiikeHomePage,
    // disabled: true,
  },

  {
    type: "SINGLE_ROUTE",
    name: "Chuyến",
    path: "/trip",
    privateOnly: true,
    layout: BiikeDefaultLayout,
    component: BiikeTripPage,
    // disabled: true,
  },
  {
    type: "SINGLE_ROUTE",
    name: "Giao dịch ví",
    path: "/wallet",
    privateOnly: true,
    layout: BiikeDefaultLayout,
    component: BiikeWalletPage,
  },
  {
    type: "NEST_ROUTE",
    name: "Di chuyển",
    path: "/moving",
    privateOnly: true,
    layout: BiikeDefaultLayout,
    nest: [
      { name: "Trạm", path: "/station", component: BiikeStationPage },
      { name: "Tuyến", path: "/route", component: BiikeRoutePage },
      { name: "Khu vực", path: "/area", component: BiikeAreaPage },
    ],
  },
  // {
  //   type: "SINGLE_ROUTE",
  //   name: "Chuyến/Trip",
  //   path: "/trip",
  //   isPrivate: true,
  //   layout: BiikeDefaultLayout,
  //   component: BiikeTripPage,
  // },
  // {
  //   type: "SINGLE_ROUTE",
  //   name: "Khu vực/Area",
  //   path: "/area",
  //   isPrivate: true,
  //   layout: BiikeDefaultLayout,
  //   component: BiikeAreaPage,
  // },

  {
    type: "NEST_ROUTE",
    name: "Người dùng",
    path: "/app-user",
    privateOnly: true,
    layout: BiikeDefaultLayout,
    nest: [
      { name: "Biker & Keer", path: "/user", component: BiikeUserPage },
      { name: "Xe", path: "/bike", component: BiikeBikePage },
      { name: "Đánh giá", path: "/feedback", component: BiikeFeedbackPage },
      {
        name: "Thông báo",
        path: "/notification",
        component: BiikeNotificationPage,
      },
    ],
  },

  {
    type: "NEST_ROUTE",
    name: "Ưu đãi & Quảng cáo",
    path: "/voucher-and-ads",
    privateOnly: true,
    layout: BiikeDefaultLayout,
    nest: [
      { name: "Ưu đãi", path: "/voucher", component: BiikeVoucherPage },
      { name: "Quảng cáo", path: "/ads", component: BiikeAdsPage },
    ],
  },

  // {
  //   type: "SINGLE_ROUTE",
  //   name: "Help Center",
  //   path: "/helpcenter",
  //   isPrivate: true,
  //   layout: BiikeDefaultLayout,
  //   component: BiikeHelpCenterPage,
  // },

  {
    type: "SINGLE_ROUTE",
    name: "Quản trị viên",
    path: "/admin",
    privateOnly: true,
    layout: BiikeDefaultLayout,
    component: BiikeAdminPage,
  },
];
