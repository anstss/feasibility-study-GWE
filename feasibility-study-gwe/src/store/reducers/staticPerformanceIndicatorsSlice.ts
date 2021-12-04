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
  paybackPeriod: number;
  subsoilOwnerIncome: number;
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
  paybackPeriod: number;
  subsoilOwnerIncome: number;
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
  paybackPeriod: 0,
  subsoilOwnerIncome: 0,
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
        paybackPeriod,
        subsoilOwnerIncome,
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
      state.paybackPeriod = paybackPeriod;
      state.subsoilOwnerIncome = subsoilOwnerIncome;
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
        paybackPeriod,
        subsoilOwnerIncome,
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
      state.paybackPeriod = paybackPeriod;
      state.subsoilOwnerIncome = subsoilOwnerIncome;
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
        paybackPeriod,
        subsoilOwnerIncome,
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
      state.paybackPeriod = paybackPeriod;
      state.subsoilOwnerIncome = subsoilOwnerIncome;
    },
  },
});

export default staticPerformanceIndicatorsSlice.reducer;
