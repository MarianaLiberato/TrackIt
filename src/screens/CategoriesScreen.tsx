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
import CategoryCardGroup from '../components/CategoryCardGroup';
import TText from '../components/TText';
import {exportDataAsBackup, importDataFromBackup} from '../data/exportData';
import GradientButton from '../components/GradientButton';
import {theme} from '../constants/Theme';
import UserInput from '../components/UserInput';

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

  const handleExportBackup = async () => {
    try {
      const filePath = await exportDataAsBackup();
      console.log('Backup exported to:', filePath);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleImportBackup = async () => {
    const filePath = ' /data/user/0/com.trackit/files/backup.json';

    try {
      const success = await importDataFromBackup(filePath);
      if (success) {
        console.log('Data imported successfully');
        // Reload or refresh the app to reflect the changes
      }
    } catch (error) {
      console.error('Import failed:', error);
    }
  };

  return (
    <Screen>
      <TText type='title' text="Manage Categories" />
      <View style={styles.container}>
        <UserInput
          placeholder="New Category Name"
          value={newCategory}
          onChangeText={text => setNewCategory(text)}
        />
        <GradientButton title="Add Category" onPress={handleAddCategory} />
      </View>
      <CategoryCardGroup>
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
      </CategoryCardGroup>
      <GradientButton
        title="Delete Categories"
        onPress={handleDeleteAllCategories}
      />
      <GradientButton title="Export Data" onPress={handleExportBackup} />
      <GradientButton title="Import Data" onPress={handleImportBackup} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.padding.L,
  },
  category: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default CategoriesScreen;
