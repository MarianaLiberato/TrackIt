import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface EntryListProps {
  entries: Array<{ value: string; type: string; timestamp: string }>;
}

const EntryList: React.FC<EntryListProps> = ({ entries }) => {
  return (
    <FlatList
      data={entries}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.entry}>
          <Text>Value: {item.value}</Text>
          <Text>Type: {item.type}</Text>
          <Text>Timestamp: {item.timestamp}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  entry: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    margin: 8,
  },
});

export default EntryList;
