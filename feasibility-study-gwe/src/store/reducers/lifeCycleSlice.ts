import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LifeCycleState {
  discountedPaybackPeriod: number;
  profitabilityIndex: number;
}

const initialState: LifeCycleState = {
  discountedPaybackPeriod: 0,
  profitabilityIndex: 0,
};

export const lifeCycleSlice = createSlice({
  name: "lifeCycle",
  initialState,
  reducers: {
    setLifeCycleData(state, action: PayloadAction<LifeCycleState>) {
      const { discountedPaybackPeriod, profitabilityIndex } = action.payload;
      state.discountedPaybackPeriod = discountedPaybackPeriod;
      state.profitabilityIndex = profitabilityIndex;
    },
  },
});

export default lifeCycleSlice.reducer;
