import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { minCostEffectivePowerSlice } from "../../../store/reducers/minCostEffectivePower";
import { useStore } from "react-redux";
import { LOCAL_STORAGE_KEY_MIN_COST_EFFECTIVE_POWER } from "../../../shared/constants";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";
import { intersect } from "../../../shared/helpers";

type ChartDataElementScatter = {
  productionVolume: number;
  redCFC: number;
  blueOC: number;
  greenGP: number;
};

type ChartDataElementBreakEvenScatter = {
  productionVolume: number;
  intersection: number;
};

type ChartDataElementLineConditionalFixedCosts = {
  productionVolume: number;
  conditionalFixedCosts: number;
};

type ChartDataElementLineOperatingCosts = {
  productionVolume: number;
  operatingCosts: number;
};

type ChartDataElementLineGrossProfit = {
  productionVolume: number;
  grossProfit: number;
};

const MinCostEffectivePower = () => {
  const { averageAnnualProjectedWaterProductionWithLosses } = useAppSelector(
    (state) => state.analysisWaterProductionVolumesReducer.statistic
  );
  const { costPrice, conditionalFixedCosts, variableCosts, operatingCosts } =
    useAppSelector((state) => state.costPriceReducer);
  const { totalAnnualCost } = useAppSelector(
    (state) => state.staticPerformanceIndicatorsReducer
  );
  const {
    specificVariableCosts,
    minimumCostEffectivePower,
    economicSafetyCoefficient,
    economicSecurityFrontier,
    safetyZoneFactor,
  } = useAppSelector((state) => state.minCostEffectivePowerSliceReducer);

  const { setMinCostEffectivePowerData } = minCostEffectivePowerSlice.actions;

  const dispatch = useAppDispatch();

  const calculateMinCostEffectivePower = () => {
    const specificVariableCosts = +(
      variableCosts / averageAnnualProjectedWaterProductionWithLosses
    ).toFixed(2);
    const minimumCostEffectivePower = +(
      conditionalFixedCosts /
      (costPrice - specificVariableCosts)
    ).toFixed(2);
    const economicSafetyCoefficient = +(
      averageAnnualProjectedWaterProductionWithLosses /
      minimumCostEffectivePower
    ).toFixed(2);
    const economicSecurityFrontier = +(
      averageAnnualProjectedWaterProductionWithLosses -
      minimumCostEffectivePower
    ).toFixed(2);
    const safetyZoneFactor = +(
      (economicSecurityFrontier /
        averageAnnualProjectedWaterProductionWithLosses) *
      100
    ).toFixed(2);
    dispatch(
      setMinCostEffectivePowerData({
        specificVariableCosts,
        minimumCostEffectivePower,
        economicSafetyCoefficient,
        economicSecurityFrontier,
        safetyZoneFactor,
      })
    );
    saveMinCostEffectivePowerDataToLocalStorage();
  };

  const store = useStore();

  const saveMinCostEffectivePowerDataToLocalStorage = () => {
    const data = store.getState().minCostEffectivePowerSliceReducer;
    localStorage.setItem(
      LOCAL_STORAGE_KEY_MIN_COST_EFFECTIVE_POWER,
      JSON.stringify(data)
    );
  };

  useEffect(() => {
    calculateMinCostEffectivePower();
  }, [variableCosts, averageAnnualProjectedWaterProductionWithLosses]);

  const [chartData, setChartData] = useState<
    (
      | ChartDataElementScatter
      | ChartDataElementLineConditionalFixedCosts
      | ChartDataElementLineOperatingCosts
      | ChartDataElementLineGrossProfit
      | ChartDataElementBreakEvenScatter
    )[]
  >([]);

  const [intersection, setIntersection] = useState<
    false | { x: number; y: number }
  >(false);

  useEffect(() => {
    const data = [
      {
        productionVolume: 0,
        redCFC: conditionalFixedCosts,
        blueOC: conditionalFixedCosts,
        greenGP: 0,
      },
      {
        productionVolume: averageAnnualProjectedWaterProductionWithLosses,
        redCFC: conditionalFixedCosts,
        blueOC: operatingCosts,
        greenGP: totalAnnualCost,
      },
      { productionVolume: 0, conditionalFixedCosts },
      {
        productionVolume: averageAnnualProjectedWaterProductionWithLosses,
        conditionalFixedCosts,
      },
      { productionVolume: 0, operatingCosts: conditionalFixedCosts },
      {
        productionVolume: averageAnnualProjectedWaterProductionWithLosses,
        operatingCosts,
      },
      { productionVolume: 0, grossProfit: 0 },
      {
        productionVolume: averageAnnualProjectedWaterProductionWithLosses,
        grossProfit: totalAnnualCost,
      },
      {
        productionVolume: 0,
        intersection: 0,
      },
    ];
    const intersection = intersect(
      0,
      conditionalFixedCosts,
      averageAnnualProjectedWaterProductionWithLosses,
      operatingCosts,
      0,
      0,
      averageAnnualProjectedWaterProductionWithLosses,
      totalAnnualCost
    );
    setIntersection(intersection);
    data.pop();
    if (intersection) {
      data.push({
        productionVolume: +intersection.x.toFixed(2),
        intersection: +intersection.y.toFixed(2),
      });
    }
    setChartData(data);
  }, [
    conditionalFixedCosts,
    averageAnnualProjectedWaterProductionWithLosses,
    operatingCosts,
    totalAnnualCost,
  ]);

  return (
    <div>
      <h2 className="fs-4 my-5">Мінімальна рентабельна потужність</h2>
      <div className="table-responsive mt-3">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Найменування показників</th>
              <th scope="col">Одиниці виміру</th>
              <th scope="col">Значення</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Фактична потужність</td>
              <td>тис.м³/рік</td>
              <td>{averageAnnualProjectedWaterProductionWithLosses}</td>
            </tr>
            <tr>
              <td>Ціна одиниці товарної продукції</td>
              <td>грн</td>
              <td>{costPrice}</td>
            </tr>
            <tr>
              <td>Умовно-постійні витрати</td>
              <td>тис.грн</td>
              <td>{conditionalFixedCosts}</td>
            </tr>
            <tr>
              <td>Змінні витрати</td>
              <td>тис.грн</td>
              <td>{variableCosts}</td>
            </tr>
            <tr>
              <td>Питомі змінні витрати</td>
              <td>грн/м³</td>
              <td>{specificVariableCosts}</td>
            </tr>
            <tr>
              <td>Мінімальна рентабельна потужність</td>
              <td>тис.м³/рік</td>
              <td>{minimumCostEffectivePower}</td>
            </tr>
            <tr>
              <td>Коефіцієнт економічної безпеки</td>
              <td>долі од.</td>
              <td>{economicSafetyCoefficient}</td>
            </tr>
            <tr>
              <td>Межа економічної безпеки</td>
              <td>тис.м³/рік</td>
              <td>{economicSecurityFrontier}</td>
            </tr>
            <tr>
              <td>Коефіцієнт зони безпеки</td>
              <td>%</td>
              <td>{safetyZoneFactor}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 className="card-title text-center my-3">
        Визначення точки беззбитковості
      </h4>
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 20,
            right: 80,
            bottom: 60,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <Legend verticalAlign={"top"} />
          <XAxis
            dataKey="productionVolume"
            type="number"
            label={{
              value: "Обсяг видобутку, тис.м³",
              position: "bottom",
              offset: 5,
            }}
          />
          <YAxis
            type="number"
            label={{
              value: "Доходи та витрати, тис.грн",
              angle: -90,
              position: "left",
              offset: 10,
            }}
          />
          <Scatter
            name="Умовно-постійні витрати"
            dataKey="redCFC"
            fill="red"
            legendType="none"
          />
          <Scatter
            name="Загальні витрати (валові)"
            dataKey="blueOC"
            fill="blue"
            legendType="none"
          />
          <Scatter
            name="Валовий дохід підприємства"
            dataKey="greenGP"
            fill="green"
            legendType="none"
          />
          {intersection ? (
            <Scatter
              name="Точка беззбитковості"
              dataKey="intersection"
              fill="#fc00ff"
            />
          ) : null}
          <Line
            name="Загальні витрати (валові)"
            dataKey="operatingCosts"
            stroke="blue"
            dot={false}
            activeDot={false}
          />
          <Line
            name="Умовно-постійні витрати"
            dataKey="conditionalFixedCosts"
            stroke="red"
            dot={false}
            activeDot={false}
          />
          <Line
            name="Валовий дохід підприємства"
            dataKey="grossProfit"
            stroke="green"
            dot={false}
            activeDot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MinCostEffectivePower;
