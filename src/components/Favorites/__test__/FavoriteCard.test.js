import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FavoriteCard from '../FavoriteCard';

describe('FavoriteCard Component', () => {
    const mockProduct = {
        id: 1,
        name: 'Product 1',
        price: 10.99,
        image: 'https://via.placeholder.com/150',
    };

    const mockOnAddToCart = jest.fn(); // Sepete ekleme fonksiyonu için mock
    const mockRemoveFromFavorites = jest.fn(); // Favorilerden çıkarma fonksiyonu için mock
    const mockProductDetail = jest.fn(); // Ürün detayına gitme fonksiyonu için mock

    it('renders correctly with product details', () => {
        const { getByText, getByTestId } = render(
            <FavoriteCard
                product={mockProduct}
                onAddToCart={mockOnAddToCart}
                productDetail={mockProductDetail}
                removeFromFavorites={mockRemoveFromFavorites}
            />
        );

        // Ürün adının doğru şekilde render edildiğini kontrol et
        expect(getByText('Product 1')).toBeTruthy();

        // Ürün fiyatının doğru şekilde render edildiğini kontrol et
        expect(getByText('10.99 $')).toBeTruthy();

        // Ürün görselinin render edildiğini kontrol et
        const productImage = getByTestId('product-image');
        expect(productImage.props.source.uri).toBe(mockProduct.image);
    });

    it('calls onAddToCart when "Add to Cart" button is pressed', () => {
        const { getByText } = render(
            <FavoriteCard
                product={mockProduct}
                onAddToCart={mockOnAddToCart}
                productDetail={mockProductDetail}
                removeFromFavorites={mockRemoveFromFavorites}
            />
        );

        // "Add to Cart" butonuna bas
        const addToCartButton = getByText('Add to Cart');
        fireEvent.press(addToCartButton);

        // onAddToCart fonksiyonunun çağrıldığını kontrol et
        expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct);
    });

    it('calls removeFromFavorites when the favorite icon is pressed', () => {
        const { getByTestId } = render(
            <FavoriteCard
                product={mockProduct}
                onAddToCart={mockOnAddToCart}
                productDetail={mockProductDetail}
                removeFromFavorites={mockRemoveFromFavorites}
            />
        );

        // Favori ikonunu bul ve bas
        const favoriteIcon = getByTestId('favorite-icon');
        fireEvent.press(favoriteIcon);

        // removeFromFavorites fonksiyonunun çağrıldığını kontrol et
        expect(mockRemoveFromFavorites).toHaveBeenCalledWith(mockProduct.id);
    });

    it('navigates to product detail when card is pressed', () => {
        const { getByTestId } = render(
            <FavoriteCard
                product={mockProduct}
                onAddToCart={mockOnAddToCart}
                productDetail={mockProductDetail}
                removeFromFavorites={mockRemoveFromFavorites}
            />
        );

        // Kartın kendisine bas
        const card = getByTestId('product-card');
        fireEvent.press(card);

        // Ürün detayına gitme fonksiyonunun çağrıldığını kontrol et
        expect(mockProductDetail).toHaveBeenCalledWith(mockProduct.id);
    });
});
