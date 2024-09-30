import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getProducts } from '../services/productService';
import { CartContext } from '../context/CartContext';
import { FavoriteContext } from '../context/FavoriteContext';
import ProductList from '../components/productList/ProductList';
import { globalStyles } from '../styles/globalStyles';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { Colors } from '../constants/Styles';
import Button from '../components/UI/Button';
import SearchBar from '../components/productList/SearchBar';
import FilterModal from '../components/productList/FilterModal';

const ProductListScreen = ({ navigation }) => {
  const { addToCart } = useContext(CartContext);
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoriteContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortOption, setSortOption] = useState(''); // Sıralama seçeneği

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const newProducts = await getProducts(page);
      if (newProducts.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const filterProducts = () => {
    let filteredProducts = products;

    // Arama terimine göre filtrele
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sıralama seçeneklerine göre sıralama
    if (sortOption) {
      switch (sortOption) {
        case 'newToOld':
          filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'oldToNew':
          filteredProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case 'priceLowToHigh':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'priceHighToLow':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
    }

    return filteredProducts;
  };

  return (
    <View style={globalStyles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filters:</Text>
        <Button onPress={() => setFilterVisible(true)} backgroundColor={Colors.primary300}>
          {'Select Filter'}
        </Button>
      </View>

      <FilterModal
        filterVisible={filterVisible}
        setFilterVisible={setFilterVisible}
        setSortOption={setSortOption} // Sıralama seçeneğini güncelle
      />

      {loading && page === 1 ? (
        <LoadingOverlay message="Loading..." />
      ) : products.length === 0 ? (
        <Text>No products found!</Text>  // Bu satırı ekleyin
      ) : (
        <ProductList
          products={filterProducts()}
          favorites={favorites}
          onAddToCart={addToCart}
          productDetail={(productId) => navigation.navigate('ProductDetail', { productId })}
          loading={loading}
          onLoadMore={handleLoadMore}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 5,
  },
  filterText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ProductListScreen;
