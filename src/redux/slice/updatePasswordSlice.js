import { createSlice } from '@reduxjs/toolkit'
import { updatePassword } from '../../repositories/apiRepo';

const initialState = {
    data: null,
    isLoader: false,
    isError: false,
}

const updatePasswordSlice = createSlice({
    name: 'updatePassword',
    initialState: initialState,
    reducers: {
        resetState: (state) => initialState,
    },
    extraReducers: builder => {
        builder.addCase(updatePassword.pending, (state, action) => {
            state.isLoader = true;
            state.isError = false;
            state.data = null;
        });
        builder.addCase(updatePassword.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
            state.isError = false;
        });
        builder.addCase(updatePassword.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
            state.data = null;
        });
    },

});
export const { resetState } = updatePasswordSlice.actions;
export default updatePasswordSlice.reducer;