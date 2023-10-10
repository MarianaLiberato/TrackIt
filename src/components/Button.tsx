import React from 'react';

import {theme} from '../constants/Theme';
import {Dimensions, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ButtonProps {
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
  fullWidth?: boolean;
}

class Button extends React.Component<ButtonProps> {
  render() {
    const {title, onPress, fullWidth, style, color, ...props} = this.props;

    const buttonStyle = [
        {...styles.appButtonContainer},
        fullWidth && styles.fullWidth
    ]

    return (
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Text style={styles.appButtonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: theme.COLORS.DEFAULT,
    borderRadius: theme.padding.S,
    paddingVertical: theme.padding.S,
    paddingHorizontal: theme.padding.S,
    marginBottom: theme.padding.S
  },
  appButtonText: {
    fontSize: theme.fontSize.button,
    color: theme.COLORS.WHITE,
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  fullWidth: {
    width: Dimensions.get('screen').width
  }
});

export default Button;
