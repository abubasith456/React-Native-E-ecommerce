import { createSlice } from '@reduxjs/toolkit'
import { getBanners } from '../../repositories/apiRepo';

const initialState = {
    data: {
        products: []
    },
    isLoader: false,
    isError: false,
}

export const bannerlice = createSlice({
    name: 'banner',
    initialState: initialState,
    reducers: {
        bannerState: (state) => initialState,
    },
    extraReducers: builder => {
        builder.addCase(getBanners.pending, (state, action) => {
            state.isLoader = true;
            state.isError = false;
            state.data = null;
        });
        builder.addCase(getBanners.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
            state.isError = false;
        });
        builder.addCase(getBanners.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
            state.data = null;
        });
    },

});

export const { bannerState } = bannerlice.actions;
export default bannerlice.reducer;