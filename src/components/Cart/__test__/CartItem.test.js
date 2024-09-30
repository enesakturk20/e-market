import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CartItem from '../CartItem';

describe('CartItem Component', () => {
    const mockRemoveFromCart = jest.fn();
    const mockUpdateQuantity = jest.fn();
    const mockItem = {
        id: '1',
        name: 'Product 1',
        price: '10.99',
        quantity: 2,
        image: 'https://example.com/image.jpg',
    };

    it('renders correctly with product details', () => {
        const { getByText, getByTestId } = render(
            <CartItem
                item={mockItem}
                removeFromCart={mockRemoveFromCart}
                updateQuantity={mockUpdateQuantity}
            />
        );

        expect(getByText('Product 1')).toBeTruthy();
        expect(getByText('$10.99')).toBeTruthy();
        expect(getByText('2')).toBeTruthy();
        expect(getByTestId('removeButton')).toBeTruthy();
        expect(getByTestId('MinusCircle')).toBeTruthy();
        expect(getByTestId('PlusCircle')).toBeTruthy();
    });

    it('calls removeFromCart function when delete button is pressed', () => {
        const { getByTestId } = render(
            <CartItem
                item={mockItem}
                removeFromCart={mockRemoveFromCart}
                updateQuantity={mockUpdateQuantity}
            />
        );

        fireEvent.press(getByTestId('removeButton'));
        expect(mockRemoveFromCart).toHaveBeenCalledWith(mockItem.id);
    });

    it('calls updateQuantity function when increase button is pressed', () => {
        const { getByTestId } = render(
            <CartItem
                item={mockItem}
                removeFromCart={mockRemoveFromCart}
                updateQuantity={mockUpdateQuantity}
            />
        );

        fireEvent.press(getByTestId('PlusCircle'));
        expect(mockUpdateQuantity).toHaveBeenCalledWith(mockItem.id, mockItem.quantity + 1);
    });

    it('calls updateQuantity function when decrease button is pressed', () => {
        const { getByTestId } = render(
            <CartItem
                item={mockItem}
                removeFromCart={mockRemoveFromCart}
                updateQuantity={mockUpdateQuantity}
            />
        );

        fireEvent.press(getByTestId('MinusCircle'));
        expect(mockUpdateQuantity).toHaveBeenCalledWith(mockItem.id, mockItem.quantity - 1);
    });

    it('disables decrease button when quantity is 1', () => {
        const singleQuantityItem = { ...mockItem, quantity: 1 };
        const { getByTestId } = render(
            <CartItem
                item={singleQuantityItem}
                removeFromCart={mockRemoveFromCart}
                updateQuantity={mockUpdateQuantity}
            />
        );

        const decreaseButton = getByTestId('MinusCircle');
        expect(decreaseButton).toBeDisabled();
    });
});
