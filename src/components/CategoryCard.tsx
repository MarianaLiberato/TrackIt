import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import TText from './TText';
import {theme} from '../constants/Theme';

interface CategoryCarGroupdProps {
}

const CategoryCard: React.FC<CategoryCarGroupdProps> = ({ name, onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardLeft}>
        {icon && <Icon style={styles.icon} name={icon} />}
        <TText style={styles.text} text={name} />
      </View>
      <Icon style={styles.icon} name='chevron-right' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.PRIMARY,
    paddingVertical: theme.padding.S,
    paddingHorizontal: theme.padding.M,
    borderRadius: theme.padding.S,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardLeft: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 16,
  },
  icon: {
    fontSize: theme.padding.M,
    marginEnd: theme.padding.S,
    color: theme.COLORS.LABEL,
    alignSelf: 'center'
  }
});

export default CategoryCard;
