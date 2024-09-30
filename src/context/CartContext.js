import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Uygulama ilk açıldığında sepet verilerini yükler
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  // Sepet verileri değiştiğinde AsyncStorage'a kaydeder
  useEffect(() => {
    saveCartToStorage();
  }, [cartItems]);

  // Sepettekileri AsyncStorage'a kaydet
  const saveCartToStorage = async () => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart items to storage:', error);
    }
  };

  // Sepettekileri AsyncStorage'dan yükle
  const loadCartFromStorage = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cartItems');
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    } catch (error) {
      console.error('Error loading cart items from storage:', error);
    }
  };

  // Sepete ürün ekleme fonksiyonu
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 } // Miktarı artır
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }]; // Yeni ürün ekle
      }
    });
  };

  // Sepetteki ürün miktarını güncelleme fonksiyonu
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity < 1 ? 1 : newQuantity } // Miktarı güncelle, 1'den az olamaz
          : item
      )
    );
  };

  // Sepetten ürün çıkarma fonksiyonu
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Sepeti temizleme fonksiyonu
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
