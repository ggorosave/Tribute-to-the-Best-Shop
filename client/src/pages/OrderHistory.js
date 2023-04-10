import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { Link as RouteLink } from "react-router-dom";
import {
    Box,
    Flex,
    Link,
    Heading,
    Button,
    Card,
    CardBody,
    Image,
    Text
} from '@chakra-ui/react';
import { FaArrowAltCircleLeft } from "react-icons/fa";


const OrderHistory = () => {
    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }

    console.log(user)

    const sendHome = () => {
        window.location.assign('/');
    }

    return (
        <Box my={4} mx={{ base: 1, md: 4 }}>
            <Button
                onClick={sendHome}
                leftIcon={<FaArrowAltCircleLeft />}
                colorScheme='quaternary'
                borderRadius='full'
                size='sm'
            >Back</Button>

            {user ? (<>

                <Box mt={4}>
                    <Heading as='h2' fontSize='2xl'>Order History for {user.firstName} {user.lastName}:</Heading>

                    {user.orders.map((order) => (
                        <Box key={order._id} my={3} p={2} borderRadius={8} bg='tertiary.100'>
                            {/* Date */}
                            <Heading as='h3' fontSize='xl' mb={2}>
                                {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                            </Heading>
                            <Flex flexDirection={{ base: 'column', md: 'row' }} flexWrap='wrap' my={1}>
                                {order.products.map(({ _id, image, name, price }, index) => (
                                    <Card key={index} w={{ base: 'full', md: '32%', lg: '24%' }} p={1} mb={{ base: 2, md: 1 }} mr={{ base: 0, md: 2 }}>
                                        <CardBody>
                                            <Link
                                                as={RouteLink}
                                                to={`/products/${_id}`}
                                            >
                                                <Image alt={name} src={`/images/${image}`} mb={3} mx='auto' borderRadius={8} />
                                                <Flex w='full' justifyContent='space-between'>
                                                    <Text as='b'>{name}</Text>

                                                    <Text>{price}</Text>
                                                </Flex>

                                            </Link>
                                            
                                        </CardBody>
                                    </Card>
                                ))}
                            </Flex>
                        </Box>
                    ))}
                </Box>

            </>) : (<>
                <Text as='i'>You haven't made any orders yet.</Text>
            </>)}



        </Box>
    )
};

export default OrderHistory;