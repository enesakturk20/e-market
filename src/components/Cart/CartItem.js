import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { Colors } from '../../constants/Styles';

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
    return (
        <View style={styles.cartItem}>
            <TouchableOpacity onPress={() => removeFromCart(item.id)} testID='removeButton'>
                <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} testID='MinusCircle'>
                    <AntDesign name='minuscircle' size={24} color={Colors.primary300} />
                </TouchableOpacity>
                <Text style={styles.productQuantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)} testID='PlusCircle'>
                    <AntDesign name='pluscircle' size={24} color={Colors.primary300} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    cartItem: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 60,
        height: 60,
        marginRight: 16,
        marginLeft: 16,
        borderRadius: 5
    },
    productDetails: {
        flex: 1,
        marginHorizontal: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        color: '#555',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productQuantity: {
        fontSize: 16,
        marginHorizontal: 20,
    },
    quantityButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007bff',
    },
})

export default CartItem