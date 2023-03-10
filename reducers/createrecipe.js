import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //value: [],
  value: { title: null },
};

export const recipesSlice = createSlice({
  name: "recipe",

  initialState,
  reducers: {
    addRecipeToStore: (state, action) => {
      //state.value.push(action.payload);
      state.value.title = action.payload;
    },
  },
});

export const { addRecipeToStore } = recipesSlice.actions;
export default recipesSlice.reducer;
