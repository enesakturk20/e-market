import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button'; 

describe('Button', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Button>Test Button</Button>);
        const buttonElement = getByText('Test Button');
        
        expect(buttonElement).toBeTruthy(); // Buton metni doğru bir şekilde render edildi mi?
    });

    it('calls onPress when pressed', () => {
        const mockOnPress = jest.fn(); // jest.fn() ile bir mock fonksiyonu oluştur
        const { getByText } = render(<Button onPress={mockOnPress}>Press Me</Button>);
        
        const buttonElement = getByText('Press Me');
        fireEvent.press(buttonElement); // Butona bas
        expect(mockOnPress).toHaveBeenCalledTimes(1); // onPress fonksiyonu bir kez çağrıldı mı?
    });

    it('applies correct background color', () => {
        const { getByTestId } = render(<Button backgroundColor="#ff0000">Color Button</Button>);
        
        const pressableElement = getByTestId('button-pressable');
        expect(pressableElement).toHaveStyle({ backgroundColor: '#ff0000' }); // Arka plan rengini kontrol et
    });
    
});
