import { RouteModel } from "global/model/global.route.model";
import MainPage from "./MainPage";

export const mainRoutes: RouteModel[] = [
  {
    component: MainPage,
    path: "/",
    exact: true,
  },
];
