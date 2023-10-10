import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import IconSelection from '../components/IconSelection'; // Import the icon selection component
import { Category, addCategory, getCategories } from '../data/data'; // Import data functions
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import Screen from '../components/Screen';
import {theme} from '../constants/Theme';
import GradientButton from '../components/GradientButton';
import TText from '../components/TText';
import UserInput from '../components/UserInput';

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
    <Screen>
      <TText type='title' text='Category Name:' />
      <UserInput
        placeholder="Enter category name"
        value={categoryName}
        onChangeText={(text) => setCategoryName(text)}
      />

      {/* Render the IconSelection component */}
      <IconSelection selectedIcon={selectedIcon} onSelectIcon={setSelectedIcon} />

      <GradientButton title="Update Category" onPress={handleUpdateCategory} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    marginLeft: 10,
    fontSize: 18,
  }
});

export default ManageCategoriesScreen;
