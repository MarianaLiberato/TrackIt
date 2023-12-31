// navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import EntriesScreen from '../screens/EntriesScreen';
import ManageCategoriesScreen from '../screens/ManageCategoryScreen';
import { theme } from '../constants/Theme';

const Stack = createStackNavigator();

let a: Theme = {
  dark: true,
  colors: {
    primary: 'yellow',
    background: 'pink',
    card: theme.COLORS2.DARK_BLUE,
    text: '#DADADA',
    border: theme.COLORS2.PALE_BLUE,
    notification: 'orange',
  }
}

const AppNavigator = () => {
  return (
    <NavigationContainer theme={a}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'TrackIt' }} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Activities" component={ActivitiesScreen} />
        <Stack.Screen name="Entries" component={EntriesScreen} />
        <Stack.Screen name="ManageCategory" component={ManageCategoriesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
