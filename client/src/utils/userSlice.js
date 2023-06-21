import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    id: "",
  },
  reducers: {
    setUser: (state, actions) => {
      state.username = actions.payload.username;
      state.id = actions.payload.id;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
