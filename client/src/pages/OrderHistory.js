import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { Link as RouteLink } from "react-router-dom";
import {
    Box,
    Flex,
    Link,
    Heading,
    Button
} from '@chakra-ui/react';
import { FaArrowAltCircleLeft } from "react-icons/fa";


const OrderHistory = () => {
    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }

    const sendHome = () => {
        window.location.assign('/');
    }

    return (
        <Box m={4}>
            <Button
                onClick={sendHome}
                leftIcon={<FaArrowAltCircleLeft />}
                colorScheme='quaternary'
                borderRadius='full'
                size='sm'
            >Back</Button>

        </Box>
    )
};

export default OrderHistory;