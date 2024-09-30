import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingOverlay from '../LoadingOverlay';

describe('LoadingOverlay', () => {
    it('renders correctly with message', () => {
        const { getByText, getByTestId } = render(<LoadingOverlay message="Loading..." />);

        // Mesajın render edildiğini kontrol et
        expect(getByText('Loading...')).toBeTruthy();

        // ActivityIndicator'ın render edildiğini kontrol et
        const activityIndicator = getByTestId('loading-indicator');
        expect(activityIndicator).toBeTruthy();
    });

    it('renders correctly with a different message', () => {
        const { getByText } = render(<LoadingOverlay message="Please wait..." />);

        // Farklı mesajın render edildiğini kontrol et
        expect(getByText('Please wait...')).toBeTruthy();
    });
});
