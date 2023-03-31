import React from "react";
import Auth from "../../utils/auth";
import {
    Box,
    Flex,
    Text,
    Link,
    UnorderedList,
    ListItem,
    Heading
} from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';

const Nav = () => {

    // Add function to render navigation based on login status 
        // Order History
        // Logout
        // ------------
        // Signup
        // Login

    return (
        <Flex as='header' w='full' bg='primary.700' px={4} py={2} color='primary.100'>

            {/* Store Heading and Homepage Link */}
            <Heading as='h1' fontSize={{ base:'2xl', md: '3xl'}} >
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
                
            </Box>
        </Flex>
    )

};

export default Nav;