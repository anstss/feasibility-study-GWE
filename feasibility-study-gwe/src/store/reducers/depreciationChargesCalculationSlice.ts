import IExpenses from "../../Types/IExpenses";
import IDepreciationCharges from "../../Types/IDepreciationCharges";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface depreciationChargesCalculationState {
  depreciationPercent: number;
  expensesAmount: IExpenses;
  depreciationCharges: IDepreciationCharges;
  fixedAssets: number;
  fixedAssetsCharges: number;
  investments: number;
  investmentsCharges: number;
}

const initialState: depreciationChargesCalculationState = {
  depreciationPercent: 0,
  expensesAmount: {
    specialPermission: 0,
    fieldsExploration: 0,
    geologicalInformation: 0,
    stateExamination: 0,
  },
  depreciationCharges: {
    specialPermissionDepreciationCharges: 0,
    fieldsExplorationDepreciationCharges: 0,
    geologicalInformationDepreciationCharges: 0,
    stateExaminationDepreciationCharges: 0,
  },
  fixedAssets: 0,
  fixedAssetsCharges: 0,
  investments: 0,
  investmentsCharges: 0,
};

export const depreciationChargesCalculationSlice = createSlice({
  name: "depreciationChargesCalculation",
  initialState,
  reducers: {
    setDepreciationPercent(state, action: PayloadAction<number>) {
      state.depreciationPercent = action.payload;
    },
    setExpensesAmount(state, action: PayloadAction<IExpenses>) {
      state.expensesAmount = action.payload;
    },
    setDepreciationCharges(state, action: PayloadAction<IDepreciationCharges>) {
      state.depreciationCharges = action.payload;
    },
    setFixedAssetsAndCharges(
      state,
      action: PayloadAction<{ fixedAssets: number; fixedAssetsCharges: number }>
    ) {
      const { fixedAssets, fixedAssetsCharges } = action.payload;
      state.fixedAssets = fixedAssets;
      state.fixedAssetsCharges = fixedAssetsCharges;
    },
    setInvestmentsAndCharges(
      state,
      action: PayloadAction<{ investments: number; investmentsCharges: number }>
    ) {
      const { investments, investmentsCharges } = action.payload;
      state.investments = investments;
      state.investmentsCharges = investmentsCharges;
    },
    setDepreciationDataFromLocalStorage(
      state,
      action: PayloadAction<depreciationChargesCalculationState>
    ) {
      const {
        depreciationPercent,
        expensesAmount,
        depreciationCharges,
        fixedAssets,
        fixedAssetsCharges,
        investments,
        investmentsCharges,
      } = action.payload;
      state.depreciationPercent = depreciationPercent;
      state.expensesAmount = expensesAmount;
      state.depreciationCharges = depreciationCharges;
      state.fixedAssets = fixedAssets;
      state.fixedAssetsCharges = fixedAssetsCharges;
      state.investments = investments;
      state.investmentsCharges = investmentsCharges;
    },
    clearDataDepreciation(state) {
      const {
        depreciationPercent,
        expensesAmount,
        depreciationCharges,
        fixedAssets,
        fixedAssetsCharges,
        investments,
        investmentsCharges,
      } = initialState;
      state.depreciationPercent = depreciationPercent;
      state.expensesAmount = expensesAmount;
      state.depreciationCharges = depreciationCharges;
      state.fixedAssets = fixedAssets;
      state.fixedAssetsCharges = fixedAssetsCharges;
      state.investments = investments;
      state.investmentsCharges = investmentsCharges;
    },
  },
});

export default depreciationChargesCalculationSlice.reducer;
