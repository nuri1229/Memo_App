import { FC } from "react";

export type RouteModel = {
  component: FC;
  path: string;
  exact: boolean;
};
