import React, { CSSProperties } from 'react';
import {View, Text, StyleSheet, StyleProp, TextStyle} from 'react-native';
import Theme from '../constants/Theme';

interface TextProps {
  style: TextStyle;
  text: string;
}

const TText: React.FC<TextProps> = ({style, text}) => {
  const customStyle = StyleSheet.create(style);

  return <Text style={{...styles.text, ...customStyle}}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans-Regular',
    color: Theme.COLORS.WHITE,
  },
});

export default TText;
