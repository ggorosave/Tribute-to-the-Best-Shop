import React from "react";
import Auth from "../../utils/auth";
import {
    Box,
    Flex,
    Text,
    Link,
    UnorderedList,
    ListItem,
    Heading,
    IconButton
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link as RouteLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectCartOpen, toggleCart } from "../../utils/reducers/cartSlice";

const Nav = () => {

    // Add function to render navigation based on login status 
    // Order History
    // Logout
    // ------------
    // Signup
    // Login
    const dispatch = useDispatch()
    const cartOpen = useSelector(selectCartOpen);


    console.log("Cart Open: " + cartOpen)

    return (
        <Flex as='header' w='full' bg='primary.700' px={4} py={2} color='primary.100' justifyContent='space-between'>

            {/* Store Heading and Homepage Link */}
            <Heading as='h1' fontSize={{ base: '2xl', md: '3xl' }} >
                <Link
                    as={RouteLink}
                    to="/"
                >
                    <Box as="span" aria-label="shopping-bag" mr={2}>🛍️</Box>
                    {/* Tribute to the Best Shop */}
                    TTB Shop
                </Link>
            </Heading>

            {/* Navigation */}
            <Box as="nav">
                {/* Add render nav function here */}

                <IconButton aria-label='Open Cart' icon={< FaShoppingCart />} colorScheme="quaternary" borderRadius='full' onClick={() => {dispatch(toggleCart())}} />
            </Box>
        </Flex>
    )

};

export default Nav;