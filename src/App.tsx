import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "@components/Layout";
import { routes } from "@core/routes";

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {routes.map((route) => (
          <Route
            key={`route-${route.path}`}
            path={route.path}
            element={<route.Element />}
          />
        ))}
      </Route>
    </Routes>
  );
};
