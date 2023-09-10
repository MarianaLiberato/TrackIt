import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CategoryCard from '../components/CategoryCard'; // Import the CategoryCard component
import { Category, getCategories } from '../data/data'; // Import data functions
import Theme from '../constants/Theme';
import LinearGradient from 'react-native-linear-gradient';

const Screen = ({ children }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Theme.COLORS.GRADIENT_START, Theme.COLORS.GRADIENT_END]}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.container}>
          {children}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Theme.padding.M,
    // backgroundColor: Theme.COLORS.BACKGROUND
  },
});

export default Screen;
