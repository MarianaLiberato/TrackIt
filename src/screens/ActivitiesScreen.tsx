import React, { useEffect, useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { addActivity, getCategoryActivities, Activity } from '../data/data'; // Import data functions
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import TText from '../components/TText';
import Button from '../components/Button';
import { theme } from '../constants/Theme';
import CategoryCard from '../components/CategoryCard';
import { Picker } from '@react-native-picker/picker';
import CategoryCardGroup from '../components/CategoryCardGroup';
import GradientButton from '../components/GradientButton';
import UserInput from '../components/UserInput';

const ActivitiesScreen = ({ route }) => {
  const { categoryId, categoryName } = route.params;
  const [newActivity, setNewActivity] = useState('');
  const [valueType, setValueType] = useState('boolean'); // Default value type is boolean
  const navigation = useNavigation(); // Initialize navigation
  const [activities, setActivities] = useState<Activity[]>();

  useEffect(() => {
    async function fetchData() {
      const initialActivities = await getCategoryActivities(categoryId);
      setActivities(initialActivities);
    }
    fetchData();
  }, [categoryId]);

  const handleAddActivity = async () => {
    if (newActivity.trim() !== '') {
      const activityData = {
        id: `${Date.now()}`,
        name: newActivity,
        categoryId,
        valueType, // Include the selected value type
      };

      addActivity(activityData);
      setNewActivity('');
      const updatedActivities = await getCategoryActivities(categoryId);
      setActivities(updatedActivities);
    }
  };

  return (
    <Screen>
      <TText type='title' text={categoryName} />
      <View style={styles.container}>
        <UserInput
          placeholder="New Activity Name"
          value={newActivity}
          onChangeText={text => setNewActivity(text)}
        />
        <TText style={styles.label} text="Select Value Type:" />
        <Picker
          selectedValue={valueType}
          onValueChange={itemValue => setValueType(itemValue)}
          dropdownIconColor={theme.COLORS.WHITE}
          style={styles.picker}
        >
          <Picker.Item label="Boolean" value="boolean" />
          <Picker.Item label="Number" value="number" />
          <Picker.Item label="Text/String" value="text" />
        </Picker>
        <GradientButton title="Add Activity" onPress={handleAddActivity} />
      </View>
      <CategoryCardGroup>
        {activities?.map(activity => (
          <CategoryCard
            name={activity.name}
            onPress={() =>
              navigation.navigate('Entries', {
                activityName: activity.name,
                activityId: activity.id,
              })
            }
            key={activity.id}
          />
        ))}
      </CategoryCardGroup>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: theme.padding.M
  },
  picker: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    color: theme.COLORS.WHITE,
  },
  activity: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  label: {
    width: '100%',
    marginTop: theme.padding.M,
    marginBottom: -5
  }
});

export default ActivitiesScreen;
