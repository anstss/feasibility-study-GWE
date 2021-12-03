import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import analysisWaterProductionVolumesReducer from "./reducers/analysisWaterProductionVolumesSlice";
import depreciationChargesCalculationReducer from "./reducers/depreciationChargesCalculationSlice";
import costPriceReducer from "./reducers/costPriceSlice";
import staticPerformanceIndicatorsReducer from "./reducers/staticPerformanceIndicatorsSlice";

const rootReducer = combineReducers({
  analysisWaterProductionVolumesReducer,
  depreciationChargesCalculationReducer,
  costPriceReducer,
  staticPerformanceIndicatorsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
