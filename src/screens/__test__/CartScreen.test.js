import React from 'react';
import { render } from '@testing-library/react-native';
import CartScreen from '../CartScreen';
import { CartContext } from '../../context/CartContext';

// Mock globalStyles
jest.mock('../../styles/globalStyles', () => ({
  globalStyles: { container: { flex: 1, padding: 10 } }
}));

describe('CartScreen', () => {
  it('renders "No items found in the cart!" when cart is empty', () => {
    // Mock CartContext with empty cart
    const cartContextValue = {
      cartItems: [],
      updateQuantity: jest.fn(),
      removeFromCart: jest.fn()
    };

    const { getByText } = render(
      <CartContext.Provider value={cartContextValue}>
        <CartScreen />
      </CartContext.Provider>
    );

    // Boş sepet mesajının render edildiğini kontrol ediyoruz
    expect(getByText('No items found in the cart!')).toBeTruthy();
  });

  it('renders CartList and CartTotal when there are items in the cart', () => {
    // Mock CartContext with items in cart
    const cartContextValue = {
      cartItems: [
        { id: '1', name: 'Product 1', quantity: 2, price: 10 },
        { id: '2', name: 'Product 2', quantity: 1, price: 20 }
      ],
      updateQuantity: jest.fn(),
      removeFromCart: jest.fn()
    };

    const { getByText } = render(
      <CartContext.Provider value={cartContextValue}>
        <CartScreen />
      </CartContext.Provider>
    );

    // Sepetteki ürünlerin ve toplam fiyatın render edildiğini kontrol ediyoruz
    expect(getByText('Product 1')).toBeTruthy();
    expect(getByText('Product 2')).toBeTruthy();
    expect(getByText('$40.00')).toBeTruthy(); 

  });
});
