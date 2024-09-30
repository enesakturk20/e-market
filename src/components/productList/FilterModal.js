import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import Button from '../UI/Button';
import { Colors } from '../../constants/Styles';
import { Ionicons } from '@expo/vector-icons';

const FilterModal = ({ filterVisible, setFilterVisible, setSortOption }) => {
  const [selectedSortOption, setSelectedSortOption] = React.useState('');

  const handleSortOptionChange = (option) => {
    setSelectedSortOption(option);
  };

  const applyFilter = () => {
    setSortOption(selectedSortOption); // Apply Filters butonuna basıldığında sortOption ayarlanır
    setFilterVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={filterVisible}
      onRequestClose={() => setFilterVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Filter</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setFilterVisible(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.sortOptionsTitle}>Sort By</Text>
            <TouchableOpacity onPress={() => handleSortOptionChange('oldToNew')}>
              <View style={styles.checkboxContainer}>
                <Checkbox value={selectedSortOption === 'oldToNew'} />
                <Text style={styles.checkboxLabel}>Old to New</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSortOptionChange('newToOld')}>
              <View style={styles.checkboxContainer}>
                <Checkbox value={selectedSortOption === 'newToOld'} />
                <Text style={styles.checkboxLabel}>New to Old</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSortOptionChange('priceLowToHigh')}>
              <View style={styles.checkboxContainer}>
                <Checkbox value={selectedSortOption === 'priceLowToHigh'} />
                <Text style={styles.checkboxLabel}>Price Low to High</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSortOptionChange('priceHighToLow')}>
              <View style={styles.checkboxContainer}>
                <Checkbox value={selectedSortOption === 'priceHighToLow'} />
                <Text style={styles.checkboxLabel}>Price High to Low</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button onPress={applyFilter} backgroundColor={Colors.primary300}>
              {"Apply Filter"}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Arka plan için yarı saydam bir renk
  },
  modalContent: {
    width: '90%', // Genişlik
    height: '70%', // Yükseklik
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'relative', // İçerik konumlandırması için
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  closeButton: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Başlığı ortalama
    flex: 1, // Başlık alanının esnemesi için
  },
  sortOptionsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 15,
    color: "#999"
  },
  scrollView: {
    flexGrow: 1, // ScrollView içeriğinin esnemesi için
    marginBottom: 20, // Butonlarla olan mesafeyi artırmak için
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row', // Butonları yan yana getirmek için
    justifyContent: 'flex-end', // Butonları ortalamak için
    marginTop: 10, // Butonlar için yukarıdan boşluk
  },
});

export default FilterModal;
