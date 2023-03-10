import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //value: [],
  value: { token: null, username: null, photos: [] },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUserToStore: (state, action) => {
      //state.value.push(action.payload);
      state.value.username = action.payload;
    },
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
    },
    addPhoto: (state, action) => {
      state.value.photos.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.value.photos = state.value.photos.filter(
        (data) => data !== action.payload
      );
    },
  },
});

export const { addUserToStore, login, logout, addPhoto, removePhoto } =
  usersSlice.actions;
export default usersSlice.reducer;
