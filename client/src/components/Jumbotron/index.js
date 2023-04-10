import { Box } from "@chakra-ui/react";

const Jumbotron = ({ children }) => {

    return (
        <Box
            height='560px'
            pt='120px'
            textAlign='center'
        >
            {children}
        </Box>
    )
};

export default Jumbotron;