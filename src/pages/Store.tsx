import { Wrap, WrapItem } from "@chakra-ui/react";
import Clink from "clink-react";
import CartView from "../components/CartView";
import CategoriesView from "../components/CategoriesView";
import { useShoppingCart } from "../context/shoppingCartContext";
import useProducts from "../hooks/useProducts";

const Store = () => {
    const { query } = useShoppingCart()
    const { data: result } = useProducts(query)

    const products = result?.products && result.products.map(product => {
        return (
            <WrapItem
                key={product.id}
            >
                <Clink to={`/details/${product.id}`}>
                    <CartView product={product} />
                </Clink>
            </WrapItem>
        )
    })

    return (
        <>
            <Wrap
                spacing={4}
                justify='center'
                align='center'
            >
                <CategoriesView />
                {products}
            </Wrap>
        </>
    )
}

export default Store