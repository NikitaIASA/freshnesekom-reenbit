import { FC } from "react";

import "./ResetButton.scss";

export const ResetButton: FC = () => {
  return (
    <div className="reset">
      <button className="reset__button">Reset</button>
    </div>
  );
};
