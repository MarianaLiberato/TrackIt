import React from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const availableIcons = [
  'accessibility-sharp',
  'alarm',
  'bandage',
  'book',
  // Add more icon names as needed
];

interface IconSelectionProps {
  selectedIcon: string;
  onSelectIcon: (iconName: string) => void;
}

const IconSelection: React.FC<IconSelectionProps> = ({ selectedIcon, onSelectIcon }) => {
  return (
    <View style={styles.iconContainer}>
      <FlatList
        data={availableIcons}
        horizontal
        keyExtractor={(iconName) => iconName}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectIcon(item)} style={styles.iconItem}>
            <Icon
              name={item}
              size={30}
              color={selectedIcon === item ? 'blue' : 'black'}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconItem: {
    marginHorizontal: 10,
  },
});

export default IconSelection;
