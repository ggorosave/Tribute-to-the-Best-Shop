import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../../utils/reducers/cartSlice";
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
    IconButton
} from '@chakra-ui/react';
import { FaTrashAlt } from "react-icons/fa";

const CartItem = ({ item }) => {

    return (
        <Card borderRadius='none'>

            {/* Image */}
            <Image
                src={`/images/${item.image}`}
                alt={item.name}
            />

            <Flex w='full' flexDirection='space between'>

                {/*  Item Name */}
                <Text as='b'>{item.name}</Text>

                {/* Item Price */}
                <Text>${item.price}</Text>
            </Flex>

            {/* Label for input */}
            <Text>Qty:</Text>
            <Flex w='full' flexDirection='space between'>

                {/* Input for Quantity */}
                <Input 
                    type="number"
                    placeholder="1"
                    value={item.purchaseQuantity}
                    onChange={onChange}
                />

                {/* Delete Button */}
                <IconButton 
                    aria-label='Delete Item' 
                    icon={<FaTrashAlt />}
                    colorScheme="red"
                />

            </Flex>

        </Card>
    )
};

export default CartItem;