import React, { useState, createContext, useCallback, useMemo } from 'react';

// Create the context
export const CartContext = createContext();

// Create the provider component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = useCallback((product, days = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.product.id === product.id);
            if (existingItem) {
                // If item exists, update its quantity
                return prevItems.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + days }
                        : item
                );
            }
            // If item doesn't exist, add it to the cart
            return [...prevItems, { product, quantity: days }];
        });
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId, quantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product.id === productId
                    ? { ...item, quantity: Math.max(1, quantity) } // Ensure quantity is at least 1
                    : item
            )
        );
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    // Calculate total price and item count
    const cartTotal = useMemo(() => cartItems.reduce((total, item) => total + item.product.pricePerDay * item.quantity, 0), [cartItems]);
    const cartItemCount = useMemo(() => cartItems.length, [cartItems]);

    // Memoize the context value
    const value = useMemo(() => ({
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount
    }), [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartItemCount]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
