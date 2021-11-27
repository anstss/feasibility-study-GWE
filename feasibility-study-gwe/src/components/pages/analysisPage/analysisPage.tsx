import React, { useEffect, useState } from "react";
import "./analysisPage.scss";
import { feasibilityStudySlice } from "../../../store/reducers/feasibilityStudySlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartDataElement = {
  year: number;
  waterProductionVolume: number;
};

const AnalysisPage = () => {
  const [waterExtractionsData, setWaterExtractionsData] = useState<string>("");
  const { annualWaterWithdrawalData } = useAppSelector(
    (state) => state.feasibilityStudyReducer
  );
  const { setAnnualWaterWithdrawalData } = feasibilityStudySlice.actions;
  const dispatch = useAppDispatch();
  const [chartData, setChartData] = useState<ChartDataElement[]>([]);

  const handleChangeWaterExtractionsData = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWaterExtractionsData(event.target.value);
  };

  const handleAnalyses = () => {
    const data: number[] = waterExtractionsData
      .replaceAll(",", ".")
      .split(" ")
      .filter((el) => !isNaN(+el))
      .map((el) => +el);
    dispatch(setAnnualWaterWithdrawalData(data));
  };

  useEffect(() => {
    const currentYear: number = new Date().getFullYear();
    const transformedData: ChartDataElement[] = annualWaterWithdrawalData.map(
      (el, index) => {
        return {
          year: currentYear - annualWaterWithdrawalData.length + index,
          waterProductionVolume: el,
        };
      }
    );
    setChartData(transformedData);
  }, [annualWaterWithdrawalData]);

  const calculateStatistic = () => {
    const totalForPreviousYears = annualWaterWithdrawalData.reduce(
      (prev, current) => prev + current
    );
    const averageForPreviousYears =
      totalForPreviousYears / annualWaterWithdrawalData.length;
    let totalForLastTenYears = 0;
    let averageForLastTenYears = 0;
    if (annualWaterWithdrawalData.length > 10) {
      totalForLastTenYears = annualWaterWithdrawalData
        .slice(-10)
        .reduce((prev, current) => prev + current);
      averageForLastTenYears = totalForLastTenYears / 10;
    }
  };

  return (
    <div>
      <h2 className="fs-4 my-5">Аналіз досягнутих обсягів видобутку води</h2>
      <div className="input-group-prepend input-text mb-2">
        Введіть річний обсяг видобутку води (у тис.м³) за необхідну кількість
        останніх років (розділяючи пробілом), всі нечислові значення будуть
        проігноровані:
      </div>
      <div className="d-flex flex-wrap justify-content-end mb-3">
        <input
          type="text"
          className="form-control mb-2"
          value={waterExtractionsData}
          onChange={handleChangeWaterExtractionsData}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAnalyses}
        >
          Виконати аналіз
        </button>
      </div>
      {chartData.length ? (
        <React.Fragment>
          <h4 className="card-title text-center mb-3">
            Динаміка видобутку води за {chartData[0].year} -{" "}
            {chartData[chartData.length - 1].year} роки
          </h4>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="waterProductionVolume"
                name="Річний обсяг видобутку, тис.м³"
                fill="#8884d8"
              />
            </BarChart>
          </ResponsiveContainer>
        </React.Fragment>
      ) : null}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Статистика</h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">
            Всього за попередні {annualWaterWithdrawalData.length}{" "}
            {annualWaterWithdrawalData.length >= 5 ? "років" : "роки"}: {}
          </p>
          <a href="#" className="card-link">
            Card link
          </a>
          <a href="#" className="card-link">
            Another link
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
