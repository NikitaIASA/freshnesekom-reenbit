import { FC, useState, useEffect } from "react";
import clsx from 'clsx'; 

import { useAppSelector } from "@hooks/useAppSelector";
import { selectSelectedProduct } from "@store/selectors/productSelectors";
import ProductDescriptionTab from "./ProductDescriptionTab";
import ProductReviews from "./ProductReviews";
import ProductQuestions from "./ProductQuestions";

import "./ProductsTabs.scss";

type TabConfig = {
  name: string;
  component: FC;
  count?: number;
};

export const ProductTabs: FC = () => {
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const [activeTab, setActiveTab] = useState<string>();

  const reviewsCount = selectedProduct?.extraInfo?.reviews?.length || 0;
  const questionsCount = selectedProduct?.extraInfo?.questions?.length || 0;

  const tabConfigs: TabConfig[] = [
    { name: "Description", component: ProductDescriptionTab },
    { name: "Reviews", component: ProductReviews, count: reviewsCount },
    { name: "Questions", component: ProductQuestions, count: questionsCount },
  ];

  useEffect(() => {
    setActiveTab(tabConfigs[0].name);
  }, []);

  return (
    <div className="product-tabs">
      <ul className="product-tabs__headers">
        {tabConfigs.map((tab) => (
          <li
            key={`tab-${tab.name}`}
            onClick={() => setActiveTab(tab.name)}
            className={clsx("product-tabs__item", { active: activeTab === tab.name })}
          >
            {tab.name}
            {!!tab.count && (
              <span className="product-tabs__count">{tab.count}</span>
            )}
          </li>
        ))}
      </ul>
      <div className="product-tabs__content">
        {tabConfigs.map((tab) => {
          if (tab.name === activeTab) {
            const TabComponent = tab.component;
            return <TabComponent key={`tab-${tab.name}`} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};
