import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProducts } from "../../utils/reducers/productsSlice";
import { selectCurrentCategory } from "../../utils/reducers/categorySlice";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { Box } from "@chakra-ui/react";

// import ProductItem

const ProductList = () => {

    // Grabs current category using a selector (Redux)
    const currentCategory = useSelector(selectCurrentCategory);
    
    const { loading, data } = useQuery(QUERY_PRODUCTS);
    

    return (
        <Box my={2}>

        </Box>
    )
};

export default ProductList;