import IExpenses from "../../Types/IExpenses";
import IDepreciationCharges from "../../Types/IDepreciationCharges";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface depreciationChargesCalculationState {
  depreciationPercent: number;
  expensesAmount: IExpenses;
  depreciationCharges: IDepreciationCharges;
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
    setDepreciationDataFromLocalStorage(
      state,
      action: PayloadAction<depreciationChargesCalculationState>
    ) {
      const { depreciationPercent, expensesAmount, depreciationCharges } =
        action.payload;
      state.depreciationPercent = depreciationPercent;
      state.expensesAmount = expensesAmount;
      state.depreciationCharges = depreciationCharges;
    },
  },
});

export default depreciationChargesCalculationSlice.reducer;
