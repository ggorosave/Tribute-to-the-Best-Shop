import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react"

// Components for main page need to be loaded here
import Nav from "../components/Nav";


const Root = () => {
    return(
        <Box bg='quaternary.50' h='100vh'>
            {/* TODO: Update Nav */}
            <Nav />

            {/* Outlet is where "children" routes render */}
            <Outlet />
           
        </Box>
    )
}

export default Root;