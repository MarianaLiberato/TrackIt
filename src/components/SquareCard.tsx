import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import TText from './TText';
import Theme from '../constants/Theme';

interface SquareCardProps {
}

const SquareCard: React.FC<SquareCardProps> = ({ name, onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {icon && <Icon style={styles.icon} name={icon} />}
      <TText style={styles.text} text={name} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.COLORS.PRIMARY,
    paddingVertical: Theme.padding.M,
    paddingHorizontal: Theme.padding.M,
    borderRadius: Theme.padding.S,
    width: '30%',
    alignItems: 'center',
    flexGrow: 1
  },
  text: {
    fontSize: 14,
  },
  icon: {
    fontSize: Theme.padding.L,
    color: Theme.COLORS.ICON,
    alignSelf: 'center',
    marginBottom: Theme.padding.M
  }
});

export default SquareCard;
