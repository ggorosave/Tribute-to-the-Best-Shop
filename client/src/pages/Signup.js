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
    Input,
    Heading
} from '@chakra-ui/react';
import Auth from "../utils/auth";

const Signup = (props) => {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                email: formState.email,
                password: formState.password,
                firstName: formState.firstName,
                lastName: formState.lastName,
            },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <Box mx={2}>
            <FormControl
                as='form'
                w={{ base: 'full', md: '50%', lg: '30%' }}
                bg='white'
                p={4}
                mx='auto'
                my={10}
                boxShadow='sm'
            >
                {/* Heading */}
                <Heading as='h2' fontSize='2xl' textAlign='center'>Sign Up</Heading>

                {/* First Name */}
                <FormLabel m={0} mt={4}>First Name:</FormLabel>
                <Input
                    type="firstName"
                    name="firstName"
                    placeholder='First'
                    variant='flushed'
                    size='md'
                />

                {/* Last Name */}

                {/* Email */}

                {/* Password */}

                {/* Submit Button */}
            </FormControl>
        </Box>
    )
};

export default Signup;