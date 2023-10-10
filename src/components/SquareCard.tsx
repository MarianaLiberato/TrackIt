import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import TText from './TText';
import {theme} from '../constants/Theme';

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
    backgroundColor: theme.COLORS.PRIMARY,
    paddingVertical: theme.padding.M,
    paddingHorizontal: theme.padding.M,
    borderRadius: theme.padding.S,
    width: '30%',
    alignItems: 'center',
    flexGrow: 1
  },
  text: {
    fontSize: 14,
  },
  icon: {
    fontSize: theme.padding.L,
    color: theme.COLORS.ICON,
    alignSelf: 'center',
    marginBottom: theme.padding.M
  }
});

export default SquareCard;
