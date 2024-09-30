import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Styles';

const SearchBar = ({ searchQuery, setSearchQuery }) => {

    // Temizleme fonksiyonu
    const clearSearch = () => {
        setSearchQuery('');
    };

    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color="#555" style={styles.icon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
                <TouchableOpacity onPress={clearSearch} accessibilityRole="button">
                    <Ionicons name="close-circle" size={20} color="#ccc" style={styles.clearIcon} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginHorizontal: 5,
    },
    icon: {
        marginRight: 10, 
    },
    searchInput: {
        flex: 1, 
        height: 40,
    },
});

export default SearchBar;
