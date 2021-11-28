import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IStatistic from "../../Types/IStatistic";

interface feasibilityStudyState {
  annualWaterWithdrawalData: number[];
  statistic: IStatistic;
}

const initialState: feasibilityStudyState = {
  annualWaterWithdrawalData: [],
  statistic: {
    totalForPreviousYears: 0,
    averageForPreviousYears: 0,
    totalForLastTenYears: 0,
    averageForLastTenYears: 0,
  },
};

export const feasibilityStudySlice = createSlice({
  name: "feasibilityStudy",
  initialState,
  reducers: {
    setAnnualWaterWithdrawalData(state, action: PayloadAction<number[]>) {
      state.annualWaterWithdrawalData = action.payload;
    },
    setStatistic(state, action: PayloadAction<IStatistic>) {
      state.statistic = action.payload;
    },
    setDataFromLocalStorage(
      state,
      action: PayloadAction<feasibilityStudyState>
    ) {
      const { annualWaterWithdrawalData, statistic } = action.payload;
      state.annualWaterWithdrawalData = annualWaterWithdrawalData;
      state.statistic = statistic;
    },
  },
});

export default feasibilityStudySlice.reducer;
