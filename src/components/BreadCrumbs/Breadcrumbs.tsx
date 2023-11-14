import { FC } from "react";
import { NavLink } from "react-router-dom";

import { useBreadcrumbs } from "@hooks/useBreadcrumbs";
import { ROUTE_PATHS } from "@constants/routePaths";

import "./Breadcrumbs.scss";

export const Breadcrumbs: FC = () => {
  const { paths, getBreadcrumb } = useBreadcrumbs();

  return (
    <nav className="breadcrumbs">
      <NavLink
        to={ROUTE_PATHS.HOME}
        className={
          !paths.length
            ? "breadcrumbs__link breadcrumbs__link_active"
            : "breadcrumbs__link"
        }
      >
        Home
      </NavLink>

      {paths.map((path, index) => {
        const breadcrumb = getBreadcrumb(path);
        const isActive = index === paths.length - 1;
        const linkPath = `/${paths.slice(0, index + 1).join('/')}`;

        return (
          <p className="breadcrumbs__item" key={`breadbcrumb-${path}`}>
            <span className="breadcrumbs__seperator"> / </span>
            <NavLink
              to={linkPath}
              className={`breadcrumbs__link ${
                isActive ? "breadcrumbs__link_active" : ""
              }`}
            >
              {breadcrumb}
            </NavLink>
          </p>
        );
      })}
    </nav>
  );
};
