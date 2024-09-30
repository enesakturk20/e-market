import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';
import CartList from '../components/Cart/CartList';
import CartTotal from '../components/Cart/CartTotal';
import { globalStyles } from '../styles/globalStyles';

const CartScreen = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    <View style={globalStyles.container}>
      {cartItems.length < 1 || !cartItems ?
        <View style={styles.emptyCart}>
          <Text>No items found in the cart!</Text>
        </View>
        :
        <View style={{ flex: 1 }}>
          <CartList cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
          <CartTotal cartItems={cartItems} />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CartScreen;
