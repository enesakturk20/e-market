import React from 'react';
import { FlatList } from 'react-native';
import ProductCard from './ProductCard';
import LoadingOverlay from '../UI/LoadingOverlay';

const ProductList = React.memo(({ products, favorites, onAddToCart, productDetail, loading, onLoadMore, addToFavorites, removeFromFavorites }) => {

    const renderItem = ({ item }) => <ProductCard product={item} favorites={favorites} onAddToCart={onAddToCart} productDetail={productDetail} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />

    return (
        <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // İki sütunlu bir grid oluşturmak için
            onEndReached={onLoadMore} // Sonsuz kaydırma için
            //onEndReachedThreshold={0.5} // Alt kısma %50 yaklaşınca yeni ürünleri yükler
            initialNumToRender={12} // İlk renderda gösterilecek eleman sayısı
            maxToRenderPerBatch={12} // Her seferde render edilecek maksimum eleman sayısı
            ListFooterComponent={loading && <LoadingOverlay />} // Alt kısımda yükleme göstergesi
        />
    );
});

export default ProductList;
