// src/screens/__test__/ProductDetailScreen.test.js
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { CartContext } from '../../context/CartContext';
import { FavoriteContext } from '../../context/FavoriteContext';
import ProductDetailScreen from '../ProductDetailScreen';
import { getProductDetail } from '../../services/productService';

jest.mock('../../services/productService');

describe('ProductDetailScreen', () => {
  const mockAddToCart = jest.fn();
  const mockAddToFavorites = jest.fn();
  const mockRemoveFromFavorites = jest.fn();

  beforeEach(() => {
    getProductDetail.mockResolvedValue({
      id: '1',
      name: 'Test Product',
      price: 100,
      // Diğer gerekli alanları ekleyin
    });
  });

  it('renders loading overlay while fetching product detail', () => {
    const { getByText } = render(
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        <FavoriteContext.Provider value={{ addToFavorites: mockAddToFavorites, removeFromFavorites: mockRemoveFromFavorites, favorites: [] }}>
          <ProductDetailScreen route={{ params: { productId: '1' } }} />
        </FavoriteContext.Provider>
      </CartContext.Provider>
    );

    expect(getByText('Yükleniyor...')).toBeTruthy();
  });

  it('renders product details when product is fetched successfully', async () => {
    const { getByText } = render(
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        <FavoriteContext.Provider value={{ addToFavorites: mockAddToFavorites, removeFromFavorites: mockRemoveFromFavorites, favorites: [] }}>
          <ProductDetailScreen route={{ params: { productId: '1' } }} />
        </FavoriteContext.Provider>
      </CartContext.Provider>
    );

    // Yüklenmesi gereken içeriklerin render edilmesini bekleyin
    await waitFor(() => {
      expect(getByText('Test Product')).toBeTruthy();
      expect(getByText('$100')).toBeTruthy(); // Ürün fiyatını kontrol edin
    });
  });

  it('renders an empty message if the product is not found', async () => {
    getProductDetail.mockRejectedValue(new Error('Product not found'));

    const { getByText } = render(
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        <FavoriteContext.Provider value={{ addToFavorites: mockAddToFavorites, removeFromFavorites: mockRemoveFromFavorites, favorites: [] }}>
          <ProductDetailScreen route={{ params: { productId: '1' } }} />
        </FavoriteContext.Provider>
      </CartContext.Provider>
    );

    // Ürün bulunamadığında boş mesajın görünmesini bekleyin
    await waitFor(() => {
      expect(getByText('Product not found!')).toBeTruthy();
    });
  });
});
