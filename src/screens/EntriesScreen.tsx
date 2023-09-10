import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, Switch, StyleSheet} from 'react-native';
import {
  Entry,
  addEntry,
  getActivityEntries,
  Activity,
  getActivity,
} from '../data/data';
import Screen from '../components/Screen';
import TText from '../components/TText';
import Theme from '../constants/Theme';

const EntriesScreen = ({route}) => {
  const {activityName, activityId} = route.params;
  const [newEntryValue, setNewEntryValue] = useState('');
  const [isBooleanType, setIsBooleanType] = useState(false);
  const [entries, setEntries] = useState<Entry[]>();
  const [activityType, setActivityType] = useState<string>(); // Default activity type is boolean

  useEffect(() => {
    async function fetchData() {
      const initialEntries = await getActivityEntries(activityId);
      const activity: Activity | undefined = await getActivity(activityId);
      if (activity) {
        setActivityType(activity.valueType); // Set the activity type based on the selected value type
      }
      setEntries(initialEntries);
    }
    fetchData();
  }, [activityId]);

  const handleAddEntry = async () => {
    if (newEntryValue.trim() !== '') {
      setNewEntryValue('');
      try {
        // Add the entry using data.ts with the appropriate value type
        const value =
          activityType === 'boolean'
            ? isBooleanType
              ? 'true'
              : 'false'
            : newEntryValue.toString();
        await addEntry({
          id: `${Date.now()}`,
          value,
          activityId,
          timestamp: Date.now(),
          isBoolean: activityType === 'boolean', // Set isBoolean based on the activity type
        });
        const updatedEntries = await getActivityEntries(activityId);

        // Update the component state with the updated data
        setEntries(updatedEntries);
      } catch (error) {
        // Handle error
        console.error('Error adding entry:', error);
      }
    }
  };

  const setBoolean = (value) => {
    setNewEntryValue(value + '')
    setIsBooleanType(value)
  }

  return (
    <Screen>
      <TText style={styles.title} text={activityName} />
      <View style={styles.inputContainer}>
        {activityType === 'boolean' ? (
          <View style={styles.switchContainer}>
            <TText text="Numeric" />
            <Switch
              value={isBooleanType}
              onValueChange={value => setBoolean(value)}
            />
          </View>
        ) : (
          <TextInput
            style={styles.input}
            placeholder="New Entry Value"
            value={newEntryValue}
            onChangeText={text => setNewEntryValue(text)}
          />
        )}
      </View>
      <Button title="Add Entry" onPress={handleAddEntry} />
      {entries?.map(entry => (
        <View key={entry.id} style={styles.entry}>
          <TText text={entry.value.toString()} />
          <TText text={activityType} />
          <TText text={new Date(entry.timestamp).toDateString()} />
        </View>
      ))}
    </Screen>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    color: Theme.COLORS.WHITE,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  entry: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    color: Theme.COLORS.WHITE,
  },
});

export default EntriesScreen;
