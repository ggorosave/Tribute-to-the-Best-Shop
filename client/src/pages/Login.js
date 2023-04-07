import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link as RoutLink } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import {
    Link,
    Box,
    Text,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Heading,
    Button,
    useToast
} from '@chakra-ui/react';
import Auth from "../utils/auth";

const Login = (props) => {
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });
    const [login, { error }] = useMutation(LOGIN);
    const toast = useToast(); 

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
            toast({
                title: 'Login Failed',
                description: 'Email or Password does not match our records.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
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
                <Heading as='h2' fontSize='2xl' textAlign='center'>Login</Heading>

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

                {/* Link to signup */}
                <Box fontSize='sm' mt={4}>
                    <Text>Don't have an account yet?  <Link as={RoutLink} to='/signup' color='blue'>Sign Up</Link></Text>
                </Box>
            </FormControl>
        </Box>
    )
};

export default Login;