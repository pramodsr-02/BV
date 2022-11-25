import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      userData: {}
    },
    darkmode: "dark"
    // tabval: 2,
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      console.log("inside login");
    },
    logout: (state) => {
      console.log("inside logout");
      state.user = null;
    },
    updateData: (state, action) => {
      state.user.userData = { ...state.user.userData, ...action.payload };

      // state.user = { ...state.user, ...action.payload };
    },
    upDatePrivacy: (state, action) => {
      state.user.userData = { ...state.user.userData, ...action.payload };
    },

    // tabstate: (state, action) => {
    //     console.log(action.payload);
    //     state.tabval = action.payload;
    // },
    handleDarkMode: (state) => {
      console.log(state.darkmode == "dark");
      state.darkmode = state.darkmode == "dark" ? "light" : "dark";
      console.log(state.darkmode);
      // state.darkmode = !state.darkMode;
    }
  }
});

export const {
  login,
  logout,
  handleDarkMode,
  tabstate,
  updateData
} = userSlice.actions;
export const selectUser = (state) => state.user.user;
// export const tabval = (state) => state.user.tabval;
export const darkmode = (state) => state.user.darkmode;

export default userSlice.reducer;
