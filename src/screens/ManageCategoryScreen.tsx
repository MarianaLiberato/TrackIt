import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import IconSelection from '../components/IconSelection'; // Import the icon selection component
import { Category, addCategory, getCategories } from '../data/data'; // Import data functions
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library

const DEFAULT_ICON = 'book'

const ManageCategoriesScreen = ({ route, navigation }) => {
  const { categoryId, categoryName: initName } = route.params;
  const [categoryName, setCategoryName] = useState(initName);
  const [selectedIcon, setSelectedIcon] = useState(DEFAULT_ICON); // Default icon

  const handleUpdateCategory = async () => {
    const newCategory = {
      id: categoryId,
      name: categoryName,
      icon: selectedIcon,
    };

    try {
      // Add the category to AsyncStorage
      await addCategory(newCategory);
      // Update the component state with the updated list of categories

      // Clear input fields and selected icon after adding
      setCategoryName('');
      setSelectedIcon(DEFAULT_ICON); // Reset to the default icon
      navigation.goBack()
    } catch (error) {
      // Handle error
      console.error('Error adding category:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter category name"
        value={categoryName}
        onChangeText={(text) => setCategoryName(text)}
      />

      {/* Render the IconSelection component */}
      <IconSelection selectedIcon={selectedIcon} onSelectIcon={setSelectedIcon} />

      <Button title="Update Category" onPress={handleUpdateCategory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    marginBottom: 15,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default ManageCategoriesScreen;
