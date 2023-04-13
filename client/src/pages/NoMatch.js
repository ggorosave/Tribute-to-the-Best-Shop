import { useRouteError } from "react-router-dom";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Jumbotron from "../components/Jumbotron"

const NoMatch = () => {
    const error = useRouteError();
    console.error(error);

    const sendHome = () => {
        window.location.assign('/');
    }

    return (
        <Box bg='quaternary.50' w='full' h='full' minHeight='100vh'>
            <Jumbotron>
                <Heading as='h2' fontSize='2xl' mb={4}>Sorry, there seems to be an error.</Heading>
                <Text fontSize='xl' mb={4}>{error.statusText || error.message}</Text>
                <Button
                    onClick={sendHome}
                    leftIcon={<FaArrowAltCircleLeft />}
                    colorScheme='quaternary'
                    borderRadius='full'
                    size='sm'
                >Back</Button>
            </Jumbotron>
        </Box>
    )
};

export default NoMatch;