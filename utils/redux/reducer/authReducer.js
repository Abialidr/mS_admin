import { createSlice } from "@reduxjs/toolkit";
export const auth = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userType: "",
  },
  reducers: {
    setISLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserType: (state, action) => {
      console.log(
        "🚀 ~ file: authReducer.js:14 ~ action.payload:",
        action.payload
      );
      state.userType = action.payload;
    },

    // loginRoute: (state, action) => {
    //   state.loginRoute = action.payload;
    // },
    // location: (state, action) => {
    //   state.location = action.payload;
    // },
    // student: (state, action) => {
    //   state.student = action.payload;
    // },
  },
});

export const { setISLoggedIn, setUserType } = auth.actions;
export const getIsLoggedIn = (state) => state.auth.isLoggedIn;
export const getUserType = (state) => state.auth.userType;

// export const selectLoginRoute = (state) => state.appEssentials.loginRoute;
// export const selectLocation = (state) => state.appEssentials.location;
// export const selectStudent = (state) => state.appEssentials.student;
export default auth.reducer;
