// navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import EntriesScreen from '../screens/EntriesScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'TrackIt' }} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Activities" component={ActivitiesScreen} />
        <Stack.Screen name="Entries" component={EntriesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
