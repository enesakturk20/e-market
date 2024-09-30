import React from 'react';
import { render } from '@testing-library/react-native';
import CartList from '../CartList';

describe('CartList Component', () => {
    const mockCartItems = [
        { id: 1, name: 'Product 1', price: 10.99 },
        { id: 2, name: 'Product 2', price: 15.99 },
    ];

    const mockRemoveFromCart = jest.fn();
    const mockUpdateQuantity = jest.fn();

    it('renders correctly with cart items', () => {
        const { getByText } = render(
            <CartList
                cartItems={mockCartItems}
                removeFromCart={mockRemoveFromCart}
                updateQuantity={mockUpdateQuantity}
            />
        );

        // CartItem bileşeninde gösterilen ürün isimlerini kontrol et
        expect(getByText('Product 1')).toBeTruthy();
        expect(getByText('Product 2')).toBeTruthy();
    });

    it('renders the correct number of CartItem components', () => {
        const { getAllByText } = render(
            <CartList
                cartItems={mockCartItems}
                removeFromCart={mockRemoveFromCart}
                updateQuantity={mockUpdateQuantity}
            />
        );

        // İki CartItem bileşeninin render edildiğini kontrol et
        expect(getAllByText(/Product/).length).toBe(mockCartItems.length);
    });
});
