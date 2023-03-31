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
        <Box>
            <Heading as='h2'>Choose a Category:</Heading>
            {categories.map((item) => (
                <Button
                    key={item._id}
                    onClick={() => {
                        handleClick(item._id);
                    }}
                >
                    {item.name}
                </Button>
            ))}
        </Box>
    )
};

export default CategoryMenu;