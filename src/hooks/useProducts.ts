import { useMemo } from "react";
import useFetchAndValidateData from "./useFetchAndValidateData";
import { ProductQuery } from "../context/shoppingCartContext";

const useProducts = (query: ProductQuery) => {
    const { searchText } = query;

    const config = useMemo(() => {
        return {
            params: {
                q: searchText,
            }
        }
    }, [searchText])

    const dependencies = useMemo(() => {
        const queries = {
            searchText,
        }
        const dependencies = [queries]
        return dependencies
    }, [searchText])

    const endpoint = query.category ? `/products/category/${query.category.slug}` : `/products/search`

    return useFetchAndValidateData(endpoint, config, dependencies)
}
export default useProducts;


// search