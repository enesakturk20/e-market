import React from 'react';
import { render } from '@testing-library/react-native';
import ProductList from '../ProductList';

// LoadingOverlay'ı mock'layalım
jest.mock('../../UI/LoadingOverlay', () => () => <div testID="mock-loading-overlay">Loading...</div>);

describe('ProductList Bileşeni', () => {
    const mockProducts = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
    ];

    const mockFavorites = [{ id: 1 }, { id: 2 }]; // Favori ürünler

    it('ürün listesini doğru bir şekilde render etmelidir', () => {
        const { getByText } = render(<ProductList products={mockProducts} loading={false} favorites={mockFavorites} />);
        
        // Ürünlerin adlarını kontrol et
        expect(getByText('Product 1')).toBeTruthy();
        expect(getByText('Product 2')).toBeTruthy();
    });

    it('loading true olduğunda LoadingOverlay bileşenini göstermelidir', () => {
        const { getByTestId } = render(<ProductList products={[]} loading={true} />);
        
        // LoadingOverlay'ın görünürlüğünü kontrol et
        expect(getByTestId('mock-loading-overlay')).toBeTruthy();
    });
});
