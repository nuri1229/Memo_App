import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import allRoutes from "global/route";

const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {allRoutes.map((route, index) => (
          <Route key={`ROUTE_KEY_${index}`} path={route.path} component={route.component} exact={route.exact} />
        ))}
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
