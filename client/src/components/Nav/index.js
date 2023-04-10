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
    IconButton,
    Icon
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { GiPaperBagOpen } from "react-icons/gi";
import { Link as RouteLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../utils/reducers/cartSlice";

const Nav = () => {

    // Add function to render navigation based on login status 
    // Order History
    // Logout
    // ------------
    // Signup
    // Login
    const dispatch = useDispatch()

    console.log("Logged In: " + Auth.loggedIn())

    const renderNavButtons = () => {

        if (Auth.loggedIn()) {

            return (
                <UnorderedList display='flex' styleType='none' mr={6}>

                    {/* Order History */}
                    <ListItem>
                        <Link
                            as={RouteLink}
                            to='/orderHistory'
                            px={2}
                            py={1}
                            mr={2}
                            borderRadius={18}
                            style={{ textDecoration: 'none' }}
                            _hover={{ fontWeight: 'semibold', backgroundColor: 'primary.600' }}
                        >
                            Order History
                        </Link>
                    </ListItem>

                    {/* Logout */}
                    <ListItem>
                        <Link
                            as={RouteLink}
                            to='/'
                            onClick={() => Auth.logout()}
                            px={2}
                            py={1}
                            borderRadius={18}
                            style={{ textDecoration: 'none' }}
                            _hover={{ fontWeight: 'semibold', backgroundColor: 'primary.600' }}
                        >
                            Logout
                        </Link>
                    </ListItem>
                </UnorderedList>
            )
        } else {

            // Signup/Login Links
            return (
                <UnorderedList display='flex' styleType='none' mr={6}>
                    <ListItem>
                        <Link
                            as={RouteLink}
                            to='/signup'
                            px={2}
                            py={1}
                            mr={2}
                            borderRadius={18}
                            style={{ textDecoration: 'none' }}
                            _hover={{ fontWeight: 'semibold', backgroundColor: 'primary.600' }}
                        >
                            Sign Up
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link
                            as={RouteLink}
                            to='/login'
                            px={2}
                            py={1}
                            borderRadius={18}
                            style={{ textDecoration: 'none' }}
                            _hover={{ fontWeight: 'semibold', backgroundColor: 'primary.600' }}
                        >
                            Login
                        </Link>
                    </ListItem>
                </UnorderedList>
            )
        }
    }

    return (
        <Flex as='header' w='full' bg='primary.700' px={4} py={2} color='primary.100' justifyContent='space-between'>

            {/* Store Heading and Homepage Link */}
            <Heading as='h1' fontSize={{ base: '2xl', md: '3xl' }} >
                <Link
                    as={RouteLink}
                    to="/"
                    style={{ textDecoration: 'none' }}
                >
                    <Flex alignItems='center'>
                        <Icon as={GiPaperBagOpen} aria-label="shopping-bag" mr={2} />
                        {/* Tribute to the Best Shop */}
                        TTB Shop
                    </Flex>
                </Link>
            </Heading>

            {/* Navigation */}
            <Flex as="nav" alignItems='center'>

                {/* Renders links based on whether the user is logged in or not */}
                {renderNavButtons()}

                <IconButton aria-label='Open Cart' icon={< FaShoppingCart />} colorScheme="quaternary" borderRadius='full' onClick={() => { dispatch(toggleCart()) }} />
            </Flex>
        </Flex>
    )

};

export default Nav;