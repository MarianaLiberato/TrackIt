import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import TText from './TText';
import Theme from '../constants/Theme';

interface CategoryCardProps {
  name: string;
  onPress: () => void;
  icon?: string;
  square?: boolean
}

const CategoryCardGroup: React.FC<CategoryCardProps> = ({children, square}) => {

  const groupStyle = [
    {...styles.group},
    square && styles.square
  ]

  return <View style={groupStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  group: {
    width: '100%',
    display: 'flex',
    gap: Theme.padding.S,
  },
  square: {
    flexDirection: 'row',
    alignContent: 'space-around',
    flexWrap: 'wrap'
  }
});

export default CategoryCardGroup;
