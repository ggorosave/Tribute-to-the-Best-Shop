import React from "react";
import { Box, Text } from "@chakra-ui/react"
import CategoryMenu from "../components/CategoryMenu";
import ProductList from "../components/ProductList";

const Home = () => {
    return(
        <Box>
    
            <CategoryMenu />
            <ProductList />
        </Box>
    )
}

export default Home;