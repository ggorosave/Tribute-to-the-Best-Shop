import React from "react";
import { Box, Text } from "@chakra-ui/react"
import CategoryMenu from "../components/CategoryMenu";
import ProductList from "../components/ProductList";

const Home = () => {

    console.log(window.screen.width)
    return(
        <Box>
    
            <CategoryMenu />
            <ProductList />
        </Box>
    )
}

export default Home;