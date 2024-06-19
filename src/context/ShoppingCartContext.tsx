import { createContext, ReactNode, useState } from 'react';
import ShoppingCart from '../ShoppingCart';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface CartProvider {
    children: ReactNode;
}

interface ShoppingCartContext {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartTotal: number;
    cartItem: CartItem[];
}

interface CartItem {
    id: number;
    quantity: number;
}

export const ShoppingCartContext = createContext({} as ShoppingCartContext)


const ShoppingCartProvider = ({ children }: CartProvider) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItem, setCartItem] = useLocalStorage<CartItem[]>('shopping-cart', []);

    const getItemQuantity = (id: number) => {
        return cartItem.find(item => item.id === id)?.quantity || 0
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

    const cartTotal = cartItem.reduce((result, current) => current.quantity + result, 0)

    return (
        <ShoppingCartContext.Provider value={
            {
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartItem,
                cartTotal,
            }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}
export default ShoppingCartProvider;
