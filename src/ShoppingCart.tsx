import { useContext } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { ShoppingCartContext } from "./context/ShoppingCartContext";
import ProductView from "./components/ProductView";
import { Box, Text } from "@chakra-ui/react";
import { formatCurrency } from "./utils/formatCurrency";
import { useFetchAndValidate } from "./hooks/useFetchAndValidate";

interface Props {
    isOpen: boolean;
}

const ShoppingCart = ({ isOpen }: Props) => {
    const { closeCart, cartItem } = useContext(ShoppingCartContext);
    const { data } = useFetchAndValidate('https://dummyjson.com/carts');

    const products = data?.carts && data.carts[0].products

    if (products === undefined) return

    return (
        <Offcanvas show={isOpen} onHide={closeCart}
            placement="end"
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItem.map(item => (
                        <ProductView key={item.id} {...item} />
                    ))}
                    <Box>
                        <Text
                            my={3}
                        >
                            Total{' '}
                            {formatCurrency(cartItem.reduce((total, cartItem) => {
                                const cart = data?.carts.find((cart) => {
                                    return cart.products.some((product) => {
                                        return product.id === cartItem.id
                                    })
                                })
                                const item = cart?.products.find(product => product.id === cartItem.id)
                                return total + (item && item.price ? item.price * cartItem.quantity : 0);
                            }, 0))}
                        </Text>
                    </Box>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ShoppingCart