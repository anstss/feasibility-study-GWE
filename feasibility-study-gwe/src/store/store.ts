import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import analysisWaterProductionVolumesReducer from "./reducers/analysisWaterProductionVolumesSlice";
import depreciationChargesCalculationReducer from "./reducers/depreciationChargesCalculationSlice";
import costPriceReducer from "./reducers/costPriceSlice";
import staticPerformanceIndicatorsReducer from "./reducers/staticPerformanceIndicatorsSlice";
import minCostEffectivePowerSliceReducer from "./reducers/minCostEffectivePower";
import netDiscountedCashFlowReducer from "./reducers/netDiscountedCashFlowSlice";
import internalRateOfReturnReducer from "./reducers/internalRateOfReturnSlice";
import lifeCycleSliceReducer from "./reducers/lifeCycleSlice";

const rootReducer = combineReducers({
  analysisWaterProductionVolumesReducer,
  depreciationChargesCalculationReducer,
  costPriceReducer,
  staticPerformanceIndicatorsReducer,
  minCostEffectivePowerSliceReducer,
  netDiscountedCashFlowReducer,
  internalRateOfReturnReducer,
  lifeCycleSliceReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
