import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import CategoryCard from '../components/CategoryCard'; // Import the CategoryCard component
import {Category, getCategories} from '../data/data'; // Import data functions
import {theme} from '../constants/Theme';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';

const Screen = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[theme.COLORS2.DARK_BLUE, theme.COLORS2.DARK_BLUE]}
        style={StyleSheet.absoluteFillObject}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.otherContainer}>{children}</View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + theme.padding.M,
  },
  scrollView: {
    marginHorizontal: theme.padding.M,
  },
  otherContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Screen;
