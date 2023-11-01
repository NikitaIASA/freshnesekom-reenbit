import { FC, useEffect} from "react";
import { Outlet, useLocation } from "react-router-dom";

import Container from "@components/Container";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Breadcrumbs from "@components/Breadcrumbs";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { getProducts } from "@store/services/productServices";

import "./Layout.scss";

export const Layout: FC = () => {
  
  const dispatch = useAppDispatch();
  const location = useLocation();
  const showBreadcrumbs = location.pathname !== "/";

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      {showBreadcrumbs && <Breadcrumbs />}
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};
