import React from "react";
import { Box, Text } from "@chakra-ui/react"
import CategoryMenu from "../components/CategoryMenu";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

const Home = () => {
    return(
        <Box mx={4}>
    
            <CategoryMenu />
            <ProductList />
            {/* Cart */}
            <Cart />
        </Box>
    )
}

export default Home;