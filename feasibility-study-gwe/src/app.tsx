import React from "react";
import Navbar from "./components/navbar/navbar";
import "./shared/styles.scss";
import AnalysisPage from "./components/pages/analysisPage/analysisPage";

function App() {
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
