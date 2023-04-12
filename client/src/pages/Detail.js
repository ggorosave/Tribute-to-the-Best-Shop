import { useEffect, useState } from "react";
import { Link as RouteLink, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity, addToCart, selectCart } from "../utils/reducers/cartSlice";
import { updateProducts, selectProducts } from "../utils/reducers/productsSlice";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from '../assets/spinner.gif'
import {
    Box,
    Flex,
    Text
} from "@chakra-ui/react";

const Detail = () => {

    const { id } = useParams();

    const [currentProduct, setCurrentProduct] = useState({});

    const { loading, data } = useQuery(QUERY_PRODUCTS);

    const dispatch = useDispatch();

    // Grabs cart and products from state using a selector (Redux)
    const cart = useSelector(selectCart);
    const products = useSelector(selectProducts);

    useEffect(() => {

        // checks if products are in store
        if (products.length) {
            setCurrentProduct(products.find((product) => product._id === id))
        }
        // retrieves from server if not in store
        else if (data) {
            dispatch(updateProducts(data.products));

            data.products.forEach((product) => {
                idbPromise('products', 'put', product);
            });
        }
        // get cache from idb
        else if (!loading) {
            idbPromise('products', 'get').then((indexedProducts) => {
                dispatch(updateProducts(indexedProducts))
            });
        }
    }, [products, data, loading, dispatch, id]);

    return (
        <Box>

        </Box>
    )
};

export default Detail;