import React, { useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import "./shared/styles.scss";
import AnalysisPage from "./components/pages/analysisPage/analysisPage";
import {
  ANALYSIS_PAGE_ROUTE,
  COST_PRICE_PAGE_ROUTE,
  DEPRECIATION_PAGE_ROUTE,
  INTERNAL_RATE_OF_RETURN_PAGE_ROUTE,
  LIFE_CYCLE_PAGE_ROUTE,
  LOCAL_STORAGE_KEY_ANALYSIS,
  LOCAL_STORAGE_KEY_COST_PRICE,
  LOCAL_STORAGE_KEY_DEPRECIATION,
  LOCAL_STORAGE_KEY_INTERNAL_RATE_OF_RETURN,
  LOCAL_STORAGE_KEY_LIFE_CYCLE,
  LOCAL_STORAGE_KEY_MIN_COST_EFFECTIVE_POWER,
  LOCAL_STORAGE_KEY_NET_DISCOUNTED_CASH_FLOW,
  LOCAL_STORAGE_KEY_PROFITABILITY_RATIO,
  LOCAL_STORAGE_KEY_STATIC_PERFORMANCE_INDICATORS,
  MIN_COST_EFFECTIVE_POWER_PAGE_ROUTE,
  NET_DISCOUNTED_CASH_FLOW_PAGE_ROUTE,
  PROFITABILITY_RATIO_PAGE_ROUTE,
  STATIC_PERFORMANCE_INDICATORS_PAGE_ROUTE,
} from "./shared/constants";
import { useAppDispatch } from "./hooks/redux-hooks";
import { analysisWaterProductionVolumesSlice } from "./store/reducers/analysisWaterProductionVolumesSlice";
import { Routes, Route } from "react-router-dom";
import DepreciationPage from "./components/pages/depreciationPage/depreciationPage";
import { depreciationChargesCalculationSlice } from "./store/reducers/depreciationChargesCalculationSlice";
import CostPricePage from "./components/pages/costPricePage/costPricePage";
import { costPriceSlice } from "./store/reducers/costPriceSlice";
import StaticPerformanceIndicatorsPage from "./components/pages/staticPerformanceIndicatorsPage/staticPerformanceIndicatorsPage";
import { staticPerformanceIndicatorsSlice } from "./store/reducers/staticPerformanceIndicatorsSlice";
import MinCostEffectivePower from "./components/pages/minCostEffectivePower/minCostEffectivePower";
import { minCostEffectivePowerSlice } from "./store/reducers/minCostEffectivePower";
import NetDiscountedCashFlow from "./components/pages/netDiscountedCashFlow/netDiscountedCashFlow";
import { netDiscountedCashFlowSlice } from "./store/reducers/netDiscountedCashFlowSlice";
import InternalRateOfReturn from "./components/pages/internalRateOfReturnPage/internalRateOfReturn";
import { internalRateOfReturnSlice } from "./store/reducers/internalRateOfReturnSlice";
import LifeCyclePage from "./components/pages/lifeCyclePage/lifeCyclePage";
import { lifeCycleSlice } from "./store/reducers/lifeCycleSlice";
import ProfitabilityRatioPage from "./components/pages/profitabilityRatioPage/profitabilityRatioPage";
import { profitabilityRatioSlice } from "./store/reducers/profitabilityRatioSlice";

function App() {
  const dispatch = useAppDispatch();
  const { setAnalysisDataFromLocalStorage } =
    analysisWaterProductionVolumesSlice.actions;
  const { setDepreciationDataFromLocalStorage } =
    depreciationChargesCalculationSlice.actions;
  const { setCostPriceData } = costPriceSlice.actions;
  const { setStaticPerformanceIndicatorsDataFromLocalStorage } =
    staticPerformanceIndicatorsSlice.actions;
  const { setMinCostEffectivePowerData } = minCostEffectivePowerSlice.actions;
  const { setNetDiscountedCashFlowData } = netDiscountedCashFlowSlice.actions;
  const { setInternalRateOfReturnData } = internalRateOfReturnSlice.actions;
  const { setLifeCycleData } = lifeCycleSlice.actions;
  const { setProfitabilityRatioData } = profitabilityRatioSlice.actions;

  useEffect(() => {
    const analysisData = localStorage.getItem(LOCAL_STORAGE_KEY_ANALYSIS);
    if (analysisData) {
      dispatch(setAnalysisDataFromLocalStorage(JSON.parse(analysisData)));
    }
    const depreciationData = localStorage.getItem(
      LOCAL_STORAGE_KEY_DEPRECIATION
    );
    if (depreciationData) {
      dispatch(
        setDepreciationDataFromLocalStorage(JSON.parse(depreciationData))
      );
    }
    const costPriceData = localStorage.getItem(LOCAL_STORAGE_KEY_COST_PRICE);
    if (costPriceData) {
      dispatch(setCostPriceData(JSON.parse(costPriceData)));
    }
    const staticPerformanceIndicatorsData = localStorage.getItem(
      LOCAL_STORAGE_KEY_STATIC_PERFORMANCE_INDICATORS
    );
    if (staticPerformanceIndicatorsData) {
      dispatch(
        setStaticPerformanceIndicatorsDataFromLocalStorage(
          JSON.parse(staticPerformanceIndicatorsData)
        )
      );
    }
    const minCostEffectivePowerData = localStorage.getItem(
      LOCAL_STORAGE_KEY_MIN_COST_EFFECTIVE_POWER
    );
    if (minCostEffectivePowerData) {
      dispatch(
        setMinCostEffectivePowerData(JSON.parse(minCostEffectivePowerData))
      );
    }
    const netDiscountedCashFlowData = localStorage.getItem(
      LOCAL_STORAGE_KEY_NET_DISCOUNTED_CASH_FLOW
    );
    if (netDiscountedCashFlowData) {
      dispatch(
        setNetDiscountedCashFlowData(JSON.parse(netDiscountedCashFlowData))
      );
    }
    const internalRateOfReturnData = localStorage.getItem(
      LOCAL_STORAGE_KEY_INTERNAL_RATE_OF_RETURN
    );
    if (internalRateOfReturnData) {
      dispatch(
        setInternalRateOfReturnData(JSON.parse(internalRateOfReturnData))
      );
    }
    const lifeCycleData = localStorage.getItem(LOCAL_STORAGE_KEY_LIFE_CYCLE);
    if (lifeCycleData) {
      dispatch(setLifeCycleData(JSON.parse(lifeCycleData)));
    }
    const profitabilityRatioData = localStorage.getItem(
      LOCAL_STORAGE_KEY_PROFITABILITY_RATIO
    );
    if (profitabilityRatioData) {
      dispatch(setProfitabilityRatioData(JSON.parse(profitabilityRatioData)));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path={ANALYSIS_PAGE_ROUTE} element={AnalysisPage()} />
          <Route path={DEPRECIATION_PAGE_ROUTE} element={DepreciationPage()} />
          <Route path={COST_PRICE_PAGE_ROUTE} element={CostPricePage()} />
          <Route
            path={STATIC_PERFORMANCE_INDICATORS_PAGE_ROUTE}
            element={StaticPerformanceIndicatorsPage()}
          />
          <Route
            path={MIN_COST_EFFECTIVE_POWER_PAGE_ROUTE}
            element={MinCostEffectivePower()}
          />
          <Route
            path={NET_DISCOUNTED_CASH_FLOW_PAGE_ROUTE}
            element={NetDiscountedCashFlow()}
          />
          <Route
            path={INTERNAL_RATE_OF_RETURN_PAGE_ROUTE}
            element={InternalRateOfReturn()}
          />
          <Route path={LIFE_CYCLE_PAGE_ROUTE} element={LifeCyclePage()} />
          <Route
            path={PROFITABILITY_RATIO_PAGE_ROUTE}
            element={ProfitabilityRatioPage()}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
