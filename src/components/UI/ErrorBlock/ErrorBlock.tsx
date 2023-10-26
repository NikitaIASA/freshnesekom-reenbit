import { FC } from "react";
import errorIcon from "@assets/images/error.png";

import "./ErrorBlock.scss";

interface ErrorBlockProps {
  error: string | null;
}

export const ErrorBlock: FC<ErrorBlockProps> = ({ error }) => {
  return (
    <div className="error">
      <img className="error__image" src={errorIcon} alt="error image" />
      <p className="error__text">{`Something went wrong: ${error}`}</p>
      <p className="error__text">Try again</p>
    </div>
  );
};
