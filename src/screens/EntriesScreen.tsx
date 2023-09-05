import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, Switch, StyleSheet} from 'react-native';
import {Entry, addEntry, getActivityEntries, getEntries} from '../data/data';

const EntriesScreen = ({route}) => {
  const {activityName, activityId} = route.params;
  const [newEntryValue, setNewEntryValue] = useState('');
  const [isBooleanType, setIsBooleanType] = useState(false);
  const [entries, setEntries] = useState<Entry[]>();

  useEffect(() => {
    async function fetchData() {
      const initialEntries = await getActivityEntries(activityId);
      setEntries(initialEntries);
    }
    fetchData();
  }, [activityId]);

  const handleAddEntry = async () => {
    if (newEntryValue.trim() !== '') {
      setNewEntryValue('');
      try {
        // Add the category using data.ts
        await addEntry({
          id: `${Date.now()}`,
          value: !!newEntryValue,
          activityId,
          timestamp: Date.now()
        });
        const updatedEntries = await getActivityEntries(activityId);

        // Update the component state with the updated data
        setEntries(updatedEntries);
      } catch (error) {
        // Handle error
        console.error('Error adding category:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activityName}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Entry Value"
          value={newEntryValue}
          onChangeText={text => setNewEntryValue(text)}
        />
        <View style={styles.switchContainer}>
          <Text>Numeric</Text>
          <Switch
            value={isBooleanType}
            onValueChange={value => setIsBooleanType(value)}
          />
          <Text>Boolean</Text>
        </View>
      </View>
      <Button title="Add Entry" onPress={handleAddEntry} />
      {entries?.map(entry => (
        <View key={entry.id} style={styles.entry}>
          <Text>Value: {entry.value}</Text>
          <Text>Type: {entry.isBoolean ? 'Boolean' : 'Numeric'}</Text>
          <Text>Timestamp: {entry.timestamp}</Text>
        </View>
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
  },
});

export default EntriesScreen;
