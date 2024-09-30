import React from 'react';
import { CartProvider } from './src/context/CartContext';
import { FavoriteProvider } from './src/context/FavoriteContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <CartProvider>
      <FavoriteProvider>
        <AppNavigator />
      </FavoriteProvider>
    </CartProvider>
  );
}
