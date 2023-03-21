import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        cartOpen: false,
    },
    reducers: {
        
    }
})

export default cartSlice.reducer;