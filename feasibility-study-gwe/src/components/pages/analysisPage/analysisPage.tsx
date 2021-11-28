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
import IStatistic from "../../../Types/IStatistic";
import { LOCAL_STORAGE_KEY } from "../../../shared/constants";
import { useStore } from "react-redux";
import { AppStore } from "../../../store/store";

type ChartDataElement = {
  year: number;
  waterProductionVolume: number;
};

const AnalysisPage = () => {
  const [waterExtractionsData, setWaterExtractionsData] = useState<string>("");
  const { annualWaterWithdrawalData, statistic } = useAppSelector(
    (state) => state.feasibilityStudyReducer
  );
  const {
    totalForPreviousYears,
    averageForPreviousYears,
    totalForLastTenYears,
    averageForLastTenYears,
  } = statistic;
  const { setAnnualWaterWithdrawalData, setStatistic, clearData } =
    feasibilityStudySlice.actions;
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
          waterProductionVolume: +el.toFixed(2),
        };
      }
    );
    setChartData(transformedData);
    if (annualWaterWithdrawalData.length > 0) {
      calculateStatistic();
    }
  }, [annualWaterWithdrawalData]);

  const calculateStatistic = () => {
    const totalForPreviousYears = +annualWaterWithdrawalData
      .reduce((prev, current) => prev + current)
      .toFixed(2);
    const averageForPreviousYears = +(
      totalForPreviousYears / annualWaterWithdrawalData.length
    ).toFixed(2);
    let totalForLastTenYears = 0;
    let averageForLastTenYears = 0;
    if (annualWaterWithdrawalData.length > 10) {
      totalForLastTenYears = +annualWaterWithdrawalData
        .slice(-10)
        .reduce((prev, current) => prev + current)
        .toFixed(2);
      averageForLastTenYears = +(totalForLastTenYears / 10).toFixed(2);
    }
    const statistic: IStatistic = {
      totalForPreviousYears,
      averageForPreviousYears,
      totalForLastTenYears,
      averageForLastTenYears,
    };
    dispatch(setStatistic(statistic));
    saveDataAndStatisticToLocalStorage();
  };

  const store = useStore();

  const saveDataAndStatisticToLocalStorage = () => {
    const data = store.getState().feasibilityStudyReducer;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const handleDeleteData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    dispatch(clearData());
    setWaterExtractionsData("");
  };

  const handleCancel = () => {
    setWaterExtractionsData("");
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
          className="btn btn-light mb-2"
          onClick={handleCancel}
          disabled={!waterExtractionsData}
        >
          Скасувати
        </button>
        <button
          type="button"
          className="btn btn-danger ms-2 mb-2"
          onClick={handleDeleteData}
          disabled={!annualWaterWithdrawalData.length}
        >
          Видалити дані
        </button>
        <button
          type="button"
          className="btn btn-primary ms-2 mb-2"
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
          <div className="card my-3">
            <div className="card-body">
              <h5 className="card-title">Статистика</h5>
              <table className="table table-striped table-hover">
                <tbody>
                  <tr>
                    <td className="col-6">
                      <p className="card-text">
                        Всього за попередні {annualWaterWithdrawalData.length}
                        {annualWaterWithdrawalData.length >= 5
                          ? " років"
                          : " роки"}
                        :
                      </p>
                    </td>
                    <td className="col-6">{totalForPreviousYears}</td>
                  </tr>
                  <tr>
                    <td className="col-6">
                      <p className="card-text">
                        В середньому за {annualWaterWithdrawalData.length}
                        {annualWaterWithdrawalData.length >= 5
                          ? " років"
                          : " роки"}
                        :
                      </p>
                    </td>
                    <td className="col-6">{averageForPreviousYears}</td>
                  </tr>
                  {annualWaterWithdrawalData.length > 10 ? (
                    <React.Fragment>
                      <tr>
                        <td className="col-6">
                          <p className="card-text">
                            Всього за попередні 10 років:
                          </p>
                        </td>
                        <td className="col-6">{totalForLastTenYears}</td>
                      </tr>
                      <tr>
                        <td className="col-6">
                          <p className="card-text">
                            В середньому за попередні 10 років:
                          </p>
                        </td>
                        <td className="col-6">{averageForLastTenYears}</td>
                      </tr>
                    </React.Fragment>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default AnalysisPage;
