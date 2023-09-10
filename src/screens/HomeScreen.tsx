import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import CategoryCard from '../components/CategoryCard'; // Import the CategoryCard component
import { Category, getCategories } from '../data/data'; // Import data functions
import Screen from '../components/Screen';
import Button from '../components/Button';
import GradientBtn from '../components/GradientBtn';
import CategoryCardGroup from '../components/CategoryCardGroup';
import GradientButton from '../components/GradientButton';
import Theme from '../constants/Theme';
import SquareCard from '../components/SquareCard';

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState<Category[]>();
  const [lastCategories, setLastCategories] = useState<Category[]>();

  useEffect(() => {
    async function fetchData() {
      const initialCategories = await getCategories();
      setCategories(initialCategories);
      setLastCategories(initialCategories.slice(initialCategories.length-3))
    }
    fetchData();
  }, []);

  return (
    <Screen>
      <Text style={styles.title}>Categories</Text>
      <CategoryCardGroup square>
        {lastCategories?.map(category => (
          <SquareCard
            key={category.id}
            name={category.name}
            icon={category.icon}
            onPress={() =>
              navigation.navigate('Activities', {
                categoryId: category.id,
                categoryName: category.name,
              })
            }
          />
        ))}
      </CategoryCardGroup>
      <Text style={styles.title}>Categories</Text>
      <CategoryCardGroup>
        {categories?.map(category => (
          <CategoryCard
            key={category.id}
            name={category.name}
            icon={category.icon}
            onPress={() =>
              navigation.navigate('Activities', {
                categoryId: category.id,
                categoryName: category.name,
              })
            }
          />
        ))}
      </CategoryCardGroup>
      <GradientButton
        title="Manage Categories"
        onPress={() => navigation.navigate('Categories')}
      />
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
    marginTop: 20,
    alignSelf: 'flex-start',
    color: Theme.COLORS.LABEL
  },
});

export default HomeScreen;
