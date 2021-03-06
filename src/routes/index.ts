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
import { BiikeAdvertisementPage } from "src/pages/ads-page";
import { BiikeVoucherCategoryPage } from "src/pages/voucher-category-page";

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
    name: "Chuy???n",
    path: "/trip",
    privateOnly: true,
    layout: BiikeDefaultLayout,
    component: BiikeTripPage,
    // disabled: true,
  },
  {
    type: "SINGLE_ROUTE",
    name: "Giao d???ch v??",
    path: "/wallet",
    privateOnly: true,
    layout: BiikeDefaultLayout,
    component: BiikeWalletPage,
  },
  {
    type: "NEST_ROUTE",
    name: "Di chuy???n",
    path: "/moving",
    privateOnly: true,
    layout: BiikeDefaultLayout,
    nest: [
      { name: "Tr???m", path: "/station", component: BiikeStationPage },
      { name: "Tuy???n", path: "/route", component: BiikeRoutePage },
      { name: "Khu v???c", path: "/area", component: BiikeAreaPage },
    ],
  },
  // {
  //   type: "SINGLE_ROUTE",
  //   name: "Chuy???n/Trip",
  //   path: "/trip",
  //   isPrivate: true,
  //   layout: BiikeDefaultLayout,
  //   component: BiikeTripPage,
  // },
  // {
  //   type: "SINGLE_ROUTE",
  //   name: "Khu v???c/Area",
  //   path: "/area",
  //   isPrivate: true,
  //   layout: BiikeDefaultLayout,
  //   component: BiikeAreaPage,
  // },

  {
    type: "NEST_ROUTE",
    name: "Ng?????i d??ng",
    path: "/app-user",
    privateOnly: true,
    layout: BiikeDefaultLayout,
    nest: [
      {
        name: "Biker & Keer",
        path: "/biker-and-keer",
        component: BiikeUserPage,
      },
      { name: "Xe", path: "/bike", component: BiikeBikePage },
      { name: "????nh gi??", path: "/feedback", component: BiikeFeedbackPage },
      // {
      //   name: "Th??ng b??o",
      //   path: "/notification",
      //   component: BiikeNotificationPage,
      // },
    ],
  },

  {
    type: "NEST_ROUTE",
    name: "??u ????i & Qu???ng c??o",
    path: "/voucher-and-ads",
    privateOnly: true,
    layout: BiikeDefaultLayout,
    nest: [
      { name: "Qu???ng c??o", path: "/ads", component: BiikeAdvertisementPage },

      { name: "??u ????i", path: "/voucher", component: BiikeVoucherPage },
      {
        name: "Lo???i ??u ????i",
        path: "/voucher-category",
        component: BiikeVoucherCategoryPage,
      },
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
    name: "Qu???n tr??? vi??n",
    path: "/admin",
    privateOnly: true,
    layout: BiikeDefaultLayout,
    component: BiikeAdminPage,
  },
];
