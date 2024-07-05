import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { formatCurrency } from "../utils/formatCurrency"
import { Product } from "../utils/validateData"
import { useShoppingCart } from "../context/shoppingCartContext"

const CartView = (props: {
    product: Product
}) => {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();

    const quantity = getItemQuantity(props.product.id)
    return (
        <>
            <Card
                maxW={'md'}
            >
                <CardHeader
                >

                    <Image
                        src={props.product.thumbnail}
                        alt={props.product.title}
                        borderRadius={'lg'}
                    />
                </CardHeader>
                <CardBody>
                    <Stack mt='6' spacing='3'>
                        <Heading size={'md'}>{props.product.title}</Heading>
                        <Text>
                            Product Description:  {props.product.description}
                        </Text>
                        <Text color='blue.600' fontSize='2xl'>
                            {formatCurrency(props.product.price)}
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    {quantity === 0 ? (
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                increaseCartQuantity(props.product.id)
                            }}
                            colorScheme="blue"
                        >
                            + Add to Cart
                        </Button>
                    ) : <ButtonGroup spacing='2'>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                decreaseCartQuantity(props.product.id)
                            }}
                            colorScheme='blue'>
                            -
                        </Button>
                        <Text as={'span'}>{quantity}</Text>
                        <Text as={'span'}
                        >
                            in cart
                        </Text>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                increaseCartQuantity(props.product.id)
                            }}
                            colorScheme='blue'>
                            +
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                removeFromCart(props.product.id)
                            }}
                            colorScheme="red"
                        >
                            Remove
                        </Button>
                    </ButtonGroup>}
                </CardFooter>
            </Card>
        </>
    )
}

export default CartView