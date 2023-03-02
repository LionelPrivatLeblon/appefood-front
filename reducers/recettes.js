import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const recettesSlice = createSlice({
  name: "dataRecettes",
  initialState,
  reducers: {
    dataRecette: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { dataRecette } = recettesSlice.actions;
export default recettesSlice.reducer;