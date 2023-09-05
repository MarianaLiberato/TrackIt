import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { addActivity, getCategoryActivities, Activity} from '../data/data'; // Import data functions
import {useNavigation} from '@react-navigation/native';

const ActivitiesScreen = ({route}) => {
  const {categoryId, categoryName} = route.params;
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
      addActivity({id: `${Date.now()}`, name: newActivity, categoryId});
      setNewActivity('');
      const updatedActivities = await getCategoryActivities(categoryId);
      setActivities(updatedActivities);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Activities</Text>
      <Text style={styles.subtitle}>Category: {categoryName}</Text>
      <TextInput
        style={styles.input}
        placeholder="New Activity Name"
        value={newActivity}
        onChangeText={text => setNewActivity(text)}
      />
      <Button title="Add Activity" onPress={handleAddActivity} />
      {activities?.map(activity => (
        <TouchableOpacity
          key={activity.id}
          style={styles.activity}
          onPress={() =>
            navigation.navigate('Entries', {
              activityName: activity.name,
              activityId: activity.id,
            })
          }>
          <Text>{activity.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  },
  activity: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default ActivitiesScreen;
