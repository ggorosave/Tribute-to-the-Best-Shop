import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, selectCart, updateCartQuantity } from "../../utils/reducers/cartSlice";
import { idbPromise } from "../../utils/helpers";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Input,
    Flex,
    Text,
    IconButton,
    Box
} from '@chakra-ui/react';
import { FaTrashAlt } from "react-icons/fa";

const CartItem = ({ item }) => {

    const dispatch = useDispatch();

    const removeCartItem = item => {
        dispatch(removeFromCart(item._id))
        idbPromise('cart', 'delete', { ...item });
    }

    const onChange = (e) => {
        const value = e.target.value;
        if (value === '0') {
            dispatch(removeFromCart(item._id))
            idbPromise('cart', 'delete', { ...item });
        } else {
            dispatch(updateCartQuantity(item._id, parseInt(value)))
            idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
        }
    }

    return (
        <Card borderRadius='none' w='90%' p={2} mb={2} mx='auto'>
            <Flex flexDirection='column'>

                {/* Image */}
                <Image
                    src={`/images/${item.image}`}
                    alt={item.name}
                    h='fit-content'
                    mb={2}
                />

                <Flex w='full' justifyContent='space-between'>
                    {/*  Item Name */}
                    <Text as='b' fontSize='xs' mb={1}>{item.name}</Text>

                    {/* Item Price */}
                    <Text fontSize='xs'>${item.price}</Text>
                </Flex>

                <Box mt={2} >
                    {/* Label for input */}
                    <Text fontSize='xs'>Qty:</Text>
                    <Flex w='full' mt={1} justifyContent='space-between'>

                        {/* Input for Quantity */}
                        <Input
                            type="number"
                            // placeholder="1"

                            value={item.purchaseQuantity}
                            onChange={onChange}
                            w='25%'
                            h='30px'
                            textAlign='end'
                            fontSize='xs'
                        />

                        {/* Delete Button */}
                        <IconButton
                            aria-label='Delete Item'
                            icon={<FaTrashAlt />}
                            colorScheme="red"
                            w='20%'
                            h='30px'
                            onClick={() => removeCartItem(item)}
                        />
                    </Flex>
                </Box>
            </Flex>
        </Card>
    )
};

export default CartItem;