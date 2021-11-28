import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IStatistic from "../../Types/IStatistic";

interface feasibilityStudyState {
  annualWaterWithdrawalData: number[];
  statistic: IStatistic;
  limitedProductionVolumes: number;
}

const initialState: feasibilityStudyState = {
  annualWaterWithdrawalData: [],
  statistic: {
    totalForPreviousYears: 0,
    averageForPreviousYears: 0,
    totalForLastTenYears: 0,
    averageForLastTenYears: 0,
    maxForLastTenOrLessYears: 0,
    maxForLastTenOrLessYearsPercent: 0,
    averageForLastTenOrLessYearsPercent: 0,
  },
  limitedProductionVolumes: 0,
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
      const { annualWaterWithdrawalData, statistic, limitedProductionVolumes } =
        action.payload;
      state.annualWaterWithdrawalData = annualWaterWithdrawalData;
      state.statistic = statistic;
      state.limitedProductionVolumes = limitedProductionVolumes;
    },
    clearData(state) {
      const { annualWaterWithdrawalData, statistic } = initialState;
      state.annualWaterWithdrawalData = annualWaterWithdrawalData;
      state.statistic = statistic;
    },
    setLimitedProductionVolumes(state, action: PayloadAction<number>) {
      state.limitedProductionVolumes = action.payload;
    },
  },
});

export default feasibilityStudySlice.reducer;
