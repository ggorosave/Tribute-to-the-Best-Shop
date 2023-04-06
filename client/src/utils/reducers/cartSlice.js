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
            state.cart = [...action.payload];
        },
        updateCartQuantity: {
            reducer(state, action) {
                state.cartOpen = true;
                let newState = state.cart.map((product) => {
                    if (action.payload._id === product._id) {
                        // REFACTOR?
                        product.purchaseQuantity = action.payload.purchaseQuantity;
                    }
                    return product;
                });

                state.cart = [...newState];
            },
            prepare(_id, purchaseQuantity) {
                return {
                    payload: {
                        _id,
                        purchaseQuantity
                    }
                }
            },
        },
        removeFromCart: (state, action) => {
            let newState = state.cart.filter((product) => {
                return product._id !== action.payload
            })

            state.cartOpen = newState.length > 0;
            state.cart = [...newState];
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