import { createSlice } from '@reduxjs/toolkit'
import { verifyOtp } from '../../repositories/apiRepo';

const otpVerify = createSlice({
    name: 'otpVerify',
    initialState: {
        data: null,
        isLoader: false,
        isError: false,
    },
    extraReducers: builder => {
        builder.addCase(verifyOtp.pending, (state, action) => {
            state.isLoader = true;
            state.isError = false;
            state.data = null;
        });
        builder.addCase(verifyOtp.fulfilled, (state, action) => {
            console.log("Called")
            if (action.payload.status == 200) {
                state.isLoader = false;
                state.data = action.payload;
                state.isError = false;
            } else {
                state.isLoader = false;
                state.isError = true;
                state.data = action.payload;;
            }
        });
        builder.addCase(verifyOtp.rejected, (state, action) => {
            console.log("rejhect ==> " + action.payload)
            state.isLoader = false;
            state.isError = true;
            state.data = null;
        });
    },

});

export default otpVerify.reducer;