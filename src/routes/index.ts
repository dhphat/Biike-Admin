import { FunctionComponent } from "react";
import { BiikeDefaultLayout } from "src/layouts/default";
import { BiikeAreaPage } from "src/pages/area-page";
import { BiikeHomePage } from "src/pages/dashboard-page";
import { BiikeLoginPage } from "src/pages/login-page";
import { BiikeRoutePage } from "src/pages/route-page";
import { BiikeUserPage } from "src/pages/user-page";
import { BiikeHelpCenterPage } from "src/pages/helpcenter-page";
import { BiikeFeedbackPage } from "src/pages/feedback-page";
import { BiikeBikePage } from "src/pages/bike-page";
import { BiikeWalletPage } from "src/pages/wallet-page";
import { BiikeVoucherPage } from "src/pages/voucher-page";
import { BiikeAdminPage } from "src/pages/admin-page";
import { BiikeNotificationPage } from "src/pages/notification-page";
import { BiikeStationPage } from "src/pages/station-page";

interface BiikeRoute {
  name?: string;
  path: string;
  isPrivate?: boolean;
  disabled?: boolean;
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
    path: "/login",
    component: BiikeLoginPage,
  },
  {
    type: "SINGLE_ROUTE",
    name: "Dashboard",
    path: "/dashboard",
    isPrivate: true,
    layout: BiikeDefaultLayout,
    component: BiikeHomePage,
    disabled: true,
  },
  {
    type: "NEST_ROUTE",
    name: "Di chuyển",
    path: "/moving",
    isPrivate: true,
    layout: BiikeDefaultLayout,
    nest: [
      { name: "Tram", path: "/station", component: BiikeStationPage },
      { name: "Route", path: "/route", component: BiikeStationPage },
      { name: "Khu vuc", path: "/area", component: BiikeStationPage },
    ],
  },
  {
    type: "SINGLE_ROUTE",
    name: "Trạm/Route",
    path: "/route",
    isPrivate: true,
    layout: BiikeDefaultLayout,
    component: BiikeRoutePage,
  },
  {
    type: "SINGLE_ROUTE",
    name: "Khu vực/Area",
    path: "/area",
    isPrivate: true,
    layout: BiikeDefaultLayout,
    component: BiikeAreaPage,
  },
  {
    type: "SINGLE_ROUTE",
    name: "Người dùng/User",
    path: "/user",
    isPrivate: true,
    layout: BiikeDefaultLayout,
    component: BiikeUserPage,
  },
  {
    type: "SINGLE_ROUTE",
    name: "Help Center",
    path: "/helpcenter",
    isPrivate: true,
    layout: BiikeDefaultLayout,
    component: BiikeHelpCenterPage,
  },
  {
    type: "SINGLE_ROUTE",
    name: "Feedback",
    path: "/feedback",
    isPrivate: true,
    layout: BiikeDefaultLayout,
    component: BiikeFeedbackPage,
  },
  {
    type: "SINGLE_ROUTE",
    name: "Bike",
    path: "/bike",
    isPrivate: true,
    layout: BiikeDefaultLayout,
    component: BiikeBikePage,
  },
  {
    type: "SINGLE_ROUTE",
    name: "Wallet",
    path: "/wallet",
    isPrivate: true,
    layout: BiikeDefaultLayout,
    component: BiikeWalletPage,
  },
  {
    type: "SINGLE_ROUTE",
    name: "Voucher",
    path: "/voucher",
    isPrivate: true,
    layout: BiikeDefaultLayout,
    component: BiikeVoucherPage,
  },
  {
    type: "SINGLE_ROUTE",
    name: "Notification",
    path: "/notification",
    isPrivate: true,
    layout: BiikeDefaultLayout,
    component: BiikeNotificationPage,
  },
  {
    type: "SINGLE_ROUTE",
    name: "Admin",
    path: "/admin",
    isPrivate: true,
    layout: BiikeDefaultLayout,
    component: BiikeAdminPage,
  },
];
