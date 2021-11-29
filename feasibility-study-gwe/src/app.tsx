import React, { useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import "./shared/styles.scss";
import AnalysisPage from "./components/pages/analysisPage/analysisPage";
import {
  ANALYSIS_PAGE_ROUTE,
  DEPRECIATION_PAGE_ROUTE,
  LOCAL_STORAGE_KEY,
} from "./shared/constants";
import { useAppDispatch } from "./hooks/redux-hooks";
import { analysisWaterProductionVolumesSlice } from "./store/reducers/analysisWaterProductionVolumesSlice";
import { Routes, Route } from "react-router-dom";
import DepreciationPage from "./components/pages/depreciationPage/depreciationPage";

function App() {
  const dispatch = useAppDispatch();
  const { setDataFromLocalStorage } =
    analysisWaterProductionVolumesSlice.actions;

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      dispatch(setDataFromLocalStorage(JSON.parse(data)));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path={ANALYSIS_PAGE_ROUTE} element={AnalysisPage()} />
          <Route path={DEPRECIATION_PAGE_ROUTE} element={DepreciationPage()} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
