import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { useShoppingCart } from "../context/shoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";

const ProductView = (props: {
    id: number;
    quantity: number;
}) => {
    const { result, removeFromCart } = useShoppingCart()

    const product = result?.products.find(product => product.id === props.id);

    if (product === undefined) return null;
    return (
        <>
            <Card
                direction={'column'}
                overflow='hidden'
                variant='outline'
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '300px' }}
                    src={product?.thumbnail}
                    alt={product?.title}
                />

                <Stack>
                    <CardBody>
                        <Heading size='md'>{product?.title}</Heading>
                        <VStack>
                            {props.quantity > 0 &&
                                <Text as={'span'} py='2'>
                                    x{props.quantity}
                                </Text>
                            }
                        </VStack>
                        {formatCurrency(product?.price)}
                    </CardBody>

                    <CardFooter>

                        Total {formatCurrency(product.price * props.quantity)}
                        <Button
                            onClick={() => removeFromCart(product.id)}
                            p={0}
                        >
                            &times;
                        </Button>
                    </CardFooter>
                </Stack>
            </Card>
        </>
    )
}

export default ProductView