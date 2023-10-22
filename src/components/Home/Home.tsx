import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@constants/routePaths";

import "./Home.scss";

export const Home: FC = () => {
  return (
    <section className="home">
      <h1 className="home__title">
        Welcome to <span className="home__title_green">Freshnesecom</span> !
      </h1>
      <Link className="home__link" to={ROUTE_PATHS.PRODUCTS}>
        Go to the products
      </Link>
    </section>
  );
};
