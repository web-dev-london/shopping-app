import { Grid, GridItem } from "@chakra-ui/react";
import CartView from "../components/CartView";
import { useFetchAndValidate } from "../hooks/useFetchAndValidate";

const Store = () => {
    const { data, } = useFetchAndValidate(`https://dummyjson.com/carts?skip=10&limit=3`)


    const carts = data?.carts && data.carts.map(item => {
        return (
            <GridItem
                key={item.id}
            >
                <CartView products={item.products} />
            </GridItem>
        )
    })

    return (
        <>
            <Grid
                rowGap={4}
            >
                {carts}
            </Grid>
        </>
    )
}

export default Store