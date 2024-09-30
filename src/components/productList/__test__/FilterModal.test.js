import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FilterModal from '../FilterModal'; // Bileşenin doğru yolunu kontrol edin

describe('FilterModal Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <FilterModal 
        filterVisible={true} 
        setFilterVisible={() => {}} 
        setSortOption={() => {}} // Mock fonksiyon geçin
      />
    );
    expect(getByText('Filter')).toBeTruthy(); // Modal açıldığında görünmeli
  });

  it('should apply filters when the Apply Filter button is pressed', () => {
    const mockSetSortOption = jest.fn();
    const { getByText } = render(
      <FilterModal 
        filterVisible={true} 
        setFilterVisible={() => {}} 
        setSortOption={mockSetSortOption} // setSortOption fonksiyonunu geçin
      />
    );

    // "Old to New" seçeneğini seçelim
    fireEvent.press(getByText('Old to New'));

    // "Apply Filter" butonuna bas
    fireEvent.press(getByText('Apply Filter'));

    // setSortOption fonksiyonunun çağrılıp çağrılmadığını kontrol et
    expect(mockSetSortOption).toHaveBeenCalledWith('oldToNew'); // Seçilen seçenek ile birlikte çağrılmalı
  });
});
