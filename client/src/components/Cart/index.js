import { useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, selectCartOpen, toggleCart, addMultipleToCart } from "../../utils/reducers/cartSlice";
import { idbPromise } from '../../utils/helpers';
import {
    Box,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Text,
    Flex,
    Link,
    useDisclosure
} from "@chakra-ui/react";
import { Link as RouteLink } from 'react-router-dom';

import Auth from "../../utils/auth";

import CartItem from "../CartItem";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = ({ isOpen, onClose }) => {

    // const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    // Grabs cart from state using a selector (Redux)
    const cart = useSelector(selectCart)
    const cartOpen = useSelector(selectCartOpen);



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

        if (!cart.length) {
            getCart();
        }
    }, [cart.length, dispatch])


    const calculateTotal = () => {
        let sum = 0;
        cart.forEach((item) => {
            sum += item.price * item.purchaseQuantity;
        })
        return sum.toFixed(2);
    }

    const submitCheckout = () => {
        const productIds = [];

        cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id);
            }
        });

        console.log(productIds)

        getCheckout({
            variables: { products: productIds },
        })
    }

    const openCart = () => {
        dispatch(toggleCart())
    }

    return (
        <Drawer
            placement="right"
            isOpen={isOpen}
            onClose={onClose}
            closeOnEsc
            closeOnOverlayClick
        >
            <DrawerOverlay />

            <DrawerContent>
                <DrawerCloseButton onClick={onClose} />
                <DrawerHeader>Shopping Cart</DrawerHeader>

                <DrawerBody>

                    <Flex flexDirection='column' w='full' h='full' justifyContent='space-between'>

                        <Box
                            w='full'
                            overflowY='scroll'
                            sx={{
                                '&::-webkit-scrollbar': {
                                    width: '10px',
                                    height: '100%',
                                    borderRadius: '8px',
                                    backgroundColor: `primary.50`,
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: `primary.200`,
                                    borderRadius: '8px',
                                },
                            }}
                        >
                            {/* Map through cart items */}

                            {
                                cart.length <= 0 ? (
                                    <Text as='i'>Cart Empty...</Text>
                                ) : (
                                    <Box>
                                        {cart.map((item) => (
                                            <CartItem key={item._id} item={item} />
                                        ))}
                                    </Box>
                                )
                            }

                        </Box>

                        {/* Total */}
                        <Text textAlign='end' mt={2}>
                            <Text as='b'>Total: </Text>${calculateTotal()}
                        </Text>

                    </Flex>

                </DrawerBody>

                <DrawerFooter>
                    {/* TODO: Add auth check to render buttons or error message */}
                    {Auth.loggedIn() ? (
                        <Box>
                            <Button variant='outline' mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='blue' onClick={submitCheckout}>Checkout</Button>
                        </Box>
                    ) : (
                        <Box>
                            <Text>You must be <Link as={RouteLink} to='/login' color='blue'>logged in</Link> to checkout.</Text>
                        </Box>
                    )}



                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
};

export default Cart;