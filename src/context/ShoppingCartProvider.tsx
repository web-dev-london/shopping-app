import { ReactNode, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useProducts from "../hooks/useProducts";
import ShoppingCart from "../ShoppingCart";
import { Category } from "../utils/validateData";
import { CartItems, ProductQuery, shoppingCartContext } from "./shoppingCartContext";

interface ShoppingCartProviderProps {
    children: ReactNode;
}

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItem] = useLocalStorage<CartItems[]>('shopping-cart', []);
    const [query, setQuery] = useState<ProductQuery>({})
    const { data: result } = useProducts(query);
    console.log('Query', query);


    function onSearch(searchText: string) {
        setQuery({ ...query, searchText })
    }

    function onSelectCategory(categories: Category | undefined) {
        setQuery({ ...query, category: categories })
    }


    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const increaseCartQuantity = (id: number) => {
        setCartItem(currItem => {
            if (currItem.find(item => item.id === id) == null) {
                return [...currItem, { id, quantity: 1 }]
            } else {
                return currItem.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    const decreaseCartQuantity = (id: number) => {
        setCartItem(currItem => {
            if (currItem.find(item => item.id === id)?.quantity === 1) {
                return currItem.filter(item => item.id !== id)
            } else {
                return currItem.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    const removeFromCart = (id: number) => {
        setCartItem(currItem => {
            return currItem.filter(item => item.id !== id)
        })
    }

    const openCart = () => setIsOpen(!isOpen);
    const closeCart = () => setIsOpen(!isOpen)

    const cartTotal = cartItems.reduce((result, current) => result + current.quantity, 0)

    return (
        <shoppingCartContext.Provider value={
            {
                onSelectCategory,
                onSearch,
                query,
                result,
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartItems,
                cartTotal,
            }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </shoppingCartContext.Provider>
    )
}
export default ShoppingCartProvider;