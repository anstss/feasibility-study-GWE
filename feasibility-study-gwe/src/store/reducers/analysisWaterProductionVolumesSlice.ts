import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IStatistic from "../../Types/IStatistic";

interface analysisWaterProductionVolumesState {
  annualWaterWithdrawalData: number[];
  statistic: IStatistic;
  limitedProductionVolumes: number;
  waterLossVolume: number;
  projectedWaterProduction: number;
}

const initialState: analysisWaterProductionVolumesState = {
  annualWaterWithdrawalData: [],
  statistic: {
    totalForPreviousYears: 0,
    averageForPreviousYears: 0,
    totalForLastTenYears: 0,
    averageForLastTenYears: 0,
    maxForLastTenOrLessYears: 0,
    maxForLastTenOrLessYearsPercent: 0,
    averageForLastTenOrLessYearsPercent: 0,
    waterLossVolumePercent: 0,
    averageAnnualProjectedWaterProduction: 0,
    averageAnnualProjectedWaterProductionWithLosses: 0,
  },
  limitedProductionVolumes: 0,
  waterLossVolume: 0,
  projectedWaterProduction: 0,
};

export const analysisWaterProductionVolumesSlice = createSlice({
  name: "analysisWaterProductionVolumes ",
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
      action: PayloadAction<analysisWaterProductionVolumesState>
    ) {
      const {
        annualWaterWithdrawalData,
        statistic,
        limitedProductionVolumes,
        waterLossVolume,
        projectedWaterProduction,
      } = action.payload;
      state.annualWaterWithdrawalData = annualWaterWithdrawalData;
      state.statistic = statistic;
      state.limitedProductionVolumes = limitedProductionVolumes;
      state.waterLossVolume = waterLossVolume;
      state.projectedWaterProduction = projectedWaterProduction;
    },
    clearData(state) {
      const { annualWaterWithdrawalData, statistic } = initialState;
      state.annualWaterWithdrawalData = annualWaterWithdrawalData;
      state.statistic = statistic;
    },
    setLimitedProductionVolumes(state, action: PayloadAction<number>) {
      state.limitedProductionVolumes = action.payload;
    },
    setWaterLossVolume(state, action: PayloadAction<number>) {
      state.waterLossVolume = action.payload;
    },
    setProjectedWaterProduction(state, action: PayloadAction<number>) {
      state.projectedWaterProduction = action.payload;
    },
  },
});

export default analysisWaterProductionVolumesSlice.reducer;
