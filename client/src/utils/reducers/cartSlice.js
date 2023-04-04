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
        },
        removeFromCart: (state, action) => {
            let newState = state.cart.filter((product) => {
                return product._id !== action.payload._id
            })

            state.cartOpen = newState.length > 0;
            state.cart = newState;
        },
        clearCart: (state) => {
            state.cartOpen = false;
            state.cart = [];
        },
        toggleCart: (state) => {
            state.cartOpen = !state.cartOpen;
        }
    }
});

export const { addToCart, addMultipleToCart, updateCartQuantity, removeFromCart, clearCart, toggleCart } = cartSlice.actions;

export const selectCart = state => state.cart.cart;
export const selectCartOpen = state => state.cart.cartOpen;

export default cartSlice.reducer;