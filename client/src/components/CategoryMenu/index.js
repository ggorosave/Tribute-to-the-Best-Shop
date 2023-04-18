import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { selectCategories, updateCategories, updateCurrentCategory } from "../../utils/reducers/categorySlice";
import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import MenuIconButton from "../MenuIconButton";

const CategoryMenu = () => {

    // Grabs categories from state using a selector (Redux)
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();

    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    const smallScreen = window.screen.width <= 600;  

    useEffect(() => {

        if (categoryData) {

            // Category Reducer
            dispatch(updateCategories(categoryData.categories));

            categoryData.categories.forEach((category) => {
                idbPromise('categories', 'put', category);
            });
        } else if (!loading) {
            idbPromise('categories', 'get').then((categories) => {
                dispatch(updateCategories(categories));
            });
        }
    }, [categoryData, loading, dispatch]);

    const handleClick = (id) => {
        dispatch(updateCurrentCategory(id));
    };

    return (
        <Box w='full' bg='primary.500' pl={2}>

            {/* Checks if screen size is small */}
            {smallScreen ? (
                // category menu renders as hamburger menu
                <Menu>

                    <MenuButton
                        as={MenuIconButton}
                        colorScheme='primary'
                    />

                    <MenuList>

                        {/* Category Menu */}
                        {categories.map((item) => (
                            <MenuItem
                                key={item._id}
                                onClick={() => {
                                    handleClick(item._id);
                                }}
                            >{item.name}</MenuItem>
                        ))}
                    </MenuList>

                </Menu>
            ) : (
                // category menu renders as bar with buttons if screen is not small
                <>
                    {/* Category Buttons */}
                    {categories.map((item) => (
                        <Button
                            key={item._id}
                            onClick={() => {
                                handleClick(item._id);
                            }}
                            colorScheme="primary"
                            // mr={2}
                            borderRadius={0}
                            size='sm'
                        >
                            {item.name}
                        </Button>
                    ))}
                </>
            )}
        </Box>
    )
};

export default CategoryMenu;