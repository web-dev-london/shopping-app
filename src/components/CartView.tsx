import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { ShoppingCartContext } from "../context/ShoppingCartContext"
import { ItemsCart } from "../utils/fetchAndValidateData"
import { formatCurrency } from "../utils/formatCurrency"

const CartView = (props: {
    products: ItemsCart
}) => {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useContext(ShoppingCartContext)


    const productItem = props.products.map(product => {
        const quantity = getItemQuantity(product.id)
        return (
            <Card
                key={product.id}
                maxW={'md'}
            >
                <CardHeader
                >
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        borderRadius={'lg'}
                    />
                </CardHeader>
                <CardBody>
                    <Stack mt='6' spacing='3'>
                        <Heading size={'md'}>{product.title}</Heading>
                        <Text>
                            Product quantity:  {product.quantity}
                        </Text>
                        <Text color='blue.600' fontSize='2xl'>
                            {formatCurrency(product.price)}
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    {quantity === 0 ? (
                        <Button
                            onClick={() => increaseCartQuantity(product.id)}
                            colorScheme="blue"
                        >+ Add to Cart</Button>
                    ) : <ButtonGroup spacing='2'>
                        <Button
                            onClick={() => decreaseCartQuantity(product.id)}
                            colorScheme='blue'>
                            -
                        </Button>
                        <Text as={'span'}>{quantity}</Text>
                        <Text as={'span'}>in cart</Text>
                        <Button
                            onClick={() => increaseCartQuantity(product.id)}
                            colorScheme='blue'>
                            +
                        </Button>
                        <Button
                            onClick={() => removeFromCart(product.id)}
                            colorScheme="red" >Remove</Button>
                    </ButtonGroup>}
                </CardFooter>
            </Card>
        )
    })

    return (
        <>
            <SimpleGrid
                spacing={4}
                columns={{
                    sm: 1, md: 2, lg: 3, xl: 4
                }}>
                {productItem}
            </SimpleGrid>
        </>
    )
}

export default CartView