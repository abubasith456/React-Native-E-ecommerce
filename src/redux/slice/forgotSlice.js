import { createSlice } from '@reduxjs/toolkit'
import { forgotPassword } from '../../repositories/apiRepo';

const initialState = {
    data: null,
    isLoader: false,
    isError: false,
}

export const forgotSlice = createSlice({
    name: 'forgot',
    initialState: initialState,
    reducers: {
        resetForgotState: (state) => initialState,
    },
    extraReducers: builder => {
        builder.addCase(forgotPassword.pending, (state, action) => {
            state.isLoader = true;
            state.isError = false;
            state.data = null;
        });
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
            state.isError = false;
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
            state.data = null;
        });
    },

});

export const { resetForgotState } = forgotSlice.actions;
export default forgotSlice.reducer;