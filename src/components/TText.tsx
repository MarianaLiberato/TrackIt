import React, { CSSProperties } from 'react';
import {View, Text, StyleSheet, StyleProp, TextStyle} from 'react-native';
import {theme} from '../constants/Theme';

interface TextProps {
  style: TextStyle;
  text: string;
  type?: 'body' | 'title'
}

const TText: React.FC<TextProps> = ({style, text, type = 'body'}) => {
  
  let customStyle = StyleSheet.create(style);

  if(type === 'title'){
    customStyle = {...styles.title, ...customStyle}
  }

  return <Text style={{...styles.text, ...customStyle}}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans-Regular',
    color: theme.COLORS.WHITE,
  },
  title: {
    fontSize: theme.fontSize.title,
    fontWeight: 'bold',
    marginVertical: theme.padding.L,
  },
});

export default TText;
