import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import feasibilityStudyReducer from "./reducers/feasibilityStudySlice";

const rootReducer = combineReducers({
  feasibilityStudyReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
