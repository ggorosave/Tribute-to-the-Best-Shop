import React from "react";
import { Box, Text } from "@chakra-ui/react"
import CategoryMenu from "../components/CategoryMenu";
import ProductList from "../components/ProductList";

const Home = () => {
    return(
        <Box mx={4}>
    
            <CategoryMenu />
            <ProductList />
            {/* Cart */}
        </Box>
    )
}

export default Home;