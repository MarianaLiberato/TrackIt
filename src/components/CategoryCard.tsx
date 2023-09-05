import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CategoryCardProps {
  name: string;
  onPress: () => void;
  icon?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {icon && <Icon name={icon} />}
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    margin: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default CategoryCard;
