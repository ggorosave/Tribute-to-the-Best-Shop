import React from "react";
import { Box, Text } from "@chakra-ui/react"

// Components for main page need to be loaded here
import Nav from "../components/Nav";

const Home = () => {
    return(
        <Box>
            {/* TODO: Update Nav */}
            <Nav />

            {/* Delete */}
            <Text>Hello World</Text>

            {/* Category Menu */}
        </Box>
    )
}

export default Home;