import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        currentCategory: ''
    },
    reducers: {
        updateCategories: (state, action) => {
            state.categories.push(action.payload);
        },
        updateCurrentCategory: (state, action) => {
            state.currentCategory = action.payload;
        }
    }
});

export const { updateCategories, updateCurrentCategory } = categorySlice.actions;

export default categorySlice.reducer;