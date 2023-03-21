import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        cartOpen: false,
    },
    reducers: {
        addToCart: (state, action) => {
            state.cartOpen = true;
            state.cart.push(action.payload);
        },
        
    }
})

export default cartSlice.reducer;