import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { addActivity, getCategoryActivities, Activity } from '../data/data'; // Import data functions
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import TText from '../components/TText';
import Button from '../components/Button';
import Theme from '../constants/Theme';
import CategoryCard from '../components/CategoryCard';

const ActivitiesScreen = ({ route }) => {
  const { categoryId, categoryName } = route.params;
  const [newActivity, setNewActivity] = useState('');
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
      addActivity({ id: `${Date.now()}`, name: newActivity, categoryId });
      setNewActivity('');
      const updatedActivities = await getCategoryActivities(categoryId);
      setActivities(updatedActivities);
    }
  };

  return (
    <Screen>
      <TText style={styles.title} text='Manage Activities' />
      <TText style={styles.subtitle} text={`Category: ${categoryName}`} />
      <TextInput
        style={styles.input}
        placeholder="New Activity Name"
        value={newActivity}
        onChangeText={text => setNewActivity(text)}
      />
      <Button title="Add Activity" onPress={handleAddActivity} />
      {activities?.map(activity => (
        <CategoryCard name={activity.name} onPress={() =>
          navigation.navigate('Entries', {
            activityName: activity.name,
            activityId: activity.id,
          })}
          key={activity.id}
        />
      ))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    color: Theme.COLORS.WHITE
  },
  activity: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default ActivitiesScreen;
