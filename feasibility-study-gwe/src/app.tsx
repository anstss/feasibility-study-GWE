import React, { useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import "./shared/styles.scss";
import AnalysisPage from "./components/pages/analysisPage/analysisPage";
import { LOCAL_STORAGE_KEY } from "./shared/constants";
import { useAppDispatch } from "./hooks/redux-hooks";
import { analysisWaterProductionVolumesSlice } from "./store/reducers/analysisWaterProductionVolumesSlice";

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
        <AnalysisPage />
      </div>
    </div>
  );
}

export default App;
