import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        cartCount: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            state.cartCount += 1;
            state.cart.push(action.payload);
        },
        addMultipleToCart: (state, action) => {
            let newState = [...action.payload];

            const updatedCount = newState.reduce((total, item) => {
                return total + item.purchaseQuantity;
            }, 0);

            state.cart = [...newState];
            state.cartCount = updatedCount;
        },
        updateCartQuantity: {
            reducer(state, action) {
                let newState = state.cart.map((product) => {
                    if (action.payload._id === product._id) {
                        // REFACTOR?
                        product.purchaseQuantity = action.payload.purchaseQuantity;
                    }
                    return product;
                });

                const updatedCount = newState.reduce((total, item) => {
                    return total + item.purchaseQuantity;
                }, 0)

                state.cart = [...newState];
                state.cartCount = updatedCount;
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

            const updatedCount = newState.reduce((total, item) => {
                return total + item.purchaseQuantity;
            }, 0);

            state.cart = [...newState];
            state.cartCount = updatedCount;
        },
        clearCart: (state) => {
            state.cartCount = 0;
            state.cart = [];
        },
    }
});

export const { addToCart, addMultipleToCart, updateCartQuantity, removeFromCart, clearCart, toggleCart } = cartSlice.actions;

export const selectCart = state => state.cart.cart;
export const selectCartCount = state => state.cart.cartCount;

export default cartSlice.reducer;