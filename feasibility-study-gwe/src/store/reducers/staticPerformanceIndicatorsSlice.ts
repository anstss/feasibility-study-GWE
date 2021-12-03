import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface staticPerformanceIndicatorsState {
  incomeTaxPercent: number;
  totalAnnualCost: number;
  grossProfit: number;
  incomeTax: number;
  netProfit: number;
}

type StaticPerformanceIndicatorsData = {
  totalAnnualCost: number;
  grossProfit: number;
  incomeTax: number;
  netProfit: number;
};

const initialState: staticPerformanceIndicatorsState = {
  incomeTaxPercent: 0,
  totalAnnualCost: 0,
  grossProfit: 0,
  incomeTax: 0,
  netProfit: 0,
};

export const staticPerformanceIndicatorsSlice = createSlice({
  name: "staticPerformanceIndicators",
  initialState,
  reducers: {
    setIncomeTax(state, action: PayloadAction<number>) {
      state.incomeTaxPercent = action.payload;
    },
    clearStaticPerformanceIndicators(state) {
      const { incomeTaxPercent } = initialState;
      state.incomeTaxPercent = incomeTaxPercent;
    },
    setStaticPerformanceIndicatorsData(
      state,
      action: PayloadAction<StaticPerformanceIndicatorsData>
    ) {
      const { totalAnnualCost, grossProfit, incomeTax, netProfit } =
        action.payload;
      state.totalAnnualCost = totalAnnualCost;
      state.grossProfit = grossProfit;
      state.incomeTax = incomeTax;
      state.netProfit = netProfit;
    },
    setStaticPerformanceIndicatorsDataFromLocalStorage(
      state,
      action: PayloadAction<staticPerformanceIndicatorsState>
    ) {
      const {
        incomeTaxPercent,
        totalAnnualCost,
        grossProfit,
        incomeTax,
        netProfit,
      } = action.payload;
      state.incomeTaxPercent = incomeTaxPercent;
      state.totalAnnualCost = totalAnnualCost;
      state.grossProfit = grossProfit;
      state.incomeTax = incomeTax;
      state.netProfit = netProfit;
    },
  },
});

export default staticPerformanceIndicatorsSlice.reducer;
