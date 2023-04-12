import { Link as RouteLink } from "react-router-dom";
import { pluralize, idbPromise } from "../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, updateCartQuantity, addToCart } from "../../utils/reducers/cartSlice";
import {
    Box,
    Link,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Text,
    Flex,
    Spacer
} from "@chakra-ui/react";

const ProductItem = (item) => {

    // destructures item object
    const { image, name, _id, price, quantity } = item;

    // Grabs cart from state using a selector (Redux)
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();

    const addCartItem = () => {

        const itemInCart = cart.find((cartItem) => cartItem._id === _id);

        if (itemInCart) {
            dispatch(updateCartQuantity(_id, parseInt(itemInCart.purchaseQuantity) + 1));
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            dispatch(addToCart({ ...item, purchaseQuantity: 1 }));
            idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
        }
    }



    return (
        <Card w='xs' mr={3} mb={3} borderRadius={0}>
            <CardBody>

                {/* Route to Product */}
                <Link
                    as={RouteLink}
                    to={`/products/${_id}`}
                >

                    {/* Item Image */}
                    <Image
                        alt={name}
                        src={`/images/${image}`}
                    />
                </Link>

                {/* Text Container */}
                <Box mt={4}>

                    {/* Item Name */}
                    <Text fontWeight='bold'>{name}</Text>

                    {/* Quantity in Stock */}
                    <Text>{quantity} {pluralize("item", quantity)} in stock</Text>


                </Box>
            </CardBody>

            <CardFooter>

                <Flex justifyContent='space-between' alignItems='center' w='full'>
                    
                    {/* Price */}
                    <Box>
                        <Text>${price}</Text>
                    </Box>

                    <Button
                        onClick={addCartItem}
                        colorScheme="yellow"
                    >
                        Add to Cart
                    </Button>
                </Flex>
            </CardFooter>

        </Card>
    )
};

export default ProductItem;