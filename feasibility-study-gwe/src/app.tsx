import React, { useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import "./shared/styles.scss";
import AnalysisPage from "./components/pages/analysisPage/analysisPage";
import {
  ANALYSIS_PAGE_ROUTE,
  DEPRECIATION_PAGE_ROUTE,
  LOCAL_STORAGE_KEY_ANALYSIS,
  LOCAL_STORAGE_KEY_DEPRECIATION,
} from "./shared/constants";
import { useAppDispatch } from "./hooks/redux-hooks";
import { analysisWaterProductionVolumesSlice } from "./store/reducers/analysisWaterProductionVolumesSlice";
import { Routes, Route } from "react-router-dom";
import DepreciationPage from "./components/pages/depreciationPage/depreciationPage";
import { depreciationChargesCalculationSlice } from "./store/reducers/depreciationChargesCalculationSlice";

function App() {
  const dispatch = useAppDispatch();
  const { setAnalysisDataFromLocalStorage } =
    analysisWaterProductionVolumesSlice.actions;
  const { setDepreciationDataFromLocalStorage } =
    depreciationChargesCalculationSlice.actions;

  useEffect(() => {
    const dataAnalysis = localStorage.getItem(LOCAL_STORAGE_KEY_ANALYSIS);
    if (dataAnalysis) {
      dispatch(setAnalysisDataFromLocalStorage(JSON.parse(dataAnalysis)));
    }
    const dataDepreciation = localStorage.getItem(
      LOCAL_STORAGE_KEY_DEPRECIATION
    );
    if (dataDepreciation) {
      dispatch(
        setDepreciationDataFromLocalStorage(JSON.parse(dataDepreciation))
      );
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
