import { Box, Button, Container, List, ListItem } from "@chakra-ui/react"
import Clink from "clink-react"
import { useContext } from "react";
import { PiShoppingCartThin } from "react-icons/pi";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

const Navbar = () => {
    const { openCart, cartTotal } = useContext(ShoppingCartContext)

    return (
        <>
            <Box
                bg={'gray.100'}
                py={'10px'}
                boxShadow={'base'}
                mb={2}
            >
                <Container
                    maxW={'8xl'}
                    display={'flex'}
                    alignItems={'center'}
                >
                    <List
                        display={'flex'}
                        mr={'auto'}
                    >
                        <ListItem
                            className="list-item"
                        >
                            <Clink to='/'>Home</Clink>
                        </ListItem>
                        <ListItem
                            className="list-item"
                        >
                            <Clink to='/about'>About</Clink>
                        </ListItem>
                        <ListItem
                            className="list-item"
                        >
                            <Clink to='/store'>Store</Clink>
                        </ListItem>
                    </List>
                    {cartTotal > 0 && <Button
                        onClick={openCart}
                        bg={'blue.300'}
                        p={'0'}
                        borderRadius={'full'}
                        position={'relative'}
                    >
                        <PiShoppingCartThin style={{
                            width: '28px',
                            height: '28px'
                        }} />
                        <Box
                            className="shopping-counter"
                        >
                            {cartTotal}
                        </Box>
                    </Button>}
                </Container>
            </Box>
        </>
    )
}

export default Navbar