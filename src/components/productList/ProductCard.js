import React, { useState, useEffect } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Button from '../UI/Button';
import { Colors } from '../../constants/Styles';

const ProductCard = ({ product, favorites, onAddToCart, productDetail, addToFavorites, removeFromFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    try {
      setIsFavorite(favorites.some((item) => item.id === product.id));
    } catch (error) {
      console.error('Hata:', error);
    }
  }, [favorites, product.id]);

  const toggleFavorite = () => {
    if (!isFavorite) {
      addToFavorites(product);
      setIsFavorite(true); // Favorilere eklendiğinde state güncellenir
    } else {
      removeFromFavorites(product.id);
      setIsFavorite(false); // Favorilerden çıkarıldığında state güncellenir
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => productDetail(product.id)}>
      <Image style={styles.image} source={{ uri: product.image }} />
      <TouchableOpacity style={styles.favoriteIcon} onPress={toggleFavorite} testID="favorite-icon">
        <FontAwesome
          name={isFavorite ? 'star' : 'star-o'}
          size={22}
          color={isFavorite ? Colors.primary900 : '#ccc'}
        />
      </TouchableOpacity>
      <Text style={styles.price}>{product.price} $</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Button onPress={() => onAddToCart(product)} backgroundColor={Colors.primary300}>
        {'Add to Cart'}
      </Button>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "space-between"
  },
  image: {
    width: "100%",
    height: 180,
    marginBottom: 10,
    borderRadius: 5,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
});

export default ProductCard;
