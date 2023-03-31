import { Link as RouteLink } from "react-router-dom";
import { pluralize, idbPromise } from "../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, updateCartQuantity, addToCart } from "../../utils/reducers/cartSlice";
import { 
    Box,
    Link,
    Button 
} from "@chakra-ui/react";

const ProductItem = (item) => {

    // destructures item object
    const { image, name, _id, price, quantity } = item;

    // Grabs cart from state using a selector (Redux)
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();

    const checkCartAndAdd = () => {

        const itemInCart = cart.find((cartItem) => cartItem._id === _id);

        if (itemInCart) {
            dispatch(updateCartQuantity({ 
                _id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1 
            }));
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
        <Box>

        </Box>
    )
};

export default ProductItem;