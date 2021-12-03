import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface costPriceState {
  costPrice: number;
  rentRateGWUse: number;
  coefficientRentRateGWUse: number;
  rentRateSubsoilUse: number;
}

const initialState: costPriceState = {
  costPrice: 0,
  rentRateGWUse: 0,
  coefficientRentRateGWUse: 0,
  rentRateSubsoilUse: 0,
};

export const costPriceSlice = createSlice({
  name: "costPrice",
  initialState,
  reducers: {
    setCostPriceData(state, action: PayloadAction<costPriceState>) {
      const {
        costPrice,
        rentRateGWUse,
        coefficientRentRateGWUse,
        rentRateSubsoilUse,
      } = action.payload;
      state.costPrice = costPrice;
      state.rentRateGWUse = rentRateGWUse;
      state.coefficientRentRateGWUse = coefficientRentRateGWUse;
      state.rentRateSubsoilUse = rentRateSubsoilUse;
    },
    clearCostPriceData(state) {
      const {
        costPrice,
        rentRateGWUse,
        coefficientRentRateGWUse,
        rentRateSubsoilUse,
      } = initialState;
      state.costPrice = costPrice;
      state.rentRateGWUse = rentRateGWUse;
      state.coefficientRentRateGWUse = coefficientRentRateGWUse;
      state.rentRateSubsoilUse = rentRateSubsoilUse;
    },
  },
});

export default costPriceSlice.reducer;
