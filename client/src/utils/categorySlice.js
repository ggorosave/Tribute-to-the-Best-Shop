import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        currentCategory: ''
    },
});

export default categorySlice.reducer;