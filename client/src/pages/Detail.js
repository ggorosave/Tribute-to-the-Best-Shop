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

    const addCartItem = () => {
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

    const removeCartItem = () => {
        dispatch(removeFromCart(currentProduct._id));
        idbPromise('cart', 'delete', { ...currentProduct });
    };

    return (
        <>
            {currentProduct && cart ? (
                <Flex m={4} flexDirection={{base: 'column', md: 'row'}}>

                    {/* Product Image */}
                    <Image
                        src={`/images/${currentProduct.image}`}
                        alt={currentProduct.name}
                        w={{md: '50%'}}
                        mb={{base: 8, md: 0}}
                    />

                    <Flex 
                        flexDir='column'
                        mx={{base: 0, md: 4}}
                        mb={{base: 8, md: 0}}
                    >

                        {/* Product Name */}
                        <Heading as='h2' fontSize='2xl' mb={4}>{currentProduct.name}</Heading>

                        {/* Description */}
                        <Text>{currentProduct.description}</Text>

                    </Flex>

                    <Flex 
                        flexDir='column'
                        alignItems='end'
                    >

                        {/* Price */}
                        <Text mb={4} fontSize='lg'>
                            <Text as='b'>Price: </Text>${currentProduct.price}
                        </Text>

                        {/* Buttons */}
                        <Button
                            onClick={addCartItem}
                            colorScheme='yellow'
                            mb={2}
                            size='sm'
                            borderRadius='full'
                            w='full'
                        >Add to Cart</Button>

                        <Button
                            disabled={!cart.find((p) => p._id === currentProduct._id)}
                            onClick={removeCartItem}
                            colorScheme="red"
                            size='sm'
                            borderRadius='full'
                            w='full'
                        >
                            Remove from Cart
                        </Button>

                    </Flex>

                </Flex>
            ) : null}

            {loading ? <Image src={spinner} alt='loading' /> : null}

        </>
    )
};

export default Detail;