import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "../../../hooks/redux-hooks";

type ChartData = {
  year: number;
  projectedProduction: number;
  investments: number;
  netDiscountedCashFlow: number;
};

const LifeCyclePage = () => {
  const { averageAnnualProjectedWaterProduction } = useAppSelector(
    (state) => state.analysisWaterProductionVolumesReducer.statistic
  );
  const { futureInvestmentsForYears, netDiscountedCashFlowByDiscountRate } =
    useAppSelector((state) => state.netDiscountedCashFlowReducer);

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
    setChartData(data);
  }, [
    averageAnnualProjectedWaterProduction,
    futureInvestmentsForYears,
    netDiscountedCashFlowByDiscountRate,
  ]);

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
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LifeCyclePage;
