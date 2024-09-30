import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Expo Vector Icons kullanımı

import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Colors } from '../constants/Styles';
import { CartContext } from '../context/CartContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary300,
        },
        headerTintColor: Colors.primary100,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'E-Market' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerBackTitleVisible: false }} />
    </Stack.Navigator>
  );
};

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary300,
        },
        headerTintColor: Colors.primary100,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="FavoritesList" component={FavoritesScreen} options={{ title: 'Favorites' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerBackTitleVisible: false }} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === 'Products') {
              iconName = focused ? 'list' : 'list-outline';
            }
            else if (route.name === "Favorites") {
              iconName = focused ? "star" : "star-outline";
            }
            else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            }

            return (
              <View style={{ position: 'relative' }}>
                <Ionicons name={iconName} size={24} color={color} />
                {route.name === 'Cart' && cartItems.length > 0 && (
                  <View style={{
                    position: 'absolute',
                    right: -10,
                    top: -10,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                  }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      {cartItems.length}
                    </Text>
                  </View>
                )}
              </View>
            );
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: Colors.primary300,
          },
          headerTintColor: Colors.primary100,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen name="Products" component={ProductStack} options={{ headerShown: false }} />
        <Tab.Screen name="Favorites" component={FavoritesStack} options={{ headerShown: false }} />
        <Tab.Screen name="Cart" component={CartScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
