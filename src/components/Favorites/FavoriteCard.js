import React, { useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Button from '../UI/Button';
import { Colors } from '../../constants/Styles';

const FavoriteCard = ({ product, onAddToCart, productDetail, removeFromFavorites }) => {

  const toggleFavorite = () => {
    removeFromFavorites(product.id); // Favorilerden çıkar
  };

  return (
    <TouchableOpacity testID="product-card" style={styles.card} onPress={() => productDetail(product.id)}>
      <Image testID="product-image" style={styles.image} source={{ uri: product.image }} />
      <TouchableOpacity testID="favorite-icon" style={styles.favoriteIcon} onPress={toggleFavorite}>
        <FontAwesome
          name='star'
          size={22}
          color={Colors.primary900}
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
    padding: 16,
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

export default FavoriteCard;
