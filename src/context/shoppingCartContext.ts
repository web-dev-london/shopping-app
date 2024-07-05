import { createContext, useContext } from 'react';
import { Category, ResultProduct } from '../utils/validateData';



interface ShoppingCartContext {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartTotal: number;
    cartItems: CartItems[];
    result: ResultProduct | null;
    query: ProductQuery;
    onSearch: (searchText: string) => void;
    onSelectCategory: (category: Category | undefined) => void;
}

export interface CartItems {
    id: number;
    quantity: number;
}

export interface ProductQuery {
    searchText?: string;
    category?: Category;
}

export const shoppingCartContext = createContext<ShoppingCartContext | null>(null)
export function useShoppingCart() {
    const value = useContext(shoppingCartContext);
    if (!value) {
        throw new Error('useShoppingCart must be used within a ShoppingCartProvider')
    }
    return value
}


