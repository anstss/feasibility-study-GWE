import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import INetDiscountedCashFlowItem from "../../Types/INetDiscountedCashFlowItem";
import INetDiscountedCashFlowStatisticItem from "../../Types/INetDiscountedCashFlowStatisticItem";

interface NetDiscountedCashFlowState {
  discountRate: number;
  futureInvestmentsForYears: number[];
  netDiscountedCashFlowByDiscountRate: INetDiscountedCashFlowItem[];
  netDiscountedCashFlowStatistic: INetDiscountedCashFlowStatisticItem;
  netDiscountedCashFlowAdditionalStatistic: INetDiscountedCashFlowStatisticItem[];
}

const initialNetDiscountedCashFlowStatistic: INetDiscountedCashFlowStatisticItem =
  {
    rate: 0,
    statistic: {
      year: 0,
      netProfit: 0,
      depreciation: 0,
      profit: 0,
      investments: 0,
      cashFlow: 0,
      discountCoefficient: 0,
      discountedCashFlow: 0,
      netDiscountedCashIncome: 0,
      discountedIncome: 0,
      discountedCapitalInvestment: 0,
    },
  };

const initialState: NetDiscountedCashFlowState = {
  discountRate: 0,
  futureInvestmentsForYears: [],
  netDiscountedCashFlowByDiscountRate: [],
  netDiscountedCashFlowStatistic: initialNetDiscountedCashFlowStatistic,
  netDiscountedCashFlowAdditionalStatistic: [],
};

export const netDiscountedCashFlowSlice = createSlice({
  name: "netDiscountedCashFlowState",
  initialState,
  reducers: {
    setNetDiscountedCashFlowData(
      state,
      action: PayloadAction<NetDiscountedCashFlowState>
    ) {
      const {
        discountRate,
        futureInvestmentsForYears,
        netDiscountedCashFlowByDiscountRate,
        netDiscountedCashFlowStatistic,
        netDiscountedCashFlowAdditionalStatistic,
      } = action.payload;
      state.discountRate = discountRate;
      state.futureInvestmentsForYears = futureInvestmentsForYears;
      state.netDiscountedCashFlowByDiscountRate =
        netDiscountedCashFlowByDiscountRate;
      state.netDiscountedCashFlowStatistic = netDiscountedCashFlowStatistic;
      state.netDiscountedCashFlowAdditionalStatistic =
        netDiscountedCashFlowAdditionalStatistic;
    },
    clearNetDiscountedCashFlowData(state) {
      const {
        discountRate,
        futureInvestmentsForYears,
        netDiscountedCashFlowByDiscountRate,
        netDiscountedCashFlowStatistic,
        netDiscountedCashFlowAdditionalStatistic,
      } = initialState;
      state.discountRate = discountRate;
      state.futureInvestmentsForYears = futureInvestmentsForYears;
      state.netDiscountedCashFlowByDiscountRate =
        netDiscountedCashFlowByDiscountRate;
      state.netDiscountedCashFlowStatistic = netDiscountedCashFlowStatistic;
      state.netDiscountedCashFlowAdditionalStatistic =
        netDiscountedCashFlowAdditionalStatistic;
    },
    setNetDiscountedCashFlowStatistic(
      state,
      action: PayloadAction<INetDiscountedCashFlowStatisticItem>
    ) {
      state.netDiscountedCashFlowStatistic = action.payload;
    },
    setNetDiscountedCashFlowAdditionalStatistic(
      state,
      action: PayloadAction<INetDiscountedCashFlowStatisticItem[]>
    ) {
      state.netDiscountedCashFlowAdditionalStatistic = action.payload;
    },
  },
});

export default netDiscountedCashFlowSlice.reducer;
