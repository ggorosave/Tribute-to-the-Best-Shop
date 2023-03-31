import React from "react";
import { Box, Text } from "@chakra-ui/react"

// Components for main page need to be loaded here
import Nav from "../components/Nav";
import CategoryMenu from "../components/CategoryMenu";

const Home = () => {
    return(
        <Box>
            {/* TODO: Update Nav */}
            <Nav />

            {/* Category Menu */}
            <CategoryMenu />
        </Box>
    )
}

export default Home;