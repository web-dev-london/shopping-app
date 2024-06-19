import { useContext } from 'react';
import { ShoppingCartContext } from '../context/ShoppingCartContext';
import { ItemsCart } from '../utils/fetchAndValidateData';
import { Heading, Card, Image, Stack, CardBody, CardFooter, Button, Text, VStack } from '@chakra-ui/react';
import { formatCurrency } from '../utils/formatCurrency';

const ProductItem = (props: {
    id: number;
    quantity: number;
    product: ItemsCart;
}) => {
    const { removeFromCart } = useContext(ShoppingCartContext);

    const item = props.product.find(i => i.id === props.id);


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
                    src={item?.thumbnail}
                    alt={item?.title}
                />

                <Stack>
                    <CardBody>
                        <Heading size='md'>{item?.title}</Heading>
                        <VStack>
                            {props.quantity > 1 &&
                                <Text as={'span'} py='2'>
                                    x{props.quantity}
                                </Text>
                            }
                        </VStack>
                        {formatCurrency(item.price)}
                    </CardBody>

                    <CardFooter>

                        Total {formatCurrency(item.price * props.quantity)}
                        <Button
                            onClick={() => removeFromCart(item.id)}
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