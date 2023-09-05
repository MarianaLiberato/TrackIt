import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ActivityTileProps {
  name: string;
  onPress: () => void;
}

const ActivityTile: React.FC<ActivityTileProps> = ({ name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tile}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    margin: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default ActivityTile;
