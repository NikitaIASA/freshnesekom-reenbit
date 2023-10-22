import { FC } from "react";

import { TAGS } from "@constants/tags";

import "./Tags.scss";

export const Tags: FC = () => {
  return (
    <div className="tags">
      <h2 className="tags__title">Product tags</h2>
      <ul className="tags__list">
        {TAGS.map((tag) => (
          <li key={`tag-${tag}`} className="tags__item">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};
