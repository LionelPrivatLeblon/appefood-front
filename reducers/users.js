import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //value: [],
  value: { token: null, username: null },
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
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload;
      console.log("test ".state.value);
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
    },
  },
});

export const { addUserToStore } = usersSlice.actions;
export default usersSlice.reducer;
