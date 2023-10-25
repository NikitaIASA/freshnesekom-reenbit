import { FC, useEffect} from "react";
import { Outlet } from "react-router-dom";

import Container from "@components/Container";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { getProducts } from "@store/services/productServices";

import "./Layout.scss";

export const Layout: FC = () => {
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Container>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};
