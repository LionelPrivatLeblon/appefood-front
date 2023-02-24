import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //value: [],
  value: { username: null },
};

export const usersSlice = createSlice({
  name: "users",

  initialState,
  reducers: {
    addUserToStore: (state, action) => {
      //state.value.push(action.payload);
      state.value.username = action.payload;
      console.log(state.value);
    },
  },
});

export const { addUserToStore } = usersSlice.actions;
export default usersSlice.reducer;
