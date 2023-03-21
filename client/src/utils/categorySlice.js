import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        currentCategory: ''
    },
    reducers: {
        updateCategories(state, action) {
            state.categories.push(action.payload);
        },
    }
});

export default categorySlice.reducer;