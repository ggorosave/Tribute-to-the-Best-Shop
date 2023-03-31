import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts, updateProducts } from "../../utils/reducers/productsSlice";
import { selectCurrentCategory } from "../../utils/reducers/categorySlice";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { Box } from "@chakra-ui/react";

// import ProductItem

const ProductList = () => {

    // Grabs current category from state using a selector (Redux)
    const currentCategory = useSelector(selectCurrentCategory);
    // Grabs products from state using a selector (Redux)
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();
    
    const { loading, data } = useQuery(QUERY_PRODUCTS);

    useEffect(() => {

        if (data) {
            dispatch(updateProducts(data.products));
            data.products.forEach((product) => {
                idbPromise('products', 'put', product);
            });
        } else if (!loading) {
            idbPromise('products', 'get').then((products) => {
                dispatch(updateProducts(products));
            });
        }
    }, [data, loading, dispatch]);

    const filterProducts = () => {
        
        if (!currentCategory) {
            return products;
        }

        return products.filter((product) => product.category._id === currentCategory);
    }; 

    return (
        <Box my={2}>

        </Box>
    )
};

export default ProductList;