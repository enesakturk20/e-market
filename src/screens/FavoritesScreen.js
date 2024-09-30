import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { CartContext } from '../context/CartContext';
import { FavoriteContext } from '../context/FavoriteContext';
import FavoriteList from '../components/Favorites/FavoriteList';

const FavoritesScreen = ({ navigation }) => {
    const { addToCart } = useContext(CartContext); 
    const { favorites, removeFromFavorites } = useContext(FavoriteContext); 

    if (favorites.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No favorites added!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FavoriteList
                favorites={favorites}
                addToCart={addToCart}
                removeFromFavorites={removeFromFavorites}
                productDetail={(productId) => navigation.navigate('ProductDetail', { productId })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
    },
});

export default FavoritesScreen;
