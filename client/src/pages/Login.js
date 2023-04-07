import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link as RoutLink } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import {
    Link,
    Box,
    Text
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        })
    }

    return (
        <Box>
            {/* TODO add link to signup page here */}

            {/* TODO add login form here */}
            <Text>This is the login page</Text>
            
        </Box>
    )
};

export default Login;