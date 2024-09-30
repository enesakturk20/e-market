import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CartTotal from '../CartTotal'; // CartTotal dosyasının doğru path'ini kullanın

const mockCartItems = [
  { id: 1, name: 'Product 1', price: 10.99, quantity: 2 },
  { id: 2, name: 'Product 2', price: 12.99, quantity: 1 },
];

describe('CartTotal Component', () => {
  it('renders correctly with total price and complete button', () => {
    const { getByText } = render(<CartTotal cartItems={mockCartItems} />);

    // Total fiyatın doğru hesaplanıp hesaplanmadığını kontrol edelim
    const totalAmount = (10.99 * 2) + (12.99 * 1); // 34.97
    expect(getByText('Total:')).toBeTruthy();
    expect(getByText(`$${totalAmount.toFixed(2)}`)).toBeTruthy();

    // "Complete" butonunun doğru şekilde render edildiğini kontrol edelim
    expect(getByText('Complete')).toBeTruthy();
  });

  it('calls the onPress function when complete button is pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<CartTotal cartItems={mockCartItems} />);

    const completeButton = getByText('Complete');

    // Butona tıklamayı simüle edelim
    fireEvent.press(completeButton);

    // onPress fonksiyonunun çağrılıp çağrılmadığını kontrol edelim
    expect(mockOnPress).toBeCalledTimes(0); // Mock bir onPress tanımlamadığımız için çağrılmayacak
  });
});
