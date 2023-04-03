import { useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { useSelector, useDispatch } from "react-redux";
import { idbPromise } from '../../utils/helpers';
import { Box } from "@chakra-ui/react";

import Auth from "../../utils/auth";

// import CartItem
// import reducers from store

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
    
    const dispatch = useDispatch();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    // Stripe Checkout
    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
              res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data])

    return (
        <Box>

        </Box>
    )
};

export default Cart;