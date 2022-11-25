import { createSlice } from "@reduxjs/toolkit";

export const signupSlice = createSlice({
    name: "signup",
    initialState: {
        signupData: [],
    },
    reducers: {
        storeSignupData: (state, action) => {
            console.log(action);
            state.signupData = [...state.signupData, action.payload];
            console.log(state.signupData);
        },
    },
});

export const { storeSignupData } = signupSlice.actions;
export const selectSignupData = (state) => state.signup.signupData;

export default signupSlice.reducer;
