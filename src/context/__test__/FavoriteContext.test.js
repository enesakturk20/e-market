import React from 'react';
import { Text } from 'react-native';
import { render, screen, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteProvider, FavoriteContext } from '../FavoriteContext';

describe('FavoriteContext', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Her testten sonra mock'ları temizler
    });

    // AsyncStorage'dan favori öğeleri yükleme testi
    it('should load favorite items from AsyncStorage on mount', async () => {
        const storedFavorites = JSON.stringify([{ id: 1, name: 'Test Product' }]);
        AsyncStorage.getItem = jest.fn().mockResolvedValue(storedFavorites);

        const TestComponent = () => {
            const { favorites } = React.useContext(FavoriteContext);
            return <Text testID="favorite-count">{favorites.length}</Text>;
        };

        render(
            <FavoriteProvider>
                <TestComponent />
            </FavoriteProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('favorite-count')).toHaveTextContent('1');
        });
    });

    // Favorilere ürün ekleme testi
    it('should add a product to the favorites', () => {
        const TestComponent = () => {
            const { favorites, addToFavorites } = React.useContext(FavoriteContext);

            // İlk render'da favoriler 0 olmalı
            React.useEffect(() => {
                addToFavorites({ id: 1, name: 'Test Product' });
            }, []);

            return <Text testID="favorite-count">{favorites.length}</Text>;
        };

        render(
            <FavoriteProvider>
                <TestComponent />
            </FavoriteProvider>
        );

        expect(screen.getByTestId('favorite-count')).toHaveTextContent('1');
    });

    // Favorilerden ürün çıkarma testi
    it('should remove a product from the favorites', () => {
        const TestComponent = () => {
            const { favorites, addToFavorites, removeFromFavorites } = React.useContext(FavoriteContext);

            React.useEffect(() => {
                addToFavorites({ id: 1, name: 'Test Product' });
                removeFromFavorites(1);
            }, []);

            return <Text testID="favorite-count">{favorites.length}</Text>;
        };

        render(
            <FavoriteProvider>
                <TestComponent />
            </FavoriteProvider>
        );

        expect(screen.getByTestId('favorite-count')).toHaveTextContent('0');
    });

    // Aynı ürünü favorilere eklemeyi önleme testi
    it('should not add duplicate products to the favorites', () => {
        const TestComponent = () => {
            const { favorites, addToFavorites } = React.useContext(FavoriteContext);

            React.useEffect(() => {
                addToFavorites({ id: 1, name: 'Test Product' });
                addToFavorites({ id: 1, name: 'Test Product' }); // Aynı ürün tekrar eklenmeye çalışılıyor
            }, []);

            return <Text testID="favorite-count">{favorites.length}</Text>;
        };

        render(
            <FavoriteProvider>
                <TestComponent />
            </FavoriteProvider>
        );

        expect(screen.getByTestId('favorite-count')).toHaveTextContent('1'); // Aynı ürün eklenmemeli
    });
});
