import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Scatter,
} from "recharts";
import { useAppSelector } from "../../../hooks/redux-hooks";
import INetDiscountedCashFlowStatisticItem from "../../../Types/INetDiscountedCashFlowStatisticItem";

type ChartDataElementScatter = {
  discountRate: number;
  NDCI: number;
};

type ChartDataElementLine = {
  discountRate: number;
  netDiscountedCashIncome: number;
};

const InternalRateOfReturn = () => {
  const {
    netDiscountedCashFlowStatistic,
    netDiscountedCashFlowAdditionalStatistic,
  } = useAppSelector((state) => state.netDiscountedCashFlowReducer);

  const [dataChart, setDataChart] = useState<
    (ChartDataElementScatter | ChartDataElementLine)[]
  >([]);

  useEffect(() => {
    const data: (ChartDataElementScatter | ChartDataElementLine)[] = [
      {
        discountRate: netDiscountedCashFlowStatistic.rate,
        NDCI: netDiscountedCashFlowStatistic.statistic.discountedCashFlow,
      },
    ];
    netDiscountedCashFlowAdditionalStatistic.forEach((el) => {
      const item = {
        discountRate: el.rate,
        NDCI: el.statistic.discountedCashFlow,
      };
      data.push(item);
    });
    const chartLinePoints: ChartDataElementLine[] = [];
    chartLinePoints.push({
      discountRate: netDiscountedCashFlowStatistic.rate,
      netDiscountedCashIncome:
        netDiscountedCashFlowStatistic.statistic.discountedCashFlow,
    });
    netDiscountedCashFlowAdditionalStatistic.forEach((el) => {
      const item = {
        discountRate: el.rate,
        netDiscountedCashIncome: el.statistic.discountedCashFlow,
      };
      chartLinePoints.push(item);
    });
    chartLinePoints.sort((a, b) => a.discountRate - b.discountRate);
    data.push(...chartLinePoints);
    setDataChart(data);
  }, [
    netDiscountedCashFlowStatistic,
    netDiscountedCashFlowAdditionalStatistic,
  ]);

  return (
    <div>
      <h2 className="fs-4 my-5">Внутрішня норма прибутковості</h2>
      <div className="input-group-prepend input-text mb-2">
        ВНП розраховується, якщо виконується наступна умова: одне із значень
        чистого дисконтованого грошового прибутку (ЧДГП) обов’язково більше 0, а
        інше від’ємне.
      </div>
      <h4 className="card-title text-center my-3">
        Внутрішня норма прибутковості
      </h4>
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart
          width={500}
          height={400}
          data={dataChart}
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
            dataKey="discountRate"
            type="number"
            label={{
              value: "Ставка дисконтування, %",
              position: "bottom",
              offset: 5,
            }}
          />
          <YAxis
            type="number"
            label={{
              value: "ЧДГП, тис.грн",
              angle: -90,
              position: "left",
              offset: 10,
            }}
          />
          <Scatter
            name={"Чистий дисконтований прибуток"}
            dataKey="NDCI"
            fill="#8884d8"
            legendType="none"
          />
          {/*{intersection ? (*/}
          {/*  <Scatter*/}
          {/*    name="Точка беззбитковості"*/}
          {/*    dataKey="intersection"*/}
          {/*    fill="#fc00ff"*/}
          {/*  />*/}
          {/*) : null}*/}
          <Line
            name="Чистий дисконтований прибуток, тис.грн"
            dataKey="netDiscountedCashIncome"
            stroke="#8884d8"
            dot={false}
            activeDot={false}
            type={"monotone"}
          />
          <Line
            name="Ставка дисконтування, %"
            dataKey="discountRate"
            stroke="#82ca9d"
            dot={false}
            activeDot={false}
            type={"monotone"}
            legendType={"none"}
          />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            legendType={"none"}
          />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#82ca9d"
            legendType={"none"}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InternalRateOfReturn;
