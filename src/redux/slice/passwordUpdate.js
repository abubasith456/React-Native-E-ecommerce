import { createSlice } from '@reduxjs/toolkit'
import { changePassword } from '../../repositories/apiRepo';

const updatePassword = createSlice({
    name: 'passwordUpdate',
    initialState: {
        data: null,
        isLoader: false,
        isError: false,
    },
    extraReducers: builder => {
        builder.addCase(changePassword.pending, (state, action) => {
            state.isLoader = true;
            state.isError = false;
            state.data = null;
        });
        builder.addCase(changePassword.fulfilled, (state, action) => {
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
        builder.addCase(changePassword.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
            state.data = null;
        });
    },

});

export default updatePassword.reducer;