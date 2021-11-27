import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface feasibilityStudyState {
  annualWaterWithdrawalData: number[];
}

const initialState: feasibilityStudyState = {
  annualWaterWithdrawalData: [],
};

const feasibilityStudySlice = createSlice({
  name: "feasibilityStudy",
  initialState,
  reducers: {
    setAnnualWaterWithdrawalData(state, action: PayloadAction<number[]>) {
      state.annualWaterWithdrawalData = action.payload;
    },
  },
});

export default feasibilityStudySlice.reducer;
