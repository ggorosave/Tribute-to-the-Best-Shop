import { configureStore }from '@reduxjs/toolkit';

import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import categoryReducer from './categorySlice';

export default configureStore({
    reducer: {
        // Pass in all reducers here --> name: nameReducer
        products: productsReducer,
        cart: cartReducer,
        category: categoryReducer
    }
})