import { useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";
import {
    Heading
} from "@chakra-ui/react";
import Jumbotron from "../components/Jumbotron";

const Success = () => {
    const [addOrder] = useMutation(ADD_ORDER);
    // const orderAddedRef = useRef(false);

    useEffect(() => {
        const saveOrder = async () => {
            const cart = await idbPromise('cart', 'get');
            const products = await cart.map((item) => item._id);

            console.log(products);

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

        // stops from running a second time if orderAddedRef.current is true
        // if (orderAddedRef.current) {
        //     return
        // }

        // Sets orderAddedRef.current to true the first time the useEffect runs
        // orderAddedRef.current = true;

        saveOrder();
    }, [addOrder]);

    return (
        <Jumbotron>

            <Heading as='h2' fontSize='3xl' mb={6}>Success!</Heading>

            <Heading as='h3' fontSize='xl' mb={4}>Thank you for your purchase!</Heading>

            <Heading as='h3' fontSize='xl'>You will now be redirected to the home page.</Heading>
        </Jumbotron>
    )
};

export default Success;