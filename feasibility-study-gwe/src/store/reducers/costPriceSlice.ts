import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface costPriceState {
  costPrice: number;
  rentRateGWUse: number;
  coefficientRentRateGWUse: number;
  rentRateSubsoilUse: number;
  basicSalary: number;
  conditionalFixedCosts: number;
  electricityCosts: number;
  materialsAndSpareParts: number;
  maintenance: number;
  laboratoryWorks: number;
  otherExpenses: number;
  rentGWUse: number;
  rentSubsoilUse: number;
  variableCosts: number;
  operatingCosts: number;
  operatingCostsPerOnePW: number;
  costPerOneSW: number;
}

const initialState: costPriceState = {
  costPrice: 0,
  rentRateGWUse: 0,
  coefficientRentRateGWUse: 0,
  rentRateSubsoilUse: 0,
  basicSalary: 0,
  conditionalFixedCosts: 0,
  electricityCosts: 0,
  materialsAndSpareParts: 0,
  maintenance: 0,
  laboratoryWorks: 0,
  otherExpenses: 0,
  rentGWUse: 0,
  rentSubsoilUse: 0,
  variableCosts: 0,
  operatingCosts: 0,
  operatingCostsPerOnePW: 0,
  costPerOneSW: 0,
};

export const costPriceSlice = createSlice({
  name: "costPrice",
  initialState,
  reducers: {
    setCostPriceData(state, action: PayloadAction<costPriceState>) {
      const {
        costPrice,
        rentRateGWUse,
        coefficientRentRateGWUse,
        rentRateSubsoilUse,
        basicSalary,
        conditionalFixedCosts,
        electricityCosts,
        materialsAndSpareParts,
        maintenance,
        laboratoryWorks,
        otherExpenses,
        rentGWUse,
        rentSubsoilUse,
        variableCosts,
        operatingCosts,
        operatingCostsPerOnePW,
        costPerOneSW,
      } = action.payload;
      state.costPrice = costPrice;
      state.rentRateGWUse = rentRateGWUse;
      state.coefficientRentRateGWUse = coefficientRentRateGWUse;
      state.rentRateSubsoilUse = rentRateSubsoilUse;
      state.basicSalary = basicSalary;
      state.conditionalFixedCosts = conditionalFixedCosts;
      state.electricityCosts = electricityCosts;
      state.materialsAndSpareParts = materialsAndSpareParts;
      state.maintenance = maintenance;
      state.laboratoryWorks = laboratoryWorks;
      state.otherExpenses = otherExpenses;
      state.rentGWUse = rentGWUse;
      state.rentSubsoilUse = rentSubsoilUse;
      state.variableCosts = variableCosts;
      state.operatingCosts = operatingCosts;
      state.operatingCostsPerOnePW = operatingCostsPerOnePW;
      state.costPerOneSW = costPerOneSW;
    },
    clearCostPriceData(state) {
      const {
        costPrice,
        rentRateGWUse,
        coefficientRentRateGWUse,
        rentRateSubsoilUse,
        basicSalary,
        conditionalFixedCosts,
        electricityCosts,
        materialsAndSpareParts,
        maintenance,
        laboratoryWorks,
        otherExpenses,
        rentGWUse,
        rentSubsoilUse,
        variableCosts,
        operatingCosts,
        operatingCostsPerOnePW,
        costPerOneSW,
      } = initialState;
      state.costPrice = costPrice;
      state.rentRateGWUse = rentRateGWUse;
      state.coefficientRentRateGWUse = coefficientRentRateGWUse;
      state.rentRateSubsoilUse = rentRateSubsoilUse;
      state.basicSalary = basicSalary;
      state.conditionalFixedCosts = conditionalFixedCosts;
      state.electricityCosts = electricityCosts;
      state.materialsAndSpareParts = materialsAndSpareParts;
      state.maintenance = maintenance;
      state.laboratoryWorks = laboratoryWorks;
      state.otherExpenses = otherExpenses;
      state.rentGWUse = rentGWUse;
      state.rentSubsoilUse = rentSubsoilUse;
      state.variableCosts = variableCosts;
      state.operatingCosts = operatingCosts;
      state.operatingCostsPerOnePW = operatingCostsPerOnePW;
      state.costPerOneSW = costPerOneSW;
    },
  },
});

export default costPriceSlice.reducer;
