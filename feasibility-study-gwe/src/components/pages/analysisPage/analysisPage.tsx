import React, { useEffect, useState } from "react";
import "./analysisPage.scss";
import analysisWaterProductionVolumesReducer, {
  analysisWaterProductionVolumesSlice,
} from "../../../store/reducers/analysisWaterProductionVolumesSlice";
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
import { LOCAL_STORAGE_KEY_ANALYSIS } from "../../../shared/constants";
import { useStore } from "react-redux";
import ButtonGroup from "../../button-group/buttonGroup";
import DeleteModal from "../../delete-modal/deleteModal";

type ChartDataElement = {
  year: number;
  waterProductionVolume: number;
};

const AnalysisPage = () => {
  const [waterExtractionsData, setWaterExtractionsData] = useState<string>("");
  const [limitProdVolumes, setLimitProdVolumes] = useState<string>("");
  const [lossVolume, setLossVolume] = useState<string>("");
  const [projectedWaterProd, setProjectedWaterProd] = useState<string>("");
  const {
    annualWaterWithdrawalData,
    statistic,
    limitedProductionVolumes,
    waterLossVolume,
    projectedWaterProduction,
  } = useAppSelector((state) => state.analysisWaterProductionVolumesReducer);
  const {
    totalForPreviousYears,
    averageForPreviousYears,
    totalForLastTenYears,
    averageForLastTenYears,
    maxForLastTenOrLessYears,
    maxForLastTenOrLessYearsPercent,
    averageForLastTenOrLessYearsPercent,
    waterLossVolumePercent,
    averageAnnualProjectedWaterProduction,
    averageAnnualProjectedWaterProductionWithLosses,
  } = statistic;
  const {
    setAnnualWaterWithdrawalData,
    setStatistic,
    clearData,
    setLimitedProductionVolumes,
    setWaterLossVolume,
    setProjectedWaterProduction,
  } = analysisWaterProductionVolumesSlice.actions;
  const dispatch = useAppDispatch();
  const [chartData, setChartData] = useState<ChartDataElement[]>([]);

  useEffect(() => {
    if (annualWaterWithdrawalData) {
      setWaterExtractionsData(annualWaterWithdrawalData.join(" "));
    }
    if (limitedProductionVolumes) {
      setLimitProdVolumes(limitedProductionVolumes.toString());
    }
    if (waterLossVolume) {
      setLossVolume(waterLossVolume.toString());
    }
    if (projectedWaterProduction) {
      setProjectedWaterProd(projectedWaterProduction.toString());
    }
  }, [annualWaterWithdrawalData, limitedProductionVolumes]);

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
    if (!isNaN(+limitProdVolumes)) {
      dispatch(setLimitedProductionVolumes(+limitProdVolumes));
    }
    if (!isNaN(+lossVolume)) {
      dispatch(setWaterLossVolume(+lossVolume));
    }
    if (!isNaN(+projectedWaterProd)) {
      dispatch(setProjectedWaterProduction(+projectedWaterProd));
    }
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
    const maxForLastTenOrLessYears = Math.max(
      ...annualWaterWithdrawalData.slice(-10)
    );
    const averageForLastTenOrLessYears =
      annualWaterWithdrawalData
        .slice(-10)
        .reduce((prev, current) => prev + current) /
      annualWaterWithdrawalData.slice(-10).length;
    let maxForLastTenOrLessYearsPercent = 0;
    let averageForLastTenOrLessYearsPercent = 0;
    let waterLossVolumePercent = 0;
    if (limitedProductionVolumes) {
      maxForLastTenOrLessYearsPercent = +(
        (maxForLastTenOrLessYears / limitedProductionVolumes) *
        100
      ).toFixed(2);
      averageForLastTenOrLessYearsPercent = +(
        (averageForLastTenOrLessYears / limitedProductionVolumes) *
        100
      ).toFixed(2);
      if (waterLossVolume) {
        waterLossVolumePercent = +(
          (waterLossVolume / limitedProductionVolumes) *
          100
        ).toFixed(2);
      }
    }
    let averageAnnualProjectedWaterProduction = 0;
    let averageAnnualProjectedWaterProductionWithLosses = 0;
    if (projectedWaterProduction) {
      averageAnnualProjectedWaterProduction = +(
        projectedWaterProduction / 25
      ).toFixed(2);
      if (waterLossVolumePercent) {
        averageAnnualProjectedWaterProductionWithLosses = +(
          (averageAnnualProjectedWaterProduction / 100) *
          (100 - waterLossVolumePercent)
        ).toFixed(2);
      }
    }
    const statistic: IStatistic = {
      totalForPreviousYears,
      averageForPreviousYears,
      totalForLastTenYears,
      averageForLastTenYears,
      maxForLastTenOrLessYears,
      maxForLastTenOrLessYearsPercent,
      averageForLastTenOrLessYearsPercent,
      waterLossVolumePercent,
      averageAnnualProjectedWaterProduction,
      averageAnnualProjectedWaterProductionWithLosses,
    };
    dispatch(setStatistic(statistic));
    saveDataAndStatisticToLocalStorage();
  };

  const store = useStore();

  const saveDataAndStatisticToLocalStorage = () => {
    const data = store.getState().analysisWaterProductionVolumesReducer;
    localStorage.setItem(LOCAL_STORAGE_KEY_ANALYSIS, JSON.stringify(data));
  };

  const handleDeleteData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_ANALYSIS);
    dispatch(clearData());
    setWaterExtractionsData("");
  };

  const handleCancel = () => {
    setWaterExtractionsData("");
    setLimitProdVolumes("");
    setLossVolume("");
    setProjectedWaterProd("");
  };

  const handleChangeLimitProdVolumes = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimitProdVolumes(event.target.value);
  };

  const handleChangeLossVolume = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLossVolume(event.target.value);
  };

  const handleChangeProjectedWaterProd = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProjectedWaterProd(event.target.value);
  };

  const [cancelIsDisabled, setCancelIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (
      waterExtractionsData ||
      limitProdVolumes ||
      lossVolume ||
      projectedWaterProd
    ) {
      setCancelIsDisabled(false);
    } else {
      setCancelIsDisabled(true);
    }
  }, [waterExtractionsData, limitProdVolumes, lossVolume, projectedWaterProd]);

  return (
    <div>
      <h2 className="fs-4 my-5">Аналіз досягнутих обсягів видобутку води</h2>
      <div className="input-group-prepend input-text mb-2">
        Введіть річний обсяг видобутку води (у тис.м³) за необхідну кількість
        останніх років (розділяючи пробілом), всі нечислові значення будуть
        проігноровані:
      </div>
      <input
        type="text"
        className="form-control mb-2"
        value={waterExtractionsData}
        onChange={handleChangeWaterExtractionsData}
      />
      <div className="input-group-prepend input-text mb-2">
        Введіть лімітовані обсяги видобутку (у тис.м³/рік), зазначені в дозволі
        на спеціальне водокористування, всі нечислові значення будуть
        проігноровані:
      </div>
      <input
        type="text"
        className="form-control mb-2"
        value={limitProdVolumes}
        onChange={handleChangeLimitProdVolumes}
      />
      <div className="input-group-prepend input-text mb-2">
        Введіть обсяг втрат в системах водопостачання (у тис.м³/рік), згідно із
        дозволом на спеціальне водокористування, всі нечислові значення будуть
        проігноровані:
      </div>
      <input
        type="text"
        className="form-control mb-2"
        value={lossVolume}
        onChange={handleChangeLossVolume}
      />
      <div className="input-group-prepend input-text mb-2">
        Введіть прогнозний видуботок води на 25 років (у тис.м³), всі нечислові
        значення будуть проігноровані:
      </div>
      <input
        type="text"
        className="form-control mb-2"
        value={projectedWaterProd}
        onChange={handleChangeProjectedWaterProd}
      />
      <ButtonGroup
        handleCancel={handleCancel}
        cancelIsDisabled={cancelIsDisabled}
        deleteIsDisabled={!annualWaterWithdrawalData.length}
        handleDataIsDisabled={!waterExtractionsData}
        handleData={handleAnalyses}
        handleDataBtnText={"Виконати аналіз"}
      />
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
                    <td className="col-6">{totalForPreviousYears} тис.м³</td>
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
                    <td className="col-6">{averageForPreviousYears} тис.м³</td>
                  </tr>
                  {annualWaterWithdrawalData.length > 10 ? (
                    <React.Fragment>
                      <tr>
                        <td className="col-6">
                          <p className="card-text">
                            Всього за попередні 10 років:
                          </p>
                        </td>
                        <td className="col-6">{totalForLastTenYears} тис.м³</td>
                      </tr>
                      <tr>
                        <td className="col-6">
                          <p className="card-text">
                            В середньому за попередні 10 років:
                          </p>
                        </td>
                        <td className="col-6">
                          {averageForLastTenYears} тис.м³
                        </td>
                      </tr>
                    </React.Fragment>
                  ) : null}
                  <tr>
                    <td className="col-6">
                      <p className="card-text">
                        Максимальний обсяг видобутку за останні{" "}
                        {annualWaterWithdrawalData.slice(-10).length}
                        {annualWaterWithdrawalData.length >= 5
                          ? " років"
                          : " роки"}
                        :
                      </p>
                    </td>
                    <td className="col-6">{maxForLastTenOrLessYears} тис.м³</td>
                  </tr>
                  {limitedProductionVolumes ? (
                    <React.Fragment>
                      <tr>
                        <td className="col-6">
                          <p className="card-text">
                            Максимальний обсяг видобутку за останні{" "}
                            {annualWaterWithdrawalData.slice(-10).length}
                            {annualWaterWithdrawalData.length >= 5
                              ? " років"
                              : " роки"}
                            , від лімітованих обсягів видобутку (
                            {limitedProductionVolumes} тис.м³) :
                          </p>
                        </td>
                        <td className="col-6">
                          {maxForLastTenOrLessYearsPercent}%
                        </td>
                      </tr>
                      <tr>
                        <td className="col-6">
                          <p className="card-text">
                            Середній видобуток за останні{" "}
                            {annualWaterWithdrawalData.slice(-10).length}
                            {annualWaterWithdrawalData.length >= 5
                              ? " років"
                              : " роки"}
                            , від лімітованих обсягів видобутку (
                            {limitedProductionVolumes} тис.м³) :
                          </p>
                        </td>
                        <td className="col-6">
                          {averageForLastTenOrLessYearsPercent}%
                        </td>
                      </tr>
                    </React.Fragment>
                  ) : null}
                  {waterLossVolume && limitedProductionVolumes ? (
                    <tr>
                      <td className="col-6">
                        <p className="card-text">
                          Обсяг втрат в системах у відсотковому відношенні до
                          загального обсягу забору води (
                          {limitedProductionVolumes} тис.м³):
                        </p>
                      </td>
                      <td className="col-6">{waterLossVolumePercent}%</td>
                    </tr>
                  ) : null}
                  {projectedWaterProduction ? (
                    <tr>
                      <td className="col-6">
                        <p className="card-text">
                          Середньорічний прогнозний видуботок води:
                        </p>
                      </td>
                      <td className="col-6">
                        {averageAnnualProjectedWaterProduction} тис.м³/рік
                      </td>
                    </tr>
                  ) : null}
                  {projectedWaterProduction && waterLossVolumePercent ? (
                    <tr>
                      <td className="col-6">
                        <p className="card-text">
                          Середньорічний прогнозний видуботок води, з
                          урахуванням технологічних втрат:
                        </p>
                      </td>
                      <td className="col-6">
                        {averageAnnualProjectedWaterProductionWithLosses}{" "}
                        тис.м³/рік
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </React.Fragment>
      ) : null}
      <DeleteModal handleDeleteData={handleDeleteData} />
    </div>
  );
};

export default AnalysisPage;
