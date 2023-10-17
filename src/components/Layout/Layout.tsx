import { FC } from "react";
import { Outlet } from "react-router-dom";

import Container from "@components/Container";
import Header from "@components/Header";
import Footer from "@components/Footer";

import "./Layout.scss";

export const Layout: FC = () => {
  return (
    <>
      <Container>
        <Header />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </Container>
    </>
  );
};
