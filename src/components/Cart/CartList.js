import React from 'react'
import { FlatList } from 'react-native';

import CartItem from './CartItem';

const CartList = ({ cartItems, removeFromCart, updateQuantity }) => {

    const renderItem = ({ item }) => <CartItem item={item} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />

    return (
        <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
}

export default CartList