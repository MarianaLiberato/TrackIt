import React from 'react';

import {theme} from '../constants/Theme';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

interface GradientButtonProps {
  title?: string;
  onPress?: any;
  color?:
  | 'default'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'error'
  | 'success'
  | 'warning';
}

class GradientButton extends React.Component<GradientButtonProps> {
  render() {
    const { title, onPress, style, color, ...props } = this.props;

    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <LinearGradient
          colors={[theme.COLORS2.GREEN, theme.COLORS2.GREEN]}
          style={styles.appButtonContainer}
          start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        >
          <Text style={styles.appButtonText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    width: Dimensions.get('window').width / 1.5,
    backgroundColor: theme.COLORS.DEFAULT,
    borderRadius: theme.padding.L,
    paddingVertical: theme.padding.S,
    paddingHorizontal: theme.padding.M,
    marginTop: theme.padding.M,
  },
  appButtonText: {
    fontSize: theme.fontSize.button,
    color: theme.COLORS2.DARK_BLUE,
    alignSelf: 'center',
  }
});

export default GradientButton;
