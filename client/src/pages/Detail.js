import { useEffect, useState } from "react";
import { Link as RouteLink, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity, addToCart } from "../utils/reducers/cartSlice";
import { updateProducts } from "../utils/reducers/productsSlice";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from '../assets/spinner.gif'
import { 
    Box,
    Flex,
    Text
} from "@chakra-ui/react";

const Detail = () => {

    return (
        <Box>
            
        </Box>
    )
};

export default Detail;