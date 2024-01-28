import { createAction, createSlice } from '@reduxjs/toolkit'
import { placeOrder } from '../../repositories/apiRepo';

export const resetPlaceOrderState = createAction('resetPlaceOrderState');

const placeOrderSlice = createSlice({
    name: 'placeOrder',
    initialState: {
        data: null,
        isLoader: false,
        isError: false,
    },
    extraReducers: builder => {
        builder.addCase(placeOrder.pending, (state, action) => {
            state.isLoader = true;
            state.isError = false;
            state.data = null;
        });
        builder.addCase(placeOrder.fulfilled, (state, action) => {
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
        builder.addCase(placeOrder.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
            state.data = {
                message: "Something went wrong!"
            };
        });
        builder.addCase(resetPlaceOrderState,(state, action) => {
            return {
                data: null,
                isLoader: false,
                isError: false,
            };
        });
    },

});

export default placeOrderSlice.reducer;