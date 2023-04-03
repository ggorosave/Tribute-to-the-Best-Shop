import { useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, toggleCart, addMultipleToCart } from "../../utils/reducers/cartSlice";
import { idbPromise } from '../../utils/helpers';
import { Box } from "@chakra-ui/react";

import Auth from "../../utils/auth";

// import CartItem
// import reducers from store

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
    
    const dispatch = useDispatch();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
    // Grabs cart from state using a selector (Redux)
    const cart = useSelector(selectCart)

    // Stripe Checkout
    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
              res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data])

    // If there's nothing in the cart, useEffect will call the getCart function to look in IndexDB for items and add them to the cart
    useEffect(() => {
        const getCart = async () => {
            const idbCart = await idbPromise('cart', 'get');
            dispatch(addMultipleToCart(idbCart));
        }

        if (!cart.length){
            getCart();
        }
    }, [cart.length, dispatch])

    const toggleCart = () => {
        dispatch(toggleCart());
    }

    const calculateTotal = () => {
        let sum = 0;
        cart.forEach((item) => {
            sum += item.price * item.purchaseQuantity;
        })
        return sum.toFixed(2);
    }

    return (
        <Box>

        </Box>
    )
};

export default Cart;