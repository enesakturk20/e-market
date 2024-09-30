import React from 'react';
import { render } from '@testing-library/react-native';
import { FavoriteContext } from '../../context/FavoriteContext';
import { CartContext } from '../../context/CartContext';
import FavoritesScreen from '../FavoritesScreen';

describe('FavoritesScreen', () => {
    const mockAddToCart = jest.fn();
    const mockRemoveFromFavorites = jest.fn();

    it('renders empty message when there are no favorites', () => {
        const { getByText } = render(
            <FavoriteContext.Provider value={{ favorites: [], removeFromFavorites: mockRemoveFromFavorites }}>
                <CartContext.Provider value={{ addToCart: mockAddToCart }}>
                    <FavoritesScreen />
                </CartContext.Provider>
            </FavoriteContext.Provider>
        );

        expect(getByText('No favorites added!')).toBeTruthy();
    });

    it('renders FavoriteList when there are favorites', () => {
        const favorites = [
            { id: '1', name: 'Favorite Product 1' },
            { id: '2', name: 'Favorite Product 2' },
        ];

        const { getByText } = render(
            <FavoriteContext.Provider value={{ favorites, removeFromFavorites: mockRemoveFromFavorites }}>
                <CartContext.Provider value={{ addToCart: mockAddToCart }}>
                    <FavoritesScreen />
                </CartContext.Provider>
            </FavoriteContext.Provider>
        );

        // Favori ürünlerin render edildiğini kontrol et
        expect(getByText('Favorite Product 1')).toBeTruthy();
        expect(getByText('Favorite Product 2')).toBeTruthy();
    });
});
