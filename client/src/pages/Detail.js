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
    Text,
    Heading,
    Button,
    Image
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

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === id);

        if (itemInCart) {

            dispatch(updateCartQuantity(id, parseInt(itemInCart.purchaseQuantity) + 1));

            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
        } else {
            dispatch(addToCart({ ...currentProduct, purchaseQuantity: 1 }))
            idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
        }
    };

    const removeFromCart = () => {
        dispatch(removeFromCart(currentProduct._id));
        idbPromise('cart', 'delete', { ...currentProduct });
    };

    return (
        <>
            {currentProduct && cart ? (
                <Box my={1}>

                    {/* Product Name */}
                    <Heading as='h2' fontSize='2xl'>{currentProduct.name}</Heading>

                    {/* Description */}
                    <Text>{currentProduct.description}</Text>

                    <Text>
                        <Text as='b'>Price: </Text>${currentProduct.price}
                    </Text>

                    <Button
                        onClick={addToCart}
                        colorScheme='yellow'
                    >Add to Cart</Button>

                    <Button
                        disabled={!cart.find((p) => p._id === currentProduct._id)}
                        onClick={removeFromCart}
                        colorScheme="red"
                    >

                        <Image 
                            src={`/images/${currentProduct.image}`}
                            alt={currentProduct.name}
                        />
                        Remove from Cart
                    </Button>


                </Box>
            ) : null }

            {loading ? <Image src={spinner} alt='loading' /> : null}

        </>
    )
};

export default Detail;