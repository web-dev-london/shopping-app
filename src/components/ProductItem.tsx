import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { useShoppingCart } from '../context/shoppingCartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { Product } from '../utils/validateData';

const ProductItem = (props: {
    id: number;
    quantity: number;
    product: Product;
}) => {
    const { removeFromCart } = useShoppingCart();


    const item = props.product.id === props.id;


    if (item === undefined) return null;
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
                    src={props.product.thumbnail}
                    alt={props.product.title}
                />

                <Stack>
                    <CardBody>
                        <Heading size='md'>{props.product.title}</Heading>
                        <VStack>
                            {props.quantity > 1 &&
                                <Text as={'span'} py='2'>
                                    x{props.quantity}
                                </Text>
                            }
                        </VStack>
                        {formatCurrency(props.product.price)}
                    </CardBody>

                    <CardFooter>

                        Total {formatCurrency(props.product.price * props.quantity)}
                        <Button
                            onClick={() => removeFromCart(props.product.id)}
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

export default ProductItem