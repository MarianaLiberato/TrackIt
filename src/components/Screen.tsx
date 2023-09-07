import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import CategoryCard from '../components/CategoryCard'; // Import the CategoryCard component
import {Category, getCategories} from '../data/data'; // Import data functions
import Theme from '../constants/Theme';

const Screen = ({ children}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Theme.padding.M,
  },
});

export default Screen;
