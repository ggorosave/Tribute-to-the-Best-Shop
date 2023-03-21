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
        addMultipleToCart: (state, action) => {
            state.cart = [...state.cart, ...action.payload];
        },
        updateCartQuantity: (state, action) => {
            state.cartOpen = true;
            state.cart.map((product) => {
                if (action.payload._id === product._id) {
                    // REFACTOR?
                    product.purchaseQuantity = action.payload.product.purchaseQuantity;
                }
                return product;
            });
        }
    }
})

export default cartSlice.reducer;