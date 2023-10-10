import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet } from 'react-native';
import {
  Entry,
  addEntry,
  getActivityEntries,
  Activity,
  getActivity,
} from '../data/data';
import Screen from '../components/Screen';
import TText from '../components/TText';
import { theme } from '../constants/Theme';
import LinearChart from '../components/LinearChart';
import { mockWellBeingEntries } from '../data/mockWellBeingEntries';
import {
  convertDataToChartFormat,
  convertDataToChartFormat2,
} from './HomeScreen';
import GradientButton from '../components/GradientButton';
import DateTimePickerModal from '@react-native-community/datetimepicker'; // Import the date and time picker library

const EntriesScreen = ({ route }) => {
  const { activityName, activityId } = route.params;
  const [newEntryValue, setNewEntryValue] = useState('');
  const [isBooleanType, setIsBooleanType] = useState(false);
  const [entries, setEntries] = useState<Entry[]>();
  const [activityType, setActivityType] = useState<string>(); // Default activity type is boolean
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // State to manage date picker visibility
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to store selected date

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
        const updatedEntries = await addEntry({
          value,
          activityId,
          timestamp: selectedDate.getTime(), // Use the selected date as the timestamp
          isBoolean: activityType === 'boolean', // Set isBoolean based on the activity type
        });

        // Update the component state with the updated data
        setEntries(updatedEntries);
      } catch (error) {
        // Handle error
        console.error('Error adding entry:', error);
      }
    }
  };

  const setBoolean = value => {
    setNewEntryValue(value + '');
    setIsBooleanType(value);
  };

  const renderChart = () => {
    try {
      return (
        <LinearChart
          chartData={convertDataToChartFormat2(entries)}
          yLabel={activityName}
        // chartData={convertDataToChartFormat2(mockWellBeingEntries)}
        />
      );
    } catch (e: Error) {
      console.log('error loading chart: ', e.message);
    }
    return <TText text="Error loading chart" />;
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (e, date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const sortDates = (array: Entry[]) => {
    const sorted = array?.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return b.timestamp - a.timestamp;
    });
    return sorted || []
  }

  return (
    <Screen>
      <View style={styles.container}>
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
              placeholderTextColor={theme.COLORS.WHITE}
            />
          )}
          <View style={styles.dateContainer}>
            <TextInput
              style={styles.input}
              editable={false}
              value={selectedDate.toLocaleDateString()}
            />
            <Button
              title="Change"
              onPress={showDatePicker}
            />
          </View>
        </View>
        <GradientButton title="Add Entry" onPress={handleAddEntry} />
      </View>
      <View style={styles.container}>
        {entries?.length ? renderChart() : <TText text="no entries" />}
      </View>
      <View style={styles.container}>
        {sortDates(entries).map(entry => (
          <View key={entry.id} style={styles.entry}>
            <TText style={styles.entryValue} text={entry.value.toString()} />
            <TText
              text={
                entry.timestamp
                  ? new Date(entry.timestamp).toDateString()
                  : 'no data'
              }
            />
          </View>
        ))}
      </View>
      {isDatePickerVisible && (
        <DateTimePickerModal
          value={selectedDate}
          mode="datetime" // Change this to "date" or "time" if needed
          onChange={handleDateConfirm}
          onPointerCancel={hideDatePicker}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.padding.S,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'column',
    marginBottom: 10,
    width: '100%',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: theme.padding.XS,
    padding: 10,
    color: theme.COLORS.WHITE,
    flexShrink: 1,
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
    color: theme.COLORS.WHITE,
    width: '100%'
  },
  entryValue: {
    fontSize: 16
  },
  dateContainer: {
    flexDirection: 'row',
  }
});

export default EntriesScreen;
