import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { intersect } from "../../../shared/helpers";
import { LOCAL_STORAGE_KEY_LIFE_CYCLE } from "../../../shared/constants";
import { useStore } from "react-redux";
import { lifeCycleSlice } from "../../../store/reducers/lifeCycleSlice";

type ChartData = {
  year: number;
  projectedProduction: number;
  investments: number;
  netDiscountedCashFlow: number;
};

const LifeCyclePage = () => {
  const dispatch = useAppDispatch();

  const { averageAnnualProjectedWaterProduction } = useAppSelector(
    (state) => state.analysisWaterProductionVolumesReducer.statistic
  );
  const {
    discountRate,
    futureInvestmentsForYears,
    netDiscountedCashFlowByDiscountRate,
    netDiscountedCashFlowStatistic,
  } = useAppSelector((state) => state.netDiscountedCashFlowReducer);
  const { discountedIncome, discountedCapitalInvestment, discountedCashFlow } =
    netDiscountedCashFlowStatistic.statistic;
  const { internalRateOfReturnGraphicalMethod } = useAppSelector(
    (state) => state.internalRateOfReturnReducer
  );
  const { discountedPaybackPeriod, profitabilityIndex } = useAppSelector(
    (state) => state.lifeCycleSliceReducer
  );
  const { setLifeCycleData } = lifeCycleSlice.actions;

  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const data: ChartData[] = futureInvestmentsForYears.map((el, index) => {
      return {
        year: index + 1,
        projectedProduction: averageAnnualProjectedWaterProduction,
        investments: -futureInvestmentsForYears[index],
        netDiscountedCashFlow:
          netDiscountedCashFlowByDiscountRate[index].netDiscountedCashIncome,
      };
    });
    const index = netDiscountedCashFlowByDiscountRate.findIndex(
      (el) => el.netDiscountedCashIncome > 0
    );
    if (index - 1 >= 0) {
      const intersection = intersect(
        0,
        0,
        25,
        0,
        netDiscountedCashFlowByDiscountRate[index - 1].year + 1,
        netDiscountedCashFlowByDiscountRate[index - 1].netDiscountedCashIncome,
        netDiscountedCashFlowByDiscountRate[index].year + 1,
        netDiscountedCashFlowByDiscountRate[index].netDiscountedCashIncome
      );
      const profitabilityIndex = +(
        discountedIncome / discountedCapitalInvestment
      ).toFixed(2);
      const discountedPaybackPeriod = intersection
        ? +intersection.x.toFixed(2)
        : 0;
      dispatch(
        setLifeCycleData({ discountedPaybackPeriod, profitabilityIndex })
      );
      saveLifeCycleToLocalStorage();
    }
    setChartData(data);
  }, [
    averageAnnualProjectedWaterProduction,
    futureInvestmentsForYears,
    netDiscountedCashFlowByDiscountRate,
    discountedIncome,
    discountedCapitalInvestment,
  ]);

  const store = useStore();

  const saveLifeCycleToLocalStorage = () => {
    const data = store.getState().lifeCycleSliceReducer;
    localStorage.setItem(LOCAL_STORAGE_KEY_LIFE_CYCLE, JSON.stringify(data));
  };

  return (
    <div>
      <h2 className="fs-4 my-5">Життєвий цикл прогнозної експлуатації</h2>
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="year"
            label={{ value: "Роки прогнозу", position: "bottom", offset: 0 }}
            scale="band"
          />
          <YAxis
            label={{
              value: "тис.м³ в рік та тис.грн",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend verticalAlign={"top"} />
          <Bar
            name="Видобуток води, тис.м³"
            dataKey="projectedProduction"
            fill="#8884d8"
          />
          <Bar
            name="Капіталовкладення та інвестиції, тис.грн"
            dataKey="investments"
            fill="#82ca9d"
          />
          <Line
            name="Чистий дисконтований грошовий потік, тис.м³"
            type="monotone"
            dataKey="netDiscountedCashFlow"
            stroke="#ff7300"
          />
          <ReferenceLine y={0} stroke="#000" />
        </ComposedChart>
      </ResponsiveContainer>
      <h3 className="fs-5 mt-5">
        Результати розрахунку прогнозних техніко-економічних показників
      </h3>
      <div className="table-responsive mt-3">
        <table className="table table-striped table-hover mb-5">
          <thead>
            <tr>
              <th scope="col">№</th>
              <th scope="col">Показники</th>
              <th scope="col">Одиниці виміру</th>
              <th scope="col">Значення для ставки {discountRate}%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Чистий дисконтований дохід</td>
              <td>тис.грн</td>
              <td>{discountedIncome}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Дисконтовані капіталовкладення</td>
              <td>тис.грн</td>
              <td>{discountedCapitalInvestment}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Дисконтований грошовий потік</td>
              <td>тис.грн</td>
              <td>{discountedCashFlow}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Дисконтований строк окупності</td>
              <td>роки</td>
              <td>{discountedPaybackPeriod}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Внутрішня норма прибутковості</td>
              <td>%</td>
              <td>{internalRateOfReturnGraphicalMethod}</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Індекс прибутковості</td>
              <td>частка од.</td>
              <td>{profitabilityIndex}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LifeCyclePage;
