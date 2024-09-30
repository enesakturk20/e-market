import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { CartProvider, CartContext } from '../CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TouchableOpacity } from 'react-native';

// Testlerden önce AsyncStorage'ı temizle
beforeEach(async () => {
    await AsyncStorage.clear(); 
});

describe('CartContext', () => {
    const TestComponent = () => {
        const { cartItems, addToCart, removeFromCart, clearCart } = React.useContext(CartContext);
    
        return (
            <>
                <TouchableOpacity onPress={() => addToCart({ id: '1', name: 'Test Product', quantity: 1 })}>
                    <Text>Add Product</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeFromCart('1')}>
                    <Text>Remove Product</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => clearCart()}>
                    <Text>Clear Cart</Text>
                </TouchableOpacity>
                <Text testID="cart-count">{cartItems.length}</Text>
            </>
        );
    };

    /*it('should load cart items from AsyncStorage on mount', async () => {
        // AsyncStorage'a ürün ekle
        await AsyncStorage.setItem('cartItems', JSON.stringify([{ id: '1', name: 'Test Product', quantity: 1 }]));

        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        // TestComponent render edildikten sonra 1 ürün olmalı
        await waitFor(() => {
            expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
        });
    });*/

    it('should add a product to the cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        // Ürünü sepete ekle
        fireEvent.press(screen.getByText('Add Product'));
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1'); // 1 ürün olmalı
    });

    /*it('should increase quantity of existing product in cart', async () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        // Ürünü sepete ekle
        fireEvent.press(screen.getByText('Add Product'));
        fireEvent.press(screen.getByText('Add Product'));

        // Burada ürün sayısını artırmak için mantığı test etmelisiniz
        expect(screen.getByTestId('cart-count')).toHaveTextContent('2'); // Aynı üründen 2 tane olmalı
    });*/

    it('should remove a product from the cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        // Ürünü sepete ekle
        fireEvent.press(screen.getByText('Add Product'));
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1'); // 1 ürün olmalı

        // Ürünü sepetten çıkar
        fireEvent.press(screen.getByText('Remove Product'));
        expect(screen.getByTestId('cart-count')).toHaveTextContent('0'); // 0 ürün olmalı
    });

    it('should clear the cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        // Ürünü sepete ekle
        fireEvent.press(screen.getByText('Add Product'));
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1'); // 1 ürün olmalı

        // Sepeti temizle
        fireEvent.press(screen.getByText('Clear Cart'));
        expect(screen.getByTestId('cart-count')).toHaveTextContent('0'); // 0 ürün olmalı
    });
});
