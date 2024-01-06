import { createSlice } from '@reduxjs/toolkit'
import { profile } from '../../repositories/apiRepo';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: [],
        isLoader: true,
        isError: false,
    },
    extraReducers: builder => {
        builder.addCase(profile.pending, (state, action) => {
            state.isLoader = true;
            state.isError = false;
            state.data = null;
        });
        builder.addCase(profile.fulfilled, (state, action) => {
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
        builder.addCase(profile.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
            state.data = null;
        });
    },

});

export default profileSlice.reducer;