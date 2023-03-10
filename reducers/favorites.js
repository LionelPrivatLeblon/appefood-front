import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addfavorite: (state, action) => {
      state.value.push(action.payload);
    },
    unfavorite: (state, action) => {
      state.value = state.value.filter(
        (e) => e.recipeId !== action.payload.recipeId
      );
    },
    updateServings: (state, action) => {
      state.value.find((e) => e.id === action.payload.id).servingNb =
        action.payload.servingNb;
    },
  },
});

export const { addfavorite, unfavorite, updateServings } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
