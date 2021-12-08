import React, { useEffect, useState } from "react";
import {
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
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { intersect } from "../../../shared/helpers";
import { internalRateOfReturnSlice } from "../../../store/reducers/internalRateOfReturnSlice";
import { useStore } from "react-redux";
import { LOCAL_STORAGE_KEY_INTERNAL_RATE_OF_RETURN } from "../../../shared/constants";

type ChartDataElementScatter = {
  discountRate: number;
  NDCI: number;
};

type ChartDataElementInternalRateScatter = {
  discountRate: number;
  internalRateNDCI: number;
};

type ChartDataElementLine = {
  discountRate: number;
  netDiscountedCashIncome: number;
};

const InternalRateOfReturn = () => {
  const dispatch = useAppDispatch();
  const {
    internalRateOfReturnAnalyticalMethod,
    internalRateOfReturnGraphicalMethod,
  } = useAppSelector((state) => state.internalRateOfReturnReducer);
  const { setInternalRateOfReturnData } = internalRateOfReturnSlice.actions;

  const {
    netDiscountedCashFlowStatistic,
    netDiscountedCashFlowAdditionalStatistic,
  } = useAppSelector((state) => state.netDiscountedCashFlowReducer);

  const [dataChart, setDataChart] = useState<
    (
      | ChartDataElementScatter
      | ChartDataElementLine
      | ChartDataElementInternalRateScatter
    )[]
  >([]);

  const [internalRateReturn, setInternalRateReturn] =
    useState<ChartDataElementInternalRateScatter>({
      discountRate: 0,
      internalRateNDCI: 0,
    });

  useEffect(() => {
    const data: (
      | ChartDataElementScatter
      | ChartDataElementLine
      | ChartDataElementInternalRateScatter
    )[] = [
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
    const negativeNetDiscountedCashIncomeIndex = chartLinePoints.findIndex(
      (el) => el.netDiscountedCashIncome < 0
    );
    if (negativeNetDiscountedCashIncomeIndex > -1) {
      const index = negativeNetDiscountedCashIncomeIndex;
      const internalRate = intersect(
        chartLinePoints[index - 1].discountRate,
        chartLinePoints[index - 1].netDiscountedCashIncome,
        chartLinePoints[index].discountRate,
        chartLinePoints[index].netDiscountedCashIncome,
        0,
        0,
        100,
        0
      );
      if (internalRate) {
        const intersect = {
          discountRate: +internalRate.x.toFixed(2),
          internalRateNDCI: +internalRate.y.toFixed(2),
        };
        data.push(intersect);
        setInternalRateReturn(intersect);
        const internalRateAM =
          chartLinePoints[index - 1].discountRate +
          (chartLinePoints[index - 1].netDiscountedCashIncome *
            (chartLinePoints[index].discountRate -
              chartLinePoints[index - 1].discountRate)) /
            (chartLinePoints[index - 1].netDiscountedCashIncome -
              chartLinePoints[index].netDiscountedCashIncome);
        dispatch(
          setInternalRateOfReturnData({
            internalRateOfReturnAnalyticalMethod: +internalRateAM.toFixed(2),
            internalRateOfReturnGraphicalMethod: intersect.discountRate,
          })
        );
        saveInternalRateOfReturnToLocalStorage();
      }
    } else {
      dispatch(
        setInternalRateOfReturnData({
          internalRateOfReturnAnalyticalMethod: 0,
          internalRateOfReturnGraphicalMethod: 0,
        })
      );
      saveInternalRateOfReturnToLocalStorage();
    }
    setDataChart(data);
  }, [
    netDiscountedCashFlowStatistic,
    netDiscountedCashFlowAdditionalStatistic,
  ]);

  const store = useStore();

  const saveInternalRateOfReturnToLocalStorage = () => {
    const data = store.getState().internalRateOfReturnReducer;
    localStorage.setItem(
      LOCAL_STORAGE_KEY_INTERNAL_RATE_OF_RETURN,
      JSON.stringify(data)
    );
  };

  return (
    <div>
      <h2 className="fs-4 my-5">Внутрішня норма прибутковості</h2>
      <div className="input-group-prepend input-text mb-2">
        ВНП розраховується, якщо виконується наступна умова: одне із значень
        чистого дисконтованого грошового прибутку (ЧДГП) обов’язково більше 0, а
        інше від’ємне.
      </div>
      {internalRateOfReturnAnalyticalMethod ? (
        <div className="input-group-prepend input-text mb-2">
          ВНП розрахована аналітичним методом:{" "}
          {internalRateOfReturnAnalyticalMethod}%.
        </div>
      ) : (
        <div className="input-group-prepend input-text mb-2">
          Умови не виконуються, ВНП не розраховується.
        </div>
      )}
      {internalRateOfReturnGraphicalMethod ? (
        <React.Fragment>
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
              {internalRateReturn.discountRate ? (
                <Scatter
                  name="Внутрішня норма прибутковості"
                  dataKey="internalRateNDCI"
                  fill="#fc00ff"
                />
              ) : null}
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
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default InternalRateOfReturn;
