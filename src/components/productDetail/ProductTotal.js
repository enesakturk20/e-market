import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native';

import Button from '../UI/Button';
import { Colors } from '../../constants/Styles';

const ProductTotal = ({ product, addToCart }) => {
    return (
        <View style={styles.totalContainer}>
            <View>
                <Text style={styles.totalText}>Price:</Text>
                <Text style={styles.totalPrice}>${product.price}</Text>
            </View>
            <Button onPress={() => addToCart(product)} backgroundColor={Colors.primary700}>
                {'Add to Cart'}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    totalContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: Platform.OS == "ios" ? 8 : 0,
        borderTopWidth: 2,
        borderTopColor: '#ccc',
        alignItems: 'center',
    },
    totalText: {
        fontSize: 20,
        color: Colors.primary300
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: 'bold'
    },
});

export default ProductTotal