import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MinCostEffectivePowerState {
  specificVariableCosts: number;
  minimumCostEffectivePower: number;
  economicSafetyCoefficient: number;
  economicSecurityFrontier: number;
  safetyZoneFactor: number;
}

const initialState: MinCostEffectivePowerState = {
  specificVariableCosts: 0,
  minimumCostEffectivePower: 0,
  economicSafetyCoefficient: 0,
  economicSecurityFrontier: 0,
  safetyZoneFactor: 0,
};

export const minCostEffectivePowerSlice = createSlice({
  name: "minCostEffectivePower",
  initialState,
  reducers: {
    setMinCostEffectivePowerData(
      state,
      action: PayloadAction<MinCostEffectivePowerState>
    ) {
      const {
        specificVariableCosts,
        minimumCostEffectivePower,
        economicSafetyCoefficient,
        economicSecurityFrontier,
        safetyZoneFactor,
      } = action.payload;
      state.specificVariableCosts = specificVariableCosts;
      state.minimumCostEffectivePower = minimumCostEffectivePower;
      state.economicSafetyCoefficient = economicSafetyCoefficient;
      state.economicSecurityFrontier = economicSecurityFrontier;
      state.safetyZoneFactor = safetyZoneFactor;
    },
  },
});

export default minCostEffectivePowerSlice.reducer;
