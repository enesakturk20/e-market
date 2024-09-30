import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getProductDetail } from '../services/productService';
import { CartContext } from '../context/CartContext';
import { FavoriteContext } from '../context/FavoriteContext';
import { globalStyles } from '../styles/globalStyles';
import ProductInfo from '../components/productDetail/ProductInfo';
import ProductTotal from '../components/productDetail/ProductTotal';
import LoadingOverlay from '../components/UI/LoadingOverlay';

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params; // Parametre olarak gelen ürün ID'sini alıyoruz

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const { addToCart } = useContext(CartContext); // Sepete ekleme fonksiyonunu CartContext'ten alıyoruz
  const { addToFavorites, removeFromFavorites, favorites } = useContext(FavoriteContext); 

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      const productData = await getProductDetail(productId);
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product detail:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingOverlay message="Yükleniyor..." />
  }

  return (
    <View style={globalStyles.container}>
      {product ? (
        <View style={styles.container}>
          <ProductInfo product={product} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} favorites={favorites} />
          <ProductTotal product={product} addToCart={addToCart} />
        </View>
      ) : (
        <View style={styles.emptyCart}>
          <Text>Product not found!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProductDetailScreen;
