import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import INetDiscountedCashFlowItem from "../../Types/INetDiscountedCashFlowItem";

interface NetDiscountedCashFlowState {
  discountRate: number;
  futureInvestmentsForYears: number[];
  netDiscountedCashFlowByDiscountRate: INetDiscountedCashFlowItem[];
}

const initialState: NetDiscountedCashFlowState = {
  discountRate: 0,
  futureInvestmentsForYears: [],
  netDiscountedCashFlowByDiscountRate: [],
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
      } = action.payload;
      state.discountRate = discountRate;
      state.futureInvestmentsForYears = futureInvestmentsForYears;
      state.netDiscountedCashFlowByDiscountRate =
        netDiscountedCashFlowByDiscountRate;
    },
    clearNetDiscountedCashFlowData(state) {
      const {
        discountRate,
        futureInvestmentsForYears,
        netDiscountedCashFlowByDiscountRate,
      } = initialState;
      state.discountRate = discountRate;
      state.futureInvestmentsForYears = futureInvestmentsForYears;
      state.netDiscountedCashFlowByDiscountRate =
        netDiscountedCashFlowByDiscountRate;
    },
  },
});

export default netDiscountedCashFlowSlice.reducer;
