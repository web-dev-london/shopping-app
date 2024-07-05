import { Box, Text } from "@chakra-ui/react";
import { Offcanvas, Stack } from "react-bootstrap";
import ProductView from "./components/ProductView";
import { useShoppingCart } from "./context/shoppingCartContext";
import { formatCurrency } from "./utils/formatCurrency";

interface Props {
    isOpen: boolean;
}

const ShoppingCart = ({ isOpen }: Props) => {
    const { closeCart, cartItems, result } = useShoppingCart();


    return (
        <Offcanvas show={isOpen} onHide={closeCart}
            placement="end"
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart!</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <ProductView key={item.id} {...item} />
                    ))}
                    <Box>
                        <Text
                            my={3}
                        >
                            Total{' '}
                            {formatCurrency(cartItems.reduce((total, cartItem) => {
                                const item = result?.products.find((product) => {
                                    return product.id === cartItem.id
                                })
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