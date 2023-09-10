import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import TText from './TText';
import Theme from '../constants/Theme';

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
    backgroundColor: Theme.COLORS.PRIMARY,
    paddingVertical: Theme.padding.S,
    paddingHorizontal: Theme.padding.M,
    borderRadius: Theme.padding.S,
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
    fontSize: Theme.padding.M,
    marginEnd: Theme.padding.S,
    color: Theme.COLORS.LABEL,
    alignSelf: 'center'
  }
});

export default CategoryCard;
