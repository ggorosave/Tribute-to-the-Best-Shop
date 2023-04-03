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

const Cart = () => {

    return (
        <Box>
            
        </Box>
    )
};

default export Cart;