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

    return (
        <Flex as='header' w='full' bg='primary.700'>
            <Text color='gray.50'>Yes</Text>
        </Flex>
    )

};

export default Nav;