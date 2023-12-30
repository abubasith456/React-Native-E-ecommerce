import { createSlice } from '@reduxjs/toolkit'
import { home } from '../../repositories/apiRepo';


const initialState = {
    data: {
        success: false,
        products: []
    },
    isLoader: false,
    isError: false,
}

const homeSlice = createSlice({
    name: 'home',
    initialState: initialState,
    extraReducers: builder => {
        builder.addCase(home.pending, (state, action) => {
            state.isLoader = true;
            state.isError = false;
            state.data = { success: false };
        });
        builder.addCase(home.fulfilled, (state, action) => {
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
        builder.addCase(home.rejected, (state, action) => {
            console.log("rejhect ==> " + action.payload)
            state.isLoader = false;
            state.isError = true;
            state.data = null;
        });
    },

});

export default homeSlice.reducer;