import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: []
    },
    reducers: {
        updateProducts: (state, action) => {
            state.list = [...action.payload]
        },

    }
});

export const { updateProducts } = productsSlice.actions;

export default productsSlice.reducer;