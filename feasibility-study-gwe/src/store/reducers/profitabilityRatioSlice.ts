import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfitabilityRatioState {
  profitabilityRatio: number;
}

const initialState: ProfitabilityRatioState = {
  profitabilityRatio: 0,
};

export const profitabilityRatioSlice = createSlice({
  name: "profitabilityRatio",
  initialState,
  reducers: {
    setProfitabilityRatioData(
      state,
      action: PayloadAction<ProfitabilityRatioState>
    ) {
      const { profitabilityRatio } = action.payload;
      state.profitabilityRatio = profitabilityRatio;
    },
  },
});

export default profitabilityRatioSlice.reducer;
