import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InternalRateOfReturnState {
  internalRateOfReturnAnalyticalMethod: number;
  internalRateOfReturnGraphicalMethod: number;
}

const initialState: InternalRateOfReturnState = {
  internalRateOfReturnAnalyticalMethod: 0,
  internalRateOfReturnGraphicalMethod: 0,
};

export const internalRateOfReturnSlice = createSlice({
  name: "internalRateOfReturn",
  initialState,
  reducers: {
    setInternalRateOfReturnData(
      state,
      action: PayloadAction<InternalRateOfReturnState>
    ) {
      const {
        internalRateOfReturnAnalyticalMethod,
        internalRateOfReturnGraphicalMethod,
      } = action.payload;
      state.internalRateOfReturnAnalyticalMethod =
        internalRateOfReturnAnalyticalMethod;
      state.internalRateOfReturnGraphicalMethod =
        internalRateOfReturnGraphicalMethod;
    },
  },
});

export default internalRateOfReturnSlice.reducer;
