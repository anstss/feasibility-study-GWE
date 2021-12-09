import React from "react";
import MenuCard from "../menuCard/menuCard";
import {
  ANALYSIS_PAGE_ROUTE,
  ANALYSIS_PAGE_TITLE,
  COST_PRICE_PAGE_ROUTE,
  COST_PRICE_PAGE_TITLE,
  DEPRECIATION_PAGE_ROUTE,
  DEPRECIATION_PAGE_TITLE,
  INTERNAL_RATE_OF_RETURN_PAGE_ROUTE,
  INTERNAL_RATE_OF_RETURN_PAGE_TITLE,
  LIFE_CYCLE_PAGE_ROUTE,
  LIFE_CYCLE_PAGE_TITLE,
  MIN_COST_EFFECTIVE_POWER_PAGE_ROUTE,
  MIN_COST_EFFECTIVE_POWER_PAGE_TITLE,
  NET_DISCOUNTED_CASH_FLOW_PAGE_ROUTE,
  NET_DISCOUNTED_CASH_FLOW_PAGE_TITLE,
  PROFITABILITY_RATIO_PAGE_ROUTE,
  PROFITABILITY_RATIO_PAGE_TITLE,
  STATIC_PERFORMANCE_INDICATORS_PAGE_ROUTE,
  STATIC_PERFORMANCE_INDICATORS_PAGE_TITLE,
} from "../../shared/constants";

const MainPage = () => {
  return (
    <div className={"my-5 d-flex flex-wrap justify-content-center"}>
      <MenuCard
        icon={"bi-graph-up"}
        path={ANALYSIS_PAGE_ROUTE}
        text={ANALYSIS_PAGE_TITLE}
      />
      <MenuCard
        icon={"bi-wallet2"}
        path={DEPRECIATION_PAGE_ROUTE}
        text={DEPRECIATION_PAGE_TITLE}
      />
      <MenuCard
        icon={"bi-cash-stack"}
        path={COST_PRICE_PAGE_ROUTE}
        text={COST_PRICE_PAGE_TITLE}
      />
      <MenuCard
        icon={"bi-clipboard-data"}
        path={STATIC_PERFORMANCE_INDICATORS_PAGE_ROUTE}
        text={STATIC_PERFORMANCE_INDICATORS_PAGE_TITLE}
      />
      <MenuCard
        icon={"bi-battery-charging"}
        path={MIN_COST_EFFECTIVE_POWER_PAGE_ROUTE}
        text={MIN_COST_EFFECTIVE_POWER_PAGE_TITLE}
      />
      <MenuCard
        icon={"bi-save"}
        path={NET_DISCOUNTED_CASH_FLOW_PAGE_ROUTE}
        text={NET_DISCOUNTED_CASH_FLOW_PAGE_TITLE}
      />
      <MenuCard
        icon={"bi-plus-circle"}
        path={INTERNAL_RATE_OF_RETURN_PAGE_ROUTE}
        text={INTERNAL_RATE_OF_RETURN_PAGE_TITLE}
      />
      <MenuCard
        icon={"bi-bar-chart-steps"}
        path={LIFE_CYCLE_PAGE_ROUTE}
        text={LIFE_CYCLE_PAGE_TITLE}
      />
      <MenuCard
        icon={"bi-file-earmark-bar-graph"}
        path={PROFITABILITY_RATIO_PAGE_ROUTE}
        text={PROFITABILITY_RATIO_PAGE_TITLE}
      />
    </div>
  );
};

export default MainPage;
