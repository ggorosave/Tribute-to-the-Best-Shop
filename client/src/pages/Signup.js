import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link as RoutLink } from "react-router-dom";
import { ADD_USER } from "../utils/mutations";
import {
    Link,
    Box,
    Text,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input
} from '@chakra-ui/react';
import Auth from "../utils/auth";

const Signup = (props) => {

    return (
        <Box>
            <FormControl>
                <FormLabel>Email</FormLabel>
            </FormControl>
        </Box>
    )
};

export default Signup;