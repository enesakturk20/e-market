import React from 'react';
import { FlatList } from 'react-native';

import FavoriteCard from './FavoriteCard';

const FavoriteList = ({ favorites, addToCart, removeFromFavorites, productDetail }) => {
    return (
        
            <FlatList
                data={favorites}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <FavoriteCard
                        product={item}
                        onAddToCart={addToCart}
                        removeFromFavorites={removeFromFavorites}
                        productDetail={productDetail} // Ürün detayına gitme fonksiyonu
                    />
                )}
            />
        
    );
};

export default FavoriteList;
