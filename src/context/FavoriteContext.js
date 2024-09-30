import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Uygulama ilk açıldığında favori verilerini yükler
    useEffect(() => {
        const fetchFavorites = async () => {
            await loadFavoritesFromStorage();
        };
        fetchFavorites();
    }, []);

    // Favori verileri değiştiğinde AsyncStorage'a kaydeder
    useEffect(() => {
        const fetchFavorites = async () => {
            saveFavoritesToStorage();
        };
        fetchFavorites();
    }, [favorites]);

    // Favorileri AsyncStorage'a kaydet
    const saveFavoritesToStorage = async () => {
        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error('Error saving favorites to storage:', error);
        }
    };

    // Favorileri AsyncStorage'dan yükle
    const loadFavoritesFromStorage = async () => {
        try {
            const storedFavoriteItems = await AsyncStorage.getItem('favorites');
            if (storedFavoriteItems) {
                setFavorites(JSON.parse(storedFavoriteItems));
            }
        } catch (error) {
            console.error('Error loading favorites from storage:', error);
        }
    };

    // Favorilere ürün ekleme fonksiyonu
    const addToFavorites = useCallback((product) => {
        setFavorites((prevFavorites) => {
            const exists = prevFavorites.some((item) => item.id === product.id);
            if (!exists) {
                return [...prevFavorites, product]; // Eğer ürün yoksa ekle
            }
            return prevFavorites; // Ürün zaten favorilerdeyse hiçbir şey yapma
        });
    }, []);

    // Favorilerden ürün çıkarma fonksiyonu
    const removeFromFavorites = useCallback((productId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.filter((product) => product.id !== productId)
        );
    }, []);

    return (
        <FavoriteContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};
