import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { selectCategories, updateCategories } from "../../utils/reducers/categorySlice";
import { Box } from "@chakra-ui/react";

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

    return (
        <Box>

        </Box>
    )
};

export default CategoryMenu;