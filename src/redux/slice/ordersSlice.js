import { createSlice } from '@reduxjs/toolkit'
import { orders } from '../../repositories/apiRepo';

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        data: [],
        isLoader: true,
        isError: false,
    },
    extraReducers: builder => {
        builder.addCase(orders.pending, (state, action) => {
            state.isLoader = true;
            state.isError = false;
            state.data = null;
        });
        builder.addCase(orders.fulfilled, (state, action) => {
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
        builder.addCase(orders.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
            state.data = null;
        });
    },

});

export default ordersSlice.reducer;