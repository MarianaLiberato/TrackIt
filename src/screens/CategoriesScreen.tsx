import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import {
  getCategories,
  addCategory,
  deleteAllCategories,
  Category,
} from '../data/data'; // Import data functions
import Button from '../components/Button';
import CategoryCard from '../components/CategoryCard';
import Screen from '../components/Screen';

const CategoriesScreen = ({navigation}) => {
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    async function fetchData() {
      const initialCategories = await getCategories();
      setCategories(initialCategories);
    }
    fetchData();
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim() !== '') {
      setNewCategory('');
      try {
        // Add the category using data.ts
        await addCategory({id: `${Date.now()}`, name: newCategory});
        const updatedCategories = await getCategories();

        // Update the component state with the updated data
        setCategories(updatedCategories);
      } catch (error) {
        // Handle error
        console.error('Error adding category:', error);
      }
    }
  };

  const handleDeleteAllCategories = async () => {
    // Show a confirmation dialog to confirm deletion
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete all categories?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              // Call the function to delete all categories
              await deleteAllCategories();
              // You may want to refresh the screen or navigate to another screen here
            } catch (error) {
              // Handle any errors that may occur during deletion
              console.error('Error deleting categories:', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <Screen>
      <Text style={styles.title}>Manage Categories</Text>
      <TextInput
        style={styles.input}
        placeholder="New Category Name"
        value={newCategory}
        onChangeText={text => setNewCategory(text)}
      />
      <Button title="Add Category" onPress={handleAddCategory} />
      {categories?.map(category => (
         <CategoryCard
         key={category.id}
         name={category.name}
         icon={category.icon}
         onPress={() =>
           navigation.navigate('ManageCategory', {
             categoryId: category.id,
             categoryName: category.name,
           })
         }
       />
      ))}
      <Button title="Delete Categories" onPress={handleDeleteAllCategories} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  category: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default CategoriesScreen;
