import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {theme} from '../constants/Theme';

interface UserInputProps extends TextInput {}

const UserInput: React.FC<UserInputProps> = ({
  placeholder,
  value,
  onChangeText,
  style
}) => {
  let customStyle = StyleSheet.create(style);

  return (
    <TextInput
      style={{...styles.input, ...customStyle}}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={theme.COLORS.WHITE}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: theme.COLORS.WHITE,
    borderRadius: theme.padding.XS,
    padding: theme.padding.XS,
    paddingHorizontal: theme.padding.S,
    color: theme.COLORS.WHITE,
    fontSize: theme.fontSize.button
  },
});

export default UserInput;
