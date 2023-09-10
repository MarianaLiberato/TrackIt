import React from 'react';

import theme from '../constants/Theme';
import { View, StyleSheet, Text } from 'react-native';
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
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          colors={[theme.COLORS.BUTTON_GRADIENT_START, theme.COLORS.BUTTON_GRADIENT_END]}
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
    backgroundColor: theme.COLORS.DEFAULT,
    borderRadius: theme.padding.L,
    paddingVertical: theme.padding.M,
    paddingHorizontal: theme.padding.L,
    marginTop: theme.padding.L,
  },
  appButtonText: {
    fontSize: theme.fontSize.button,
    color: theme.COLORS.WHITE,
    alignSelf: 'center',
  }
});

export default GradientButton;
