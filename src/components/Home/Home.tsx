import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@constants/routePaths";
import { ButtonSizes } from "@appTypes/buttonTypes";
import CustomButton from "@components/UI/CustomButton";

import "./Home.scss";

export const Home: FC = () => {
  return (
    <section className="home">
      <h1 className="home__title">
        Welcome to <span className="home__title_green">Freshnesecom</span> !
      </h1>
      <Link to={ROUTE_PATHS.PRODUCTS}>
        <CustomButton size={ButtonSizes.LARGE}>Go to the products</CustomButton>
      </Link>
    </section>
  );
};
