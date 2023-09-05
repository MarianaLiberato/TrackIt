import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import CategoryCard from '../components/CategoryCard'; // Import the CategoryCard component
import {Category, getCategories} from '../data/data'; // Import data functions

const HomeScreen = ({navigation}) => {
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    async function fetchData() {
      const initialCategories = await getCategories();
      setCategories(initialCategories);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      {categories?.map(category => (
        <CategoryCard
          key={category.id}
          name={category.name}
          onPress={() =>
            navigation.navigate('Activities', {
              categoryId: category.id,
              categoryName: category.name,
            })
          }
        />
      ))}
      <Button
        title="Manage Categories"
        onPress={() => navigation.navigate('Categories')}
      />
    </View>
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
});

export default HomeScreen;
