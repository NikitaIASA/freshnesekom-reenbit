import { FC } from "react";
import { useAppSelector } from "@hooks/useAppSelector";
import { selectSelectedProduct } from "@store/selectors/productSelectors";

import "./ProductQuestions.scss";

export const ProductQuestions: FC = () => {
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const questions = selectedProduct?.extraInfo?.questions || [];

  return (
    <div className="product-questions">
      {questions.length ? (
        <ul className="product-questions__list">
          {questions.map((question, index) => (
            <li key={`question-${index}`} className="product-questions__item">
              <p className="product-questions__user">{question.user}</p>
              <p className="product-questions__question">
                Q: {question.question}
              </p>
              {question.answer && (
                <p className="product-questions__answer">
                  A: {question.answer}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>
          No questions available.
        </p>
      )}
    </div>
  );
};
