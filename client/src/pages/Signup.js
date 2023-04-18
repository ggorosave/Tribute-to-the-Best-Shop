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
    Input,
    Heading,
    Button
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
                onSubmit={handleFormSubmit}
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
                    onChange={handleChange}
                />

                {/* Last Name */}
                <FormLabel m={0} mt={4}>Last Name:</FormLabel>
                <Input
                    type="lastName"
                    name="lastName"
                    placeholder='Last'
                    variant='flushed'
                    size='md'
                    onChange={handleChange}
                />

                {/* Email */}
                <FormLabel m={0} mt={4}>Email:</FormLabel>
                <Input
                    type="email"
                    name="email"
                    placeholder='youremail@test.com'
                    variant='flushed'
                    size='md'
                    onChange={handleChange}
                />

                {/* Password */}
                <FormLabel m={0} mt={4}>Password:</FormLabel>
                <Input
                    type="password"
                    name="password"
                    placeholder='******'
                    variant='flushed'
                    size='md'
                    onChange={handleChange}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    mt={4}
                    w='full'
                    colorScheme="quaternary"
                >Submit</Button>

                {/* Link to login */}
                <Box fontSize='sm' mt={4}>
                    <Text>Already have an account? <Link as={RoutLink} to='/login' color='blue'>Login</Link></Text>
                </Box>
            </FormControl>
        </Box>
    )
};

export default Signup;