import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
  },
  reducers: {
    currentUser(state, action) {
      state.id = action.payload;
    },
  },
});

export const { currentUser } = userSlice.actions;

export default userSlice.reducer;
