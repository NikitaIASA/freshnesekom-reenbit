import { useState } from "react";
import Slider from "react-slider";

import "./Price.scss";

const MIN_VALUE = 1;
const MAX_VALUE = 100;

export const PriceBlock = () => {
  const [values, setValues] = useState([MIN_VALUE, MAX_VALUE]);

  return (
    <div className="price-block">
      <h3 className="price-block__title">Price</h3>
      <Slider
        className="price-block__slider"
        thumbClassName="price-block__thumb"
        trackClassName="price-block__track"
        value={values}
        onChange={setValues}
        min={0}
        max={1000}
        pearling
      />
      <div className="price-block__inputs">
        <label className="price-block__label">
          Min
          <input
            type="number"
            value={values[0]}
            onChange={(e) =>
              setValues([parseInt(e.target.value, 10), values[1]])
            }
            className="price-block__input"
            placeholder="0"
          />
        </label>
        <span className="price-block__input-separator">-</span>
        <label className="price-block__label">
          Max
          <input
            type="number"
            value={values[1]}
            onChange={(e) =>
              setValues([values[0], parseInt(e.target.value, 10)])
            }
            className="price-block__input"
            placeholder="000"
          />
        </label>
      </div>
    </div>
  );
};
