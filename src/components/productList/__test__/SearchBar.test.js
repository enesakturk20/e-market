import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
    let setSearchQueryMock;

    beforeEach(() => {
        setSearchQueryMock = jest.fn();
    });

    test('renders correctly with default props', () => {
        const { getByPlaceholderText } = render(
            <SearchBar searchQuery="" setSearchQuery={setSearchQueryMock} />
        );

        // Arama inputunun doğru şekilde render edildiğini kontrol et
        const input = getByPlaceholderText('Search...');
        expect(input).toBeTruthy();
    });

    test('updates search query on text input', () => {
        const { getByPlaceholderText } = render(
            <SearchBar searchQuery="" setSearchQuery={setSearchQueryMock} />
        );

        const input = getByPlaceholderText('Search...');

        // Kullanıcı arama kutusuna metin girdiğinde setSearchQuery fonksiyonunun çağrıldığını kontrol et
        fireEvent.changeText(input, 'New Query');
        expect(setSearchQueryMock).toHaveBeenCalledWith('New Query');
    });

    test('clears search query when clear icon is pressed', () => {
        const { getByPlaceholderText, getByRole } = render(
            <SearchBar searchQuery="Existing Query" setSearchQuery={setSearchQueryMock} />
        );

        const input = getByPlaceholderText('Search...');
        const clearIcon = getByRole('button'); // Temizleme ikonunu buton olarak al

        // Temizleme ikonuna basıldığında setSearchQuery fonksiyonunun boş bir değerle çağrıldığını kontrol et
        fireEvent.press(clearIcon);
        expect(setSearchQueryMock).toHaveBeenCalledWith('');
    });
});
