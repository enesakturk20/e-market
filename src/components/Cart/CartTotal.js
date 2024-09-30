import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native';

import Button from '../UI/Button';
import { Colors } from '../../constants/Styles';

const CartTotal = ({ cartItems }) => {

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <View style={styles.totalContainer}>
            <View>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalPrice}>${totalAmount.toFixed(2)}</Text>
            </View>
            <Button onPress={() => { Alert.alert("Satın Alma işlemi başarılı.") }} backgroundColor={Colors.primary700}>
                {'Complete'}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    totalContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 20,
        padding: 16,
        borderTopWidth: 1,
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

export default CartTotal