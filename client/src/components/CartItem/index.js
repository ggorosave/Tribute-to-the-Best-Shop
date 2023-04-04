import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../../utils/reducers/cartSlice";
import { idbPromise } from "../../utils/helpers";
import { 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter,
    Image,
    Input
} from '@chakra-ui/react'

const CartItem = ({ item }) => {

    return (
        <Card borderRadius='none'>

        </Card>
    )
};

export default CartItem;