import { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { hotjar } from "react-hotjar";

import "react-toastify/dist/ReactToastify.css";

import Layout from "@components/Layout";
import { routes } from "@core/routes";

export const App: FC = () => {
  
  useEffect(() => {
    hotjar.initialize(3866747, 6);
  }, []);

  return (
    <>
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
      <ToastContainer />
    </>
  );
};
