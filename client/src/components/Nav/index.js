import React from "react";
import Auth from "../../utils/auth";
import {
    Flex,
    Link,
    UnorderedList,
    ListItem,
    Heading,
    IconButton,
    Icon,
    useDisclosure,
    MenuButton,
    MenuList,
    MenuItem,
    Menu,
    Box,
    Text
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { GiPaperBagOpen } from "react-icons/gi";
import { Link as RouteLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectCartCount } from "../../utils/reducers/cartSlice";
import Cart from "../Cart";
import MenuIconButton from "../MenuIconButton";


const Nav = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const smallScreen = window.screen.width <= 600;
    const cartCount = useSelector(selectCartCount);

    const renderNavButtons = () => {

        // Conditionally renders buttons based on logged in status
        if (Auth.loggedIn()) {

            return (
                <>
                    {/* Conditionally renders menu base on screen size */}
                    {smallScreen ? (
                        <>
                            <Menu>
                                <MenuButton
                                    as={MenuIconButton}
                                    _active={{ backgroundColor: 'secondary.600' }}
                                    _hover={{ backgroundColor: 'secondary.700' }}
                                    bg='secondary.700'
                                    mr={1}
                                />

                                <MenuList bg='secondary.400'>
                                    <MenuItem
                                        as={RouteLink}
                                        to='/orderHistory'
                                        bg='secondary.400'
                                    >
                                        Order History
                                    </MenuItem>
                                    <MenuItem
                                        as={RouteLink}
                                        to='/'
                                        onClick={() => Auth.logout()}
                                        bg='secondary.400'
                                    >
                                        Logout
                                    </MenuItem>
                                </MenuList>

                            </Menu>
                        </>
                    ) : (
                        <>
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
                                        _hover={{ fontWeight: 'semibold', backgroundColor: 'secondary.600' }}
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
                                        _hover={{ fontWeight: 'semibold', backgroundColor: 'secondary.600' }}
                                    >
                                        Logout
                                    </Link>
                                </ListItem>
                            </UnorderedList>
                        </>
                    )}
                </>
            )
        } else {

            // Signup/Login Links
            return (
                <>
                    {smallScreen ? (
                        <>
                            <Menu mr={2}>
                                <MenuButton
                                    as={MenuIconButton}
                                    bg='secondary.700'
                                    borderRadius='full'
                                    _active={{ backgroundColor: 'secondary.600' }}
                                    _hover={{ backgroundColor: 'secondary.700' }}
                                    mr={1}
                                />

                                <MenuList bg='secondary.400'>
                                    <MenuItem
                                        as={RouteLink}
                                        to='/signup'
                                        bg='secondary.400'
                                    >
                                        Signup
                                    </MenuItem>
                                    <MenuItem
                                        as={RouteLink}
                                        to='/login'
                                        bg='secondary.400'
                                    >
                                        Login
                                    </MenuItem>
                                </MenuList>

                            </Menu>
                        </>
                    ) : (
                        <>
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
                                        _hover={{ fontWeight: 'semibold', backgroundColor: 'secondary.600' }}
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
                                        _hover={{ fontWeight: 'semibold', backgroundColor: 'secondary.600' }}
                                    >
                                        Login
                                    </Link>
                                </ListItem>
                            </UnorderedList>
                        </>
                    )}

                </>
            )
        }
    }

    return (
        <>
            <Flex as='header' w='full' bg='secondary.700' px={4} py={2} color='primary.100' justifyContent='space-between'>

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
                            Tribute Shop
                        </Flex>
                    </Link>
                </Heading>

                {/* Navigation */}
                <Flex as="nav" alignItems='center'>

                    {/* Renders links based on whether the user is logged in or not */}
                    {renderNavButtons()}

                    <IconButton ref={btnRef} aria-label='Open Cart' icon={< FaShoppingCart />} colorScheme="quaternary" borderRadius='full' onClick={onOpen} />

                    <Box w='fit-content' bg='yellow.400' px={1} py={0} ml={-3} mt={5} zIndex={1} borderRadius='full'>
                        <Text color='primary.800' fontSize='2xs' >{cartCount}</Text>
                    </Box>
                </Flex>
            </Flex>

            {/* Cart */}
            <Cart isOpen={isOpen} onClose={onClose} />

        </>
    )

};

export default Nav;