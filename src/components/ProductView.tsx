import { VStack } from "@chakra-ui/react";
import { useFetchAndValidate } from "../hooks/useFetchAndValidate";
import ProductItem from "./ProductItem"

const ProductView = (props: {
    id: number;
    quantity: number;
}) => {
    const { data } = useFetchAndValidate('https://dummyjson.com/carts');

    const product = data?.carts && data.carts.map((p) => {
        return (
            <ProductItem
                key={p.id}
                id={props.id}
                quantity={props.quantity}
                product={p.products}
            />
        )
    })

    return (
        <>
            <VStack>
                {product}
            </VStack>
        </>
    )
}

export default ProductView