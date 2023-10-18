import { FC, PropsWithChildren } from "react";

import "./Container.scss";

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className="container">{children}</div>;
};
