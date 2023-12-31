import React from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {theme} from '../constants/Theme';

const availableIcons = [
  'person-walking',
  'glass-water',
  'bed',
  'poo',
  'person-biking',
  'road',
  'bus',
  'phone'
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
        contentContainerStyle={styles.iconContainer}
        keyExtractor={(iconName) => iconName}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectIcon(item)} style={styles.iconItem}>
            <Icon
              name={item}
              size={35}
              color={selectedIcon === item ? theme.COLORS.ICON : theme.COLORS.LABEL}
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
    flexWrap: 'wrap',
    width: '100%',
    rowGap: theme.padding.S,
    justifyContent: 'space-around',
    columnGap: theme.padding.S,
  },
  iconItem: {
    width: '100%',
    padding: theme.padding.M,
    minWidth: '20%'
  },
});

export default IconSelection;
