import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductTotal from '../ProductTotal';

describe('ProductTotal Component', () => {
    const mockProduct = {
        id: 1,
        name: 'Test Product',
        price: 29.99,
    };

    const mockAddToCart = jest.fn(); // addToCart fonksiyonu için jest mock fonksiyonu

    it('renders correctly with product price', () => {
        const { getByText } = render(
            <ProductTotal product={mockProduct} addToCart={mockAddToCart} />
        );

        // Ürün fiyatı ve 'Price' etiketinin render edildiğini kontrol et
        expect(getByText('Price:')).toBeTruthy();
        expect(getByText('$29.99')).toBeTruthy();
    });

    it('calls addToCart when the "Add to Cart" button is pressed', () => {
        const { getByText } = render(
            <ProductTotal product={mockProduct} addToCart={mockAddToCart} />
        );

        // 'Add to Cart' butonunu bul
        const addToCartButton = getByText('Add to Cart');

        // Butona bas
        fireEvent.press(addToCartButton);

        // addToCart fonksiyonunun doğru ürünle çağrıldığını kontrol et
        expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
    });
});
