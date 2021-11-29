import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import analysisWaterProductionVolumesReducer from "./reducers/analysisWaterProductionVolumesSlice";
import depreciationChargesCalculationReducer from "./reducers/depreciationChargesCalculationSlice";

const rootReducer = combineReducers({
  analysisWaterProductionVolumesReducer,
  depreciationChargesCalculationReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
