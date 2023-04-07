import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link as RoutLink } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import {
    Link,
    Box
} from '@chakra-ui/react';
import Auth from "../utils/auth";

const Login = (props) => {
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });
    const [login, { error }] = useMutation(LOGIN); 

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const mutationResponse = await login({
                variables: {
                    email: formState.email,
                    password: formState.password
                },
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (error) {
            console.log(error)
        }
    };

    
    return (
        <Box>
            
        </Box>
    )
};

export default Login;