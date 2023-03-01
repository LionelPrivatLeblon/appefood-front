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
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      console.log(state.value);
    },
  },
});

export const { addUserToStore, login, logout } = usersSlice.actions;
export default usersSlice.reducer;
