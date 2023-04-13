import { useRouteError } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";
import Jumbotron from "../components/Jumbotron"

const NoMatch = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <Box bg='quaternary.50' w='full' h='full' minHeight='100vh'>
            <Jumbotron>
                <Heading as='h2' fontSize='2xl' mb={4}>Sorry, there seems to be an error.</Heading>
                <Text fontSize='xl'>{error.statusText || error.message}</Text>
            </Jumbotron>
        </Box>
    )
};

export default NoMatch;