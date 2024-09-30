import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductInfo from '../ProductInfo';

describe('ProductInfo Component', () => {
    const mockProduct = {
        id: 1,
        name: 'Test Product',
        description: 'This is a test product.',
        image: 'https://example.com/test-product.jpg',
    };

    const mockFavorites = [{ id: 1, name: 'Test Product' }]; // Ürün favorilerde

    const mockAddToFavorites = jest.fn();
    const mockRemoveFromFavorites = jest.fn();

    it('renders correctly with product information', () => {
        const { getByText, getByTestId } = render(
            <ProductInfo
                product={mockProduct}
                favorites={mockFavorites}
                addToFavorites={mockAddToFavorites}
                removeFromFavorites={mockRemoveFromFavorites}
            />
        );

        // Ürün bilgileri doğru şekilde render ediliyor mu?
        expect(getByText('Test Product')).toBeTruthy();
        expect(getByText('This is a test product.')).toBeTruthy();

        // Ürün görselinin doğru şekilde render edilip edilmediğini kontrol et
        const image = getByTestId('product-image');
        expect(image.props.source.uri).toBe(mockProduct.image);
    });

    it('shows filled star icon if product is in favorites', () => {
        const { getByTestId } = render(
            <ProductInfo
                product={mockProduct}
                favorites={mockFavorites}
                addToFavorites={mockAddToFavorites}
                removeFromFavorites={mockRemoveFromFavorites}
            />
        );

        // Favori simgesinin dolu yıldız olduğunu kontrol et
        const favoriteIcon = getByTestId('favorite-icon');
        expect(favoriteIcon.children[0].props.name).toBe('star');
    });

    it('shows empty star icon if product is not in favorites', () => {
        const { getByTestId } = render(
            <ProductInfo
                product={mockProduct}
                favorites={[]} // Favoriler boş
                addToFavorites={mockAddToFavorites}
                removeFromFavorites={mockRemoveFromFavorites}
            />
        );

        // Favori simgesinin boş yıldız olduğunu kontrol et
        const favoriteIcon = getByTestId('favorite-icon');
        expect(favoriteIcon.children[0].props.name).toBe('star-o');
    });

    it('toggles favorite status on press', () => {
        const { getByTestId } = render(
            <ProductInfo
                product={mockProduct}
                favorites={[]} // Favorilerde değil
                addToFavorites={mockAddToFavorites}
                removeFromFavorites={mockRemoveFromFavorites}
            />
        );

        const favoriteIcon = getByTestId('favorite-icon');

        // Favori simgesine tıkla (ekleme)
        fireEvent.press(favoriteIcon);
        expect(mockAddToFavorites).toHaveBeenCalledWith(mockProduct);

        // Simge tekrar boş yıldızdan dolu yıldıza geçiyor mu?
        expect(favoriteIcon.children[0].props.name).toBe('star');
    });
});
