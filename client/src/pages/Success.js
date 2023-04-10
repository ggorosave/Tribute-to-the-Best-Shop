import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";
import {
    Box,
    Flex,
    Heading
} from "@chakra-ui/react";

const Success = () => {
    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
        const saveOrder = async () => {
            const cart = await idbPromise('cart', 'get');
            const products = cart.map((item) => item._id);

            if (products.length) {
                const { data } = await addOrder({ variables: { products } });
                const productData = data.addOrder.products;

                productData.forEach((item) => {
                    idbPromise('cart', 'delete', item);
                })
            }

            setTimeout(() => {
                window.location.assign('/');
            }, 3000)
        }

        saveOrder();
    }, [addOrder]);

    return (
        <Box>

        </Box>
    )
};

export default Success;