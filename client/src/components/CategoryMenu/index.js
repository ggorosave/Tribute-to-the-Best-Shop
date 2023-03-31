import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { selectCategories, updateCategories, updateCurrentCategory } from "../../utils/reducers/categorySlice";
import { Box, Heading, Button } from "@chakra-ui/react";

const CategoryMenu = () => {

    // Grabs categories from state using a selector (Redux)
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();

    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

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
        <Box my={2} mx={4}>

            {/* Heading */}
            <Heading as='h2' fontSize='xl'>Choose a Category:</Heading>

            {/* Category Buttons */}
            {categories.map((item) => (
                <Button
                    key={item._id}
                    onClick={() => {
                        handleClick(item._id);
                    }}
                    colorScheme="yellow"
                    mr={2}
                    mt={2}
                    borderRadius={20}
                    size='sm'
                >
                    {item.name}
                </Button>
            ))}
        </Box>
    )
};

export default CategoryMenu;