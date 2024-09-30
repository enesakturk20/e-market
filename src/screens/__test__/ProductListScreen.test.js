import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { CartContext } from '../../context/CartContext';
import { FavoriteContext } from '../../context/FavoriteContext';
import ProductListScreen from '../ProductListScreen';
import { getProducts } from '../../services/productService';

jest.mock('../../services/productService');

describe('ProductListScreen', () => {
  const mockAddToCart = jest.fn();
  const mockAddToFavorites = jest.fn();
  const mockRemoveFromFavorites = jest.fn();

  beforeEach(() => {
    getProducts.mockResolvedValue([
      { id: '1', name: 'Test Product 1', price: 100, createdAt: '2023-09-25' },
      { id: '2', name: 'Test Product 2', price: 200, createdAt: '2023-09-24' },
    ]);
  });

  it('renders loading overlay initially', () => {
    const { getByText } = render(
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        <FavoriteContext.Provider value={{ favorites: [], addToFavorites: mockAddToFavorites, removeFromFavorites: mockRemoveFromFavorites }}>
          <ProductListScreen navigation={{ navigate: jest.fn() }} />
        </FavoriteContext.Provider>
      </CartContext.Provider>
    );

    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders product list after fetching products', async () => {
    const { getByText } = render(
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        <FavoriteContext.Provider value={{ favorites: [], addToFavorites: mockAddToFavorites, removeFromFavorites: mockRemoveFromFavorites }}>
          <ProductListScreen navigation={{ navigate: jest.fn() }} />
        </FavoriteContext.Provider>
      </CartContext.Provider>
    );

    // Ürünlerin başarıyla yüklenmesini bekleyin
    await waitFor(() => {
      expect(getByText('Test Product 1')).toBeTruthy();
      expect(getByText('Test Product 2')).toBeTruthy();
    });
  });

  it('renders empty list when no products found', async () => {
    getProducts.mockResolvedValue([]); // Boş bir dizi döndür

    const { getByText } = render(
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        <FavoriteContext.Provider value={{ favorites: [], addToFavorites: mockAddToFavorites, removeFromFavorites: mockRemoveFromFavorites }}>
          <ProductListScreen navigation={{ navigate: jest.fn() }} />
        </FavoriteContext.Provider>
      </CartContext.Provider>
    );

    await waitFor(() => {
      expect(getByText('No products found!')).toBeTruthy(); // Eğer böyle bir mesaj gösteriyorsanız
    });
  });

  it('filters products based on search query', async () => {
    const { getByText, getByPlaceholderText } = render(
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        <FavoriteContext.Provider value={{ favorites: [], addToFavorites: mockAddToFavorites, removeFromFavorites: mockRemoveFromFavorites }}>
          <ProductListScreen navigation={{ navigate: jest.fn() }} />
        </FavoriteContext.Provider>
      </CartContext.Provider>
    );

    // Arama çubuğunu bul ve sorguyu ayarla
    const searchInput = getByPlaceholderText('Search...'); // Arama çubuğunun yerini ayarlayın
    fireEvent.changeText(searchInput, 'Test Product 1'); // Arama çubuğuna metin yazın

    // Filtrele
    await waitFor(() => {
      expect(getByText('Test Product 1')).toBeTruthy();
      expect(() => getByText('Test Product 2')).toThrow(); // Diğer ürünü görmemeliyiz
    });
  });
});
