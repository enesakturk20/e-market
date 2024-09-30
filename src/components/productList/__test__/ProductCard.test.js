import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductCard from '../ProductCard';

describe('ProductCard Component', () => {
  const mockProduct = { id: '1', name: 'Sample Product', price: 20, image: 'sample-image-url' };
  const mockAddToFavorites = jest.fn();
  const mockRemoveFromFavorites = jest.fn();
  const mockProductDetail = jest.fn();
  const mockOnAddToCart = jest.fn();

  test('should update favorite icon when toggled', () => {
    const { getByTestId, rerender } = render(
      <ProductCard 
        product={mockProduct}
        favorites={[]} // Başlangıçta favori yok
        onAddToCart={mockOnAddToCart}
        productDetail={mockProductDetail}
        addToFavorites={mockAddToFavorites}
        removeFromFavorites={mockRemoveFromFavorites}
      />
    );

    // Başlangıçta favori ikonu boş olmalı
    expect(getByTestId('favorite-icon').children[0].props.name).toBe('star-o');

    // Favori ikonuna tıkla
    fireEvent.press(getByTestId('favorite-icon'));

    // Favori ikonunun dolu olduğunu kontrol et
    expect(mockAddToFavorites).toHaveBeenCalledWith(mockProduct); // Favorilere eklenmiş olmalı

    // Bileşeni yeniden render et
    rerender(
      <ProductCard 
        product={mockProduct}
        favorites={[mockProduct]} // Artık favoride olmalı
        onAddToCart={mockOnAddToCart}
        productDetail={mockProductDetail}
        addToFavorites={mockAddToFavorites}
        removeFromFavorites={mockRemoveFromFavorites}
      />
    );

    // İkonun dolu olduğunu kontrol et
    expect(getByTestId('favorite-icon').children[0].props.name).toBe('star'); // İkon dolu olmalı
  });

  test('should remove from favorites when favorite icon is pressed again', () => {
    const { getByTestId, rerender } = render(
      <ProductCard 
        product={mockProduct}
        favorites={[mockProduct]} // Başlangıçta favori var
        onAddToCart={mockOnAddToCart}
        productDetail={mockProductDetail}
        addToFavorites={mockAddToFavorites}
        removeFromFavorites={mockRemoveFromFavorites}
      />
    );

    // Favori ikonunun dolu olduğunu kontrol et
    expect(getByTestId('favorite-icon').children[0].props.name).toBe('star');

    // Favori ikonuna tıkla
    fireEvent.press(getByTestId('favorite-icon'));
    expect(mockRemoveFromFavorites).toHaveBeenCalledWith(mockProduct.id); // Favorilerden çıkarılmış olmalı

    // Bileşeni yeniden render et
    rerender(
      <ProductCard 
        product={mockProduct}
        favorites={[]} // Artık favoride olmamalı
        onAddToCart={mockOnAddToCart}
        productDetail={mockProductDetail}
        addToFavorites={mockAddToFavorites}
        removeFromFavorites={mockRemoveFromFavorites}
      />
    );

    // İkonun boş olduğunu kontrol et
    expect(getByTestId('favorite-icon').children[0].props.name).toBe('star-o'); // İkon boş olmalı
  });
});
