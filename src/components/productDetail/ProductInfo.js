import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Colors } from '../../constants/Styles';

const ProductInfo = ({ product, addToFavorites, removeFromFavorites, favorites }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        // favorites dizisinde ürünün olup olmadığını kontrol et
        const isProductFavorite = favorites.some(x => x.id === product.id);
        setIsFavorite(isProductFavorite); 
    }, [favorites, product]);

    const toggleFavorite = () => {
        // Favori durumunu güncelle ve işlemi gerçekleştime
        const newFavoriteState = !isFavorite;
        setIsFavorite(newFavoriteState); 
        
        // Favorilere ekleme veya çıkarma işlemi
        if (newFavoriteState) {
            addToFavorites(product); // Favorilere ekle
        } else {
            removeFromFavorites(product.id); // Favorilerden çıkar
        }
    };

    return (
        <ScrollView style={styles.containerInfo}>
            <Image
                testID="product-image" // Test ID ekle
                style={styles.image}
                source={{ uri: product.image }}
                resizeMode="contain" // Görseli orantılı şekilde sığdır
            />
            <TouchableOpacity testID="favorite-icon" style={styles.favoriteIcon} onPress={toggleFavorite}>
                <FontAwesome
                    name={isFavorite ? 'star' : 'star-o'} // Favori durumuna göre yıldız ikonu değişiyor
                    size={30}
                    color={isFavorite ? Colors.primary900 : '#ccc'}
                />
            </TouchableOpacity>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    containerInfo: {
        flex: 5,
    },
    image: {
        width: '100%',
        height: undefined, // Yüksekliği otomatik olarak ayarlamak için
        aspectRatio: 640 / 480, // 640x480 boyut oranını korumak için
        marginBottom: 10,
        borderRadius: 5,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    productName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    productDescription: {
        fontSize: 13,
        marginBottom: 16,
        color: "#555"
    },
});

export default ProductInfo;
