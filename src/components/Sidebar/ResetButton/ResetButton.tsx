import { FC } from "react";

import { useAppDispatch } from "@hooks/useAppDispatch";
import { resetFilter } from "@store/reducers/productSlice";

import "./ResetButton.scss";

export const ResetButton: FC = () => {
  const dispatch = useAppDispatch();
  

  const handleReset = () => {
    dispatch(resetFilter());

    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
  };

  return (
    <div className="reset">
      <button className="reset__button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};
