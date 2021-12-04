import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface staticPerformanceIndicatorsState {
  incomeTaxPercent: number;
  totalAnnualCost: number;
  grossProfit: number;
  incomeTax: number;
  netProfit: number;
  workingCapital: number;
  productionAssets: number;
  profitabilityCostPriceGrossProfit: number;
  profitabilityCostPriceNetProfit: number;
  profitabilityProductionAssetsGrossProfit: number;
  profitabilityProductionAssetsNetProfit: number;
}

type StaticPerformanceIndicatorsData = {
  totalAnnualCost: number;
  grossProfit: number;
  incomeTax: number;
  netProfit: number;
  workingCapital: number;
  productionAssets: number;
  profitabilityCostPriceGrossProfit: number;
  profitabilityCostPriceNetProfit: number;
  profitabilityProductionAssetsGrossProfit: number;
  profitabilityProductionAssetsNetProfit: number;
};

const initialState: staticPerformanceIndicatorsState = {
  incomeTaxPercent: 0,
  totalAnnualCost: 0,
  grossProfit: 0,
  incomeTax: 0,
  netProfit: 0,
  workingCapital: 0,
  productionAssets: 0,
  profitabilityCostPriceGrossProfit: 0,
  profitabilityCostPriceNetProfit: 0,
  profitabilityProductionAssetsGrossProfit: 0,
  profitabilityProductionAssetsNetProfit: 0,
};

export const staticPerformanceIndicatorsSlice = createSlice({
  name: "staticPerformanceIndicators",
  initialState,
  reducers: {
    setIncomeTax(state, action: PayloadAction<number>) {
      state.incomeTaxPercent = action.payload;
    },
    clearStaticPerformanceIndicators(state) {
      const {
        incomeTaxPercent,
        totalAnnualCost,
        grossProfit,
        incomeTax,
        netProfit,
        workingCapital,
        productionAssets,
        profitabilityCostPriceGrossProfit,
        profitabilityCostPriceNetProfit,
        profitabilityProductionAssetsGrossProfit,
        profitabilityProductionAssetsNetProfit,
      } = initialState;
      state.incomeTaxPercent = incomeTaxPercent;
      state.totalAnnualCost = totalAnnualCost;
      state.grossProfit = grossProfit;
      state.incomeTax = incomeTax;
      state.netProfit = netProfit;
      state.workingCapital = workingCapital;
      state.productionAssets = productionAssets;
      state.profitabilityCostPriceGrossProfit =
        profitabilityCostPriceGrossProfit;
      state.profitabilityCostPriceNetProfit = profitabilityCostPriceNetProfit;
      state.profitabilityProductionAssetsGrossProfit =
        profitabilityProductionAssetsGrossProfit;
      state.profitabilityProductionAssetsNetProfit =
        profitabilityProductionAssetsNetProfit;
    },
    setStaticPerformanceIndicatorsData(
      state,
      action: PayloadAction<StaticPerformanceIndicatorsData>
    ) {
      const {
        totalAnnualCost,
        grossProfit,
        incomeTax,
        netProfit,
        workingCapital,
        productionAssets,
        profitabilityCostPriceGrossProfit,
        profitabilityCostPriceNetProfit,
        profitabilityProductionAssetsGrossProfit,
        profitabilityProductionAssetsNetProfit,
      } = action.payload;
      state.totalAnnualCost = totalAnnualCost;
      state.grossProfit = grossProfit;
      state.incomeTax = incomeTax;
      state.netProfit = netProfit;
      state.workingCapital = workingCapital;
      state.productionAssets = productionAssets;
      state.profitabilityCostPriceGrossProfit =
        profitabilityCostPriceGrossProfit;
      state.profitabilityCostPriceNetProfit = profitabilityCostPriceNetProfit;
      state.profitabilityProductionAssetsGrossProfit =
        profitabilityProductionAssetsGrossProfit;
      state.profitabilityProductionAssetsNetProfit =
        profitabilityProductionAssetsNetProfit;
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
        workingCapital,
        productionAssets,
        profitabilityCostPriceGrossProfit,
        profitabilityCostPriceNetProfit,
        profitabilityProductionAssetsGrossProfit,
        profitabilityProductionAssetsNetProfit,
      } = action.payload;
      state.incomeTaxPercent = incomeTaxPercent;
      state.totalAnnualCost = totalAnnualCost;
      state.grossProfit = grossProfit;
      state.incomeTax = incomeTax;
      state.netProfit = netProfit;
      state.workingCapital = workingCapital;
      state.productionAssets = productionAssets;
      state.profitabilityCostPriceGrossProfit =
        profitabilityCostPriceGrossProfit;
      state.profitabilityCostPriceNetProfit = profitabilityCostPriceNetProfit;
      state.profitabilityProductionAssetsGrossProfit =
        profitabilityProductionAssetsGrossProfit;
      state.profitabilityProductionAssetsNetProfit =
        profitabilityProductionAssetsNetProfit;
    },
  },
});

export default staticPerformanceIndicatorsSlice.reducer;
