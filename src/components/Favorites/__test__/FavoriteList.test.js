import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FavoriteList from '../FavoriteList'; 

const mockFavorites = [
  { id: 1, name: 'Product 1', price: '10.99', image: 'https://example.com/product1.jpg' },
  { id: 2, name: 'Product 2', price: '12.99', image: 'https://example.com/product2.jpg' },
];

describe('FavoriteList Component', () => {
  it('renders correctly with favorite products', () => {
    const { getByText } = render(<FavoriteList favorites={mockFavorites} />);

    // Favori ürünlerin adlarının doğru şekilde render edildiğini kontrol edelim
    expect(getByText('Product 1')).toBeTruthy();
    expect(getByText('Product 2')).toBeTruthy();
  });

  it('calls the removeFromFavorites function when removing a product from favorites', () => {
    const mockRemoveFromFavorites = jest.fn();
    const { getAllByTestId } = render(
      <FavoriteList
        favorites={mockFavorites}
        removeFromFavorites={mockRemoveFromFavorites}
      />
    );

    // Tüm favori kartlarındaki favori simgesini bulalım
    const favoriteIcons = getAllByTestId('favorite-icon');
    
    // İlk favori üründen kaldırmayı simüle edelim
    fireEvent.press(favoriteIcons[0]);

    // İlk ürüne ait removeFromFavorites fonksiyonunun çağrılıp çağrılmadığını kontrol edelim
    expect(mockRemoveFromFavorites).toHaveBeenCalledWith(1);
  });

  it('calls the productDetail function when navigating to product detail', () => {
    const mockProductDetail = jest.fn();
    const { getAllByTestId } = render(
      <FavoriteList
        favorites={mockFavorites}
        productDetail={mockProductDetail}
      />
    );

    // Tüm ürün kartlarını bulalım
    const productCards = getAllByTestId('product-card');

    // İlk ürün kartına basmayı simüle edelim
    fireEvent.press(productCards[0]);

    // İlk ürüne ait productDetail fonksiyonunun çağrıldığını kontrol edelim
    expect(mockProductDetail).toHaveBeenCalledWith(1);
  });

  it('calls the addToCart function when adding a product to the cart', () => {
    const mockAddToCart = jest.fn();
    const { getAllByText } = render(
      <FavoriteList
        favorites={mockFavorites}
        addToCart={mockAddToCart}
      />
    );

    // "Add to Cart" butonlarını bulalım
    const addToCartButtons = getAllByText('Add to Cart');

    // İlk ürüne ait "Add to Cart" butonuna basmayı simüle edelim
    fireEvent.press(addToCartButtons[0]);

    // İlk ürüne ait addToCart fonksiyonunun çağrıldığını kontrol edelim
    expect(mockAddToCart).toHaveBeenCalledWith(mockFavorites[0]);
  });
});
