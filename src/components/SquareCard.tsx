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
    backgroundColor: theme.COLORS2.MID_BLUE,
    paddingVertical: theme.padding.M,
    paddingHorizontal: theme.padding.M,
    borderRadius: theme.padding.S,
    width: '30%',
    alignItems: 'center',
    flexGrow: 1,
  },
  text: {
    fontSize: theme.fontSize.button,
    color: theme.COLORS2.PALE_BLUE,
  },
  icon: {
    fontSize: theme.padding.L,
    color: theme.COLORS2.PALE_BLUE,
    alignSelf: 'center',
    marginBottom: theme.padding.M
  }
});

export default SquareCard;
